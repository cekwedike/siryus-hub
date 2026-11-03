// Renders each site's 1200 x 630 social preview image (og.png) from an HTML template, using the brands'
// real fonts, logos and photography. Needs Microsoft Edge or Chrome: set BROWSER_PATH if neither default exists.
// Run with: pnpm og
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = (site, ...parts) => pathToFileURL(join(root, 'apps', site, 'public', ...parts)).href
const logo = (...parts) => pathToFileURL(join(root, 'logos', ...parts)).href
const fonts = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@500&family=Manrope:wght@600;800&family=Marcellus&family=Unbounded:wght@600;800&display=block'
const base = `*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden}img{display:block}`

const cards = {
  siryus: `
    <style>${base}
      @font-face{font-family:Machina;src:url('${pub('siryus', 'fonts', 'machina-ultrabold.woff2')}');font-weight:800}
      body{background:#fff;color:#000;position:relative;font-family:Machina,sans-serif}
      .orbit{position:absolute;left:-140px;top:-120px;width:1480px;height:870px;border:1.5px dashed rgb(0 0 0/.28);border-radius:50%;transform:rotate(-7deg)}
      .copy{position:absolute;left:72px;top:0;bottom:0;width:430px;display:flex;flex-direction:column;justify-content:center;gap:34px}
      .copy img{width:300px}
      h1{font:400 46px/1.08 Marcellus,serif}
      .url{font-size:17px;font-weight:800}
      .shards{position:absolute;right:56px;top:64px;bottom:64px;width:600px;display:flex}
      .shards span{flex:1;margin-left:-38px;clip-path:polygon(46px 0,100% 0,calc(100% - 46px) 100%,0 100%);background-size:cover;background-position:center}
      .shards span:first-child{margin-left:0;clip-path:polygon(0 0,100% 0,calc(100% - 46px) 100%,0 100%)}
      .shards span:last-child{clip-path:polygon(46px 0,100% 0,100% 100%,0 100%)}
    </style>
    <div class="orbit"></div>
    <div class="copy"><img src="${pub('siryus', 'brand', 'siryus', 'lockup-black.png')}"><h1>Different Worlds. One Creative Universe.</h1><p class="url">siryushub.com</p></div>
    <div class="shards">
      <span style="background-image:url('${pub('siryus', 'images', 'hero', 'siryus-violin.webp')}')"></span>
      <span style="background-image:url('${pub('siryus', 'images', 'portal', 'arc-worship.webp')}')"></span>
      <span style="background-image:url('${pub('siryus', 'images', 'portal', 'signal-workshop.webp')}')"></span>
      <span style="background-image:url('${pub('siryus', 'images', 'portal', 'pavo-code.webp')}')"></span>
    </div>`,

  am: `
    <style>${base}
      @font-face{font-family:Cenzo;src:url('${pub('am', 'fonts', 'cenzo.woff2')}')}
      @font-face{font-family:Montserrat;src:url('${pub('am', 'fonts', 'montserrat.woff2')}');font-weight:400 800}
      body{background:#fff;color:#000;font-family:Montserrat,Arial,sans-serif;display:grid;grid-template-columns:640px 1fr}
      .copy{padding:60px 0 56px 72px;display:flex;flex-direction:column;justify-content:space-between}
      .brand{display:flex;align-items:center;gap:14px;font:30px Cenzo,Impact,sans-serif;letter-spacing:.02em}.brand img{width:54px}
      h1{font:104px/.86 Cenzo,Impact,sans-serif;letter-spacing:-.02em}
      .url{font-size:22px;font-weight:700;border-top:2px solid #000;padding-top:18px}
      .media{position:relative}
      .disc{position:absolute;left:150px;top:112px;width:380px;height:380px;border-radius:50%;background:repeating-radial-gradient(circle,#0b0b0b 0 1.2px,#1c1c1c 1.6px 2.6px)}
      .disc::after{content:'';position:absolute;inset:33%;border-radius:50%;background:#fff}
      .sleeve{position:absolute;left:24px;top:100px;width:404px;height:404px;overflow:hidden;box-shadow:0 30px 50px -24px rgba(0,0,0,.5);transform:rotate(-3deg)}
      .sleeve img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.06)}
    </style>
    <div class="copy"><p class="brand"><img src="${pub('am', 'brand', 'mark-dark.png')}">SIRYUS A.M</p><h1>We move music.</h1><p class="url">artists.siryushub.com</p></div>
    <div class="media"><div class="disc"></div><div class="sleeve"><img src="${pub('am', 'images', 'artists', 'max-prodigy-2-1200.webp')}"></div></div>`,

  signal: `
    <style>${base}
      body{background:#f4eadb;color:#111;font-family:Manrope,sans-serif;display:grid;grid-template-columns:660px 1fr}
      .copy{padding:60px 0 56px 72px;display:flex;flex-direction:column;justify-content:space-between}
      .brand{display:flex;align-items:center;gap:16px;font:400 40px 'DM Serif Display',serif;letter-spacing:-.02em}
      .brand img{width:58px}
      .dot{display:inline-block;width:.2em;height:.2em;border-radius:50%;background:#e32620;margin-left:.04em}
      h1{font:400 96px/.86 'DM Serif Display',serif;letter-spacing:-.045em}
      .url{font-size:20px;font-weight:800}
      .media{position:relative;overflow:hidden}
      .media img{width:100%;height:100%;object-fit:cover}
      .media::after{content:'';position:absolute;inset:0;background:#e32620;mix-blend-mode:multiply;opacity:.24}
    </style>
    <div class="copy"><p class="brand"><img src="${logo('SIGNAL', 'signal-symbol-transparent.png')}"><span>SIGNAL<span class="dot"></span></span></p><h1>Make your message matter<span class="dot"></span></h1><p class="url">growth.siryushub.com</p></div>
    <div class="media"><img src="${pub('signal', 'images', 'billboard-night-1600.webp')}"></div>`,

  arc: `
    <style>${base}
      body{background:#0a0908;color:#fff;font-family:'DM Sans',sans-serif;position:relative}
      .photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .scrim{position:absolute;inset:0;background:linear-gradient(90deg,#0a0908 18%,rgb(10 9 8/.75) 52%,rgb(10 9 8/.25))}
      .copy{position:absolute;left:72px;top:60px;bottom:56px;width:640px;display:flex;flex-direction:column;justify-content:space-between}
      .copy img{width:118px}
      h1{font:800 66px/1.02 Unbounded,sans-serif;letter-spacing:-.03em}
      h1 span{color:#f27930}
      .url{font-size:20px;color:#f27930}
    </style>
    <img class="photo" src="${pub('arc', 'arc', 'young-and-for-christ.jpg')}"><div class="scrim"></div>
    <div class="copy"><img src="${pub('arc', 'arc', 'arc-svg.svg')}"><h1>Ascent. Refuge. <span>Collective.</span></h1><p class="url">collective.siryushub.com</p></div>`,
}

const browser = [process.env.BROWSER_PATH, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome']
  .find((path) => path && existsSync(path))
if (!browser) throw new Error('No Edge or Chrome found. Set BROWSER_PATH to a Chromium-based browser.')

const work = await mkdtemp(join(tmpdir(), 'siryus-og-'))
const port = 9400 + Math.floor(Math.random() * 400)
const proc = spawn(browser, ['--headless=new', '--disable-gpu', '--allow-file-access-from-files', `--remote-debugging-port=${port}`, `--user-data-dir=${join(work, 'profile')}`, 'about:blank'])
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

try {
  let target
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250)
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page') } catch {}
  }
  if (!target) throw new Error('Browser did not start.')
  const ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve) => (ws.onopen = resolve))
  let id = 0
  const pending = new Map()
  ws.onmessage = (event) => { const msg = JSON.parse(event.data); pending.get(msg.id)?.(msg); pending.delete(msg.id) }
  const send = (method, params = {}) => new Promise((resolve) => { const n = ++id; pending.set(n, resolve); ws.send(JSON.stringify({ id: n, method, params })) })

  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
  for (const [site, body] of Object.entries(cards)) {
    const file = join(work, `${site}.html`)
    await writeFile(file, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${fonts}"></head><body>${body}</body></html>`)
    await send('Page.navigate', { url: pathToFileURL(file).href })
    await sleep(1200)
    await send('Runtime.evaluate', { awaitPromise: true, expression: `document.fonts.ready.then(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))))` })
    await sleep(300)
    const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } })
    await writeFile(join(root, 'apps', site, 'public', 'og.png'), Buffer.from(shot.result.data, 'base64'))
    console.log(`og.png written for ${site}`)
  }
  ws.close()
} finally {
  proc.kill()
  await sleep(500)
  await rm(work, { recursive: true, force: true }).catch(() => {})
}
