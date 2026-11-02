import { contactHandler } from '../../../../shared/contact'

export const onRequestPost = contactHandler({
  name: 'SIRYUS A.M',
  inbox: 'management@siryushub.com',
  site: 'https://artists.siryushub.com',
  logo: 'https://artists.siryushub.com/icon-192.png',
  ink: '#313131',
  paper: '#d1f344',
  accent: '#313131',
  accentInk: '#d1f344',
  font: "Montserrat, 'Helvetica Neue', Arial, sans-serif",
  signoff: 'Keep making the music. We will be in touch soon.',
  fields: { artist: 'Artist or project', need: 'Looking for', release: 'Release date', link: 'Music link' },
})
