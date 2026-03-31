import type { ProjectDetail } from './queries'

/** Meta description: excerpt, or first 155 characters of description. */
export function projectMetaDescription(project: ProjectDetail): string {
  const ex = project.excerpt?.trim()
  if (ex) return ex.length > 155 ? `${ex.slice(0, 152)}...` : ex
  const d = project.description.trim()
  return d.length > 155 ? `${d.slice(0, 152)}...` : d
}

/**
 * Local initiative data when Sanity has no project documents.
 * Matches the seed script copy for the three Siryus initiatives.
 */
export const FALLBACK_PROJECTS: ProjectDetail[] = [
  {
    _id: 'fallback-indiba',
    title: 'The Indiba Project Series',
    slug: { current: 'indiba-project-series' },
    category: 'Artist Development',
    projectType: 'Ongoing Initiative',
    year: 'Ongoing',
    status: 'Active',
    featured: true,
    artist: 'SIRYUS A.M',
    publishedAt: null,
    coverImage: null,
    tags: [
      'Artist Development',
      'Mentorship',
      'Collaboration',
      'Pan-African',
      'Music Incubator',
    ],
    excerpt:
      'A music incubator for independent African artists. Collaborative recording, mentorship and structured releases that have already launched real careers across Africa.',
    description:
      'The Indiba Project Series is where independent African artists come to build. Not just music. Careers. Each edition brings together a curated group of rising artists for collaborative recording sessions, direct mentorship, and a structured release campaign with real strategy behind it. Artists who have come through the series include Hidaya Morgan, Max Prodigy, Couronne, Aine Arsene and Chriss D. The series has drawn international recognition including acknowledgment from hip-hop legend Dana Dane.',
    longDescription: null,
    galleryImages: null,
    registrationOpen: false,
    registrationUrl: null,
    registrationButtonText: 'Apply Now',
    registrationClosedText:
      'The Indiba Project Series is not currently open for applications. When the next edition opens, the application link will appear right here. Follow us on Instagram to be the first to know.',
  },
  {
    _id: 'fallback-acoustic',
    title: 'Acoustic Rwanda',
    slug: { current: 'acoustic-rwanda' },
    category: 'Live Performance',
    projectType: 'Seasonal Event',
    year: 'Coming Soon',
    status: 'Coming Soon',
    featured: true,
    artist: 'SIRYUS A.M',
    publishedAt: null,
    coverImage: null,
    tags: ['Live Music', 'Acoustic', 'Rwanda', 'Independent Artists', 'Events', 'Kigali'],
    excerpt:
      'A live music series spotlighting raw unplugged performances from independent artists in intimate venues across Rwanda. Real music, no filters.',
    description:
      'Acoustic Rwanda is a live music experience built around one idea. Strip everything back and let the music speak. No heavy production. No industry politics. Just independent artists, their instruments, and an audience that actually listens. The series will bring intimate unplugged performances to carefully selected venues across Kigali and Rwanda, creating a space where emerging artists can connect with real audiences in the most direct way possible. For artists, it is a platform to perform without the noise. For audiences, it is a chance to discover the next wave of African music before it gets big. Acoustic Rwanda is coming. If you are an artist who wants to perform or a venue interested in hosting, reach out now.',
    longDescription: null,
    galleryImages: null,
    registrationOpen: false,
    registrationUrl: null,
    registrationButtonText: 'Register Interest',
    registrationClosedText:
      'Acoustic Rwanda is not yet open for registrations. Drop your details via our contact page and we will reach out when tickets and artist applications open.',
  },
  {
    _id: 'fallback-abditory',
    title: 'The Abditory Sessions',
    slug: { current: 'the-abditory-sessions' },
    category: 'Content Series',
    projectType: 'Series',
    year: 'Coming Soon',
    status: 'Coming Soon',
    featured: false,
    artist: 'SIRYUS A.M',
    publishedAt: null,
    coverImage: null,
    tags: [
      'Interviews',
      'Storytelling',
      'Independent Artists',
      'Content Series',
      'African Music',
      'Behind the Scenes',
    ],
    excerpt:
      'Deep-dive conversations with independent artists about the journey, the craft, and what it actually takes to build a career in music. Unfiltered and unscripted.',
    description:
      'The Abditory Sessions is a long-form content series dedicated to the stories that do not make it into the press release. Every independent artist has a version of events that is more honest than their bio. The real decisions, the hard periods, the moments that changed everything. That is what The Abditory Sessions is built to capture. Each episode features a single artist in an extended conversation, going deep into their creative process, their career journey, and their perspective on what it means to make music independently in Africa today. No hot takes. No highlight reels. Just the real story. The series is currently in production. If you want to be notified when the first episode drops, follow Siryus on social media or reach out directly.',
    longDescription: null,
    galleryImages: null,
    registrationOpen: false,
    registrationUrl: null,
    registrationButtonText: 'Nominate an Artist',
    registrationClosedText:
      'The Abditory Sessions is in production. If you know an independent artist whose story deserves to be told, send us their name via the contact page.',
  },
]
