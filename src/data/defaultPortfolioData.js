// ========================================================
// DEFAULT PORTFOLIO DATA FOR ZAHEER ABBAS
// Fully editable via the Admin Panel (Password: Zaheer@339)
// ========================================================

// Marquee Row 1 Assets
import mq1_1 from '../assets/1.1-opt.webp'
import mq1_2 from '../assets/1.2-opt.webp'
import mq1_3 from '../assets/1.3-opt.webp'
import mq1_4 from '../assets/1.4-opt.webp'
import mq1_5 from '../assets/1.5-opt.webp'
import mq1_6 from '../assets/1.6-opt.webp'

// Marquee Row 2 Assets
import mq2_1 from '../assets/2.1-opt.webp'
import mq2_2 from '../assets/2.2-opt.webp'
import mq2_3 from '../assets/2.3-opt.webp'
import mq2_4 from '../assets/2.4-opt.webp'

// Services Assets
import srv1 from '../assets/01-a39606cd-opt.webp'
import srv2 from '../assets/02-ef56f357-opt.webp'
import srv3 from '../assets/03-1f0e1c0c-opt.webp'
import srv4 from '../assets/04-c8543689-opt.webp'
import srv5 from '../assets/05-ca8255fb-opt.webp'

// Projects Assets
import p1_1 from '../assets/1.1-7eb20070-opt.webp'
import p1_2 from '../assets/1.2-78d2a765-opt.webp'
import p1_3 from '../assets/1.3-df03ffe1-opt.webp'

import p2_1 from '../assets/2.1-eb059e2a-opt.webp'
import p2_2 from '../assets/2.2-0d70bcd5-opt.webp'
import p2_3 from '../assets/2.3-de149467-opt.webp'

import p3_1 from '../assets/3.1-opt.webp'
import p3_2 from '../assets/3.2-opt.webp'
import p3_3 from '../assets/3.3-opt.webp'

export const STORAGE_KEY = 'zaheer_portfolio_custom_data_v1'

export const getDefaultPortfolioData = () => ({
  hero: {
    helloText: 'Hello',
    imText: "I'M",
    nameText: 'Zaheer',
    subtitle: 'Designer & developer crafting bold digital experiences that make brands impossible to ignore.',
    btnText: 'Contact Me',
    btnLink: '#contact',
    customHeadshot: '', // base64 or URL; empty means use default
    customArrow: '', // base64 or URL; empty means use default
  },
  floatingElements: {
    coffee: '',
    key: '',
    plane: '',
    ring: '',
  },
  marquee: {
    row1: [mq1_1, mq1_2, mq1_3, mq1_4, mq1_5, mq1_6],
    row2: [mq2_1, mq2_2, mq2_3, mq2_4],
  },
  about: {
    title: 'About',
    badges: [
      'Full Stack Developer',
      'React & PHP Specialist',
      'Backend Developer',
      'UI & UX Designer',
      'Certified in Artificial Intelligence by Infosys',
      '6+ Years Experience',
      'Dhubri, Assam',
    ],
    bio: 'Full Stack Developer, React & PHP specialist, and Backend Architect with 6+ years of industry experience creating high-impact digital products. Certified in Artificial Intelligence by Infosys. Turning complex logic into seamless, intuitive interfaces from Dhubri, Assam.',
    stats: [
      { id: '1', num: '6+', label: 'Years Experience' },
      { id: '2', num: 'Infosys', label: 'AI Certified' },
      { id: '3', num: 'Assam', label: 'Dhubri, India' },
    ],
    btnText: 'Explore Skills',
    btnLink: '#skills',
  },
  services: [
    {
      id: 'srv-1',
      num: '01',
      title: 'Web Design',
      desc: 'Effortless, Unforgettable Interfaces.',
      img: srv1,
    },
    {
      id: 'srv-2',
      num: '02',
      title: 'Application Development',
      desc: 'Fast, scalable code for web & mobile apps.',
      img: srv2,
    },
    {
      id: 'srv-3',
      num: '03',
      title: 'Logo And Branding Design',
      desc: 'Identities with a voice you can hear.',
      img: srv3,
    },
    {
      id: 'srv-4',
      num: '04',
      title: 'SEO',
      desc: 'Targeted visibility that drives top-ranking results.',
      img: srv4,
    },
    {
      id: 'srv-5',
      num: '05',
      title: 'Any Type Of Custom Website And App Development',
      desc: 'Bespoke, complex digital solutions engineered to your vision.',
      img: srv5,
    },
  ],
  skills: {
    title: 'Skills',
    badgeTop: 'ENGINEERING MATRIX • 6+ YEARS EXPERIENCE',
    subtitle: 'Mastering Modern Frontend, High-Concurrency Backends, Mobile Ecosystems & Enterprise AI.',
    categories: [
      { id: 'all', label: 'All Technologies', count: 12 },
      { id: 'frontend', label: 'Frontend & UI', count: 6 },
      { id: 'backend', label: 'Backend & APIs', count: 2 },
      { id: 'mobile', label: 'Mobile Apps', count: 2 },
      { id: 'tools', label: 'DevOps & AI', count: 2 },
    ],
    items: [
      {
        id: 'react',
        name: 'React.js',
        category: 'frontend',
        categoryLabel: 'Modern Frontend',
        level: 96,
        exp: '6+ Years',
        badge: 'Core Specialist',
        accent: '#61dafb',
        glow: 'rgba(97, 218, 251, 0.45)',
        tags: ['React 19 & Hooks', 'Next.js SSR', 'Zustand & Redux', 'Micro-Frontends'],
        summary: 'Deep architectural mastery of React internals, reconciliation engine, custom hook patterns, and high-fps animations.',
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        category: 'frontend',
        categoryLabel: 'React Framework',
        level: 95,
        exp: '4+ Years',
        badge: 'Advanced',
        accent: '#ffffff',
        glow: 'rgba(255, 255, 255, 0.35)',
        tags: ['App Router & RSC', 'Server Actions', 'SSR & Static Generation', 'Edge Middleware'],
        summary: 'Production Next.js systems featuring server-side rendering, incremental static regeneration, and turbo-speed edge delivery.',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'frontend',
        categoryLabel: 'Typed JavaScript',
        level: 94,
        exp: '5+ Years',
        badge: 'Advanced',
        accent: '#3178c6',
        glow: 'rgba(49, 120, 198, 0.45)',
        tags: ['Strict Typing', 'Generics & Utilities', 'Enterprise Contracts', 'Zero Any Policy'],
        summary: 'End-to-end type safety, strict interface contracts, and scalable refactoring across multi-developer codebases.',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        category: 'frontend',
        categoryLabel: 'Core Web Engine',
        level: 98,
        exp: '6+ Years',
        badge: 'Mastery',
        accent: '#f7df1e',
        glow: 'rgba(247, 223, 30, 0.45)',
        tags: ['ES6+ Modern Syntax', 'V8 Optimization', 'Event Loop Async', 'Canvas & 3D Math'],
        summary: 'Deep mastery of the V8 JavaScript engine, closures, prototype chaining, asynchronous event loops, and DOM performance.',
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        category: 'backend',
        categoryLabel: 'Backend Runtime',
        level: 92,
        exp: '5+ Years',
        badge: 'Backend Expert',
        accent: '#539e43',
        glow: 'rgba(83, 158, 67, 0.45)',
        tags: ['Express / Fastify', 'REST & GraphQL', 'WebSockets Realtime', 'Microservices'],
        summary: 'Scalable backend microservices, real-time socket events, async worker queues, and secure payment processing.',
      },
      {
        id: 'php',
        name: 'PHP & Laravel',
        category: 'backend',
        categoryLabel: 'Server Architect',
        level: 95,
        exp: '6+ Years',
        badge: 'Veteran',
        accent: '#777bb4',
        glow: 'rgba(119, 123, 180, 0.45)',
        tags: ['Laravel Eloquent', 'MySQL High Concurrency', 'REST APIs', 'Enterprise CMS'],
        summary: '6+ years designing enterprise PHP systems, MySQL schema optimization, secure authentication, and resilient APIs.',
      },
      {
        id: 'reactnative',
        name: 'React Native',
        category: 'mobile',
        categoryLabel: 'Cross-Platform Mobile',
        level: 90,
        exp: '4+ Years',
        badge: 'Mobile Specialist',
        accent: '#61dafb',
        glow: 'rgba(97, 218, 251, 0.45)',
        tags: ['Expo & Bare CLI', 'Reanimated 3', 'Native Device APIs', 'iOS & Android App Store'],
        summary: 'Butter-smooth mobile apps deployed across iOS App Store & Android Play Store with 60fps gesture physics.',
      },
      {
        id: 'flutter',
        name: 'Flutter & Dart',
        category: 'mobile',
        categoryLabel: 'Cross-Platform UI',
        level: 88,
        exp: '3+ Years',
        badge: 'Mobile Pro',
        accent: '#02569b',
        glow: 'rgba(2, 86, 155, 0.45)',
        tags: ['Dart Async', 'Custom Painter & Canvas', 'BLoC & Riverpod', 'Material 3 & Cupertino'],
        summary: 'Pixel-perfect multi-platform UI applications with declarative widget trees, responsive layouts, and native speed.',
      },
      {
        id: 'git',
        name: 'Git & GitHub',
        category: 'tools',
        categoryLabel: 'DevOps & Version Control',
        level: 96,
        exp: '6+ Years',
        badge: 'DevOps Pro',
        accent: '#f05032',
        glow: 'rgba(240, 80, 50, 0.45)',
        tags: ['Gitflow Branching', 'GitHub Actions CI/CD', 'Automated Testing', 'Docker Workflows'],
        summary: 'Automated continuous integration and deployment pipelines with Gitflow, GitHub Actions, Docker, and zero-downtime releases.',
      },
      {
        id: 'npm',
        name: 'npm / Tooling',
        category: 'tools',
        categoryLabel: 'Package Ecosystem',
        level: 94,
        exp: '6+ Years',
        badge: 'Tooling Master',
        accent: '#cb3837',
        glow: 'rgba(203, 56, 55, 0.45)',
        tags: ['Vite & Webpack', 'Turbopack Monorepos', 'npm Package Publishing', 'Lint & Prettier CI'],
        summary: 'Lightning-fast bundle optimization, custom npm package architectures, monorepo setups, and tree-shaking.',
      },
      {
        id: 'html5',
        name: 'HTML5 & Modern CSS',
        category: 'frontend',
        categoryLabel: 'Web Standards',
        level: 99,
        exp: '6+ Years',
        badge: 'Mastery',
        accent: '#e34f26',
        glow: 'rgba(227, 79, 38, 0.45)',
        tags: ['Semantic HTML5', 'CSS Grid & Flexbox', 'GPU Keyframes', 'WCAG Accessibility'],
        summary: 'High-speed semantic structure, fluid responsive layouts, complex keyframe animations, and strict WCAG accessibility.',
      },
      {
        id: 'uiux3d',
        name: 'UI/UX & 3D Web',
        category: 'frontend',
        categoryLabel: 'Creative Direction',
        level: 95,
        exp: '6+ Years',
        badge: 'Creative Lead',
        accent: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.45)',
        tags: ['Figma Design Systems', 'Spline & Three.js 3D', 'Micro-Interactions', 'Brand Experience'],
        summary: 'Award-winning digital experiences combining high-end typography, 3D interactive canvases, and frictionless user flows.',
      },
    ],
    rows: [
      {
        id: 'row-1',
        num: '01',
        title: 'Frontend Engineering',
        desc: 'Building ultra-fast, animated, interactive user interfaces with modern reactive paradigms and sub-millisecond updates.',
        tags: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5 / Modern CSS'],
      },
      {
        id: 'row-2',
        num: '02',
        title: 'Backend & Server Architecture',
        desc: 'Scalable server APIs, robust database architectures, and secure business logic handling millions of requests.',
        tags: ['Node.js', 'PHP & Laravel', 'REST & GraphQL APIs', 'Microservices'],
      },
      {
        id: 'row-3',
        num: '03',
        title: 'Cross-Platform Mobile Development',
        desc: 'High-performance native mobile apps with smooth 60fps gestures and fluid animations for iOS & Android.',
        tags: ['React Native', 'Flutter', 'Native Modules', 'Mobile UI/UX'],
      },
      {
        id: 'row-4',
        num: '04',
        title: 'Developer Tooling & AI Integration',
        desc: 'Version control, automated package deployment, and enterprise AI models certified by Infosys.',
        tags: ['Git & GitHub Actions', 'npm Ecosystem', 'Infosys Certified AI', 'CI/CD Automation'],
      },
      {
        id: 'row-5',
        num: '05',
        title: 'Professional Website & App UI Designer',
        desc: 'Specialized in building cutting-edge 3D websites, highly complex platforms, and bespoke custom design applications. Any design website that you can imagine, I can engineer and build to life with butter-smooth 60fps animations.',
        tags: [
          '3D Websites & WebGL',
          'Complex Enterprise Web Apps',
          'Any Design Website That I Can Build',
          'Mobile App UI/UX Design',
          'Interactive Micro-Animations',
        ],
      },
    ],
  },
  projects: [
    {
      id: 'proj-1',
      num: '01',
      title: 'Crimson Ride',
      tag: 'Art Direction',
      imgs: [p1_1, p1_2, p1_3],
      liveUrl: 'https://wa.me/918822849800',
    },
    {
      id: 'proj-2',
      num: '02',
      title: 'Violet Halo',
      tag: 'Brand Identity',
      imgs: [p2_1, p2_2, p2_3],
      liveUrl: 'https://wa.me/918822849800',
    },
    {
      id: 'proj-3',
      num: '03',
      title: 'Still Aura',
      tag: '3D & Motion',
      imgs: [p3_1, p3_2, p3_3],
      liveUrl: 'https://wa.me/918822849800',
    },
  ],
  contact: {
    title: 'Contact',
    pText: "Got a wild idea? Let's make it impossible to ignore.",
    whatsappNumber: '918822849800',
    btnText: 'WhatsApp',
  },
})

// Helper to test if a string is a custom uploaded image (data URL or external link)
export const isCustomMedia = (val) => {
  if (!val || typeof val !== 'string') return false
  const trimmed = val.trim()
  if (!trimmed) return false

  // Reject defunct paths, former repo subpaths, or stale build asset hashes
  if (
    trimmed.includes('zaheeraniston.github.io') ||
    trimmed.includes('zaheerabbas') ||
    trimmed.includes('ZaheerAbbas') ||
    trimmed.startsWith('./assets/') ||
    trimmed.startsWith('/assets/') ||
    (trimmed.includes('/assets/') && (trimmed.endsWith('.webp') || trimmed.endsWith('.png') || trimmed.endsWith('.jpg') || trimmed.endsWith('.svg')))
  ) {
    return false
  }

  return (
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('data:application/') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:')
  )
}

// Merge stored / cloud data with code defaults safely so default assets are never 404 broken
export const mergeWithDefaults = (parsed) => {
  const defaults = getDefaultPortfolioData()
  if (!parsed || typeof parsed !== 'object') return defaults

  return {
    ...defaults,
    ...parsed,
    hero: {
      ...defaults.hero,
      ...(parsed.hero || {}),
      customHeadshot: isCustomMedia(parsed.hero?.customHeadshot) ? parsed.hero.customHeadshot : '',
      customArrow: isCustomMedia(parsed.hero?.customArrow) ? parsed.hero.customArrow : '',
    },
    floatingElements: {
      coffee: isCustomMedia(parsed.floatingElements?.coffee) ? parsed.floatingElements.coffee : '',
      key: isCustomMedia(parsed.floatingElements?.key) ? parsed.floatingElements.key : '',
      plane: isCustomMedia(parsed.floatingElements?.plane) ? parsed.floatingElements.plane : '',
      ring: isCustomMedia(parsed.floatingElements?.ring) ? parsed.floatingElements.ring : '',
    },
    marquee: {
      row1: Array.isArray(parsed.marquee?.row1) && parsed.marquee.row1.length
        ? parsed.marquee.row1.map((item, idx) => (isCustomMedia(item) ? item : defaults.marquee.row1[idx] || item))
        : defaults.marquee.row1,
      row2: Array.isArray(parsed.marquee?.row2) && parsed.marquee.row2.length
        ? parsed.marquee.row2.map((item, idx) => (isCustomMedia(item) ? item : defaults.marquee.row2[idx] || item))
        : defaults.marquee.row2,
    },
    about: {
      ...defaults.about,
      ...(parsed.about || {}),
      badges: parsed.about?.badges?.length ? parsed.about.badges : defaults.about.badges,
      stats: parsed.about?.stats?.length ? parsed.about.stats : defaults.about.stats,
    },
    services: Array.isArray(parsed.services) && parsed.services.length
      ? parsed.services.map((srv, idx) => ({
          ...(defaults.services[idx] || {}),
          ...srv,
          img: isCustomMedia(srv.img) ? srv.img : (defaults.services[idx]?.img || srv.img || ''),
        }))
      : defaults.services,
    skills: {
      ...defaults.skills,
      ...(parsed.skills || {}),
      items: parsed.skills?.items?.length ? parsed.skills.items : defaults.skills.items,
      categories: parsed.skills?.categories?.length ? parsed.skills.categories : defaults.skills.categories,
    },
    projects: Array.isArray(parsed.projects) && parsed.projects.length
      ? parsed.projects.map((proj, idx) => ({
          ...(defaults.projects[idx] || {}),
          ...proj,
          imgs: Array.isArray(proj.imgs)
            ? proj.imgs.map((img, imgIdx) =>
                isCustomMedia(img) ? img : (defaults.projects[idx]?.imgs?.[imgIdx] || img)
              )
            : defaults.projects[idx]?.imgs || [],
        }))
      : defaults.projects,
    contact: {
      ...defaults.contact,
      ...(parsed.contact || {}),
    },
  }
}

// Helper to load stored data with fallback
export const loadPortfolioData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultPortfolioData()
    const parsed = JSON.parse(raw)
    return mergeWithDefaults(parsed)
  } catch (e) {
    console.error('Failed to parse portfolio data from storage:', e)
    return getDefaultPortfolioData()
  }
}

// Helper to save data
export const savePortfolioData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new Event('zaheer_portfolio_updated'))
    return true
  } catch (e) {
    console.error('Failed to save portfolio data:', e)
    return false
  }
}
