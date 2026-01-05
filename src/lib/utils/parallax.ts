/**
 * Parallax scroll utilities for smooth, performant scroll-based animations
 */

export interface ParallaxOptions {
  /**
   * Element to apply parallax effect to
   */
  element: HTMLElement;
  
  /**
   * Speed multiplier (0-1 for slower than scroll, >1 for faster)
   * @default 0.5
   */
  speed?: number;
  
  /**
   * Direction of parallax effect
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';
  
  /**
   * Start offset in viewport height (0-1)
   * @default 0
   */
  startOffset?: number;
  
  /**
   * End offset in viewport height (0-1)
   * @default 1
   */
  endOffset?: number;
}

export interface FadeInOptions {
  /**
   * Element to fade in
   */
  element: HTMLElement;
  
  /**
   * Threshold (0-1) when to trigger fade
   * @default 0.2
   */
  threshold?: number;
  
  /**
   * Delay in milliseconds
   * @default 0
   */
  delay?: number;
  
  /**
   * Direction of slide animation
   */
  slideDirection?: 'up' | 'down' | 'left' | 'right' | 'none';
  
  /**
   * Distance to slide in pixels
   * @default 30
   */
  slideDistance?: number;
}

/**
 * Creates a parallax scroll effect on an element
 */
export function createParallax(options: ParallaxOptions): () => void {
  const {
    element,
    speed = 0.5,
    direction = 'vertical',
    startOffset = 0,
    endOffset = 1,
  } = options;
  
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress (0-1)
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const startPoint = viewportHeight * startOffset;
        const endPoint = viewportHeight * endOffset;
        
        const scrollProgress = Math.max(
          0,
          Math.min(1, (startPoint - elementTop) / (startPoint + elementHeight - endPoint))
        );
        
        // Apply parallax transform
        const translateValue = scrollProgress * speed * 100;
        
        if (direction === 'vertical') {
          element.style.transform = `translate3d(0, ${translateValue}px, 0)`;
        } else {
          element.style.transform = `translate3d(${translateValue}px, 0, 0)`;
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  };
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial call
  handleScroll();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Creates a fade-in effect when element enters viewport
 */
export function createFadeIn(options: FadeInOptions): () => void {
  const {
    element,
    threshold = 0.2,
    delay = 0,
    slideDirection = 'up',
    slideDistance = 30,
  } = options;
  
  // Set initial state
  element.style.opacity = '0';
  element.style.transition = `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`;
  
  // Set initial transform based on slide direction
  const initialTransforms: Record<string, string> = {
    up: `translateY(${slideDistance}px)`,
    down: `translateY(-${slideDistance}px)`,
    left: `translateX(${slideDistance}px)`,
    right: `translateX(-${slideDistance}px)`,
    none: 'translateY(0)',
  };
  
  element.style.transform = initialTransforms[slideDirection];
  
  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
          }, delay);
          
          // Unobserve after animating
          observer.unobserve(element);
        }
      });
    },
    {
      threshold,
      rootMargin: '0px',
    }
  );
  
  observer.observe(element);
  
  // Return cleanup function
  return () => {
    observer.disconnect();
  };
}

/**
 * Creates multiple parallax layers with different speeds
 */
export function createParallaxLayers(layers: ParallaxOptions[]): () => void {
  const cleanupFunctions = layers.map(createParallax);
  
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
}

/**
 * Creates staggered fade-in effects for multiple elements
 */
export function createStaggeredFadeIn(
  elements: HTMLElement[],
  baseOptions: Omit<FadeInOptions, 'element' | 'delay'>,
  staggerDelay: number = 100
): () => void {
  const cleanupFunctions = elements.map((element, index) =>
    createFadeIn({
      ...baseOptions,
      element,
      delay: index * staggerDelay,
    })
  );
  
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
}

/**
 * Smooth scroll to element with offset
 */
export function scrollToElement(
  element: HTMLElement | string,
  offset: number = 80
): void {
  const targetElement =
    typeof element === 'string'
      ? document.querySelector<HTMLElement>(element)
      : element;
  
  if (!targetElement) return;
  
  const targetPosition = targetElement.offsetTop - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}
