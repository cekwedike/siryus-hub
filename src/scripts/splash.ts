
    // ===== CONFIGURATION =====
    const TRANSITION_DELAY = 200000; // 200 seconds (allows for ~6 complete loops of all 4 brands)
    const TEXT_DISPLAY_DURATION = 8000; // 8 seconds per text
    const FADE_DURATION = 1500; // 1.5 seconds for fade transitions
    
    // Text rotation options
    const textOptions = [
      { 
        text: 'SIRYUS A.M', 
        subtitle: 'Creative Collective | Marketing | Management', 
        showLetters: true,
        imageDark: '/images/background/siryus-am.png',
        imageLight: '/images/background/siryus-am-light.png'
      },
      { 
        text: 'SIRYUS HUB', 
        subtitle: 'Your Digital Creative Space', 
        showLetters: false,
        imageDark: '/images/background/siryus-hub.jpg',
        imageLight: '/images/background/siryus-hub.jpg'
      },
      { 
        text: 'Siryus Creative Media Ltd', 
        subtitle: 'Where Creativity Meets Strategy', 
        showLetters: false,
        imageDark: '/images/background/siryus-creative-media.png',
        imageLight: '/images/background/siryus-creative-media-light.png'
      },
      { 
        text: 'Siryus Community', 
        subtitle: 'Building Connections & Creativity', 
        showLetters: false,
        imageDark: '/images/background/siryus-community.jpg',
        imageLight: '/images/background/siryus-community.jpg'
      }
    ];

    // ===== DOM ELEMENTS =====
    const rotatingTextEl = document.getElementById('rotatingText');
    const letterAEl = document.getElementById('letterA');
    const letterMEl = document.getElementById('letterM');
    const subtitleEl = document.getElementById('subtitleText');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const progressBar = document.getElementById('progressBar');
    const brandAnnouncement = document.getElementById('brandAnnouncement');

    // ===== STATE =====
    let currentIndex = 0;
    let rotationInterval: ReturnType<typeof setInterval>;
    let autoTransitionTimeout: ReturnType<typeof setTimeout>;
    let hasTransitioned = false;
    let startTime = Date.now();
    let progressInterval: ReturnType<typeof setInterval>;
    let transitionType = 0; // 0 = 3D flip, 1 = blur, 2 = glitch
    let currentLayer = 'before'; // Track which pseudo-element is active

    // ===== THEME MANAGEMENT =====
    const THEMES = {
      DARK: 'dark',
      LIGHT: 'light',
      DEVICE: 'device'
    };

    let currentTheme = localStorage.getItem('theme') || THEMES.DEVICE;

    function getDeviceTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
    }

    // Helper function to get correct image based on current theme
    function getCurrentImage(option: typeof textOptions[number]): string {
      const effectiveTheme = currentTheme === THEMES.DEVICE ? getDeviceTheme() : currentTheme;
      return effectiveTheme === THEMES.LIGHT ? option.imageLight : option.imageDark;
    }

    // Set initial background image
    const initialImage = getCurrentImage(textOptions[0]);
    document.body.style.setProperty('--bg-image-before', `url('${initialImage}')`);
    document.body.style.setProperty('--bg-image-after', `url('${initialImage}')`);

    // Function to update background image with crossfade
    function updateBackgroundImage(imageUrl: string): void {
      if (currentLayer === 'before') {
        // Update the 'after' layer with new image
        document.body.style.setProperty('--bg-image-after', `url('${imageUrl}')`);
        // Fade out 'before', fade in 'after'
        document.body.style.setProperty('--opacity-before', '0');
        document.body.style.setProperty('--opacity-after', '1');
        currentLayer = 'after';
      } else {
        // Update the 'before' layer with new image
        document.body.style.setProperty('--bg-image-before', `url('${imageUrl}')`);
        // Fade out 'after', fade in 'before'
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
      
      // Update active button
      themeButtons.forEach(btn => {
        if ((btn as HTMLElement).dataset.theme === theme) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      
      // Update background image for current option
      const currentOption = textOptions[currentIndex];
      const newImage = getCurrentImage(currentOption);
      updateBackgroundImage(newImage);
    }

    // Initialize theme
    applyTheme(currentTheme);

    // Theme button click handlers
    themeButtons.forEach(btn => {
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

    // Listen for device theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (currentTheme === THEMES.DEVICE) {
        applyTheme(THEMES.DEVICE);
      }
    });

    // ===== TEXT ROTATION LOGIC =====
    function rotateText() {
      // Cycle through transition types
      const transitions = ['', 'blur', 'glitch'];
      const currentTransition = transitions[transitionType % transitions.length];
      
      // Get current option to check if we need to fade out A and M
      const currentOption = textOptions[currentIndex];
      
      // Fade out current text and A/M if they're visible
      rotatingTextEl?.classList.add('fade-out');
      if (currentOption.showLetters) {
        letterAEl?.classList.add('fade-out');
        letterMEl?.classList.add('fade-out');
      }
      if (currentTransition) {
        rotatingTextEl?.classList.add(currentTransition);
      }
      
      setTimeout(() => {
        // Move to next text option
        const nextIndex = (currentIndex + 1) % textOptions.length;
        currentIndex = nextIndex;
        const newOption = textOptions[currentIndex];
        
        // ===== UPDATE ALL CONTENT SIMULTANEOUSLY (while still faded out) =====
        
        // 1. Update background image
        const imageToUse = getCurrentImage(newOption);
        updateBackgroundImage(imageToUse);
        
        // 2. Update text content
        if (rotatingTextEl) rotatingTextEl.textContent = newOption.text;
        
        // 3. Update text size for long company name
        if (newOption.text === 'Siryus Creative Media Ltd') {
          rotatingTextEl?.classList.add('smaller');
        } else {
          rotatingTextEl?.classList.remove('smaller');
        }
        
        // 4. Update subtitle content (without typewriter - will be added on fade-in)
        if (newOption.subtitle && subtitleEl) {
          subtitleEl.textContent = newOption.subtitle;
          subtitleEl.classList.remove('typewriter');
        }
        
        // 5. Update A/M letter visibility
        if (newOption.showLetters) {
          letterAEl?.classList.remove('hidden', 'fade-out');
          letterMEl?.classList.remove('hidden', 'fade-out');
          subtitleEl?.classList.remove('hidden');
        } else {
          letterAEl?.classList.add('hidden');
          letterMEl?.classList.add('hidden');
          subtitleEl?.classList.remove('hidden');
        }
        
        // 6. Announce brand change to screen readers
        if (brandAnnouncement) {
          brandAnnouncement.textContent = `Now showing: ${newOption.text}. ${newOption.subtitle}`;
        }
        
        // Small delay to ensure DOM updates, then fade everything in together
        requestAnimationFrame(() => {
          // Fade in text
          rotatingTextEl?.classList.remove('fade-out', 'blur', 'glitch');
          rotatingTextEl?.classList.add('fade-in');
          if (currentTransition) {
            rotatingTextEl?.classList.add(currentTransition);
          }
          
          // Fade in letters if they should be visible
          if (newOption.showLetters) {
            letterAEl?.classList.add('fade-in');
            letterMEl?.classList.add('fade-in');
          }
          
          // Start typewriter effect on subtitle
          if (newOption.subtitle && subtitleEl) {
            void subtitleEl.offsetWidth; // Trigger reflow
            subtitleEl.classList.add('typewriter');
          }
          
          // Move to next transition type for next rotation
          transitionType++;
          
          // Clean up fade classes after animation completes
          setTimeout(() => {
            rotatingTextEl?.classList.remove('fade-in', 'blur', 'glitch');
            letterAEl?.classList.remove('fade-in');
            letterMEl?.classList.remove('fade-in');
          }, FADE_DURATION);
        });
      }, FADE_DURATION);
    }

    // ===== TRANSITION TO HOME PAGE =====
    function transitionToHome() {
      if (hasTransitioned) return;
      hasTransitioned = true;

      // Clear all intervals and timeouts
      clearInterval(rotationInterval);
      clearInterval(progressInterval);
      clearTimeout(autoTransitionTimeout);
      
      // Save skip preference
      const skipCount = parseInt(localStorage.getItem('splashSkipCount') || '0');
      localStorage.setItem('splashSkipCount', String(skipCount + 1));

      // Enhanced exit animation with particle dispersion effect
      document.body.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      document.body.style.opacity = '0';
      document.body.style.transform = 'scale(0.95)';

      // Navigate to home after fade out
      setTimeout(() => {
        window.location.href = '/home';
      }, 800);
    }
    
    // ===== PROGRESS BAR =====
    function updateProgress() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / TRANSITION_DELAY) * 100, 100);
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    }
    
    // ===== CHECK SKIP PREFERENCE =====
    function checkSkipPreference() {
      const skipCount = parseInt(localStorage.getItem('splashSkipCount') || '0');
      if (skipCount >= 3) {
        const skipPrompt = confirm('You\'ve skipped the splash screen 3 times. Would you like to skip it automatically next time?');
        if (skipPrompt) {
          localStorage.setItem('autoSkipSplash', 'true');
        }
        localStorage.setItem('splashSkipCount', '0');
      }
    }

    // ===== SKIP FUNCTIONALITY =====
    function setupSkipListeners() {
      // Click anywhere to skip
      document.body.addEventListener('click', transitionToHome);
      
      // Press spacebar or Enter to skip (other keys work normally)
      document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault(); // Prevent spacebar scrolling and Enter default behavior
          transitionToHome();
        }
        // All other keys (screenshot, etc.) work normally and do nothing here
      });
    }

    // ===== INITIALIZATION =====
    function init() {
      // Check if user wants to auto-skip
      const autoSkip = localStorage.getItem('autoSkipSplash');
      if (autoSkip === 'true') {
        const userWantsToView = confirm('Skip splash screen automatically? (You can change this by clearing your browser data)');
        if (!userWantsToView) {
          localStorage.removeItem('autoSkipSplash');
        } else {
          transitionToHome();
          return;
        }
      }
      
      // Start text rotation
      rotationInterval = setInterval(rotateText, TEXT_DISPLAY_DURATION);
      
      // Start progress bar
      progressInterval = setInterval(updateProgress, 100);
      
      // Set up auto-transition
      autoTransitionTimeout = setTimeout(() => {
        checkSkipPreference();
        transitionToHome();
      }, TRANSITION_DELAY);
      
      // Set up skip functionality
      setupSkipListeners();

      // Make body focusable for keyboard accessibility
      document.body.setAttribute('tabindex', '0');
      document.body.focus();
      
      // Initial accessibility announcement
      if (brandAnnouncement) {
        brandAnnouncement.textContent = 'Welcome to Siryus Hub. Currently showing: SIRYUS A.M. Creative Collective, Marketing, Management';
      }
    }

    // Start everything when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  