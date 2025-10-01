import { useEffect, useRef, useState } from 'react';
import { Award, Trophy, Star, Medal } from 'lucide-react';
import winner from "../assets/projects/winner.jpg"

const AchievementsTimeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemRefs = useRef([]);

  const achievements = [
    {
      title: "2nd Place – College Coding Competition",
      category: "Academic Achievement",
      date: "2023-2024 Academic Year",
      description: "Secured 2nd place in a competitive college-level problem-solving coding competition. Demonstrated strong algorithmic thinking, optimization skills, and real-time problem-solving under pressure. The event challenged participants with complex coding tasks focused on data structures, logic, and efficiency.",
      icon: <Medal className="text-blue-500" />,
      imageSrc: "/api/placeholder/600/400",
      imageAlt: "Coding Competition Award"
    },
    {
      title: "Hackathon Winner",
      category: "Coding Competition",
      date: "March 2025",
      description: "First place at Technothon 2025 for developing an innovative solution for Effective functioning of an NGO. Our team of four built a user friendly and complete prototype, impressing judges with both technical implementation and future potential.",
      icon: <Trophy className="text-yellow-500" />,
      imageSrc: winner,
      imageAlt: "Hackathon Winner Trophy"
    },
    {
      title: "1st Place – KBC (Kon Banega Coder)",
      category: "Academic Achievement",
      date: "30 September 2025",
      description: "Secured 1st place in 'Kon Banega Coder' (KBC), a college-level quiz competition organized by VPPCOE. The contest was inspired by the popular KBC format but focused entirely on technology-related questions. It included unique lifelines such as 50-50, swapping the question, and debugging code. Our team, '(a + b)^2', competed against multiple teams and successfully demonstrated strong technical knowledge, problem-solving skills, and quick decision-making to win the event.",
      icon: <Star className="text-blue-500" />,
      imageSrc: "/api/placeholder/600/400",
      imageAlt: "KBC Award"
    }



  ];

  const getIcon = (index) => {
    const icons = [
      <Trophy key="trophy" className="text-white" size={20} />,
      <Medal key="medal" className="text-white" size={20} />,
      <Star key="star" className="text-white" size={20} />,
      <Award key="award" className="text-white" size={20} />
    ];
    return icons[index % icons.length];
  };

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
    <section id="achievements" ref={sectionRef} className="bg-white dark:bg-slate-800 py-20">
      <div className="mx-auto px-4 max-w-6xl">
        <h2
          ref={titleRef}
          className="opacity-0 mb-16 font-bold text-3xl md:text-4xl text-center"
        >
          Notable <span className="text-gradient">Achievements</span>
        </h2>

        <div className="relative">
          {/* Vertical progress bar */}
          <div className="left-1/2 absolute bg-slate-200 dark:bg-slate-700 w-1 h-full -translate-x-1/2 transform">
            <div
              className="bg-gradient-to-b from-purple-500 to-pink-600 w-full transition-all duration-500 ease-in-out"
              style={{ height: `${Math.min(100, ((activeItem + 1) / achievements.length) * 100)}%` }}
            ></div>
          </div>

          {/* Timeline items */}
          <div className="z-10 relative">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`opacity-0 mb-24 relative ${index === achievements.length - 1 ? 'mb-0' : ''}`}
              >
                {/* Timeline circle marker */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 
                  ${activeItem >= index ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-slate-300 dark:bg-slate-600'}`}>
                  {getIcon(index)}
                </div>

                {/* Content card */}
                <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Image side */}
                  <div className={`w-full md:w-1/2 md:px-8 mb-6 md:mb-0 ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                    <div className="shadow-lg rounded-lg overflow-hidden">
                      <img
                        src={achievement.imageSrc}
                        alt={achievement.imageAlt}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`w-full md:w-1/2 md:px-8 ${index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}`}>
                    <div className="bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-slate-100 dark:bg-slate-700 mr-3 p-2 rounded-full">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">{achievement.title}</h3>
                          <p className="text-purple-600 dark:text-purple-400 text-sm">{achievement.category} | {achievement.date}</p>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300">{achievement.description}</p>
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

export default AchievementsTimeline;