// Shared contact-form handler for the SIRYUS sites, run as a Cloudflare Pages Function.
// Each enquiry produces two emails through Mailjet's Send API v3.1, both sent from noreply@siryushub.com:
//   1. a notification to the brand inbox, with Reply-To set to the visitor so the team can answer directly;
//   2. a fixed acknowledgement to the visitor (no visitor text in it), with Reply-To set to the brand inbox.
// Secrets (set per Pages project): MAILJET_API_KEY, MAILJET_SECRET_KEY.

export type Brand = {
  name: string // shown as the sender name and in copy
  inbox: string // existing address that receives enquiries and takes replies
  site: string // origin, used for links and the logo
  logo: string // absolute URL of a small square logo (PNG works in every mail client)
  ink: string // text and header colour
  paper: string // email background
  accent: string // button and highlight colour
  accentInk: string // text on the accent colour
  font: string // web-safe stack; mail clients ignore web fonts
  signoff: string // one line under the acknowledgement
  fields: Record<string, string> // extra form fields to include, name -> label
}

type Env = { MAILJET_API_KEY?: string; MAILJET_SECRET_KEY?: string }
type Context = { request: Request; env: Env }

const SENDER = 'noreply@siryushub.com'
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function layout(brand: Brand, heading: string, body: string, button?: { label: string; href: string }) {
  const cta = button
    ? `<tr><td style="padding:8px 40px 36px"><a href="${button.href}" style="display:inline-block;background:${brand.accent};color:${brand.accentInk};font-weight:700;text-decoration:none;padding:14px 22px;border-radius:4px">${escape(button.label)}</a></td></tr>`
    : ''
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(heading)}</title></head>
<body style="margin:0;padding:0;background:${brand.paper};font-family:${brand.font};color:${brand.ink}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.paper}"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:6px;overflow:hidden">
<tr><td style="padding:32px 40px 8px"><img src="${brand.logo}" width="48" height="48" alt="${escape(brand.name)}" style="display:block;border:0;border-radius:8px"></td></tr>
<tr><td style="padding:16px 40px 8px"><h1 style="margin:0;font-size:24px;line-height:1.25;color:${brand.ink}">${escape(heading)}</h1></td></tr>
<tr><td style="padding:8px 40px 24px;font-size:16px;line-height:1.6;color:${brand.ink}">${body}</td></tr>
${cta}
</table>
<p style="margin:20px 0 0;font-size:13px;line-height:1.5;color:${brand.ink}">${escape(brand.name)} is part of <a href="https://siryushub.com" style="color:${brand.ink}">SIRYUS</a>. © ${new Date().getFullYear()} Siryus Creative Media Ltd</p>
</td></tr></table></body></html>`
}

function notification(brand: Brand, data: Record<string, string>) {
  const rows = [['Name', data.name], ['Email', data.email], ...Object.entries(brand.fields).map(([key, label]) => [label, data[key]])]
    .filter(([, value]) => value)
    .map(([label, value]) => `<tr><td style="padding:6px 16px 6px 0;font-weight:700;vertical-align:top;white-space:nowrap">${escape(label)}</td><td style="padding:6px 0">${escape(value)}</td></tr>`)
    .join('')
  const message = escape(data.message).replace(/\n/g, '<br>')
  const html = layout(
    brand,
    `New enquiry from ${data.name}`,
    `<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;margin-bottom:20px">${rows}</table><p style="margin:0 0 8px;font-weight:700">Message</p><p style="margin:0">${message}</p><p style="margin:24px 0 0;font-size:14px">Reply to this email to answer ${escape(data.name)} directly.</p>`,
  )
  const text = [`New enquiry for ${brand.name}`, '', `Name: ${data.name}`, `Email: ${data.email}`, ...Object.entries(brand.fields).filter(([key]) => data[key]).map(([key, label]) => `${label}: ${data[key]}`), '', data.message].join('\n')
  return { html, text }
}

// The acknowledgement goes to an address nobody has verified, so it carries no visitor-supplied text at all.
// Otherwise the form could be used to send someone else's words from our domain to strangers.
function acknowledgement(brand: Brand) {
  const html = layout(
    brand,
    'Thanks. We have your message.',
    `<p style="margin:0 0 16px">A real person on the ${escape(brand.name)} team will read it and reply, usually within two working days.</p><p style="margin:0 0 16px">If you need to add anything, just reply to this email. It goes straight to ${escape(brand.inbox)}.</p><p style="margin:0">${escape(brand.signoff)}</p>`,
    { label: `Visit ${brand.name}`, href: brand.site },
  )
  const text = `Thanks. We have your message.\n\nA real person on the ${brand.name} team will read it and reply, usually within two working days. If you need to add anything, reply to this email. It goes straight to ${brand.inbox}.\n\n${brand.signoff}\n\n${brand.site}`
  return { html, text }
}

async function readForm(request: Request): Promise<Record<string, string>> {
  const type = request.headers.get('content-type') ?? ''
  const raw: Record<string, unknown> = type.includes('application/json')
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries())
  const data: Record<string, string> = {}
  for (const [key, value] of Object.entries(raw)) if (typeof value === 'string') data[key] = value.trim().slice(0, 5000)
  return data
}

export function contactHandler(brand: Brand) {
  return async ({ request, env }: Context): Promise<Response> => {
    const wantsJson = (request.headers.get('accept') ?? '').includes('application/json')
    const reply = (status: number, message: string) =>
      wantsJson
        ? Response.json({ ok: status < 400, message }, { status })
        : Response.redirect(new URL(status < 400 ? '/contact?sent=1' : '/contact?error=1', request.url).href, 303)

    let data: Record<string, string>
    try {
      data = await readForm(request)
    } catch {
      return reply(400, 'We could not read that form. Please try again.')
    }

    // Bots fill the hidden field or submit instantly. Pretend success so they learn nothing.
    const started = Number(data.started ?? 0)
    if (data.website || (started && Date.now() - started < 2500)) return reply(200, 'Thanks. Your message is on its way.')

    if (!data.name || data.name.length > 120) return reply(422, 'Please add your name.')
    if (!EMAIL.test(data.email ?? '')) return reply(422, 'Please add an email address we can reply to.')
    if (!data.message || data.message.length < 10) return reply(422, 'Please tell us a little more in your message.')

    if (!env.MAILJET_API_KEY || !env.MAILJET_SECRET_KEY) {
      return reply(503, `Our form is offline right now. Please email ${brand.inbox} instead.`)
    }

    const toTeam = notification(brand, data)
    const toVisitor = acknowledgement(brand)
    const res = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Basic ${btoa(`${env.MAILJET_API_KEY}:${env.MAILJET_SECRET_KEY}`)}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: SENDER, Name: `${brand.name} website` },
            To: [{ Email: brand.inbox, Name: brand.name }],
            ReplyTo: { Email: data.email, Name: data.name },
            Subject: `New enquiry: ${data.name}`,
            TextPart: toTeam.text,
            HTMLPart: toTeam.html,
            CustomCampaign: `${brand.name} contact`,
          },
          {
            From: { Email: SENDER, Name: brand.name },
            To: [{ Email: data.email }],
            ReplyTo: { Email: brand.inbox, Name: brand.name },
            Subject: `We got your message | ${brand.name}`,
            TextPart: toVisitor.text,
            HTMLPart: toVisitor.html,
            CustomCampaign: `${brand.name} acknowledgement`,
          },
        ],
      }),
    })
    if (!res.ok) {
      console.error('Mailjet send failed', res.status, await res.text())
      return reply(502, `Something went wrong sending that. Please email ${brand.inbox} instead.`)
    }
    return reply(200, 'Thanks. Your message is on its way, and a copy is in your inbox.')
  }
}
