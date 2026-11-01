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
 * Public fallback copy for SIRYUS initiatives.
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
      'A music incubator for independent African artists. Collaborative recording, mentorship and structured releases. Home of the Indiba Volume album series.',
    description:
      'A music incubator for independent African artists. Collaborative recording, mentorship and structured releases that have already launched real careers across Africa. Home of the Indiba Volume album series.',
    longDescription: null,
    galleryImages: null,
    registrationOpen: false,
    registrationUrl: null,
    registrationButtonText: 'Apply Now',
    registrationClosedText:
      'The Indiba Project Series is not currently open for applications. When the next edition opens, the application link will appear right here. Follow us on Instagram to be the first to know.',
  },
  {
    _id: 'fallback-abditory',
    title: 'The Abditory Sessions',
    slug: { current: 'the-abditory-sessions' },
    category: 'Content Series',
    projectType: 'Historical Series',
    year: 'Historical',
    status: 'Historical',
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
      'The Abditory Sessions is a long-form content series dedicated to the stories that do not make it into the press release. Every independent artist has a version of events that is more honest than their bio. The real decisions, the hard periods, the moments that changed everything. That is what The Abditory Sessions was built to capture. Each episode features a single artist in an extended conversation, going deep into their creative process, their career journey, and their perspective on what it means to make music independently in Africa. No hot takes. No highlight reels. Just the real story. This is a historical SIRYUS initiative. Any future plans are still to be confirmed.',
    longDescription: null,
    galleryImages: null,
    registrationOpen: false,
    registrationUrl: null,
    registrationButtonText: 'Nominate an Artist',
    registrationClosedText:
      'The Abditory Sessions is kept here as a historical SIRYUS initiative. Any future plans are still to be confirmed.',
  },
]
