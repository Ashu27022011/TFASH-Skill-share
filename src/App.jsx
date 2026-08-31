
import { useEffect, useState } from 'react'
import './index.css'
import SignupCreatePage from './Signup_createpage.jsx'
import PageFooter from './PageFooter.jsx'

import aerospaceImage from './assets/slider-images/aerospace.avif'
import codingImage from './assets/slider-images/coding.jpg'
import mathImage from './assets/slider-images/Math.jpg'
import cloudsImage from './assets/slider-images/science behind clouds.jfif'
import scienceImage from './assets/slider-images/Science.jpg'

const slides = [
  {
    title: ['Aerospace', 'Engineering'],
    description: 'From the first spark of flight to spacecraft at the edge of possibility—learn how bold ideas take off.',
    image: aerospaceImage,
    className: 'aerospace',
  },
  {
    title: ['The Science', 'Behind Clouds'],
    description: 'Read the sky differently. Uncover the atmospheric forces that turn tiny droplets into dramatic weather.',
    image: cloudsImage,
    className: 'clouds',
  },
  {
    title: ['Science', 'That Shapes Us'],
    description: 'Follow curiosity into the living, moving world around you—where every observation opens a new question.',
    image: scienceImage,
    className: 'science',
  },
  {
    title: ['The Art', 'of Mathematics'],
    description: 'Find clarity in patterns, possibility in numbers, and the quiet confidence that comes from solving.',
    image: mathImage,
    className: 'math',
  },
  {
    title: ['Build With', 'Code'],
    description: 'Turn a blank screen into something useful. Start with the logic, then make it beautifully your own.',
    image: codingImage,
    className: 'coding',
  },
  {
    title: ['100+ Skills', 'Available'],
    description: 'A growing library of workshops designed to make the next thing you learn your favourite thing yet.',
    className: 'skills',
    summary: true,
  },
]

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'search') return <svg {...common}><circle cx="10.8" cy="10.8" r="5.8" /><path d="m16 16 4 4" /></svg>
  if (name === 'bell') return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg>
  if (name === 'chevron-left') return <svg {...common}><path d="m14.5 5-7 7 7 7" /></svg>
  if (name === 'chevron-right') return <svg {...common}><path d="m9.5 5 7 7-7 7" /></svg>
  return <svg {...common}><path d="M12 3v18M3 12h18" /></svg>
}

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const selectSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  useEffect(() => {
    if (isPaused) return undefined
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 5200)
    return () => window.clearInterval(interval)
  }, [isPaused])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'ArrowLeft') selectSlide(activeIndex - 1)
      if (event.key === 'ArrowRight') selectSlide(activeIndex + 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex])

  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Skill Share home">
          <img src="/logo.png" alt="Skill Sharing logo" className="brand-logo" />
          <span>skill</span><span>sharing<span className="brand-dot">.</span></span>
        </a>

        <div className="nav-links">
          <a className="active" href="#home">Home</a>
          <a href="#about">About us</a>
          <a href="#inbox">Inbox</a>
        </div>

        <label className="search-box">
          <Icon name="search" size={15} />
          <input type="search" placeholder="What do you want to learn today?" aria-label="Search skills" />
        </label>

        <div className="nav-actions">
          <button className="notification-button" type="button" aria-label="Open notifications">
            <Icon name="bell" size={17} /><span className="notification-dot" />
          </button>
          <button className="profile-button" type="button" aria-label="Open your profile">
            <span className="profile-avatar" aria-hidden="true">
              <span className="avatar-head" />
              <span className="avatar-body" />
            </span>
          </button>
        </div>
      </nav>

      <section
        className="slider-shell"
        aria-roledescription="carousel"
        aria-label="Featured skills"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
        }}
      >
        <div className="slides-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <article
              className={`skill-slide ${slide.className} ${slide.summary ? 'summary-slide' : ''}`}
              key={slide.title.join('-')}
              aria-hidden={index !== activeIndex}
            >
              {slide.image && <div className="slide-image-wrap" aria-hidden="true"><img src={slide.image} alt="" className="slide-image" /></div>}
              {slide.summary && <><div className="orb orb-one" aria-hidden="true" /><div className="orb orb-two" aria-hidden="true" /></>}
              <div className="slide-copy">
                <h1>
                  {slide.title.map((line, lineIndex) => (
                    <span key={`${line}-${lineIndex}`} className={`title-line title-line-${lineIndex + 1}`}>
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="slide-description">{slide.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="slider-controls">
          <div className="slider-dots" role="tablist" aria-label="Choose a featured skill">
            {slides.map((slide, index) => (
              <button
                className={`slider-dot ${index === activeIndex ? 'selected' : ''}`}
                type="button"
                key={slide.title.join('-')}
                onClick={() => selectSlide(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${slide.title.join(' ')}`}
              />
            ))}
          </div>
          <div className="arrow-controls">
            <button type="button" onClick={() => selectSlide(activeIndex - 1)} aria-label="Previous slide"><Icon name="chevron-left" /></button>
            <button type="button" onClick={() => selectSlide(activeIndex + 1)} aria-label="Next slide"><Icon name="chevron-right" /></button>
          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}

function App() {
  const [showHome, setShowHome] = useState(false)

  if (!showHome) {
    return <SignupCreatePage onContinue={() => setShowHome(true)} />
  }

  return <HomePage />
}

export default App
