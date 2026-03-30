// ===== CONFIGURATION =====
const TRANSITION_DELAY = 28000;
const TEXT_DISPLAY_DURATION = 9000;
const TEXT_DISPLAY_DURATION_REDUCED = 12000;
const FADE_DURATION = 1500;
const FADE_DURATION_REDUCED = 800;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const textOptions = [
  {
    text: 'SIRYUS A.M',
    subtitle: 'Artist Management. Creative Production.',
    imageDark: '/images/background/siryus-am.png',
    imageLight: '/images/background/siryus-am-light.png',
  },
  {
    text: 'SIRYUS HUB',
    subtitle: 'The Platform. Drops, Tools, Stories.',
    imageDark: '/images/background/siryus-hub.jpg',
    imageLight: '/images/background/siryus-hub.jpg',
  },
  {
    text: 'SIRYUS COMMUNITY',
    subtitle: 'Meet People. Start Things. Keep Moving.',
    imageDark: '/images/background/siryus-community.jpg',
    imageLight: '/images/background/siryus-community.jpg',
  },
  {
    text: 'SIRYUS CREATIVE',
    subtitle: 'Art Meets Strategy. Always.',
    imageDark: '/images/background/siryus-creative-media.png',
    imageLight: '/images/background/siryus-creative-media-light.png',
  },
];

const rotatingTextEl = document.getElementById('rotatingText');
const subtitleEl = document.getElementById('subtitleText');
const themeButtons = document.querySelectorAll('.theme-btn');
const progressBar = document.getElementById('progressBar');
const brandAnnouncement = document.getElementById('brandAnnouncement');

let currentIndex = 0;
let rotationInterval: ReturnType<typeof setInterval>;
let autoTransitionTimeout: ReturnType<typeof setTimeout>;
let hasTransitioned = false;
let startTime = Date.now();
let progressInterval: ReturnType<typeof setInterval>;
let transitionType = 0;
let currentLayer = 'before';

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
  DEVICE: 'device',
};

let currentTheme = localStorage.getItem('theme') || THEMES.DEVICE;

function navigateToHome() {
  if (hasTransitioned) return;
  hasTransitioned = true;
  clearInterval(rotationInterval);
  clearInterval(progressInterval);
  clearTimeout(autoTransitionTimeout);
  window.location.href = '/home';
}

function getFadeDuration(): number {
  return prefersReducedMotion() ? FADE_DURATION_REDUCED : FADE_DURATION;
}

function getTransitionVariants(): string[] {
  return prefersReducedMotion() || document.body.classList.contains('splash-reduced-motion')
    ? ['']
    : ['', 'blur', 'glitch'];
}

/** Headlines that start with "SIRYUS " get a split wordmark; others stay plain. */
function setRotatingHeadline(text: string): void {
  if (!rotatingTextEl) return;
  if (text.startsWith('SIRYUS ')) {
    const suffix = text.slice(7);
    rotatingTextEl.innerHTML = `<span class="logo-word">SIRYUS</span><span class="logo-suffix"> ${suffix}</span>`;
  } else {
    rotatingTextEl.textContent = text;
  }
}

function getDeviceTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
}

function getCurrentImage(option: (typeof textOptions)[number]): string {
  const effectiveTheme = currentTheme === THEMES.DEVICE ? getDeviceTheme() : currentTheme;
  return effectiveTheme === THEMES.LIGHT ? option.imageLight : option.imageDark;
}

const initialImage = getCurrentImage(textOptions[0]);
document.body.style.setProperty('--bg-image-before', `url('${initialImage}')`);
document.body.style.setProperty('--bg-image-after', `url('${initialImage}')`);

function updateBackgroundImage(imageUrl: string): void {
  if (currentLayer === 'before') {
    document.body.style.setProperty('--bg-image-after', `url('${imageUrl}')`);
    document.body.style.setProperty('--opacity-before', '0');
    document.body.style.setProperty('--opacity-after', '1');
    currentLayer = 'after';
  } else {
    document.body.style.setProperty('--bg-image-before', `url('${imageUrl}')`);
    document.body.style.setProperty('--opacity-before', '1');
    document.body.style.setProperty('--opacity-after', '0');
    currentLayer = 'before';
  }
}

function applyTheme(theme: string): void {
  const effectiveTheme = theme === THEMES.DEVICE ? getDeviceTheme() : theme;

  if (effectiveTheme === THEMES.LIGHT) {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }

  themeButtons.forEach((btn) => {
    if ((btn as HTMLElement).dataset.theme === theme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const currentOption = textOptions[currentIndex];
  const newImage = getCurrentImage(currentOption);
  updateBackgroundImage(newImage);
}

applyTheme(currentTheme);

themeButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const theme = (btn as HTMLElement).dataset.theme;
    if (theme) {
      currentTheme = theme;
      localStorage.setItem('theme', currentTheme);
      applyTheme(currentTheme);
    }
  });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (currentTheme === THEMES.DEVICE) {
    applyTheme(THEMES.DEVICE);
  }
});

function rotateText() {
  const transitions = getTransitionVariants();
  const currentTransition = transitions[transitionType % transitions.length];
  const currentOption = textOptions[currentIndex];
  const fd = getFadeDuration();

  rotatingTextEl?.classList.add('fade-out');
  if (currentTransition) {
    rotatingTextEl?.classList.add(currentTransition);
  }

  globalThis.setTimeout(() => {
    const nextIndex = (currentIndex + 1) % textOptions.length;
    currentIndex = nextIndex;
    const newOption = textOptions[currentIndex];

    const imageToUse = getCurrentImage(newOption);
    updateBackgroundImage(imageToUse);

    setRotatingHeadline(newOption.text);

    if (newOption.text === 'SIRYUS COMMUNITY' || newOption.text === 'SIRYUS CREATIVE') {
      rotatingTextEl?.classList.add('smaller');
    } else {
      rotatingTextEl?.classList.remove('smaller');
    }

    if (newOption.subtitle && subtitleEl) {
      subtitleEl.textContent = newOption.subtitle;
    }

    if (brandAnnouncement) {
      brandAnnouncement.textContent = `Now showing: ${newOption.text}. ${newOption.subtitle}`;
    }

    requestAnimationFrame(() => {
      rotatingTextEl?.classList.remove('fade-out', 'blur', 'glitch');
      rotatingTextEl?.classList.add('fade-in');
      if (currentTransition) {
        rotatingTextEl?.classList.add(currentTransition);
      }

      transitionType++;

      globalThis.setTimeout(() => {
        rotatingTextEl?.classList.remove('fade-in', 'blur', 'glitch');
      }, fd);
    });
  }, fd);
}

function updateProgress() {
  const elapsed = Date.now() - startTime;
  const progress = Math.min((elapsed / TRANSITION_DELAY) * 100, 100);
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

function setupSkipListeners() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-splash-interactive]')) return;
    navigateToHome();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement;
      if (target.closest('[data-splash-interactive]')) return;
      navigateToHome();
    }
  });
}

function init() {
  if (prefersReducedMotion()) {
    document.body.classList.add('splash-reduced-motion');
  }

  setRotatingHeadline(textOptions[0].text);

  const textInterval = prefersReducedMotion() ? TEXT_DISPLAY_DURATION_REDUCED : TEXT_DISPLAY_DURATION;
  rotationInterval = globalThis.setInterval(rotateText, textInterval);
  progressInterval = globalThis.setInterval(updateProgress, 100);
  autoTransitionTimeout = globalThis.setTimeout(() => {
    navigateToHome();
  }, TRANSITION_DELAY);

  setupSkipListeners();

  document.body.setAttribute('tabindex', '0');
  document.body.focus();

  if (brandAnnouncement) {
    brandAnnouncement.textContent =
      'Welcome to Siryus Hub. Showing SIRYUS A.M. Artist Management. Creative Production.';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
