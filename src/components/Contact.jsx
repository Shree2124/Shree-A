import { useEffect, useRef, useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Send
} from 'lucide-react'
import axios from 'axios'

const Contact = () => {
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    msg: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              entry.target.classList.add('fade-in')
            } else if (entry.target === formRef.current) {
              entry.target.classList.add('slide-in-left')
            } else if (entry.target === infoRef.current) {
              entry.target.classList.add('slide-in-right')
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (formRef.current) observer.observe(formRef.current)
    if (infoRef.current) observer.observe(infoRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (formRef.current) observer.unobserve(formRef.current)
      if (infoRef.current) observer.unobserve(infoRef.current)
    }
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await axios.post(
        'https://portfolio-kappa-lovat-61.vercel.app/api/v1/mail',
        formData
      )
      if (res.status === 200) {
        setIsSubmitting(false)
        setSubmitSuccess(true)
        setSubmitError(false)
      }
    } catch (e) {
      console.error('Error sending message:', e)
      setIsSubmitting(false)
      setSubmitSuccess(false)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }
  }

  return (
    <div className='px-4 md:px-6 py-20'>
      <div className='mx-auto container'>
        <h2
          ref={titleRef}
          className='opacity-0 mb-12 font-bold text-3xl md:text-4xl text-center'
        >
          Get In <span className='text-gradient'>Touch</span>
        </h2>

        <div className='gap-10 grid grid-cols-1 lg:grid-cols-5'>
          {/* Contact Form */}
          <div
            ref={formRef}
            className='lg:col-span-3 bg-white dark:bg-slate-800 opacity-0 shadow-lg p-8 rounded-xl'
          >
            <h3 className='mb-6 font-bold text-2xl'>Send Me a Message</h3>

            {submitSuccess && (
              <div className='bg-green-100 dark:bg-green-800 mb-6 p-4 rounded-lg text-green-700 dark:text-green-200'>
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitError && (
              <div className='bg-red-100 dark:bg-red-800 mb-6 p-4 rounded-lg text-red-700 dark:text-red-200'>
                There was an error sending your message. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className='gap-6 grid grid-cols-1 md:grid-cols-2 mb-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 font-medium text-sm'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='bg-slate-50 dark:bg-slate-700 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                    placeholder='Your Name'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 font-medium text-sm'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='bg-slate-50 dark:bg-slate-700 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                    placeholder='Your Email'
                    required
                  />
                </div>
              </div>

              <div className='mb-6'>
                <label
                  htmlFor='subject'
                  className='block mb-2 font-medium text-sm'
                >
                  Subject
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='bg-slate-50 dark:bg-slate-700 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                  placeholder='Subject'
                  required
                />
              </div>

              <div className='mb-6'>
                <label
                  htmlFor='message'
                  className='block mb-2 font-medium text-sm'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.msg}
                  onChange={handleChange}
                  rows='5'
                  className='bg-slate-50 dark:bg-slate-700 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                  placeholder='Your Message'
                  required
                ></textarea>
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className={`flex items-center justify-center w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium transition ${
                  isSubmitting
                    ? 'opacity-75 cursor-not-allowed'
                    : 'hover:shadow-lg transform hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className='mr-3 -ml-1 w-5 h-5 text-white animate-spin'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} className='ml-2' />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            ref={infoRef}
            className='lg:col-span-2 bg-white dark:bg-slate-800 opacity-0 shadow-lg p-8 rounded-xl'
          >
            <h3 className='mb-6 font-bold text-2xl'>Contact Information</h3>

            <div className='mb-8'>
              <p className='text-slate-600 dark:text-slate-300'>
                Feel free to reach out to me using any of the contact methods
                below. I'll get back to you as soon as possible!
              </p>
            </div>

            <div>
              <h4 className='mb-4 font-medium'>Connect With Me</h4>
              <div className='flex space-x-4'>
                <a
                  href='https://github.com/Shree2124/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-slate-100 hover:bg-blue-100 dark:bg-slate-700 dark:hover:bg-blue-900 p-3 rounded-full transition-colors'
                >
                  <Github
                    size={20}
                    className='text-slate-700 dark:text-slate-300'
                  />
                </a>
                <a
                  href='https://www.linkedin.com/in/shree-alasande-933934272/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-slate-100 hover:bg-blue-100 dark:bg-slate-700 dark:hover:bg-blue-900 p-3 rounded-full transition-colors'
                >
                  <Linkedin
                    size={20}
                    className='text-slate-700 dark:text-slate-300'
                  />
                </a>
                <a
                  href='https://www.instagram.com/shreealasande/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-slate-100 hover:bg-blue-100 dark:bg-slate-700 dark:hover:bg-blue-900 p-3 rounded-full transition-colors'
                >
                  <Instagram
                    size={20}
                    className='text-slate-700 dark:text-slate-300'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
