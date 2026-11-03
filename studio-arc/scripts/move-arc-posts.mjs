// One-off: copy the five ARC. articles from the A.M dataset (h16wl0pr) into ARC.'s own dataset, re-uploading
// their images. Safe to re-run: documents and images that already exist are skipped.
// Run from studio-arc/: npx sanity exec scripts/move-arc-posts.mjs --with-user-token
import { getCliClient } from 'sanity/cli'

const arc = getCliClient({ apiVersion: '2024-01-01' })
const slugs = [
  'monetizing-creativity-earn-living-passion',
  'mastering-time-management-for-creatives',
  'building-an-online-portfolio-that-pops',
  'building-your-brand-as-a-creative',
  'collaboration-in-creative-industries',
]

const url = new URL('https://h16wl0pr.api.sanity.io/v2024-01-01/data/query/production')
url.searchParams.set('query', '*[_type == "blogPost" && slug.current in $slugs]')
url.searchParams.set('$slugs', JSON.stringify(slugs))
const posts = (await (await fetch(url)).json()).result
console.log('found', posts.length, 'posts in the A.M dataset')

const assetMap = new Map()
async function moveAsset(ref) {
  if (assetMap.has(ref)) return assetMap.get(ref)
  const [, hash, dims, ext] = ref.split('-')
  const res = await fetch(`https://cdn.sanity.io/images/h16wl0pr/production/${hash}-${dims}.${ext}`)
  if (!res.ok) throw new Error(`could not download ${ref}`)
  const asset = await arc.assets.upload('image', Buffer.from(await res.arrayBuffer()), { filename: `${hash}.${ext}` })
  assetMap.set(ref, asset._id)
  return asset._id
}

// Walk the document and swap every image asset reference for the uploaded copy.
async function rewrite(value) {
  if (Array.isArray(value)) return Promise.all(value.map(rewrite))
  if (value && typeof value === 'object') {
    const out = {}
    for (const [key, v] of Object.entries(value)) {
      if (key === 'asset' && v?._ref?.startsWith('image-')) out[key] = { _type: 'reference', _ref: await moveAsset(v._ref) }
      else out[key] = await rewrite(v)
    }
    return out
  }
  return value
}

for (const post of posts) {
  const existing = await arc.fetch('*[_type == "blogPost" && slug.current == $slug][0]._id', { slug: post.slug.current })
  if (existing) {
    console.log('skip (already in ARC.):', post.slug.current)
    continue
  }
  const { _rev, _createdAt, _updatedAt, showOnAm, ...rest } = post
  const doc = await rewrite(rest)
  await arc.createIfNotExists(doc)
  console.log('copied:', post.slug.current)
}
console.log('images uploaded:', assetMap.size)
