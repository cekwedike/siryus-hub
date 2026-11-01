# DNS and email protection

## Non-negotiable rule

Moving the website must not change how email is delivered. Website records and mail records are separate. Never delete or replace MX, SPF, DKIM, DMARC, mail-host, verification, or autodiscover records simply because the web host changes.

## Before any DNS edit

Export or screenshot the full Cloudflare DNS zone. Record each record's type, name, value, proxy state, TTL, and purpose. Identify:

- apex and `www` web records
- MX records
- SPF TXT record
- DKIM selectors
- DMARC record at `_dmarc`
- mail, autodiscover, and provider verification records
- CAA records

Do not copy secret keys into this repository. DNS records intended to be public can be recorded in a private operational checklist, not in source control unless approved.

## Cutover rules

- Add the Pages custom domain through Cloudflare Pages first.
- Let Cloudflare create or validate the required web record.
- Keep mail-related records DNS-only unless the mail provider explicitly supports proxying.
- Do not create two SPF records. Merge authorized senders into one valid SPF policy when a change is genuinely required.
- Do not weaken DMARC to solve a website issue.
- Review CAA records if certificate issuance fails. Do not remove restrictive CAA records without understanding the effect.

## Verification

Immediately before and after cutover, check:

- apex and `www` resolve to the intended site
- HTTPS certificates are valid
- inbound mail arrives from an external account
- outbound mail reaches an external account
- SPF, DKIM, and DMARC results pass in received-message headers
- contact forms deliver and have abuse protection
- no Cloudflare email-routing feature was enabled by accident

## Rollback trigger

Treat any unexpected mail failure as a cutover blocker. Restore the last known good DNS record set and verify mail before continuing with the website migration.

