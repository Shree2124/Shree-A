import { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const titleRef = useRef(null);
  const skillRefs = useRef({
    frontend: null,
    backend: null,
    tools: null,
  });
  
  const [isVisible, setIsVisible] = useState({
    frontend: false,
    backend: false,
    tools: false,
  });

  const skills = {
    frontend: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML & CSS', level: 98 },
      { name: 'Tailwind CSS', level: 90 },
    ],
    backend: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 90 },
      { name: 'Python', level: 80 },
      { name: 'Django', level: 60 },
      { name: 'Flask', level: 75 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
    ],
    tools: [
      { name: 'Git & GitHub', level: 95 },
      { name: 'Postman', level: 80 },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              entry.target.classList.add('fade-in');
            } else if (entry.target === skillRefs.current.frontend) {
              setIsVisible(prev => ({ ...prev, frontend: true }));
              entry.target.classList.add('slide-in-left');
            } else if (entry.target === skillRefs.current.backend) {
              setIsVisible(prev => ({ ...prev, backend: true }));
              entry.target.classList.add('slide-in-right');
            } else if (entry.target === skillRefs.current.tools) {
              setIsVisible(prev => ({ ...prev, tools: true }));
              entry.target.classList.add('bounce-in');
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    Object.values(skillRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      Object.values(skillRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  return (
    <div className="bg-white dark:bg-slate-800 px-4 md:px-6 py-20">
      <div className="mx-auto container">
        <h2 
          ref={titleRef}
          className="opacity-0 mb-12 font-bold text-3xl md:text-4xl text-center"
        >
          My <span className="text-gradient">Skills</span>
        </h2>
        
        <div className="gap-10 grid grid-cols-1 lg:grid-cols-3">
          {/* Frontend Skills */}
          <div 
            ref={el => skillRefs.current.frontend = el}
            className="bg-slate-50 dark:bg-slate-700 opacity-0 shadow-lg p-6 rounded-xl"
          >
            <div className="flex items-center mb-6">
              <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900 mr-4 rounded-full w-12 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl">Frontend</h3>
            </div>
            
            <div className="space-y-4">
              {skills.frontend.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <div 
                      className="skill-progress-value" 
                      style={{ 
                        width: isVisible.frontend ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Backend Skills */}
          <div 
            ref={el => skillRefs.current.backend = el}
            className="bg-slate-50 dark:bg-slate-700 opacity-0 shadow-lg p-6 rounded-xl"
          >
            <div className="flex items-center mb-6">
              <div className="flex justify-center items-center bg-purple-100 dark:bg-purple-900 mr-4 rounded-full w-12 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-xl">Backend</h3>
            </div>
            
            <div className="space-y-4">
              {skills.backend.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <div 
                      className="skill-progress-value" 
                      style={{ 
                        width: isVisible.backend ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools */}
          <div 
            ref={el => skillRefs.current.tools = el}
            className="bg-slate-50 dark:bg-slate-700 opacity-0 shadow-lg p-6 rounded-xl"
          >
            <div className="flex items-center mb-6">
              <div className="flex justify-center items-center bg-green-100 dark:bg-green-900 mr-4 rounded-full w-12 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl">Tools & Others</h3>
            </div>
            
            <div className="space-y-4">
              {skills.tools.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <div 
                      className="skill-progress-value" 
                      style={{ 
                        width: isVisible.tools ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;