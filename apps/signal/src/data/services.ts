// SIGNAL. disciplines. Confirmed scope: storytelling, strategy, campaigns, content and copy, email and CRM, growth.
// No prices are published; every service ends in "Book a meeting".
export type Service = {
  slug: string
  name: string
  short: string
  long: string
  includes: string[]
  forWho: string
  image: string
  alt: string
}

export const services: Service[] = [
  {
    slug: 'storytelling',
    name: 'Storytelling',
    short: 'The central idea that gives every other part meaning.',
    long: 'We find the true, specific story behind your brand and turn it into a message people can repeat. It becomes the brief for everything else you make.',
    includes: ['Brand story', 'Messaging framework', 'Tone of voice', 'Founder and origin stories'],
    forWho: 'Brands that know they are good at what they do, but struggle to say why it matters.',
    image: 'video-camera',
    alt: 'A camera operator filming in a dark studio lit in red',
  },
  {
    slug: 'strategy',
    name: 'Strategy',
    short: 'The sharp idea, the right audience and the clearest way forward.',
    long: 'Positioning, audience thinking and a marketing plan you can actually follow. We make the hard choices with you, so everything that follows is focused.',
    includes: ['Positioning', 'Audience research', 'Marketing plans', 'Channel strategy'],
    forWho: 'Teams about to launch, grow or change direction who need a plan everyone can follow.',
    image: 'chalkboard',
    alt: 'Two people mapping a brand strategy on a chalkboard wall',
  },
  {
    slug: 'campaigns',
    name: 'Campaigns',
    short: 'One strong thought, carried across every channel that matters.',
    long: 'From launch to always-on, we create campaign ideas and the rollout behind them, with budgets you approve and reporting you can read.',
    includes: ['Campaign concepts', 'Launch plans', 'Paid social', 'Partnerships'],
    forWho: 'Brands with a moment, a season or a goal that deserves more than a few posts.',
    image: 'london-billboard',
    alt: 'Large digital billboards above a busy street corner in London',
  },
  {
    slug: 'content-and-copy',
    name: 'Content and copy',
    short: 'Words and content that sound like one brand, everywhere.',
    long: 'Websites, social, scripts, decks and everyday posts. Clear writing and content systems your team can keep using after we hand over.',
    includes: ['Website copy', 'Social content', 'Video scripts', 'Content calendars'],
    forWho: 'Brands whose voice changes depending on who wrote the last post.',
    image: 'camera-cap',
    alt: 'A photographer smiling as he frames a shot outdoors',
  },
  {
    slug: 'email-and-crm',
    name: 'Email and CRM',
    short: 'Useful journeys that keep people close without clogging their inbox.',
    long: 'Welcome series, newsletters and automated journeys that respect consent and give people a reason to open the next one.',
    includes: ['Newsletters', 'Welcome journeys', 'Audience segments', 'List health'],
    forWho: 'Brands with an audience that finds them once and then forgets them.',
    image: 'sticky-wall',
    alt: 'A team planning a campaign with sticky notes on a glass wall',
  },
  {
    slug: 'growth',
    name: 'Growth',
    short: 'Testing, learning and improving the whole path to yes.',
    long: 'We look at the full journey, from first look to repeat customer, and run practical tests to find what moves people. No guaranteed numbers, just honest work and honest reporting.',
    includes: ['Funnel review', 'Landing pages', 'Experiments', 'Reporting'],
    forWho: 'Brands with attention that does not yet turn into enquiries, sales or sign-ups.',
    image: 'billboard-night',
    alt: 'An empty, lit billboard at a quiet bus stop at night',
  },
]

// Ways to work together. Scope and price are agreed after a meeting.
export const engagements = [
  { name: 'A project', line: 'One clear piece of work with a start and an end, like a brand story, a website rewrite or a launch plan.' },
  { name: 'A campaign', line: 'Idea, rollout and reporting for a launch, a season or a single big moment.' },
  { name: 'A partnership', line: 'An ongoing team for your marketing, month after month, with regular planning and reporting.' },
]
