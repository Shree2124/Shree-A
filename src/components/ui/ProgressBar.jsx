import React, { useEffect, useState } from 'react';

/**
 * Reusable animated progress bar component
 */
const ProgressBar = ({ value = 0, className = '', isVisible = false }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(value);
      }, 200);
      
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [isVisible, value]);

  return (
    <div className={`h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ${className}`}>
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>  
  );
};

export default ProgressBar;