import React from 'react';

/**
 * Reusable Card component
 */
const Card = ({ children, className = '', noPadding = false, ...props }) => {
  return (
    <div 
      className={`
        bg-white dark:bg-slate-800 
        rounded-xl 
        shadow-lg 
        overflow-hidden 
        transition-all 
        duration-300 
        hover:shadow-xl 
        ${noPadding ? '' : 'p-6'} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;