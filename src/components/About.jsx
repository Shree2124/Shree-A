import { useEffect, useRef, useState } from 'react';
import { Code, Book, User } from 'lucide-react';
import shree from '../assets/projects/shree.jpg'; 

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  const cardRef = useRef(null);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;
      
      setMousePosition({
        x: ((x / rect.width) - 0.5) * 20, // Scale the effect
        y: ((y / rect.height) - 0.5) * -20 // Invert Y for natural tilt
      });
    }
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target === sectionRef.current) {
              setIsVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (bioRef.current) observer.observe(bioRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (bioRef.current) observer.unobserve(bioRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  const stats = [
    { label: "Courses Completed", value: "20+" },
    { label: "Learning Hours", value: "1000+" },
    { label: "Academic Projects", value: "8+" },
    { label: "Cups of Coffee", value: "∞" },
  ];

  return (
    <section id="about" ref={sectionRef} className="bg-gradient-to-b from-white dark:from-slate-900 to-slate-50 dark:to-slate-800 py-24 perspective-1000">
      <div className="mx-auto px-4 max-w-6xl">
        <h2 
          ref={titleRef}
          className="opacity-0 hover:text-shadow-3d mb-16 font-bold text-3xl md:text-4xl text-center transition-all duration-300"
        >
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2 mb-20">
          {/* Image with 3D floating animation */}
          <div 
            ref={imageRef}
            className="relative order-1 lg:order-1 opacity-0 mx-auto lg:mx-0"
            style={{ animationDelay: '0.3s' }}
          >
            <div 
              ref={cardRef}
              className="relative mx-auto w-64 md:w-80 h-64 md:h-80 transform-gpu transition-transform duration-200 ease-out"
              style={{ 
                transform: `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* 3D layered background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 rounded-full animate-pulse" 
                style={{ transform: 'translateZ(-20px)' }}></div>
              
              {/* Profile image with 3D depth */}
              <div className="floating absolute inset-4 shadow-xl border-4 border-white dark:border-slate-700 rounded-full overflow-hidden"
                style={{ transform: 'translateZ(40px)' }}>
                <img 
                  src={shree}
                  alt="Shree Alasande" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badges with 3D layering */}
              <div className="-top-4 -right-4 floating-slow absolute flex justify-center items-center bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-full w-16 h-16"
                style={{ transform: 'translateZ(60px)' }}>
                <Code size={24} className="text-blue-500" />
              </div>
              
              <div className="-bottom-4 -left-4 floating-reverse absolute flex justify-center items-center bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-full w-16 h-16"
                style={{ transform: 'translateZ(60px)' }}>
                <Book size={24} className="text-purple-500" />
              </div>
            </div>
          </div>

          {/* Bio content with 3D card effect */}
          <div 
            ref={bioRef}
            className="order-2 lg:order-2 bg-white/5 opacity-0 hover:shadow-3d backdrop-blur-sm p-6 rounded-xl transform-gpu transition-all hover:-translate-y-2 duration-300"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="typing-container">
              <div className="text-shadow-3d typing-effect">Shree Alasande</div>
              <div className="typing-effect-slow">Computer Engineering Student</div>
            </div>
            
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              I'm a passionate Computer Engineering student with a love for creating exceptional digital experiences. My journey in tech began with a curiosity about how digital systems work, which evolved into a deep passion for software development.
            </p>
            
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              I'm currently focused on expanding my knowledge in web development technologies like React, Node.js, and cloud computing. I'm also interested in machine learning and how it can be integrated with web applications to create intelligent systems.
            </p>

            <div className="flex items-center mb-8 hover:scale-105 transition-transform transform">
              <div className="bg-blue-100 dark:bg-slate-700 shadow-inner mr-4 p-2 rounded-full">
                <User className="text-blue-500" />
              </div>
              <blockquote className="pl-4 border-blue-500 border-l-4 text-slate-600 dark:text-slate-400 italic">
                "I believe in continuous learning and turning complex problems into elegant solutions."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Stats section with 3D hover effects */}
        {/* <div 
          ref={statsRef}
          className="gap-4 grid grid-cols-2 md:grid-cols-4 opacity-0 mb-20"
          style={{ animationDelay: '0.9s' }}
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/30 dark:bg-slate-800/40 shadow-md hover:shadow-3d hover:shadow-lg backdrop-blur-sm p-6 border border-slate-200 dark:border-slate-700 rounded-lg text-center transition-all hover:-translate-y-2 duration-300 transform"
            >
              <h3 className="mb-2 font-bold text-gradient text-3xl counter">{stat.value}</h3>
              <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

// Add these styles to your global CSS file


export default About;