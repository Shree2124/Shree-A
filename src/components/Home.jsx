import { useEffect, useRef } from 'react';
import { Github, Linkedin, Instagram, ArrowDown } from 'lucide-react';

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    if (socialRef.current) observer.observe(socialRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
      if (socialRef.current) observer.unobserve(socialRef.current);
    };
  }, []);

  const scrollToProject = () => {
    const aboutSection = document.getElementById('projects');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 pt-16 min-h-screen">
      <div className="w-full max-w-4xl text-center">
        <h1 
          ref={titleRef}
          className="opacity-0 mb-6 font-bold text-4xl md:text-6xl"
        >
          Hi, I'm <span className="text-gradient">Shree</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="opacity-0 mx-auto mb-10 max-w-2xl text-slate-600 dark:text-slate-300 text-xl md:text-2xl"
          style={{ animationDelay: '0.3s' }}
        >
          A passionate Computer Engineer Student specializing in building exceptional digital experiences
        </p>

        <div 
          ref={ctaRef}
          className="opacity-0 mb-16"
          style={{ animationDelay: '0.6s' }}
        >
          <button 
            onClick={scrollToProject}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg px-8 py-3 rounded-full focus:outline-none font-medium text-white transition hover:-translate-y-1 cursor-pointer transform"
          >
            Explore My Work
          </button>
        </div>

        <div 
          ref={socialRef}
          className="flex justify-center space-x-6 opacity-0"
          style={{ animationDelay: '0.9s' }}
        >
          <a href="https://github.com/Shree2124" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 transition-colors">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/shree-alasande-933934272/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="https://www.instagram.com/shreealasande/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 transition-colors">
            <Instagram size={24} />
          </a>
        </div>
      </div>

      <button 
        onClick={scrollToAbout}
        className="bottom-10 left-1/2 absolute -translate-x-1/2 animate-bounce cursor-pointer cursor-pointer transform"
      >
        <ArrowDown size={24} />
      </button>
    </div>
  );
};

export default Home;