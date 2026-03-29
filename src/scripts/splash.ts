import { navigate } from 'astro:transitions/client';

// ===== CONFIGURATION =====
const TRANSITION_DELAY = 28000;
const TEXT_DISPLAY_DURATION = 9000;
const TEXT_DISPLAY_DURATION_REDUCED = 12000;
const FADE_DURATION = 1500;
const FADE_DURATION_REDUCED = 800;

const STORAGE_SOUND = 'splashSoundEnabled';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const textOptions = [
  {
    text: 'SIRYUS A.M',
    subtitle: 'Creative Collective | Marketing | Management',
    imageDark: '/images/background/siryus-am.png',
    imageLight: '/images/background/siryus-am-light.png',
  },
  {
    text: 'SIRYUS HUB',
    subtitle: 'Your Digital Creative Space',
    imageDark: '/images/background/siryus-hub.jpg',
    imageLight: '/images/background/siryus-hub.jpg',
  },
  {
    text: 'Siryus Creative Media Ltd',
    subtitle: 'Where Creativity Meets Strategy',
    imageDark: '/images/background/siryus-creative-media.png',
    imageLight: '/images/background/siryus-creative-media-light.png',
  },
  {
    text: 'Siryus Community',
    subtitle: 'Building Connections & Creativity',
    imageDark: '/images/background/siryus-community.jpg',
    imageLight: '/images/background/siryus-community.jpg',
  },
];

const rotatingTextEl = document.getElementById('rotatingText');
const subtitleEl = document.getElementById('subtitleText');
const themeButtons = document.querySelectorAll('.theme-btn');
const progressBar = document.getElementById('progressBar');
const brandAnnouncement = document.getElementById('brandAnnouncement');
const soundToggle = document.getElementById('soundToggle');

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

function syncSoundToggle(): void {
  const on = localStorage.getItem(STORAGE_SOUND) === 'true';
  soundToggle?.setAttribute('aria-pressed', on ? 'true' : 'false');
  soundToggle?.classList.toggle('sound-enabled', on);
}

function playExitChime(): void {
  if (localStorage.getItem(STORAGE_SOUND) !== 'true') return;
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    ctx.resume().then(() => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.connect(g);
      g.connect(ctx.destination);
      const t0 = ctx.currentTime;
      o.frequency.setValueAtTime(523.25, t0);
      o.frequency.exponentialRampToValueAtTime(1046.5, t0 + 0.12);
      g.gain.setValueAtTime(0.06, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);
      o.start(t0);
      o.stop(t0 + 0.23);
    });
  } catch {
    /* ignore */
  }
}

soundToggle?.addEventListener('click', (e) => {
  e.stopPropagation();
  const next = localStorage.getItem(STORAGE_SOUND) !== 'true';
  localStorage.setItem(STORAGE_SOUND, next ? 'true' : 'false');
  syncSoundToggle();
});

syncSoundToggle();

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

    if (newOption.text === 'Siryus Creative Media Ltd') {
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

function transitionToHome() {
  if (hasTransitioned) return;
  hasTransitioned = true;

  clearInterval(rotationInterval);
  clearInterval(progressInterval);
  clearTimeout(autoTransitionTimeout);

  const skipCount = parseInt(localStorage.getItem('splashSkipCount') || '0');
  localStorage.setItem('splashSkipCount', String(skipCount + 1));

  playExitChime();

  document.body.style.transition = 'opacity 0.75s cubic-bezier(0.33, 1, 0.68, 1), transform 0.75s cubic-bezier(0.33, 1, 0.68, 1)';
  document.body.style.opacity = '0';
  document.body.style.transform = 'scale(0.98)';

  globalThis.setTimeout(() => {
    void navigate('/home').catch(() => {
      window.location.href = '/home';
    });
  }, 750);
}

function updateProgress() {
  const elapsed = Date.now() - startTime;
  const progress = Math.min((elapsed / TRANSITION_DELAY) * 100, 100);
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

function checkSkipPreference() {
  const skipCount = parseInt(localStorage.getItem('splashSkipCount') || '0');
  if (skipCount >= 3) {
    const skipPrompt = confirm(
      "You've skipped the splash screen a few times. Skip it automatically next visit?",
    );
    if (skipPrompt) {
      localStorage.setItem('autoSkipSplash', 'true');
    }
    localStorage.setItem('splashSkipCount', '0');
  }
}

function setupSkipListeners() {
  document.body.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el.closest('[data-splash-interactive]')) return;
    transitionToHome();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      const el = e.target as HTMLElement;
      if (el.closest('[data-splash-interactive]')) return;
      e.preventDefault();
      transitionToHome();
    }
  });
}

function init() {
  if (prefersReducedMotion()) {
    document.body.classList.add('splash-reduced-motion');
  }

  setRotatingHeadline(textOptions[0].text);

  const autoSkip = localStorage.getItem('autoSkipSplash');
  if (autoSkip === 'true') {
    const userWantsToView = confirm('Skip splash screen automatically? (Clear site data to change this.)');
    if (!userWantsToView) {
      localStorage.removeItem('autoSkipSplash');
    } else {
      transitionToHome();
      return;
    }
  }

  const textInterval = prefersReducedMotion() ? TEXT_DISPLAY_DURATION_REDUCED : TEXT_DISPLAY_DURATION;
  rotationInterval = globalThis.setInterval(rotateText, textInterval);
  progressInterval = globalThis.setInterval(updateProgress, 100);
  autoTransitionTimeout = globalThis.setTimeout(() => {
    checkSkipPreference();
    transitionToHome();
  }, TRANSITION_DELAY);

  setupSkipListeners();

  document.body.setAttribute('tabindex', '0');
  document.body.focus();

  if (brandAnnouncement) {
    brandAnnouncement.textContent =
      'Welcome to Siryus Hub. Currently showing: SIRYUS A.M. Creative Collective, Marketing, Management';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
