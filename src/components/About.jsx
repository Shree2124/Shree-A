import { useEffect, useRef, useState } from 'react';
import { Code, Book, User } from 'lucide-react';
import shree from '../assets/projects/shree.jpg'; 

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

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
    <section id="about" ref={sectionRef} className="bg-gradient-to-b from-white dark:from-slate-900 to-slate-50 dark:to-slate-800 py-24">
      <div className="mx-auto px-4 max-w-6xl">
        <h2 
          ref={titleRef}
          className="opacity-0 mb-16 font-bold text-3xl md:text-4xl text-center"
        >
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2 mb-20">
          {/* Image with floating animation */}
          <div 
            ref={imageRef}
            className="relative order-1 lg:order-1 opacity-0 mx-auto lg:mx-0"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="relative mx-auto w-64 md:w-80 h-64 md:h-80">
              {/* Decorative background circle */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 rounded-full animate-pulse"></div>
              
              {/* Profile image */}
              <div className="floating absolute inset-4 shadow-xl border-4 border-white dark:border-slate-700 rounded-full overflow-hidden">
                <img 
                  src={shree}
                  alt="Shree Alasande" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badges */}
              <div className="-top-4 -right-4 floating-slow absolute flex justify-center items-center bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-full w-16 h-16">
                <Code size={24} className="text-blue-500" />
              </div>
              
              <div className="-bottom-4 -left-4 floating-reverse absolute flex justify-center items-center bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-full w-16 h-16">
                <Book size={24} className="text-purple-500" />
              </div>
            </div>
          </div>

          {/* Bio content */}
          <div 
            ref={bioRef}
            className="order-2 lg:order-2 opacity-0"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="typing-container">
              <div className="typing-effect">Shree Alasande</div>
              <div className="typing-effect-slow">Computer Engineering Student</div>
            </div>
            
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              I'm a passionate Computer Engineering student with a love for creating exceptional digital experiences. My journey in tech began with a curiosity about how digital systems work, which evolved into a deep passion for software development.
            </p>
            
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              I'm currently focused on expanding my knowledge in web development technologies like React, Node.js, and cloud computing. I'm also interested in machine learning and how it can be integrated with web applications to create intelligent systems.
            </p>

            <div className="flex items-center mb-8">
              <div className="bg-blue-100 dark:bg-slate-700 mr-4 p-2 rounded-full">
                <User className="text-blue-500" />
              </div>
              <blockquote className="pl-4 border-blue-500 border-l-4 text-slate-600 dark:text-slate-400 italic">
                "I believe in continuous learning and turning complex problems into elegant solutions."
              </blockquote>
            </div>
            
            {/* <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg px-8 py-3 rounded-full focus:outline-none font-medium text-white transition hover:-translate-y-1 transform">
              Download Resume
            </button> */}
          </div>
        </div>

        {/* Stats section */}
        <div 
          ref={statsRef}
          className="gap-4 grid grid-cols-2 md:grid-cols-4 opacity-0 mb-20"
          style={{ animationDelay: '0.9s' }}
        >
          {/* {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg p-6 border border-slate-200 dark:border-slate-700 rounded-lg text-center transition"
            >
              <h3 className="mb-2 font-bold text-gradient text-3xl counter">{stat.value}</h3>
              <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default About;