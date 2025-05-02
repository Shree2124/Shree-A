import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Instagram, ArrowDown } from 'lucide-react';

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      observer.disconnect();
    };
  }, []);

  // 3D mouse effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        
        // Calculate position relative to center (in percentage from -50 to 50)
        const x = ((clientX - left) / width - 0.5) * 2 * 25; // Max movement of 25px
        const y = ((clientY - top) / height - 0.5) * 2 * 25;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Parallax effect for title
  useEffect(() => {
    if (!titleRef.current) return;

    const title = titleRef.current;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = title.getBoundingClientRect();
      
      const x = ((clientX - left) / width - 0.5) * 20; // Max shadow distance
      const y = ((clientY - top) / height - 0.5) * 20;
      
      title.style.textShadow = `
        ${x * -0.5}px ${y * -0.5}px 0px rgba(255, 0, 255, 0.3),
        ${x * 0.5}px ${y * 0.5}px 0px rgba(0, 255, 255, 0.3)
      `;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate 3D transform style based on mouse position
  const getTransformStyle = (depth = 1) => {
    const { x, y } = mousePosition;
    return { 
      transform: `translate3d(${x * depth}px, ${y * depth}px, 0)`,
      transition: 'transform 0.2s ease-out'
    };
  };

  return (
    <div className="relative flex flex-col justify-center items-center px-4 pt-16 min-h-screen overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="-top-20 -left-20 absolute bg-blue-500 opacity-10 blur-3xl rounded-full w-96 h-96"
             style={getTransformStyle(0.2)}></div>
        <div className="top-1/3 right-0 absolute bg-purple-500 opacity-10 blur-3xl rounded-full w-96 h-96"
             style={getTransformStyle(0.3)}></div>
        <div className="bottom-0 left-1/4 absolute bg-pink-400 opacity-10 blur-3xl rounded-full w-64 h-64"
             style={getTransformStyle(0.25)}></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={getTransformStyle(0.1)}>
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="z-10 relative w-full max-w-4xl text-center" style={getTransformStyle(0.05)}>
        <h1 
          ref={titleRef}
          className="opacity-0 mb-6 font-bold text-4xl md:text-7xl transition-all duration-300"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px) translateZ(0px)',
          }}
        >
          Hi, I'm <span className="inline-block relative text-gradient hover:scale-110 transition-transform">
            Shree
            <span className="-z-10 absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-lg rounded-full"></span>
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="opacity-0 mx-auto mb-10 max-w-2xl text-slate-600 dark:text-slate-300 text-xl md:text-2xl"
          style={{ animationDelay: '0.3s', ...getTransformStyle(0.1) }}
        >
          A passionate Computer Engineer Student specializing in building exceptional digital experiences
        </p>
        
        <div 
          ref={ctaRef}
          className="opacity-0 mb-16"
          style={{ animationDelay: '0.6s', ...getTransformStyle(0.15) }}
        >
          <button 
            onClick={scrollToAbout}
            className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg px-8 py-3 rounded-full focus:outline-none overflow-hidden font-medium text-white transition-all hover:-translate-y-1 duration-300 transform"
          >
            <span className="z-10 relative">Explore My Work</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-0 bg-white opacity-25 scale-x-0 group-hover:scale-x-100 skew-x-12 origin-left transition-transform duration-500"></span>
          </button>
        </div>
        
        <div 
          ref={socialRef}
          className="flex justify-center space-x-6 opacity-0"
          style={{ animationDelay: '0.9s', ...getTransformStyle(0.2) }}
        >
          <a 
            href="https://github.com/Shree2124" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 hover:scale-125 transition-all duration-300 transform"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/shree-alasande-933934272/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 hover:scale-125 transition-all duration-300 transform"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://www.instagram.com/shreealasande/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 hover:scale-125 transition-all duration-300 transform"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="bottom-10 left-1/2 absolute hover:scale-110 transition-transform -translate-x-1/2 animate-bounce cursor-pointer transform"
        style={getTransformStyle(0.3)}
      >
        <ArrowDown size={28} className="text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 transition-colors" />
      </button>

      {/* CSS Animations */}
      <style jsx>{`
        
      `}</style>
    </div>
  );
};

export default Home;