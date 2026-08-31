import { useEffect, useState } from 'react'
import './Signup_createpage.css'


const translations = [
  { word: 'Welcome', color: '#f6c177' },
  { word: 'స్వాగతం', color: '#78dce8' },
  { word: 'स्वागत', color: '#f38ba8' },
  { word: 'வரவேற்பு', color: '#a6e3a1' },
  { word: 'സ്വാഗതം', color: '#f9e2af' },
  { word: 'স্বাগতম', color: '#cba6f7' },
  { word: 'स्वागत', color: '#89b4fa' },
  { word: 'ସ୍ୱାଗତ', color: '#fab387' },
  { word: 'ಸ್ವಾಗತ', color: '#94e2d5' },
  { word: 'स्वागतम्', color: '#eba0ac' },
  { word: 'સ્વાગત', color: '#f5c2e7' },
  { word: 'خوش آمدید', color: '#74c7ec' },
  { word: 'ਜੀ ਆਇਆਂ ਨੂੰ', color: '#f2cdcd' },
]

function SignupCreatePage({ onContinue }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % translations.length)
    }, 2100)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    let halo
    let cancelled = false
    const loadScript = (src) => new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`)
      if (existing) {
        if (existing.dataset.loaded === 'true') resolve()
        else existing.addEventListener('load', resolve, { once: true })
        return
      }
      const script = document.createElement('script')
      script.src = src
      script.onload = () => { script.dataset.loaded = 'true'; resolve() }
      script.onerror = reject
      document.body.appendChild(script)
    })

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.halo.min.js'))
      .then(() => {
        if (!cancelled && window.VANTA) {
          halo = window.VANTA.HALO({
            el: '#welcome-background', 
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            amplitudeFactor: 1.10,
            xOffset: -0.06,
            yOffset: -0.09,
            size: 1.20

          })
        }
      })
      .catch(() => {})

    return () => { cancelled = true; if (halo) halo.destroy() }
  }, [])

  const activeTranslation = translations[activeIndex]

  return (
    <main className="welcome-page">
      <div className="welcome-brandmark" aria-label="Skill Sharing logo">
        <img src="/logo.png" alt="Skill Sharing logo" />
      </div>
      <div id="welcome-background" className="welcome-background" aria-hidden="true" />
      <div className="welcome-shade" aria-hidden="true" />
      <section className="welcome-content" aria-labelledby="welcome-title">
        
        <h1 id="welcome-title" className="welcome-title">
          <span className="welcome-reel" style={{ '--word-color': activeTranslation.color }} aria-live="polite">
            <span key={activeIndex} className="human-word">{activeTranslation.word}</span>
          </span>
        </h1>
        <p className="welcome-subtitle">A place to learn openly, build boldly, and meet the people shaping what comes next.</p>
        <div className="welcome-actions">
          <button type="button" className="welcome-button primary" onClick={onContinue}>Login</button>
          <button type="button" className="welcome-button secondary" onClick={onContinue}>Create new account</button>
        </div>
      </section>
      
    </main>
  )
}

export default SignupCreatePage