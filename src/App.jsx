import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import ExperienceTimeline from './components/ExperienceTimeline'
import AchievementsTimeline from './components/AchievementsTimeline'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Services from './components/Service'

function App () {
  const [theme, setTheme] = useState('light')
  const [activeSection, setActiveSection] = useState('home')

  // const toggleTheme = () => {
  //   setTheme(theme === 'light' ? 'dark' : 'light')
  // }

  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  // }, [theme])

  const handleNavigation = section => {
    setActiveSection(section)
    const element = document.getElementById(section)
    element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className='bg-slate-50 dark:bg-slate-900 min-h-screen font-poppins text-slate-800 dark:text-slate-100 transition-colors duration-300'>
        <Navbar
          activeSection={activeSection}
          handleNavigation={handleNavigation}
        />
        {/* <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}
        <main>
          <section id='home'>
            <Home />
          </section>
          <section id='about'>
            <About />
          </section>
          <section id='projects'>
            <Projects />
          </section>
          <section id='experience'>
            <ExperienceTimeline />
          </section>
          <section id='services'>
            <Services />
          </section>
          <section id='achievements'>
            <AchievementsTimeline />
          </section>
          <section id='skills'>
            <Skills />
          </section>
          <section id='contact'>
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
      <SpeedInsights />
      <Analytics />
    </>
  )
}

export default App
