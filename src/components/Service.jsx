/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import {
  Palette,
  Globe,
  Database,
  ExternalLink,
  Star,
  CheckCircle,
  ArrowRight,
  MessageCircle
} from 'lucide-react'

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredService, setHoveredService] = useState(null)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const serviceRefs = useRef([])

  const services = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      description:
        'Complete web applications built with modern technologies like React, Node.js, and databases.',
      icon: Globe,
      price: 'Starting at ₹11000',
      deliveryTime: '7-14 days',
      features: [
        'Responsive Design',
        'Modern UI/UX',
        'Database Integration',
        'API Development',
        'Deployment & Hosting'
      ],
      technologies: [
        'React',
        'Node.js',
        'MongoDB',
        'Express',
        'Django',
        'Flask'
      ],
      fiverr_url: 'https://www.fiverr.com/s/DBWLjao',
      // rating: 4.9,
      // reviews: 45,
      category: 'full-stack'
    },
    {
      id: 2,
      title: 'Frontend Development',
      description:
        'Beautiful, interactive user interfaces that engage users and drive conversions.',
      icon: Palette,
      price: 'Starting at ₹7000',
      deliveryTime: '5-10 days',
      features: [
        'React Development',
        'Responsive Design',
        'Animation & Interactions',
        'Performance Optimization',
        'Cross-browser Compatibility'
      ],
      technologies: ['React', 'Tailwind CSS', 'MUI', 'TypeScript'],
      fiverr_url: 'https://www.fiverr.com/s/jjw8WEa',
      // rating: 5.0,
      // reviews: 32,
      category: 'frontend'
    },
    {
      id: 4,
      title: 'Backend API Development',
      description:
        'Robust and scalable backend systems with secure API endpoints and database design.',
      icon: Database,
      price: 'Starting at ₹10000',
      deliveryTime: '7-12 days',
      features: [
        'RESTful API Development',
        'Database Design & Optimization',
        'Authentication & Security',
        'Cloud Integration',
        'API Documentation'
      ],
      technologies: [
        'Node.js',
        'Express',
        'MongoDB',
        'PostgreSQL',
        'JWT',
        'Django',
        'Flask'
      ],
      fiverr_url: 'https://www.fiverr.com/s/DBWLjao',
      // rating: 4.9,
      // reviews: 38,
      category: 'backend'
    }
    // {
    //   id: 5,
    //   title: "Website Optimization",
    //   description: "Performance optimization, SEO improvements, and speed enhancements for existing websites.",
    //   icon: Zap,
    //   price: "Starting at $149",
    //   deliveryTime: "3-7 days",
    //   features: [
    //     "Performance Auditing",
    //     "SEO Optimization",
    //     "Speed Improvements",
    //     "Mobile Optimization",
    //     "Analytics Integration"
    //   ],
    //   technologies: ["Lighthouse", "Google Analytics", "GTM", "Webpack", "CDN"],
    //   fiverr_url: "https://www.fiverr.com/your-gig-url-5", // Replace with your actual URL
    //   rating: 4.7,
    //   reviews: 52,
    //   category: "optimization"
    // },
    // {
    //   id: 6,
    //   title: "Custom Web Solutions",
    //   description: "Tailored web solutions for unique business requirements and complex workflows.",
    //   icon: Code,
    //   price: "Starting at $499",
    //   deliveryTime: "14-30 days",
    //   features: [
    //     "Custom Development",
    //     "Business Logic Implementation",
    //     "Third-party Integrations",
    //     "Admin Dashboards",
    //     "Maintenance & Support"
    //   ],
    //   technologies: ["React", "Node.js", "Python", "Docker", "Microservices"],
    //   fiverr_url: "https://www.fiverr.com/your-gig-url-6", // Replace with your actual URL
    //   rating: 5.0,
    //   reviews: 21,
    //   category: "custom"
    // }
  ]

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
            if (entry.target === sectionRef.current) {
              setIsVisible(true)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (titleRef.current) observer.observe(titleRef.current)

    serviceRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Initialize service refs
  useEffect(() => {
    serviceRefs.current = Array(services.length).fill(null)
  }, [])

  const handleServiceHover = serviceId => {
    setHoveredService(serviceId)
  }

  const handleServiceLeave = () => {
    setHoveredService(null)
  }

  return (
    <section
      id='services'
      ref={sectionRef}
      className='bg-gradient-to-b from-slate-50 dark:from-slate-800 to-white dark:to-slate-900 py-24'
    >
      <div className='mx-auto px-4 max-w-7xl'>
        {/* Section Title */}
        <div className='mb-16 text-center'>
          <h2
            ref={titleRef}
            className='opacity-0 hover:text-shadow-3d mb-6 font-bold text-3xl md:text-4xl transition-all duration-300'
          >
            Professional <span className='text-gradient'>Services</span>
          </h2>
          <p
            className='opacity-0 mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-lg'
            style={{ animationDelay: '0.2s' }}
          >
            Transform your ideas into reality with high-quality development
            services. From concept to deployment, I deliver solutions that
            exceed expectations.
          </p>
        </div>

        {/* Services Grid */}
        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16'>
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                ref={el => (serviceRefs.current[index] = el)}
                className='group bg-white/70 dark:bg-slate-800/70 opacity-0 hover:shadow-3d backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all hover:-translate-y-3 duration-500 transform'
                style={{ animationDelay: `${0.1 * index}s` }}
                onMouseEnter={() => handleServiceHover(service.id)}
                onMouseLeave={handleServiceLeave}
              >
                {/* Service Header with Floating Icon */}
                <div className='relative bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-8'>
                  <div className='flex justify-between items-start mb-4'>
                    <div
                      className={`floating p-4 rounded-2xl transition-all duration-300 ${
                        hoveredService === service.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110'
                          : 'bg-white dark:bg-slate-700 text-blue-500'
                      }`}
                    >
                      <IconComponent size={32} />
                    </div>
                    <div className='text-right'>
                      <div className='flex items-center mb-1'>
                        {service.rating && (
                          <>
                            <Star
                              size={16}
                              className='fill-current mr-1 text-yellow-400'
                            />
                            <span className='font-semibold text-sm'>
                              {service?.rating}
                            </span>
                          </>
                        )}
                        {service.reviews && service.rating && (
                          <span className='ml-1 text-slate-500 dark:text-slate-400 text-sm'>
                            ({service.reviews})
                          </span>
                        )}
                      </div>
                      <div className='bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full font-medium text-green-600 dark:text-green-300 text-xs'>
                        {service.deliveryTime}
                      </div>
                    </div>
                  </div>

                  <h3 className='mb-3 font-bold dark:group-hover:text-blue-400 group-hover:text-blue-600 text-xl transition-colors'>
                    {service.title}
                  </h3>
                  <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed'>
                    {service.description}
                  </p>
                </div>

                {/* Service Features */}
                <div className='p-6'>
                  <div className='mb-6'>
                    <h4 className='mb-3 font-semibold text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wide'>
                      What's Included
                    </h4>
                    <ul className='space-y-2'>
                      {service.features.map((feature, idx) => (
                        <li key={idx} className='flex items-center text-sm'>
                          <CheckCircle
                            size={16}
                            className='flex-shrink-0 mr-3 text-green-500'
                          />
                          <span className='text-slate-600 dark:text-slate-300'>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className='mb-6'>
                    <h4 className='mb-3 font-semibold text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wide'>
                      Technologies
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className='bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full font-medium text-xs'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and CTA */}
                  <div className='flex justify-between items-center pt-4 border-slate-200 dark:border-slate-700 border-t'>
                    <div>
                      <span className='font-bold text-gradient text-lg'>
                        {service.price}
                      </span>
                    </div>
                    <a
                      href={service.fiverr_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group/btn flex items-center bg-gradient-to-r from-blue-500 hover:from-blue-600 to-purple-600 hover:to-purple-700 px-4 py-2 rounded-lg font-medium text-white text-sm hover:scale-105 transition-all duration-300 transform'
                    >
                      <MessageCircle size={16} className='mr-2' />
                      Order Now
                      <ArrowRight
                        size={14}
                        className='ml-2 transition-transform group-hover/btn:translate-x-1'
                      />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className='text-center'>
          <div className='bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm p-8 border border-slate-200 dark:border-slate-700 rounded-2xl'>
            <h3 className='mb-4 font-bold text-2xl'>
              Ready to Start Your <span className='text-gradient'>Project</span>
              ?
            </h3>
            <p className='mb-6 text-slate-600 dark:text-slate-400'>
              Let's discuss your requirements and create something amazing
              together.
            </p>
            <div className='flex sm:flex-row flex-col justify-center items-center gap-4'>
              <a
                href='https://www.fiverr.com/shreealasande'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-medium text-white hover:scale-105 transition-all duration-300 transform'
              >
                <ExternalLink size={18} className='mr-2' />
                View My Fiverr Profile
              </a>
              <a
                href='#contact'
                className='flex items-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-all duration-300'
              >
                Get Custom Quote
                <ArrowRight size={16} className='ml-2' />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .fade-in {
          opacity: 1 !important;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        .text-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-shadow-3d:hover {
          text-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }

        .shadow-3d:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
            0 15px 25px rgba(59, 130, 246, 0.1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  )
}

export default Services
