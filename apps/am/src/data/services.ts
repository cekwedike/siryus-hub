// SIRYUS A.M services. Scope follows the owner's service list (Annex A of the A.M artist agreement) plus
// distribution and management from the approved brand brief. No prices are published: every service ends
// in "Book a meeting".
export type Service = {
  slug: string
  name: string
  group: 'Release' | 'Grow' | 'Build'
  line: string
  intro: string
  includes: string[]
  forWho: string
  image: string
  alt: string
}

export const services: Service[] = [
  {
    slug: 'distribution',
    name: 'Distribution',
    group: 'Release',
    line: 'Your music on every major platform, set up right.',
    intro: 'We deliver your songs to Spotify, Apple Music, Audiomack, YouTube Music and the other major stores. Titles, credits, artwork and release details are checked with you before anything goes live.',
    includes: ['Delivery to the major streaming and download stores', 'Metadata, credits and artwork checked before release', 'Help claiming your artist profiles', 'Fixes for wrong details, missing songs or takedowns'],
    forWho: 'Independent artists who want a team behind their releases, not just an upload button.',
    image: 'mixer',
    alt: 'A studio mixing console',
  },
  {
    slug: 'release-strategy',
    name: 'Release strategy',
    group: 'Release',
    line: 'A plan for release day and the weeks around it.',
    intro: 'A great song still needs a plan. We pick the right release date, map the rollout, set up your pre-save and tell you exactly what to post and when.',
    includes: ['Release date and rollout timeline', 'Pre-save plan', 'What to post, and when to post it', 'A clear checklist for the weeks before and after release'],
    forWho: 'Artists with a song ready who want release day to count.',
    image: 'condenser-mic',
    alt: 'A studio microphone in black and white',
  },
  {
    slug: 'playlist-pitching',
    name: 'Playlist pitching',
    group: 'Release',
    line: 'Your song in front of the people who choose playlists.',
    intro: 'We prepare and send your Spotify editorial pitch, then reach out to independent curators and our platform contacts. We work hard for every placement, and we will always be honest that no one can promise one.',
    includes: ['Spotify editorial pitch', 'Outreach to independent playlist curators', 'Pitching to other platform contacts', 'A summary of where your song was sent'],
    forWho: 'Artists releasing new music who want it heard beyond their own followers.',
    image: 'heart-hands',
    alt: 'A fan making a heart with their hands at a concert',
  },
  {
    slug: 'content-strategy',
    name: 'Content strategy',
    group: 'Grow',
    line: 'Four weeks of content built around your release.',
    intro: 'We plan what you post around each release: ideas, hooks, captions and a posting calendar, so your audience hears the song more than once and remembers it.',
    includes: ['Four weeks of content ideas', 'Hooks and captions written for you', 'A posting calendar around release day', 'Ideas you can shoot with the gear you have'],
    forWho: 'Artists who know they should post more but are not sure what to post.',
    image: 'production',
    alt: 'A music production workspace with monitors and speakers',
  },
  {
    slug: 'marketing-plans',
    name: 'Marketing plans',
    group: 'Grow',
    line: 'A written plan with a budget you approve.',
    intro: 'We write a full marketing plan for your release with a clear budget breakdown: what the money is for, where it goes and why. Nothing is spent until you say yes.',
    includes: ['A written marketing plan for the release', 'Full budget breakdown for you to approve', 'Channels, timing and goals spelled out', 'Advice on where your money works hardest'],
    forWho: 'Artists ready to put money behind a release and want it spent with care.',
    image: 'crowd-lights',
    alt: 'A concert crowd under coloured stage lights',
  },
  {
    slug: 'campaign-management',
    name: 'Campaign management',
    group: 'Grow',
    line: 'We run your ads and keep you updated every week.',
    intro: 'Once your plan and budget are approved, we run and watch your ad campaigns, adjust what is not working and send you an update every week, with receipts and results at the end.',
    includes: ['Set-up and running of approved ad campaigns', 'Weekly updates while the campaign runs', 'Changes based on what the numbers show', 'Receipts and results when it ends'],
    forWho: 'Artists with an approved budget who want experts running the campaign.',
    image: 'concert',
    alt: 'A crowd facing a brightly lit stage',
  },
  {
    slug: 'artist-branding',
    name: 'Artist branding',
    group: 'Build',
    line: 'A bio, press kit and look that tell your story.',
    intro: 'Press, promoters and playlists decide fast. We write your bio, build your electronic press kit and give direction for your photos, so the first impression is the right one.',
    includes: ['Artist bio, short and long versions', 'Electronic press kit (EPK)', 'Photo direction for your next shoot', 'Guidance on keeping your look consistent'],
    forWho: 'Artists getting ready for press, bookings or a bigger next step.',
    image: 'singer-stage',
    alt: 'A performer singing into a microphone on stage',
  },
  {
    slug: 'career-sessions',
    name: 'Career sessions',
    group: 'Build',
    line: 'One-on-one time on the business of music.',
    intro: 'Bring your questions. A career session is one-on-one time with our team on the music business, your releases or your strategy, with honest answers and next steps you can act on.',
    includes: ['One-on-one session with the SIRYUS A.M team', 'Music business, releases or strategy', 'Honest feedback on where you are now', 'Clear next steps after the call'],
    forWho: 'Any artist who wants straight answers from people who do this every day.',
    image: 'drummer',
    alt: 'A drummer playing at an outdoor event',
  },
  {
    slug: 'artist-management',
    name: 'Artist management',
    group: 'Build',
    line: 'Full management for a small, focused roster.',
    intro: 'For a few artists, we go all the way: direction, planning, partnerships and day-to-day support across the whole career. We keep the roster small so every artist gets real time.',
    includes: ['Career direction and long-term planning', 'Release and campaign leadership', 'Partnerships, bookings and opportunities', 'Day-to-day support from the team'],
    forWho: 'Committed artists building a long career. By conversation and invitation.',
    image: 'singer-stage',
    alt: 'A performer singing into a microphone on stage',
  },
]

export const packages = [
  {
    slug: 'single-release',
    name: 'Single release package',
    line: 'Everything one song needs to land.',
    includes: ['Release strategy and guidance', 'Playlist pitching', 'Content strategy for the release', 'Marketing plan with budget'],
  },
  {
    slug: 'ep-release',
    name: 'EP release package',
    line: 'The full rollout, built for a multi-track project.',
    includes: ['Everything in the single package', 'A longer rollout across the project', 'Focus tracks and pitching per song', 'Content and marketing planned for every stage'],
  },
]

export const groups = ['Release', 'Grow', 'Build'] as const
export const groupLines: Record<(typeof groups)[number], string> = {
  Release: 'Get the music out properly.',
  Grow: 'Help the right listeners find it.',
  Build: 'Grow the artist behind the music.',
}
