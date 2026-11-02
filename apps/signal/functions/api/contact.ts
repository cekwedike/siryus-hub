import { contactHandler } from '../../../../shared/contact'

export const onRequestPost = contactHandler({
  name: 'SIGNAL.',
  inbox: 'signal@siryushub.com',
  site: 'https://growth.siryushub.com',
  logo: 'https://growth.siryushub.com/icon-192.png',
  ink: '#0b0b0c',
  paper: '#f3ede4',
  accent: '#d9232a',
  accentInk: '#ffffff',
  font: "Inter, 'Helvetica Neue', Arial, sans-serif",
  signoff: 'Talk soon. The SIGNAL. team',
  fields: { company: 'Company or brand', need: 'Looking for', budget: 'Budget', timing: 'Timing' },
})
