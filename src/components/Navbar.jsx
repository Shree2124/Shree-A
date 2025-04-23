import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ activeSection, handleNavigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-slate-800 shadow-md py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-4 md:px-6 container">
        <div className="flex items-center">
          <h1 className="font-bold text-gradient text-2xl">Shree's Portfolio</h1>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`font-medium cursor-pointer transition-colors duration-300 hover:text-blue-500 ${
                activeSection === item.id ? 'text-blue-500' : ''
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden top-full left-0 absolute bg-white dark:bg-slate-800 shadow-md py-4 w-full transition-all duration-300">
          <div className="mx-auto px-4 container">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigation(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-3 font-medium transition-colors duration-300 hover:text-blue-500 ${
                  activeSection === item.id ? 'text-blue-500' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;