/**
 * Animation utility functions for adding animation classes with delays
 */

/**
 * Applies animation classes to elements with optional delay
 * @param {HTMLElement} element - The DOM element to animate
 * @param {String} animationClass - CSS class for the animation
 * @param {Number} delay - Delay in milliseconds before animation starts
 */
export const animateElement = (element, animationClass, delay = 0) => {
    if (!element) return;
    
    setTimeout(() => {
      element.classList.add(animationClass);
    }, delay);
  };
  
  /**
   * Applies staggered animations to a collection of elements
   * @param {NodeList|Array} elements - Collection of DOM elements 
   * @param {String} animationClass - CSS class for the animation
   * @param {Number} staggerDelay - Delay between each element's animation
   * @param {Number} initialDelay - Delay before the first animation starts
   */
  export const staggerAnimation = (elements, animationClass, staggerDelay = 100, initialDelay = 0) => {
    if (!elements || !elements.length) return;
    
    Array.from(elements).forEach((element, index) => {
      const delay = initialDelay + (index * staggerDelay);
      animateElement(element, animationClass, delay);
    });
  };
  