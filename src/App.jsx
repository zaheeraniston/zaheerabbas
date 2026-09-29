import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import AdminPanel from './components/AdminPanel'
import { loadPortfolioData, savePortfolioData, mergeWithDefaults } from './data/defaultPortfolioData'
import { fetchCloudPortfolioData } from './lib/supabase'

// Hero & Floating 3D Assets
import headshotImg from './assets/headshot.png'
import arrowImg from './assets/Arrow-opt.webp'
import coffeeImg from './assets/Coffee-opt.webp'
import keyImg from './assets/Key-opt.webp'
import planeImg from './assets/Plane-opt.webp'
import ringImg from './assets/Ring-opt.webp'
import neuroxLogo from './assets/neurox-logo.png'

// Fallback Marquee Assets
import mq1_1 from './assets/1.1-opt.webp'
import mq1_2 from './assets/1.2-opt.webp'
import mq1_3 from './assets/1.3-opt.webp'
import mq1_4 from './assets/1.4-opt.webp'
import mq1_5 from './assets/1.5-opt.webp'
import mq1_6 from './assets/1.6-opt.webp'

import mq2_1 from './assets/2.1-opt.webp'
import mq2_2 from './assets/2.2-opt.webp'
import mq2_3 from './assets/2.3-opt.webp'
import mq2_4 from './assets/2.4-opt.webp'

const DEFAULT_SKILL_CATEGORIES = [
  { id: 'all', label: 'All Technologies', count: 12 },
  { id: 'frontend', label: 'Frontend & UI', count: 6 },
  { id: 'backend', label: 'Backend & APIs', count: 2 },
  { id: 'mobile', label: 'Mobile Apps', count: 2 },
  { id: 'tools', label: 'DevOps & AI', count: 2 },
]

function SkillIcon({ id, className = 'skill-icon-svg' }) {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23 23 20.46" className={`${className} icon-react`}>
          <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="1" fill="none" className="spin-orbital">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      )
    case 'nextjs':
      return (
        <svg viewBox="0 0 180 180" className={`${className} icon-nextjs`}>
          <circle cx="90" cy="90" r="86" fill="#0A0A0F" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
          <path d="M149.5 157.4L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.4z" fill="#ffffff" />
          <rect x="115" y="54" width="12" height="72" fill="#ffffff" />
        </svg>
      )
    case 'typescript':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-ts`}>
          <rect width="128" height="128" rx="22" fill="#3178C6" />
          <path fill="#ffffff" d="M72.2 84.8c1.6 2.8 4.2 4.8 7.8 4.8 4.2 0 6.6-2.2 6.6-5.8 0-4.2-3.8-5.6-9.8-8.2-8.2-3.6-13.6-7.8-13.6-16.6 0-10.4 8.4-16.6 19.8-16.6 7.4 0 12.8 2.6 16.6 8.8l-7.4 4.8c-1.8-2.6-4.6-4.2-8.6-4.2-4.4 0-6.6 2.2-6.6 5.4 0 3.8 3.2 5.2 8.6 7.6 9.4 4 14.8 8.2 14.8 17.2 0 11.2-8.8 17.6-20.6 17.6-9.8 0-16.2-4.4-20.2-10.8l7.6-4zM22 51.4h37.4v9.6h-13.4v48.6h-10.6V61H22v-9.6z" />
        </svg>
      )
    case 'javascript':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-js`}>
          <rect width="128" height="128" rx="22" fill="#F7DF1E" />
          <path fill="#000000" d="M68.5 98.2c2.4 3.9 6.2 6.6 11.6 6.6 6.2 0 9.8-3.1 9.8-8.1 0-5.8-5.3-7.8-13.7-11.4-11.5-5-19-10.9-19-23.2 0-14.5 11.8-23.2 27.7-23.2 10.3 0 17.9 3.6 23.2 12.3l-10.3 6.7c-2.5-3.6-6.4-5.9-12-5.9-6.2 0-9.2 3.1-9.2 7.5 0 5.3 4.5 7.3 12 10.6 13.1 5.6 20.7 11.5 20.7 24 0 15.6-12.3 24.6-28.8 24.6-13.7 0-22.6-6.1-28.2-15l16.2-5.5zM22.2 92.4l11.4-6.9c2.4 4.1 4.5 7.3 9.4 7.3 4.9 0 8.1-1.9 8.1-9.3V29.5H63v54.2c0 14.8-8.7 21.6-22 21.6-11.7 0-18.9-6.1-23.6-12.9h4.8z" />
        </svg>
      )
    case 'nodejs':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-node`}>
          <path fill="#539E43" d="M64 5.2L115 34.6v58.8L64 122.8 13 93.4V34.6L64 5.2zm-2.8 29.2c-15.6 0-22.8 9.3-22.8 21.2 0 11.8 7.2 21.2 22.8 21.2 15.6 0 22.8-9.3 22.8-21.2 0-11.9-7.2-21.2-22.8-21.2zm-.1 12.7c6.2 0 9.1 4.3 9.1 8.5 0 4.2-2.9 8.5-9.1 8.5-6.2 0-9.1-4.3-9.1-8.5 0-4.2 2.9-8.5 9.1-8.5z" />
        </svg>
      )
    case 'php':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-php`}>
          <ellipse cx="64" cy="64" rx="60" ry="34" fill="#777BB4" />
          <path fill="#ffffff" d="M40 50h-8l-8 28h8l2.2-7.8h6.2c6.8 0 10.6-3.8 12.2-9.4 1.5-5.4-.7-10.8-7.6-10.8zm-2.4 7.2c2.2 0 3.2 1.4 2.6 3.6-.6 2.2-2.2 3.6-4.4 3.6h-3.4l2-7.2h3.2zm28.8-7.2h-8l-8 28h8l3.2-11.2h8l-3.2 11.2h8l8-28h-8l-2.6 9.2h-8l2.6-9.2zm37.6 0h-8l-8 28h8l2.2-7.8h6.2c6.8 0 10.6-3.8 12.2-9.4 1.5-5.4-.7-10.8-7.6-10.8zm-2.4 7.2c2.2 0 3.2 1.4 2.6 3.6-.6 2.2-2.2 3.6-4.4 3.6h-3.4l2-7.2h3.2z" />
        </svg>
      )
    case 'reactnative':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-rn`}>
          <rect x="24" y="8" width="80" height="112" rx="14" fill="#0A0A0F" stroke="#61DAFB" strokeWidth="4" />
          <circle cx="64" cy="106" r="4" fill="#61DAFB" />
          <circle cx="64" cy="56" r="5" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="2.5" fill="none" className="spin-orbital">
            <ellipse cx="64" cy="56" rx="24" ry="9" />
            <ellipse cx="64" cy="56" rx="24" ry="9" transform="rotate(60 64 56)" />
            <ellipse cx="64" cy="56" rx="24" ry="9" transform="rotate(120 64 56)" />
          </g>
        </svg>
      )
    case 'flutter':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-flutter`}>
          <path fill="#47C5FB" d="M78 12L24 66l16 16L94 28H78z" />
          <path fill="#02569B" d="M94 72l-22 22 22 22h16l-30-30 30-30H94z" />
          <path fill="#0175C2" d="M64 74L40 98l16 16 16-16 16 16h16L72 82l8-8-16 0z" />
        </svg>
      )
    case 'git':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-git`}>
          <path fill="#F05032" d="M125.6 57.2L70.8 2.4c-3.2-3.2-8.4-3.2-11.6 0L42.8 18.8l14.6 14.6c3.4-1.2 7.4-.4 10 2.2 2.6 2.6 3.4 6.6 2.2 10l14.2 14.2c3.4-1.2 7.4-.4 10 2.2 3.8 3.8 3.8 10 0 13.8s-10 3.8-13.8 0c-2.8-2.8-3.6-7-2.2-10.6L64.4 51.6v28.8c.8.4 1.6 1 2.2 1.6 3.8 3.8 3.8 10 0 13.8s-10 3.8-13.8 0c-3.8-3.8-3.8-10 0-13.8.8-.8 1.8-1.4 2.8-1.8V49.8c-1-.4-2-1-2.8-1.8-2.8-2.8-3.6-7-2.2-10.6L35.8 22.8 2.4 56.2c-3.2 3.2-3.2 8.4 0 11.6l54.8 54.8c3.2 3.2 8.4 3.2 11.6 0l56.8-56.8c3.2-3.2 3.2-8.4 0-11.6z" />
        </svg>
      )
    case 'npm':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-npm`}>
          <path fill="#CB3837" d="M8 8h112v112H8V8z" />
          <path fill="#ffffff" d="M26 26h76v76H64V45H45v57H26V26z" />
        </svg>
      )
    case 'html5':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-html5`}>
          <path fill="#E34F26" d="M19 116L9 4h110l-10 112-45 12z" />
          <path fill="#EF652A" d="M64 118l36-10 8-90H64v100z" />
          <path fill="#EBEBEB" d="M64 54H47l-1-14h18V26H31l4 42h29v-14zm0 38l-15-4-1-12H34l2 22 28 8V92z" />
          <path fill="#FFFFFF" d="M64 54h17l-2 18-15 4v14l27-8 3-38H64v10zm0-28v14h32l1-14H64z" />
        </svg>
      )
    case 'uiux3d':
      return (
        <svg viewBox="0 0 128 128" className={`${className} icon-uiux`}>
          <defs>
            <linearGradient id="uiuxGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect width="128" height="128" rx="26" fill="url(#uiuxGrad)" />
          <polygon points="64,22 104,45 64,68 24,45" fill="rgba(255,255,255,0.95)" />
          <polygon points="24,45 64,68 64,106 24,83" fill="rgba(255,255,255,0.65)" />
          <polygon points="64,68 104,45 104,83 64,106" fill="rgba(255,255,255,0.8)" />
          <line x1="64" y1="68" x2="64" y2="106" stroke="#8b5cf6" strokeWidth="2" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} icon-custom`}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
  }
}

export default function App() {
  const headRef = useRef(null)
  const coffeeRef = useRef(null)
  const keyRef = useRef(null)
  const planeRef = useRef(null)
  const ringRef = useRef(null)

  const [portfolioData, setPortfolioData] = useState(() => loadPortfolioData())
  const [isAdminOpen, setIsAdminOpen] = useState(() => window.location.hash === '#admin')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all')
  const [activeSkillId, setActiveSkillId] = useState('react')

  // Hash / Storage listeners & Keyboard Shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true)
      }
    }
    const handleUpdate = () => {
      setPortfolioData(loadPortfolioData())
    }
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        setIsAdminOpen((prev) => !prev)
      }
    }

    window.addEventListener('hashchange', handleHash)
    window.addEventListener('zaheer_portfolio_updated', handleUpdate)
    window.addEventListener('keydown', handleKeyDown)

    // Fetch latest cloud data from Supabase if configured
    fetchCloudPortfolioData().then((cloudData) => {
      if (cloudData) {
        const merged = mergeWithDefaults(cloudData)
        savePortfolioData(merged)
        setPortfolioData(merged)
      }
    })

    return () => {
      window.removeEventListener('hashchange', handleHash)
      window.removeEventListener('zaheer_portfolio_updated', handleUpdate)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Parallax and floating 3D objects animation
  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let animId

    const onMouseMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      mouseX = nx * 36
      mouseY = ny * 24
    }

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const nx = e.touches[0].clientX / window.innerWidth - 0.5
        const ny = e.touches[0].clientY / window.innerHeight - 0.5
        mouseX = nx * 36
        mouseY = ny * 24
      }
    }

    const startTime = performance.now()
    const tick = (now) => {
      currentX += (mouseX - currentX) * 0.06
      currentY += (mouseY - currentY) * 0.06
      const elapsed = (now - startTime) * 0.002

      if (headRef.current) {
        const floatY = Math.sin(elapsed * 1.5) * 5
        const rot = Math.sin(elapsed * 1.1) * 1.2
        if (window.innerWidth <= 700) {
          headRef.current.style.transform = `translate(${currentX.toFixed(2)}px, ${(currentY + floatY).toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`
        } else {
          headRef.current.style.transform = `translateX(-50%) translate(${currentX.toFixed(2)}px, ${(currentY + floatY).toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`
        }
      }

      const multipliers = [1.6, -1.3, -1.5, 1.2]
      ;[coffeeRef, keyRef, planeRef, ringRef].forEach((ref, idx) => {
        if (ref.current) {
          const bobY = Math.sin(elapsed + idx * 1.6) * 14
          const bobX = Math.cos(elapsed + idx * 1.3) * 8
          const rot = Math.sin(elapsed + idx * 1.1) * 6
          const tx = currentX * multipliers[idx] + bobX
          const ty = currentY * multipliers[idx] + bobY
          ref.current.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`
        }
      })

      animId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    animId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  const skillItems = portfolioData.skills?.items || []
  const filteredSkills =
    selectedSkillCategory === 'all'
      ? skillItems
      : skillItems.filter((item) => item.category === selectedSkillCategory)

  const skillCategories = DEFAULT_SKILL_CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.id === 'all' ? skillItems.length : skillItems.filter((s) => s.category === cat.id).length,
  }))

  const defaultRow1 = [mq1_1, mq1_2, mq1_3, mq1_4, mq1_5, mq1_6]
  const defaultRow2 = [mq2_1, mq2_2, mq2_3, mq2_4]
  const validRow1 = (portfolioData.marquee?.row1 || []).map((img, idx) => img || defaultRow1[idx % defaultRow1.length])
  const activeRow1 = validRow1.length ? validRow1 : defaultRow1
  const marqueeRow1 = [...activeRow1, ...activeRow1, ...activeRow1, ...activeRow1]

  const validRow2 = (portfolioData.marquee?.row2 || []).map((img, idx) => img || defaultRow2[idx % defaultRow2.length])
  const activeRow2 = validRow2.length ? validRow2 : defaultRow2
  const marqueeRow2 = [...activeRow2, ...activeRow2, ...activeRow2, ...activeRow2]

  return (
    <div className="app-root" style={{ background: '#0a0a0f', position: 'relative' }}>
      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section className="hero" id="home">
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button
            className="burger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span style={{ transform: isMobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }} />
            <span style={{ transform: isMobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
            <a href="#work" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>
        )}

        <div className="hero-glow">
          <div className="glow-a" />
          <div className="glow-b" />
        </div>

        <div className="hero-hello">{portfolioData.hero?.helloText || 'Hello'}</div>

        <div className="hero-line">
          <span className="hero-im">
            {portfolioData.hero?.imText || "I'M"}
            <img
              src={portfolioData.hero?.customArrow || arrowImg}
              alt="Holographic 3D Arrow"
              className="hero-arrow"
            />
          </span>
          <span className="hero-zaheer">{portfolioData.hero?.nameText || 'Zaheer'}</span>
        </div>

        <img
          src={portfolioData.hero?.customHeadshot || headshotImg}
          alt="3D Bust of Zaheer"
          ref={headRef}
          className="hero-head"
        />

        <footer className="hero-footer">
          <div className="hero-footer-info">
            <div className="hero-founder-pill">
              <span className="founder-pulse-dot" />
              <img src={neuroxLogo} alt="Neurox Technology" className="hero-neurox-logo" />
              <span className="founder-pill-text">
                Founder of <strong className="founder-brand-highlight">Neurox Technology</strong>
              </span>
            </div>
            <p className="hero-p">
              {portfolioData.hero?.subtitle ||
                'Designer & developer crafting bold digital experiences that make brands impossible to ignore.'}
            </p>
          </div>
          <a href={portfolioData.hero?.btnLink || '#contact'} className="btn">
            {portfolioData.hero?.btnText || 'Contact Me'}
          </a>
        </footer>
      </section>

      {/* ========================================================
          2. MARQUEE PREVIEW SECTION
          ======================================================== */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-track-l">
            {marqueeRow1.map((imgSrc, idx) => (
              <img
                key={`mq1-${idx}`}
                src={imgSrc}
                alt="Showcase Preview"
                className="mq-img"
                onError={(e) => {
                  const fallback = defaultRow1[idx % defaultRow1.length]
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="marquee-container">
          <div className="marquee-track-r">
            {marqueeRow2.map((imgSrc, idx) => (
              <img
                key={`mq2-${idx}`}
                src={imgSrc}
                alt="Showcase Preview"
                className="mq-img"
                onError={(e) => {
                  const fallback = defaultRow2[idx % defaultRow2.length]
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. ABOUT SECTION
          ======================================================== */}
      <section className="about" id="about">
        <div className="big-title">{portfolioData.about?.title || 'About'}</div>

        <div className="about-highlights">
          {(portfolioData.about?.badges || []).map((badge, idx) => {
            const isFounder = badge.toLowerCase().includes('founder') || badge.toLowerCase().includes('neurox')
            const isAi = badge.toLowerCase().includes('infosys') || badge.toLowerCase().includes('ai')
            return (
              <span
                key={idx}
                className={`about-badge ${
                  isFounder ? 'about-badge-founder' : isAi ? 'about-badge-ai' : ''
                }`}
              >
                {isFounder && (
                  <img src={neuroxLogo} alt="Neurox" className="about-badge-logo" />
                )}
                {badge}
              </span>
            )
          })}
        </div>

        <p className="about-p">{portfolioData.about?.bio}</p>

        <div className="about-stats">
          {(portfolioData.about?.stats || []).map((s, idx) => (
            <div key={s.id || idx} className="stat-card">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <a href={portfolioData.about?.btnLink || '#skills'} className="btn">
          {portfolioData.about?.btnText || 'Explore Skills'}
        </a>

        {/* Floating 3D Elements */}
        <img
          src={portfolioData.floatingElements?.coffee || coffeeImg}
          alt="Floating Coffee Cup"
          ref={coffeeRef}
          className="float-img float-coffee"
        />
        <img
          src={portfolioData.floatingElements?.key || keyImg}
          alt="Floating Gold Key"
          ref={keyRef}
          className="float-img float-key"
        />
        <img
          src={portfolioData.floatingElements?.plane || planeImg}
          alt="Floating Paper Plane"
          ref={planeRef}
          className="float-img float-plane"
        />
        <img
          src={portfolioData.floatingElements?.ring || ringImg}
          alt="Floating Diamond Ring"
          ref={ringRef}
          className="float-img float-ring"
        />
      </section>

      {/* ========================================================
          4. SERVICES SECTION
          ======================================================== */}
      <section className="services-section" id="services">
        <div className="services-panel">
          <div className="services-title">Services</div>
          <div>
            {(portfolioData.services || []).map((service) => (
              <div key={service.num || service.id} className="service-row">
                <div className="service-num">{service.num}</div>
                <div className="service-info">
                  <div className="service-title">{service.title}</div>
                  <p className="service-p">{service.desc}</p>
                </div>
                {service.img && <img src={service.img} alt={service.title} className="service-img" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SKILLS SECTION
          ======================================================== */}
      <section className="skills-section" id="skills">
        <div className="skills-panel">
          <div className="skills-ambient-a" />
          <div className="skills-ambient-b" />

          <div className="skills-header-wrap">
            <div className="skills-badge-top">
              <span className="skills-pulse-dot" />
              {portfolioData.skills?.badgeTop || 'ENGINEERING MATRIX • 6+ YEARS EXPERIENCE'}
            </div>
            <div className="skills-title">{portfolioData.skills?.title || 'Skills'}</div>
            <p className="skills-subtitle">
              {portfolioData.skills?.subtitle ||
                'Mastering Modern Frontend, High-Concurrency Backends, Mobile Ecosystems & Enterprise AI.'}
            </p>
          </div>

          <div className="skills-filter-nav">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                className={`skill-filter-btn ${selectedSkillCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedSkillCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="filter-count">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="skills-grid">
            {filteredSkills.map((skill) => {
              const isSelected = skill.id === activeSkillId
              return (
                <div
                  key={skill.id}
                  className={`skill-card ${isSelected ? 'skill-card-selected' : ''}`}
                  style={{ '--skill-glow': skill.glow, '--skill-accent': skill.accent }}
                  onClick={() => setActiveSkillId(skill.id)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
                  }}
                >
                  <div className="skill-card-spotlight" />
                  <div className="skill-card-top">
                    <span className="skill-badge-level">{skill.badge}</span>
                    <span className="skill-badge-exp">{skill.exp}</span>
                  </div>
                  <div className="skill-icon-wrap">
                    <SkillIcon id={skill.id} />
                  </div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-category">{skill.categoryLabel}</div>
                  <div className="skill-meter-wrap">
                    <div className="skill-meter-header">
                      <span className="meter-label">Proficiency</span>
                      <span className="meter-val">{skill.level}%</span>
                    </div>
                    <div className="skill-meter-track">
                      <div
                        className="skill-meter-bar"
                        style={{ width: `${skill.level}%`, backgroundColor: skill.accent }}
                      />
                    </div>
                  </div>
                  <div className="skill-card-tags">
                    {(skill.tags || []).slice(0, 2).map((t, idx) => (
                      <span key={idx} className="skill-chip">{t}</span>
                    ))}
                  </div>
                  {isSelected && (
                    <div className="skill-active-badge">
                      <span className="active-dot" /> INSPECTING
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="skills-rows">
            {(portfolioData.skills?.rows || []).map((row, idx) => (
              <div key={row.num || row.id || idx} className="skill-row">
                <div className="skill-row-num">{row.num}</div>
                <div className="skill-row-info">
                  <div className="skill-row-title">{row.title}</div>
                  <p className="skill-row-desc">{row.desc}</p>
                  <div className="skill-tags-group">
                    {(row.tags || []).map((tag, tIdx) => (
                      <span key={tIdx} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. PROJECTS SECTION
          ======================================================== */}
      <section className="work-section" id="work">
        <div className="work-title">Projects</div>
        <div className="projects-stack">
          {(portfolioData.projects || []).map((proj, idx) => (
            <div key={proj.num || proj.id || idx} className="pcard" style={{ zIndex: idx + 1 }}>
              <div className="pcard-head">
                <div className="pcard-num">{proj.num}</div>
                <div className="pcard-details">
                  <div className="pcard-title">{proj.title}</div>
                  <div className="pcard-tag">{proj.tag}</div>
                </div>
                <a
                  href={proj.liveUrl || 'https://wa.me/918822849800'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  See Live
                </a>
              </div>
              <div className="pgrid">
                {proj.imgs?.[0] && <img src={proj.imgs[0]} alt={proj.title} className="pgrid-main" />}
                {proj.imgs?.[1] && <img src={proj.imgs[1]} alt={proj.title} className="pgrid-sub" />}
                {proj.imgs?.[2] && <img src={proj.imgs[2]} alt={proj.title} className="pgrid-sub" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. CONTACT SECTION
          ======================================================== */}
      <section className="contact" id="contact">
        <div className="big-title">{portfolioData.contact?.title || 'Contact'}</div>
        <p className="contact-p">
          {portfolioData.contact?.pText || "Got a wild idea? Let's make it impossible to ignore."}
        </p>
        <a
          href={`https://wa.me/${portfolioData.contact?.whatsappNumber || '918822849800'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.9C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.05 7.42C8.86 7.42 8.55 7.49 8.29 7.78C8.03 8.06 7.3 8.75 7.3 10.15C7.3 11.55 8.32 12.9 8.46 13.09C8.6 13.28 10.42 16.08 13.21 17.28C15.53 18.28 16 18.08 16.5 18.03C17 17.99 18.11 17.37 18.34 16.71C18.57 16.05 18.57 15.49 18.5 15.37C18.43 15.25 18.24 15.18 17.96 15.04C17.68 14.9 16.32 14.23 16.06 14.14C15.81 14.05 15.63 14 15.44 14.28C15.25 14.56 14.74 15.18 14.58 15.36C14.42 15.55 14.26 15.57 13.98 15.43C13.7 15.29 12.8 15 11.74 14.05C10.91 13.31 10.35 12.4 10.21 12.16C10.07 11.92 10.2 11.79 10.34 11.65C10.47 11.52 10.63 11.31 10.77 11.15C10.91 10.99 10.96 10.87 11.05 10.69C11.14 10.5 11.1 10.34 11.03 10.2C10.96 10.06 10.4 8.69 10.17 8.13C9.94 7.59 9.71 7.66 9.54 7.65C9.38 7.65 9.2 7.42 9.05 7.42Z" />
          </svg>
          <span>{portfolioData.contact?.btnText || 'WhatsApp'}</span>
        </a>
      </section>

      {/* ========================================================
          8. FLOATING ADMIN TRIGGER BUTTON
          ======================================================== */}
      <button
        className="admin-floating-trigger"
        onClick={() => setIsAdminOpen(true)}
        title="Open Zaheer CMS Admin Panel (Password: Zaheer@339)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="admin-gear-spin"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span>CMS Admin</span>
      </button>

      {/* ========================================================
          9. ADMIN CMS MODAL
          ======================================================== */}
      {isAdminOpen && (
        <AdminPanel
          data={portfolioData}
          onUpdate={(updated) => setPortfolioData(updated)}
          onClose={() => {
            setIsAdminOpen(false)
            if (window.location.hash === '#admin') {
              window.history.replaceState(null, '', ' ')
            }
          }}
        />
      )}
    </div>
  )
}