import { useEffect, useRef, useState } from 'react';
import { Briefcase } from 'lucide-react';
import Hex from "../assets/projects/Hex.png"
import ngo from "../assets/projects/wechange.png"
import success from "../assets/projects/successdotai.jpeg"

const ExperienceTimeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemRefs = useRef([]);

  const experiences = [
    {
      title: "Software Developer Intern",
      company: "Hexaware Technologies",
      period: "Feb 2025 - June 2025",
      description: "Contributed to full-stack development of intelligent web applications using Python frameworks such as Django and FastAPI. Developed RESTful APIs, implemented machine learning models using libraries like scikit-learn and TensorFlow, and integrated data pipelines with Pandas and NumPy. Designed responsive user interfaces with HTML, CSS, and templating engines like Jinja2. Improved user engagement by 40% through data-driven features and personalized content delivery. Actively participated in agile ceremonies including sprint planning, stand-ups, and code reviews.",
      imageSrc: Hex,
      imageAlt: "Web Development Project"
    },
    {
      title: "Full Stack Developer (NGO Project)",
      company: "Hackathon Collaboration - NGO Initiative",
      period: "April 2025 - Present",
      description: "Building a full-stack web platform for effective NGO management after winning a hackathon based on their problem statement. The NGO invited our team to continue development post-event. The platform is being developed using Flask (Python) for backend services and the MERN stack for dynamic front-end experiences. Key features include member database management, donation tracking, event coordination, and impact assessment dashboards. Working closely with the NGO to deliver a scalable and user-friendly solution tailored to their real-world operations.",
      imageSrc: ngo,
      imageAlt: "NGO Web Platform"
    },
    {
      title: "Full Stack MERN Developer",
      company: "Success.ai",
      period: "July 2025 - September 2025",
      description: "During my internship as a Full Stack Developer at Success.ai, I worked with MERN, EJS, Firebase, and MUI on diverse projects. In the first month, I contributed to the official company website using EJS, HTML, and CSS, enhancing responsiveness and user experience. In the second month, I developed an internal dashboard with authentication functionality to streamline workflows and improve efficiency. Currently, I am working on a client project – a School Review System in the U.S., which automates the government’s school food program review process by managing multi-role access for Reviewers, Schools, Quality Assurance, and State officials, replacing manual submissions with a fully digital and scalable solution.",
      imageSrc: success,
      imageAlt: "Success.ai"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // Find the index of the current entry
            const index = itemRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveItem(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);

      itemRefs.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="mx-auto px-4 max-w-6xl">
        <h2
          ref={titleRef}
          className="opacity-0 mb-16 font-bold text-3xl md:text-4xl text-center"
        >
          Professional <span className="text-gradient">Experience</span>
        </h2>

        <div className="relative">
          {/* Vertical progress bar */}
          <div className="left-1/2 absolute bg-slate-200 dark:bg-slate-700 w-1 h-full -translate-x-1/2 transform">
            <div
              className="bg-gradient-to-b from-blue-500 to-purple-600 w-full transition-all duration-500 ease-in-out"
              style={{ height: `${Math.min(100, ((activeItem + 1) / experiences.length) * 100)}%` }}
            ></div>
          </div>

          {/* Timeline items */}
          <div className="z-10 relative">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`opacity-0 mb-24 relative ${index === experiences.length - 1 ? 'mb-0' : ''}`}
              >
                {/* Timeline circle marker */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 
                  ${activeItem >= index ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-slate-300 dark:bg-slate-600'}`}>
                  <Briefcase className="text-white" size={20} />
                </div>

                {/* Content card */}
                <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Empty space for alignment on mobile */}
                  <div className="mb-6 md:mb-0 md:px-8 w-full md:w-1/2"></div>

                  {/* Card content */}
                  <div className={`w-full md:w-1/2 md:px-8 ${index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}`}>
                    <div className="bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <h3 className="mb-2 font-bold text-xl">{exp.title}</h3>
                      <p className="mb-4 text-blue-600 dark:text-blue-400 text-sm">{exp.company} | {exp.period}</p>

                      <div className="mb-4 rounded-md overflow-hidden">
                        <img
                          src={exp.imageSrc}
                          alt={exp.imageAlt}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <p className="text-slate-600 dark:text-slate-300">{exp.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;