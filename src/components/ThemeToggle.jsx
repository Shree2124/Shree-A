// src/components/ThemeToggle.jsx
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="top-24 right-6 z-50 fixed bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 p-2 rounded-full transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;