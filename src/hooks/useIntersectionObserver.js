import { useEffect, useState } from 'react';

/**
 * Custom hook to detect when an element is visible in the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {Number} options.threshold - A number between 0 and 1 indicating the percentage of the element that needs to be visible
 * @param {String|Element} options.root - The element that is used as the viewport for checking visibility
 * @param {String} options.rootMargin - Margin around the root
 * @returns {[React.RefObject, boolean]} - A tuple with the ref to attach to the element and a boolean indicating if it's in view
 */
export const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
      });

      observer.observe(ref);

      return () => {
        observer.unobserve(ref);
        observer.disconnect();
      };
    }
  }, [ref, options.threshold, options.root, options.rootMargin]);

  return [setRef, isVisible];
};