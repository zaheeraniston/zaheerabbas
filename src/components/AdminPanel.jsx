import React, { useState } from 'react'
import './AdminPanel.css'
import { getDefaultPortfolioData, savePortfolioData, mergeWithDefaults } from '../data/defaultPortfolioData'
import { isSupabaseConfigured, saveCloudPortfolioData, fetchCloudPortfolioData } from '../lib/supabase'
import { compressImageFile } from '../lib/imageUtils'

// Professional Clean SVG Icons (Strictly No Emojis)
const Icons = {
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Save: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Logout: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Image: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Info: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Layers: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Code: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Briefcase: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Message: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Cloud: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  Upload: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Plus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Download: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
}

// Standalone photo editor block to prevent re-creation during render
function ImageEditorBlock({
  title,
  desc,
  currentSrc,
  fallbackSrc,
  onSave,
  onReset,
  maxDim = 1400,
  isProcessingImg,
  onUpload,
  showToast,
}) {
  const [urlInput, setUrlInput] = useState('')
  const [showUrlField, setShowUrlField] = useState(false)

  return (
    <div className="admin-photo-card">
      <div className="admin-photo-header">
        <div>
          <h4 className="admin-photo-title">{title}</h4>
          {desc && <p className="admin-photo-desc">{desc}</p>}
        </div>
        {currentSrc && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="admin-btn-text-danger"
            title="Revert to original default asset"
          >
            Reset to Default
          </button>
        )}
      </div>

      <div className="admin-photo-body">
        <div className="admin-photo-preview-wrap">
          <img
            src={currentSrc || fallbackSrc}
            alt={title}
            className="admin-photo-preview"
            onError={(e) => {
              if (fallbackSrc) e.currentTarget.src = fallbackSrc
            }}
          />
          {currentSrc ? (
            <span className="admin-badge-custom">Custom</span>
          ) : (
            <span className="admin-badge-default">Default</span>
          )}
        </div>

        <div className="admin-photo-actions">
          <label className="admin-btn-file-upload">
            <Icons.Upload />
            <span>Upload New Photo</span>
            <input
              type="file"
              accept="image/*"
              className="admin-file-hidden"
              disabled={isProcessingImg}
              onChange={(e) => onUpload && onUpload(e, onSave, maxDim)}
            />
          </label>

          <button
            type="button"
            className="admin-btn-url-toggle"
            onClick={() => setShowUrlField(!showUrlField)}
          >
            {showUrlField ? 'Close URL Input' : 'Paste Image URL'}
          </button>
        </div>
      </div>

      {showUrlField && (
        <div className="admin-photo-url-row">
          <input
            type="url"
            className="admin-input"
            placeholder="https://example.com/photo.webp"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            type="button"
            className="admin-btn-small"
            onClick={() => {
              if (urlInput.trim()) {
                onSave(urlInput.trim())
                setUrlInput('')
                setShowUrlField(false)
                if (showToast) showToast('Image URL applied.')
              }
            }}
          >
            Apply URL
          </button>
        </div>
      )}
    </div>
  )
}

export default function AdminPanel({ data, onUpdate, onClose }) {
  // Session Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('zaheer_admin_auth') === 'true'
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Form State cloned from props & merged with defaults
  const [formData, setFormData] = useState(() => mergeWithDefaults(data))
  const [activeTab, setActiveTab] = useState('hero')
  const [toastMsg, setToastMsg] = useState('')
  const [isProcessingImg, setIsProcessingImg] = useState(false)

  // Supabase Cloud State
  const [isCloudConfigured, setIsCloudConfigured] = useState(() => isSupabaseConfigured())
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(() => {
    return localStorage.getItem('zaheer_supabase_url') || import.meta.env.VITE_SUPABASE_URL || ''
  })
  const [supabaseKeyInput, setSupabaseKeyInput] = useState(() => {
    return localStorage.getItem('zaheer_supabase_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  })
  const [isSavingCloud, setIsSavingCloud] = useState(false)

  // Helper Toast
  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 4000)
  }

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault()
    const validUsers = ['zaheer', 'admin', 'zaheerabbas']
    const cleanUser = username.trim().toLowerCase()

    if (validUsers.includes(cleanUser) && password === 'Zaheer@339') {
      setIsAuthenticated(true)
      localStorage.setItem('zaheer_admin_auth', 'true')
      setLoginError('')
    } else {
      setLoginError('Authentication failed. Invalid username or master password.')
    }
  }

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('zaheer_admin_auth')
  }

  // Save changes (Local + Supabase Cloud)
  const handleSave = async () => {
    setIsSavingCloud(true)
    const success = savePortfolioData(formData)
    onUpdate(formData)

    if (isSupabaseConfigured()) {
      const cloudRes = await saveCloudPortfolioData(formData)
      setIsSavingCloud(false)
      if (cloudRes.success) {
        showToast('All changes saved and synchronized live to Supabase Cloud.')
      } else {
        showToast('Saved locally. Cloud sync notice: ' + (cloudRes.error || 'Check database table'))
      }
    } else {
      setIsSavingCloud(false)
      if (success) {
        showToast('Saved to LocalStorage. Configure Cloud Database for global live sync.')
      } else {
        showToast('Error saving changes. Please check console.')
      }
    }
  }

  // Handle saving Supabase Cloud Configuration directly from the UI
  const handleSaveSupabaseConfig = async () => {
    const cleanUrl = supabaseUrlInput.trim()
    const cleanKey = supabaseKeyInput.trim()
    if (!cleanUrl || !cleanKey) {
      alert('Please enter both your Supabase URL and Anon Public Key.')
      return
    }

    localStorage.setItem('zaheer_supabase_url', cleanUrl)
    localStorage.setItem('zaheer_supabase_key', cleanKey)
    setIsCloudConfigured(true)
    showToast('Testing Supabase Cloud connection...')

    const cloudData = await fetchCloudPortfolioData()
    if (cloudData) {
      showToast('Supabase connected. Cloud content loaded successfully.')
      const merged = mergeWithDefaults(cloudData)
      setFormData(merged)
      savePortfolioData(merged)
      onUpdate(merged)
    } else {
      const initRes = await saveCloudPortfolioData(formData)
      if (initRes.success) {
        showToast('Supabase connected. Initial portfolio data published to cloud.')
      } else {
        showToast('Connected. Please verify table creation in Supabase SQL editor.')
      }
    }
  }

  // High performance auto-compressing image uploader
  const handleImageUpload = async (e, callback, maxDim = 1400) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setIsProcessingImg(true)
      const compressedDataUrl = await compressImageFile(file, maxDim, 0.84)
      callback(compressedDataUrl)
      showToast('Photo optimized and loaded ready to publish.')
    } catch (err) {
      console.error('Image compression error:', err)
      showToast('Error processing image. Please try another file.')
    } finally {
      setIsProcessingImg(false)
    }
  }

  // Deep update helper
  const updateField = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  // Export JSON
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zaheer_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Backup exported successfully.')
  }

  // Import JSON
  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        setFormData(parsed)
        savePortfolioData(parsed)
        onUpdate(parsed)
        showToast('Backup restored and applied live.')
      } catch {
        alert('Invalid JSON file format.')
      }
    }
    reader.readAsText(file)
  }

  // Reset to Factory Default
  const handleReset = () => {
    if (window.confirm('Reset all website content back to factory defaults?')) {
      const defaults = getDefaultPortfolioData()
      setFormData(defaults)
      savePortfolioData(defaults)
      onUpdate(defaults)
      showToast('Reset to defaults completed.')
    }
  }

  // Helper to render standalone ImageEditorBlock with bound props
  const renderImageBlock = (props) => (
    <ImageEditorBlock
      {...props}
      isProcessingImg={isProcessingImg}
      onUpload={handleImageUpload}
      showToast={showToast}
    />
  )

  // ==========================================
  // 1. LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="admin-overlay">
        <div className="admin-login-wrap">
          <div className="admin-login-card">
            <div className="admin-badge-lock">
              <Icons.Lock />
            </div>
            <h2 className="admin-login-title">Control Room</h2>
            <p className="admin-login-sub">Secure Admin Portal • Authorization Required</p>

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="admin-field-group">
                <label className="admin-label">Admin Username</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. zaheer"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="admin-field-group">
                <label className="admin-label">Master Password</label>
                <input
                  type="password"
                  className="admin-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="admin-btn-primary">
                Unlock Command Center
              </button>

              {loginError && <div className="admin-login-error">{loginError}</div>}
            </form>

            <button onClick={onClose} className="admin-close-login">
              Return to Website
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="admin-overlay">
      {/* Top Navbar */}
      <header className="admin-navbar">
        <div className="admin-nav-brand">
          <span className="admin-status-dot"></span>
          <span className="admin-brand-title">Portfolio CMS</span>
          <span className="admin-brand-badge">Enterprise Studio</span>
          {isCloudConfigured ? (
            <span className="admin-status-pill online">
              <span className="pill-dot"></span> Cloud Synchronized
            </span>
          ) : (
            <span className="admin-status-pill offline">
              <span className="pill-dot"></span> Local Storage Only
            </span>
          )}
        </div>

        <div className="admin-nav-actions">
          <button onClick={handleSave} className="admin-btn-save" disabled={isSavingCloud || isProcessingImg}>
            <Icons.Save />
            <span>{isSavingCloud ? 'Synchronizing Cloud...' : 'Save & Publish'}</span>
          </button>
          <button onClick={onClose} className="admin-btn-view">
            <Icons.ExternalLink />
            <span>View Live Site</span>
          </button>
          <button onClick={handleLogout} className="admin-btn-logout">
            <Icons.Logout />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="admin-body">
        {/* Sidebar Navigation */}
        <aside className="admin-sidebar">
          <button
            className={`admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            <Icons.User />
            <span>Hero &amp; Profile</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'marquee' ? 'active' : ''}`}
            onClick={() => setActiveTab('marquee')}
          >
            <Icons.Image />
            <span>Marquee Photos</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <Icons.Info />
            <span>About &amp; 3D Floating</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Icons.Layers />
            <span>Services (01 - 05)</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Icons.Code />
            <span>Skills &amp; Tech Stack</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Icons.Briefcase />
            <span>Projects &amp; Gallery</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <Icons.Message />
            <span>Contact &amp; WhatsApp</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'cloud' ? 'active' : ''}`}
            onClick={() => setActiveTab('cloud')}
          >
            <Icons.Cloud />
            <span>Cloud &amp; Backup</span>
          </button>
        </aside>

        {/* Tab Content Panel */}
        <main className="admin-main-panel">
          {/* ========================================================
              TAB 1: HERO & 3D HEADSHOT
              ======================================================== */}
          {activeTab === 'hero' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Hero Section &amp; Visual Identity</h2>
                  <p className="admin-section-desc">Configure typography, main headlines, and custom 3D bust photography.</p>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Headlines &amp; Subtitle</h3>
                <div className="admin-grid-2">
                  <div className="admin-field-group">
                    <label className="admin-label">Greeting Badge</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.helloText}
                      onChange={(e) => updateField('hero', 'helloText', e.target.value)}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label className="admin-label">Prefix Text</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.imText}
                      onChange={(e) => updateField('hero', 'imText', e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Display Name / Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.hero.nameText}
                    onChange={(e) => updateField('hero', 'nameText', e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Hero Bio / Subtitle</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={formData.hero.subtitle}
                    onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-field-group">
                    <label className="admin-label">Action Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.btnText}
                      onChange={(e) => updateField('hero', 'btnText', e.target.value)}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label className="admin-label">Action Button Destination</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.hero.btnLink}
                      onChange={(e) => updateField('hero', 'btnLink', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Hero Graphics &amp; Photography</h3>
                <div className="admin-grid-2">
                  {renderImageBlock({
                    title: "3D Bust Headshot",
                    desc: "Transparent PNG or WebP portrait rendered with interactive mouse parallax.",
                    currentSrc: formData.hero.customHeadshot,
                    fallbackSrc: "src/assets/headshot.png",
                    onSave: (val) => updateField('hero', 'customHeadshot', val),
                    onReset: () => updateField('hero', 'customHeadshot', ''),
                  })}

                  {renderImageBlock({
                    title: "Holographic Arrow",
                    desc: "3D directional badge asset displayed alongside the greeting prefix.",
                    currentSrc: formData.hero.customArrow,
                    fallbackSrc: "src/assets/Arrow-opt.webp",
                    onSave: (val) => updateField('hero', 'customArrow', val),
                    onReset: () => updateField('hero', 'customArrow', ''),
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: MARQUEE SHOWCASE PHOTOS
              ======================================================== */}
          {activeTab === 'marquee' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Marquee Showcase Gallery</h2>
                  <p className="admin-section-desc">Manage every individual photo rotating in the infinite ticker rows.</p>
                </div>
              </div>

              {/* Row 1 */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 className="admin-card-title">Marquee Row 1 (Left Direction)</h3>
                    <p className="admin-section-desc">Showing {formData.marquee?.row1?.length || 0} rotating photographs.</p>
                  </div>
                  <label className="admin-btn-secondary" style={{ cursor: 'pointer' }}>
                    <Icons.Plus />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-file-hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (dataUrl) => {
                          setFormData((prev) => ({
                            ...prev,
                            marquee: {
                              ...prev.marquee,
                              row1: [...(prev.marquee?.row1 || []), dataUrl],
                            },
                          }))
                        })
                      }
                    />
                  </label>
                </div>

                <div className="admin-photo-grid">
                  {(formData.marquee?.row1 || []).map((imgSrc, idx) => (
                    <div key={`m1-${idx}`} className="admin-gallery-item">
                      <img src={imgSrc} alt={`Row 1 Item ${idx + 1}`} className="admin-gallery-thumb" />
                      <div className="admin-gallery-overlay">
                        <label className="admin-icon-btn" title="Replace this photo">
                          <Icons.Upload />
                          <input
                            type="file"
                            accept="image/*"
                            className="admin-file-hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (dataUrl) => {
                                const updated = [...formData.marquee.row1]
                                updated[idx] = dataUrl
                                setFormData((prev) => ({
                                  ...prev,
                                  marquee: { ...prev.marquee, row1: updated },
                                }))
                              })
                            }
                          />
                        </label>
                        <button
                          type="button"
                          className="admin-icon-btn danger"
                          title="Remove photo"
                          onClick={() => {
                            const updated = formData.marquee.row1.filter((_, i) => i !== idx)
                            setFormData((prev) => ({
                              ...prev,
                              marquee: { ...prev.marquee, row1: updated },
                            }))
                          }}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 className="admin-card-title">Marquee Row 2 (Right Direction)</h3>
                    <p className="admin-section-desc">Showing {formData.marquee?.row2?.length || 0} rotating photographs.</p>
                  </div>
                  <label className="admin-btn-secondary" style={{ cursor: 'pointer' }}>
                    <Icons.Plus />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-file-hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (dataUrl) => {
                          setFormData((prev) => ({
                            ...prev,
                            marquee: {
                              ...prev.marquee,
                              row2: [...(prev.marquee?.row2 || []), dataUrl],
                            },
                          }))
                        })
                      }
                    />
                  </label>
                </div>

                <div className="admin-photo-grid">
                  {(formData.marquee?.row2 || []).map((imgSrc, idx) => (
                    <div key={`m2-${idx}`} className="admin-gallery-item">
                      <img src={imgSrc} alt={`Row 2 Item ${idx + 1}`} className="admin-gallery-thumb" />
                      <div className="admin-gallery-overlay">
                        <label className="admin-icon-btn" title="Replace this photo">
                          <Icons.Upload />
                          <input
                            type="file"
                            accept="image/*"
                            className="admin-file-hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (dataUrl) => {
                                const updated = [...formData.marquee.row2]
                                updated[idx] = dataUrl
                                setFormData((prev) => ({
                                  ...prev,
                                  marquee: { ...prev.marquee, row2: updated },
                                }))
                              })
                            }
                          />
                        </label>
                        <button
                          type="button"
                          className="admin-icon-btn danger"
                          title="Remove photo"
                          onClick={() => {
                            const updated = formData.marquee.row2.filter((_, i) => i !== idx)
                            setFormData((prev) => ({
                              ...prev,
                              marquee: { ...prev.marquee, row2: updated },
                            }))
                          }}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: ABOUT & 3D FLOATING
              ======================================================== */}
          {activeTab === 'about' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">About &amp; 3D Floating Elements</h2>
                  <p className="admin-section-desc">Manage biography, statistics badges, and the 4 interactive 3D floating assets.</p>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Biography &amp; Core Content</h3>
                <div className="admin-field-group">
                  <label className="admin-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.about.title}
                    onChange={(e) => updateField('about', 'title', e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Full Bio Text</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    value={formData.about.bio}
                    onChange={(e) => updateField('about', 'bio', e.target.value)}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-field-group">
                    <label className="admin-label">Button Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.about.btnText}
                      onChange={(e) => updateField('about', 'btnText', e.target.value)}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label className="admin-label">Button Target Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.about.btnLink}
                      onChange={(e) => updateField('about', 'btnLink', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Statistics Counters */}
              <div className="admin-card">
                <h3 className="admin-card-title">Statistics Indicators</h3>
                <div className="admin-grid-3">
                  {(formData.about.stats || []).map((st, sIdx) => (
                    <div key={st.id || sIdx} className="admin-stat-edit-card">
                      <div className="admin-field-group">
                        <label className="admin-label">Counter Value</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.num}
                          onChange={(e) => {
                            const updated = [...formData.about.stats]
                            updated[sIdx] = { ...updated[sIdx], num: e.target.value }
                            updateField('about', 'stats', updated)
                          }}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-label">Metric Label</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={st.label}
                          onChange={(e) => {
                            const updated = [...formData.about.stats]
                            updated[sIdx] = { ...updated[sIdx], label: e.target.value }
                            updateField('about', 'stats', updated)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Interactive Floating 3D Assets */}
              <div className="admin-card">
                <h3 className="admin-card-title">Interactive Floating 3D Objects</h3>
                <p className="admin-section-desc">
                  These 4 images float with organic physics and react to visitor mouse/touch movements in real-time.
                </p>

                <div className="admin-grid-2" style={{ marginTop: '16px' }}>
                  {renderImageBlock({
                    title: "Floating Coffee Cup",
                    desc: "Top-left hovering 3D ceramic coffee model.",
                    currentSrc: formData.floatingElements?.coffee,
                    fallbackSrc: "src/assets/Coffee-opt.webp",
                    onSave: (val) =>
                      setFormData((prev) => ({
                        ...prev,
                        floatingElements: { ...prev.floatingElements, coffee: val },
                      })),
                    onReset: () =>
                      setFormData((prev) => ({
                        ...prev,
                        floatingElements: { ...prev.floatingElements, coffee: '' },
                      })),
                  })}

                  {renderImageBlock({
                    title: "Floating Gold Key",
                    desc: "Top-right hovering 3D golden key model.",
                    currentSrc: formData.floatingElements?.key,
                    fallbackSrc: "src/assets/Key-opt.webp",
                    onSave: (val) =>
                      setFormData((prev) => ({
                        ...prev,
                        floatingElements: { ...prev.floatingElements, key: val },
                      })),
                    onReset: () =>
                      setFormData((prev) => ({
                        ...prev,
                        floatingElements: { ...prev.floatingElements, key: '' },
                      })),
                  })}

                  {renderImageBlock({
                    title: "Floating Paper Plane",
                    desc: "Bottom-left origami glider model.",
                    currentSrc: formData.floatingElements?.plane,
                    fallbackSrc: "src/assets/Plane-opt.webp",
                    onSave: (val) =>
                      setFormData((prev) => ({
                        ...prev,
                        floatingElements: { ...prev.floatingElements, plane: val },
                      })),
                    onReset: () =>
                      setFormData((prev) => ({
                        ...prev,
                        floatingElements: { ...prev.floatingElements, plane: '' },
                      })),
                  })}

                  {renderImageBlock({
                    title: "Floating Diamond Ring",
                    desc: "Bottom-right spinning solitaire diamond asset.",
                    currentSrc: formData.floatingElements?.ring,
                    fallbackSrc: "src/assets/Ring-opt.webp",
                    onSave: (val) =>
                      setFormData((prev) => ({
                        ...prev,
                        floatingElements: { ...prev.floatingElements, ring: val },
                      })),
                    onReset: () =>
                      setFormData((prev) => ({
                        ...prev,
                        floatingElements: { ...prev.floatingElements, ring: '' },
                      })),
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: SERVICES
              ======================================================== */}
          {activeTab === 'services' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Services &amp; Offerings</h2>
                  <p className="admin-section-desc">Manage service numbers, titles, descriptions, and custom showcase images.</p>
                </div>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => {
                    const nextNum = (formData.services?.length || 0) + 1
                    const paddedNum = nextNum < 10 ? `0${nextNum}` : `${nextNum}`
                    const newSrv = {
                      id: `srv-${Date.now()}`,
                      num: paddedNum,
                      title: 'New Service Offering',
                      desc: 'Bespoke, high-performance digital solutions engineered to your vision.',
                      img: '',
                    }
                    setFormData((prev) => ({
                      ...prev,
                      services: [...(prev.services || []), newSrv],
                    }))
                    showToast('New service slot added.')
                  }}
                >
                  <Icons.Plus />
                  <span>Add Service</span>
                </button>
              </div>

              {(formData.services || []).map((srv, idx) => (
                <div key={srv.id || idx} className="admin-card">
                  <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="admin-card-badge">Service {srv.num}</span>
                      <h3 className="admin-card-title">{srv.title}</h3>
                    </div>
                    {formData.services.length > 1 && (
                      <button
                        type="button"
                        className="admin-btn-text-danger"
                        onClick={() => {
                          if (window.confirm(`Delete service "${srv.title}"?`)) {
                            const updated = formData.services.filter((_, i) => i !== idx)
                            setFormData((prev) => ({ ...prev, services: updated }))
                            showToast('Service removed.')
                          }
                        }}
                      >
                        <Icons.Trash />
                        <span>Remove Service</span>
                      </button>
                    )}
                  </div>

                  <div className="admin-grid-2" style={{ alignItems: 'flex-start' }}>
                    <div>
                      <div className="admin-field-group">
                        <label className="admin-label">Service Sequence Number</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={srv.num}
                          onChange={(e) => {
                            const updated = [...formData.services]
                            updated[idx] = { ...updated[idx], num: e.target.value }
                            setFormData((prev) => ({ ...prev, services: updated }))
                          }}
                        />
                      </div>

                      <div className="admin-field-group">
                        <label className="admin-label">Service Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={srv.title}
                          onChange={(e) => {
                            const updated = [...formData.services]
                            updated[idx] = { ...updated[idx], title: e.target.value }
                            setFormData((prev) => ({ ...prev, services: updated }))
                          }}
                        />
                      </div>

                      <div className="admin-field-group">
                        <label className="admin-label">Service Description</label>
                        <textarea
                          rows={3}
                          className="admin-textarea"
                          value={srv.desc}
                          onChange={(e) => {
                            const updated = [...formData.services]
                            updated[idx] = { ...updated[idx], desc: e.target.value }
                            setFormData((prev) => ({ ...prev, services: updated }))
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      {renderImageBlock({
                        title: `Service ${srv.num} Showcase Image`,
                        desc: "Detailed graphic displayed alongside the service row on hover.",
                        currentSrc: srv.img,
                        fallbackSrc: `src/assets/0${idx + 1}-a39606cd-opt.webp`,
                        onSave: (val) => {
                          const updated = [...formData.services]
                          updated[idx] = { ...updated[idx], img: val }
                          setFormData((prev) => ({ ...prev, services: updated }))
                        },
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========================================================
              TAB 5: SKILLS & TECH STACK
              ======================================================== */}
          {activeTab === 'skills' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Skills &amp; Engineering Matrix</h2>
                  <p className="admin-section-desc">Manage technical proficiencies, categories, badges, experience levels, and technology cards.</p>
                </div>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => {
                    const newSkill = {
                      id: `skill-${Date.now()}`,
                      name: 'New Technology',
                      category: 'frontend',
                      categoryLabel: 'Modern Frontend',
                      level: 90,
                      exp: '3+ Years',
                      badge: 'Advanced',
                      accent: '#61dafb',
                      glow: 'rgba(97, 218, 251, 0.45)',
                      tags: ['Framework', 'Modern API'],
                      summary: 'Production mastery, scalable patterns, and high-performance implementation.',
                    }
                    const updated = [...(formData.skills?.items || []), newSkill]
                    updateField('skills', 'items', updated)
                    showToast('New skill added to matrix.')
                  }}
                >
                  <Icons.Plus />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Header &amp; Subtitle</h3>
                <div className="admin-field-group">
                  <label className="admin-label">Section Tagline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.skills?.badgeTop || ''}
                    onChange={(e) => updateField('skills', 'badgeTop', e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Section Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.skills?.title || ''}
                    onChange={(e) => updateField('skills', 'title', e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Section Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={formData.skills?.subtitle || ''}
                    onChange={(e) => updateField('skills', 'subtitle', e.target.value)}
                  />
                </div>
              </div>

              {/* Individual Skill Cards */}
              <div className="admin-card">
                <h3 className="admin-card-title">Technologies &amp; Proficiency Grid</h3>
                <div className="admin-skills-edit-grid">
                  {(formData.skills?.items || []).map((sk, idx) => (
                    <div key={sk.id || idx} className="admin-skill-box">
                      <div className="admin-skill-box-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span className="admin-skill-id">{sk.id}</span>
                          <span className="admin-skill-badge" style={{ borderColor: sk.accent || '#61dafb', color: sk.accent || '#61dafb' }}>
                            {sk.badge}
                          </span>
                        </div>
                        {formData.skills?.items?.length > 1 && (
                          <button
                            type="button"
                            className="admin-btn-text-danger"
                            style={{ padding: '2px 8px', fontSize: '0.78rem' }}
                            onClick={() => {
                              if (window.confirm(`Delete skill "${sk.name}"?`)) {
                                const updated = formData.skills.items.filter((_, i) => i !== idx)
                                updateField('skills', 'items', updated)
                                showToast('Skill removed.')
                              }
                            }}
                          >
                            <Icons.Trash />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>

                      <div className="admin-field-group">
                        <label className="admin-label">Technology Name</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={sk.name}
                          onChange={(e) => {
                            const updated = [...formData.skills.items]
                            updated[idx] = { ...updated[idx], name: e.target.value }
                            updateField('skills', 'items', updated)
                          }}
                        />
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-group">
                          <label className="admin-label">Filter Category</label>
                          <select
                            className="admin-input"
                            value={sk.category || 'frontend'}
                            onChange={(e) => {
                              const cat = e.target.value
                              const defaultLabels = {
                                frontend: 'Modern Frontend',
                                backend: 'Backend & APIs',
                                mobile: 'Mobile Apps',
                                tools: 'DevOps & AI',
                              }
                              const updated = [...formData.skills.items]
                              updated[idx] = {
                                ...updated[idx],
                                category: cat,
                                categoryLabel: defaultLabels[cat] || updated[idx].categoryLabel || 'Engineering',
                              }
                              updateField('skills', 'items', updated)
                            }}
                          >
                            <option value="frontend">Frontend &amp; UI</option>
                            <option value="backend">Backend &amp; APIs</option>
                            <option value="mobile">Mobile Apps</option>
                            <option value="tools">DevOps &amp; AI</option>
                          </select>
                        </div>
                        <div className="admin-field-group">
                          <label className="admin-label">Category Subhead</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={sk.categoryLabel || ''}
                            onChange={(e) => {
                              const updated = [...formData.skills.items]
                              updated[idx] = { ...updated[idx], categoryLabel: e.target.value }
                              updateField('skills', 'items', updated)
                            }}
                          />
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-group">
                          <label className="admin-label">
                            Proficiency: <strong>{sk.level}%</strong>
                          </label>
                          <input
                            type="range"
                            min="30"
                            max="100"
                            className="admin-range"
                            value={sk.level}
                            onChange={(e) => {
                              const updated = [...formData.skills.items]
                              updated[idx] = { ...updated[idx], level: Number(e.target.value) }
                              updateField('skills', 'items', updated)
                            }}
                          />
                        </div>
                        <div className="admin-field-group">
                          <label className="admin-label">Accent / Glow Color</label>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                              type="color"
                              value={sk.accent?.startsWith('#') && sk.accent.length === 7 ? sk.accent : '#61dafb'}
                              onChange={(e) => {
                                const col = e.target.value
                                const updated = [...formData.skills.items]
                                updated[idx] = {
                                  ...updated[idx],
                                  accent: col,
                                  glow: `${col}66`,
                                }
                                updateField('skills', 'items', updated)
                              }}
                              style={{ width: '38px', height: '38px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: '6px' }}
                            />
                            <input
                              type="text"
                              className="admin-input"
                              value={sk.accent || '#61dafb'}
                              onChange={(e) => {
                                const updated = [...formData.skills.items]
                                updated[idx] = { ...updated[idx], accent: e.target.value }
                                updateField('skills', 'items', updated)
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-field-group">
                          <label className="admin-label">Experience</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={sk.exp}
                            onChange={(e) => {
                              const updated = [...formData.skills.items]
                              updated[idx] = { ...updated[idx], exp: e.target.value }
                              updateField('skills', 'items', updated)
                            }}
                          />
                        </div>
                        <div className="admin-field-group">
                          <label className="admin-label">Level Badge</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={sk.badge}
                            onChange={(e) => {
                              const updated = [...formData.skills.items]
                              updated[idx] = { ...updated[idx], badge: e.target.value }
                              updateField('skills', 'items', updated)
                            }}
                          />
                        </div>
                      </div>

                      <div className="admin-field-group">
                        <label className="admin-label">Tags (comma separated)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={Array.isArray(sk.tags) ? sk.tags.join(', ') : (sk.tags || '')}
                          onChange={(e) => {
                            const tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                            const updated = [...formData.skills.items]
                            updated[idx] = { ...updated[idx], tags }
                            updateField('skills', 'items', updated)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: PROJECTS (WORK)
              ======================================================== */}
          {activeTab === 'projects' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Projects &amp; Case Studies</h2>
                  <p className="admin-section-desc">Manage every project and replace any of its 3 showcase photographs.</p>
                </div>
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => {
                    const newProj = {
                      id: `proj-${Date.now()}`,
                      num: `0${(formData.projects?.length || 0) + 1}`,
                      title: 'New Project',
                      tag: 'Design & Code',
                      liveUrl: 'https://wa.me/918822849800',
                      imgs: ['', '', ''],
                    }
                    setFormData((prev) => ({
                      ...prev,
                      projects: [...(prev.projects || []), newProj],
                    }))
                    showToast('New project slot added.')
                  }}
                >
                  <Icons.Plus />
                  <span>Add Project</span>
                </button>
              </div>

              {(formData.projects || []).map((proj, pIdx) => (
                <div key={proj.id || pIdx} className="admin-card">
                  <div className="admin-card-header">
                    <div>
                      <span className="admin-card-badge">Project {proj.num}</span>
                      <h3 className="admin-card-title">{proj.title}</h3>
                    </div>
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        className="admin-btn-text-danger"
                        onClick={() => {
                          if (window.confirm(`Delete project "${proj.title}"?`)) {
                            const updated = formData.projects.filter((_, i) => i !== pIdx)
                            setFormData((prev) => ({ ...prev, projects: updated }))
                            showToast('Project removed.')
                          }
                        }}
                      >
                        <Icons.Trash />
                        <span>Remove Project</span>
                      </button>
                    )}
                  </div>

                  <div className="admin-grid-3">
                    <div className="admin-field-group">
                      <label className="admin-label">Project Index Number</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={proj.num}
                        onChange={(e) => {
                          const updated = [...formData.projects]
                          updated[pIdx] = { ...updated[pIdx], num: e.target.value }
                          setFormData((prev) => ({ ...prev, projects: updated }))
                        }}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-label">Project Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...formData.projects]
                          updated[pIdx] = { ...updated[pIdx], title: e.target.value }
                          setFormData((prev) => ({ ...prev, projects: updated }))
                        }}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-label">Category / Role Tag</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={proj.tag}
                        onChange={(e) => {
                          const updated = [...formData.projects]
                          updated[pIdx] = { ...updated[pIdx], tag: e.target.value }
                          setFormData((prev) => ({ ...prev, projects: updated }))
                        }}
                      />
                    </div>
                  </div>

                  <div className="admin-field-group" style={{ marginTop: '12px' }}>
                    <label className="admin-label">Live URL / WhatsApp Link</label>
                    <input
                      type="url"
                      className="admin-input"
                      value={proj.liveUrl}
                      onChange={(e) => {
                        const updated = [...formData.projects]
                        updated[pIdx] = { ...updated[pIdx], liveUrl: e.target.value }
                        setFormData((prev) => ({ ...prev, projects: updated }))
                      }}
                    />
                  </div>

                  {/* 3 Photos for this project */}
                  <h4 className="admin-subhead" style={{ marginTop: '20px' }}>Project Photography (3 Images)</h4>
                  <div className="admin-grid-3">
                    {renderImageBlock({
                      title: "Main Cover Image",
                      desc: "Large left hero preview.",
                      currentSrc: proj.imgs?.[0],
                      onSave: (val) => {
                        const updated = [...formData.projects]
                        const imgs = [...(updated[pIdx].imgs || ['', '', ''])]
                        imgs[0] = val
                        updated[pIdx] = { ...updated[pIdx], imgs }
                        setFormData((prev) => ({ ...prev, projects: updated }))
                      },
                    })}

                    {renderImageBlock({
                      title: "Detail Photo 1",
                      desc: "Top right detail view.",
                      currentSrc: proj.imgs?.[1],
                      onSave: (val) => {
                        const updated = [...formData.projects]
                        const imgs = [...(updated[pIdx].imgs || ['', '', ''])]
                        imgs[1] = val
                        updated[pIdx] = { ...updated[pIdx], imgs }
                        setFormData((prev) => ({ ...prev, projects: updated }))
                      },
                    })}

                    {renderImageBlock({
                      title: "Detail Photo 2",
                      desc: "Bottom right detail view.",
                      currentSrc: proj.imgs?.[2],
                      onSave: (val) => {
                        const updated = [...formData.projects]
                        const imgs = [...(updated[pIdx].imgs || ['', '', ''])]
                        imgs[2] = val
                        updated[pIdx] = { ...updated[pIdx], imgs }
                        setFormData((prev) => ({ ...prev, projects: updated }))
                      },
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========================================================
              TAB 7: CONTACT & WHATSAPP
              ======================================================== */}
          {activeTab === 'contact' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Contact &amp; Communication Channels</h2>
                  <p className="admin-section-desc">Manage direct messaging numbers, pitch paragraph, and call-to-actions.</p>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title">Call to Action &amp; Pitch</h3>
                <div className="admin-field-group">
                  <label className="admin-label">Section Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.contact?.title || ''}
                    onChange={(e) => updateField('contact', 'title', e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Pitch Paragraph</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={formData.contact?.pText || ''}
                    onChange={(e) => updateField('contact', 'pText', e.target.value)}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-field-group">
                    <label className="admin-label">WhatsApp Number (With Country Code)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 918822849800"
                      value={formData.contact?.whatsappNumber || ''}
                      onChange={(e) => updateField('contact', 'whatsappNumber', e.target.value)}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label className="admin-label">Button Display Text</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.contact?.btnText || ''}
                      onChange={(e) => updateField('contact', 'btnText', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 8: CLOUD DATABASE & BACKUPS
              ======================================================== */}
          {activeTab === 'cloud' && (
            <div>
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-section-title">Cloud Database &amp; Data Backups</h2>
                  <p className="admin-section-desc">Manage real-time cloud synchronization, project backups, and system reset.</p>
                </div>
              </div>

              {/* Supabase Cloud Sync Card */}
              <div className="admin-card" style={{ border: '1px solid rgba(59, 130, 246, 0.4)', background: 'rgba(59, 130, 246, 0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 className="admin-card-title" style={{ color: '#60a5fa', margin: 0 }}>
                    Supabase Cloud Database
                  </h3>
                  {isCloudConfigured ? (
                    <span className="admin-status-pill online">
                      <span className="pill-dot"></span> Online &amp; Synchronized
                    </span>
                  ) : (
                    <span className="admin-status-pill offline">
                      <span className="pill-dot"></span> Offline (Local Storage Mode)
                    </span>
                  )}
                </div>
                <p className="admin-section-desc" style={{ marginTop: '8px' }}>
                  Edits saved here are pushed directly to your Supabase cloud table and reflected globally across all visitor devices.
                </p>

                <div className="admin-field-group" style={{ marginTop: '16px' }}>
                  <label className="admin-label">Supabase Project URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="https://your-project.supabase.co"
                    value={supabaseUrlInput}
                    onChange={(e) => setSupabaseUrlInput(e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-label">Supabase Anon Public API Key</label>
                  <input
                    type="password"
                    className="admin-input"
                    placeholder="sb_publishable_... or eyJ..."
                    value={supabaseKeyInput}
                    onChange={(e) => setSupabaseKeyInput(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
                  <button
                    type="button"
                    onClick={handleSaveSupabaseConfig}
                    className="admin-btn-primary"
                    style={{ width: 'auto', background: '#2563eb' }}
                  >
                    <Icons.Save />
                    <span>Save Credentials &amp; Test Connection</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      showToast('Fetching latest cloud data...')
                      const cloudData = await fetchCloudPortfolioData()
                      if (cloudData) {
                        setFormData(cloudData)
                        savePortfolioData(cloudData)
                        onUpdate(cloudData)
                        showToast('Cloud data loaded and applied live.')
                      } else {
                        showToast('Could not fetch cloud data. Check connection.')
                      }
                    }}
                    className="admin-btn-secondary"
                    style={{ width: 'auto' }}
                  >
                    <Icons.Refresh />
                    <span>Pull Cloud Data</span>
                  </button>
                </div>
              </div>

              {/* JSON Backup & Restore */}
              <div className="admin-card">
                <h3 className="admin-card-title">JSON Archive Backup</h3>
                <p className="admin-section-desc" style={{ marginTop: '6px' }}>
                  Download a complete portable JSON snapshot containing all text content, uploaded imagery, and configurations.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px' }}>
                  <button type="button" onClick={handleExport} className="admin-btn-secondary" style={{ width: 'auto' }}>
                    <Icons.Download />
                    <span>Download Backup JSON</span>
                  </button>
                  <label className="admin-btn-secondary" style={{ width: 'auto', cursor: 'pointer' }}>
                    <Icons.Upload />
                    <span>Restore From JSON</span>
                    <input type="file" accept=".json,application/json" className="admin-file-hidden" onChange={handleImport} />
                  </label>
                </div>
              </div>

              {/* Factory Reset */}
              <div className="admin-card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <h3 className="admin-card-title" style={{ color: '#f87171' }}>
                  Factory Reset
                </h3>
                <p className="admin-section-desc" style={{ marginTop: '6px' }}>
                  Reverts all customizations, texts, and photo links back to pristine original defaults.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="admin-btn-danger"
                  style={{ marginTop: '14px', width: 'auto' }}
                >
                  <Icons.Trash />
                  <span>Reset Everything to Default</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Notification Toast */}
      {toastMsg && (
        <div className="admin-toast">
          <Icons.Check />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  )
}
