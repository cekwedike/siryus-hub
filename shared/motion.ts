// Shared motion for the SIRYUS brand sites. Every effect is progressive: without JavaScript, or with
// prefers-reduced-motion, content is simply shown. Each site styles the states in its own CSS:
//   html.js [data-reveal]         hidden until it scrolls in, then gets .in
//   [data-split]                  headline split into .w word spans with --i for stagger
//   [data-speed="0.2"]            parallax: translateY by scroll distance * speed
//   [data-scrub]                  receives --p (0 to 1) as it crosses the viewport
//   [data-preview] + data-img     list rows that show a floating image following the cursor

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
const root = document.documentElement
root.classList.add('js')

// Split headlines into words, keeping nested elements (like a coloured dot) intact.
document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
  let i = 0
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/)
        const frag = document.createDocumentFragment()
        for (const part of parts) {
          if (!part) continue
          if (/^\s+$/.test(part)) frag.append(part)
          else {
            const w = document.createElement('span')
            w.className = 'w'
            w.style.setProperty('--i', String(i++))
            const inner = document.createElement('span')
            inner.textContent = part
            w.append(inner)
            frag.append(w)
          }
        }
        child.replaceWith(frag)
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as HTMLElement).matches('br, .keep')) {
        walk(child)
      }
    }
  }
  walk(el)
  el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() ?? '')
})

// Reveal on scroll. Reduced motion reveals everything at once.
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split]')
if (reduce || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('in'))
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  revealables.forEach((el) => io.observe(el))
}

// Parallax and scroll scrubbing share one rAF loop that only runs while scrolling.
const layers = [...document.querySelectorAll<HTMLElement>('[data-speed]')]
const scrubs = [...document.querySelectorAll<HTMLElement>('[data-scrub]')]
if (!reduce && (layers.length || scrubs.length)) {
  let ticking = false
  const update = () => {
    ticking = false
    const vh = innerHeight
    for (const el of layers) {
      const box = (el.parentElement ?? el).getBoundingClientRect()
      if (box.bottom < -200 || box.top > vh + 200) continue
      const offset = (box.top + box.height / 2 - vh / 2) * Number(el.dataset.speed)
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
    for (const el of scrubs) {
      const box = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (vh - box.top) / (vh + box.height)))
      el.style.setProperty('--p', p.toFixed(3))
    }
  }
  const request = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }
  addEventListener('scroll', request, { passive: true })
  addEventListener('resize', request)
  update()
}

// Floating preview image for hover lists, on devices with a precise pointer only.
if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll<HTMLElement>('[data-preview]').forEach((list) => {
    const frame = document.createElement('div')
    frame.className = 'preview'
    frame.setAttribute('aria-hidden', 'true')
    const img = document.createElement('img')
    img.alt = ''
    frame.append(img)
    list.append(frame)
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0
    const follow = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      frame.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(follow)
      else raf = 0
    }
    list.querySelectorAll<HTMLElement>('[data-img]').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        img.src = row.dataset.img!
        frame.classList.add('on')
      })
      row.addEventListener('mouseleave', () => frame.classList.remove('on'))
    })
    list.addEventListener('mousemove', (e) => {
      const box = list.getBoundingClientRect()
      tx = e.clientX - box.left
      ty = e.clientY - box.top
      if (!raf) raf = requestAnimationFrame(follow)
    })
  })
}
