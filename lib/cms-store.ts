'use client'

/** Shape of every editable section */
export interface CmsSection {
  id: string
  page: string     // e.g. 'home', 'about', 'admissions', 'schools/nairobi-karen'
  type: 'hero' | 'text' | 'cards' | 'cta' | 'list'
  label: string    // human-readable name shown in the CMS
  enabled: boolean
  order: number
  content: Record<string, string | string[]>
}

const STORAGE_KEY = 'lis_cms_sections'
const ADMIN_SESSION_KEY = 'lis_admin_session'
const ADMIN_CREDENTIALS = { username: 'admin', password: 'HobbitHobbitKing@20132' }

// ─── Default section definitions ─────────────────────────────────────────────
export const DEFAULT_SECTIONS: CmsSection[] = [
  // HOME
  {
    id: 'home-hero',
    page: 'home',
    type: 'hero',
    label: 'Home — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: '20th June 2026',
      title: 'Light International',
      titleAccent: 'School',
      subtitle: 'A premier Cambridge International institution in Kenya with five campuses across Nairobi, Mombasa, and Malindi.',
      ctaPrimary: 'Contact Nairobi: +254 717 998 888',
      ctaSecondary: 'Email: info@lis.sc.ke',
    },
  },
  {
    id: 'home-features',
    page: 'home',
    type: 'cards',
    label: 'Home — Why Choose LIS',
    enabled: true,
    order: 1,
    content: {
      heading: 'Why Choose Light International School?',
      card1Title: 'Cambridge Curriculum',
      card1Body: 'International Cambridge curriculum with IGCSE and A Levels for comprehensive education.',
      card2Title: 'Modern Facilities',
      card2Body: 'State-of-the-art learning facilities with technology-enhanced education systems.',
      card3Title: 'Internship Programs',
      card3Body: 'A-Level students experience real corporate world through partnerships with leading companies.',
    },
  },
  // ABOUT
  {
    id: 'about-hero',
    page: 'about',
    type: 'hero',
    label: 'About — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Our Story',
      title: 'About Light International School',
      subtitle: 'Two decades of nurturing future leaders through Cambridge excellence across Kenya.',
      image: '/LAVINGTON-1000x600.jpg',
    },
  },
  {
    id: 'about-quote',
    page: 'about',
    type: 'text',
    label: 'About — Leadership Quote',
    enabled: true,
    order: 3,
    content: {
      quote: 'Our goal is simple: to unlock the potential of every child and send them into the world as confident, capable, and compassionate human beings.',
      attribution: 'School Leadership, Light International School',
    },
  },
  // ACADEMICS
  {
    id: 'academics-hero',
    page: 'academics',
    type: 'hero',
    label: 'Academics — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Curriculum',
      title: 'Academic Excellence',
      subtitle: 'A complete Cambridge International journey from Early Years to A Levels across five campuses.',
      image: '/heroes/academics.png',
    },
  },
  // ADMISSIONS
  {
    id: 'admissions-hero',
    page: 'admissions',
    type: 'hero',
    label: 'Admissions — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Join Us',
      title: 'Admissions',
      subtitle: 'Begin your child\'s journey to Cambridge excellence. We welcome applications year-round for all year groups.',
      image: '/heroes/admissions.png',
    },
  },
  {
    id: 'admissions-cta',
    page: 'admissions',
    type: 'cta',
    label: 'Admissions — Call to Action',
    enabled: true,
    order: 3,
    content: {
      heading: 'Ready to Apply?',
      body: 'Contact your nearest campus admissions office today and take the first step in your child\'s Cambridge journey.',
      ctaPrimary: 'Call Nairobi Karen',
      ctaSecondary: 'Email Us',
    },
  },
  // CAREERS
  {
    id: 'careers-hero',
    page: 'careers',
    type: 'hero',
    label: 'Careers — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Join Our Team',
      title: 'Careers at LIS',
      subtitle: 'Shape the future of education. We are looking for passionate, talented people who want to make a difference.',
      image: '/heroes/careers.png',
    },
  },
  // CONTACT
  {
    id: 'contact-hero',
    page: 'contact',
    type: 'hero',
    label: 'Contact — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Get in Touch',
      title: 'Contact Us',
      subtitle: 'We would love to hear from you. Reach out to any of our campuses and our team will be happy to assist.',
      image: '/heroes/contact.png',
    },
  },
  // SCHOOLS LISTING
  {
    id: 'schools-hero',
    page: 'schools',
    type: 'hero',
    label: 'Schools — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Five Campuses',
      title: 'Our Schools',
      subtitle: 'From Nairobi to the Kenyan coast — world-class Cambridge education closer to you.',
      image: '/heroes/schools.png',
    },
  },
  // SCHOOL PAGES
  {
    id: 'school-hero-nairobi-karen',
    page: 'schools/nairobi-karen',
    type: 'hero',
    label: 'LIS Karen — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Nairobi',
      title: 'LIS Nairobi Karen',
      subtitle: 'From Kindergarten to A Levels — A Complete Learning Journey',
      image: '/schools/nairobi-karen.png',
    },
  },
  {
    id: 'school-hero-nairobi-lavington',
    page: 'schools/nairobi-lavington',
    type: 'hero',
    label: 'LIS Lavington — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Nairobi',
      title: 'LIS Nairobi Lavington',
      subtitle: 'Academic Excellence at the Heart of Lavington',
      image: '/LIsting_mobile_07.webp',
    },
  },
  {
    id: 'school-hero-nairobi-kindergarten',
    page: 'schools/nairobi-kindergarten',
    type: 'hero',
    label: 'LIS Kindergarten — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Nairobi',
      title: 'LIS Nairobi Kindergarten',
      subtitle: 'A Nurturing Start for Every Young Learner',
      image: '/schools/nairobi-kindergarten.png',
    },
  },
  {
    id: 'school-hero-mombasa',
    page: 'schools/mombasa',
    type: 'hero',
    label: 'LIS Mombasa — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Mombasa',
      title: 'LIS Mombasa',
      subtitle: 'Coast Excellence — Where Education Meets the Ocean Breeze',
      image: '/schools/mombasa.png',
    },
  },
  {
    id: 'school-hero-malindi',
    page: 'schools/malindi',
    type: 'hero',
    label: 'LIS Malindi — Hero',
    enabled: true,
    order: 0,
    content: {
      badge: 'Malindi',
      title: 'LIS Malindi',
      subtitle: 'Where the Indian Ocean Breeze Meets World-Class Education',
      image: '/schools/malindi.png',
    },
  },
]

// ─── Storage helpers ───────────────────────────────────────────────────────────
export function loadSections(): CmsSection[] {
  if (typeof window === 'undefined') return DEFAULT_SECTIONS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SECTIONS
    return JSON.parse(raw) as CmsSection[]
  } catch {
    return DEFAULT_SECTIONS
  }
}

export function saveSections(sections: CmsSection[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sections))
  // Broadcast change so other tabs/components can react
  window.dispatchEvent(new CustomEvent('lis-cms-update'))
}

export function resetSections(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new CustomEvent('lis-cms-update'))
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────
export function adminLogin(username: string, password: string): boolean {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
    return true
  }
  return false
}

export function adminLogout(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true'
}
