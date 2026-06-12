'use client'

import React, { useState } from 'react'
import PageHero from '@/components/page-hero'
import { Calendar, Users, Award, Briefcase, Globe, CheckCircle, Heart, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'

export default function AlumniPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gradYear: '',
    campus: '',
    university: '',
    degree: '',
    currentCompany: '',
    jobTitle: '',
    mentorshipInterest: 'no',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const alumniStats = [
    { value: '1,500+', label: 'Registered Alumni', desc: 'Active members spanning over 35 countries globally.' },
    { value: '98%', label: 'University Placement', desc: 'Graduates attending top-tier global institutions.' },
    { value: '40+', label: 'Ivy League / Russell Group', desc: 'Alumni accepted into leading global research universities.' },
    { value: '10+', label: 'Alumni Chapters', desc: 'Regional networking hubs from London to Nairobi.' },
  ]

  const alumniSpotlights = [
    {
      name: 'Farah Ahmed',
      classOf: 'Class of 2018 (Karen)',
      university: 'University of Oxford',
      currentRole: 'AI Research Scientist at DeepMind',
      image: '/placeholder-user.jpg',
      quote: 'The rigorous Cambridge curriculum and support from teachers at LIS laid the perfect foundation for my research career in machine learning.'
    },
    {
      name: 'Michael Obado',
      classOf: 'Class of 2016 (Lavington)',
      university: 'Stanford University',
      currentRole: 'Co-founder & CTO of FinTech Startup',
      image: '/placeholder-user.jpg',
      quote: 'LIS didn’t just teach me coding; they taught me how to solve real problems. That entrepreneurial spirit guided me through Stanford and beyond.'
    },
    {
      name: 'Elena Vance',
      classOf: 'Class of 2020 (Mombasa)',
      university: 'Yale University',
      currentRole: 'Global Policy Analyst at United Nations',
      image: '/placeholder-user.jpg',
      quote: 'Model United Nations at LIS was where my voice was born. The school empowers you to look at the world and believe you can improve it.'
    }
  ]

  const alumniOpportunities = [
    {
      icon: Users,
      title: 'Mentorship Program',
      desc: 'Guide senior school students through university applications, essay reviews, and career counseling sessions.'
    },
    {
      icon: Calendar,
      title: 'Annual Reunions',
      desc: 'Reconnect with fellow graduates and faculty members during our grand end-of-year alumni networking banquets.'
    },
    {
      icon: Briefcase,
      title: 'Career Placement & Internships',
      desc: 'Offer current students or fellow alumni internships and professional training placements at your organizations.'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        image="/heroes/careers.png"
        badge="LIS Legacy"
        title="Alumni Network"
        titleAccent="Hub"
        subtitle="Celebrating our graduates. Stay connected with fellow alumni, support current students, expand your professional network, and carry forward the Light International School legacy."
        overlayOpacity={60}
        cmsPage="alumni-network"
        cta={{ label: 'Register as Alumni', href: '#register-alumni' }}
        ctaSecondary={{ label: 'Success Spotlights', href: '#spotlights' }}
        lanyardName="LIS Alumnus"
      />

      {/* Intro section */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Our Lifelong Community</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">The LIS story continues with you</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              When you graduate from Light International School, you do not leave the family. You join a prestigious global fraternity of leaders, scientists, entrepreneurs, and artists working to solve critical challenges across the world.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our Alumni Network fosters lifelong connections, supports career progression, and bridges the gap between past and present. By registering, you unlock peer mentorship, corporate connections, and exclusive access to school-wide reunions.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {alumniStats.map((stat, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-2">
                <span className="text-3xl font-extrabold text-blue-600">{stat.value}</span>
                <p className="font-semibold text-sm">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Spotlights */}
      <section id="spotlights" className="bg-card/30 border-y border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Inspirational Paths</span>
            <h2 className="mt-3 text-3xl font-semibold text-balance">Alumni Success Spotlights</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Explore the inspiring global journeys of our graduates making an impact in technology, diplomacy, science, and education.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {alumniSpotlights.map((alumnus, idx) => (
              <Card key={idx} className="flex flex-col h-full border-border hover:shadow-md transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg">
                      {alumnus.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">{alumnus.name}</CardTitle>
                      <CardDescription className="text-xs">{alumnus.classOf}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-medium text-xs text-blue-600 dark:text-blue-400 mb-1">{alumnus.university}</p>
                    <p className="font-semibold text-xs text-foreground mb-4">{alumnus.currentRole}</p>
                    <blockquote className="italic border-l-2 border-blue-500 pl-3 text-muted-foreground text-xs leading-relaxed">
                      "{alumnus.quote}"
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Engagement Opportunities */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Get Involved</span>
          <h2 className="mt-3 text-3xl font-semibold text-balance">Alumni Engagement Opportunities</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Discover multiple pathways to support the next generation of LIS students and connect with fellow graduates.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {alumniOpportunities.map((op, idx) => {
            const Icon = op.icon
            return (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
                <div className="size-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2">{op.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{op.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Alumni Registration Form */}
      <section id="register-alumni" className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Join the Legacy</span>
          <h2 className="mt-3 text-3xl font-bold">Alumni Registration Directory</h2>
          <p className="mt-4 text-muted-foreground">Register your details below to formally join our directory, receive chapter invitations, and volunteer for school mentorship initiatives.</p>
        </div>

        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle>Alumni Registration Form</CardTitle>
            <CardDescription>Keep us updated on your academic achievements and career progression.</CardDescription>
          </CardHeader>
          <CardContent>
            {formSubmitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-xl p-6 text-center flex flex-col items-center gap-3 border border-emerald-500/20">
                <CheckCircle className="size-12 text-emerald-600 shrink-0 animate-bounce" />
                <h3 className="font-bold text-lg">Alumni Directory Registered!</h3>
                <p className="text-sm max-w-md">Thank you for registering. Your details have been added to the LIS global directory, and we will email you your digital alumni membership ID shortly.</p>
                <Button variant="outline" className="mt-4 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/10" onClick={() => setFormSubmitted(false)}>
                  Submit Another Form
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-sm font-medium leading-none">Full Name *</label>
                    <input
                      id="fullName"
                      required
                      placeholder="e.g. John Doe"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.fullName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium leading-none">Email Address *</label>
                    <input
                      id="email"
                      required
                      type="email"
                      placeholder="e.g. john.doe@example.com"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-medium leading-none">Phone Number</label>
                    <input
                      id="phone"
                      placeholder="e.g. +254 712 345678"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="gradYear" className="text-sm font-medium leading-none">Graduation Year *</label>
                    <input
                      id="gradYear"
                      required
                      placeholder="e.g. 2018"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.gradYear}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, gradYear: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="alumniCampus" className="text-sm font-medium leading-none">Graduated Campus *</label>
                    <select
                      id="alumniCampus"
                      aria-label="Graduated Campus"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                      value={formData.campus}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, campus: e.target.value })}
                    >
                      <option value="">-- Choose Campus --</option>
                      <option value="Karen">Nairobi Karen</option>
                      <option value="Lavington">Nairobi Lavington</option>
                      <option value="Kindergarten">Nairobi Kindergarten</option>
                      <option value="Mombasa">Mombasa Campus</option>
                      <option value="Malindi">Malindi Campus</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="university" className="text-sm font-medium leading-none">University / Higher Institution</label>
                    <input
                      id="university"
                      placeholder="e.g. Oxford, Stanford, Yale, etc."
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.university}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, university: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="degree" className="text-sm font-medium leading-none">Degree / Major</label>
                    <input
                      id="degree"
                      placeholder="e.g. BSc Computer Science"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.degree}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, degree: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="currentCompany" className="text-sm font-medium leading-none">Current Employer / Company</label>
                    <input
                      id="currentCompany"
                      placeholder="e.g. Google, McKinsey, World Bank, etc."
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.currentCompany}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, currentCompany: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="jobTitle" className="text-sm font-medium leading-none">Job Title</label>
                    <input
                      id="jobTitle"
                      placeholder="e.g. Software Engineer"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.jobTitle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="mentorshipInterest" className="text-sm font-medium leading-none">Are you interested in mentoring current senior students?</label>
                  <select
                    id="mentorshipInterest"
                    aria-label="Mentorship Interest"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.mentorshipInterest}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, mentorshipInterest: e.target.value })}
                  >
                    <option value="no">No, not at this time</option>
                    <option value="yes_online">Yes, open to Zoom guidance calls</option>
                    <option value="yes_physical">Yes, happy to visit campus as a guest speaker</option>
                    <option value="yes_intern">Yes, my company can offer short internships</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="alumniMessage" className="text-sm font-medium leading-none">Share a memory or message for current student body</label>
                  <textarea
                    id="alumniMessage"
                    rows={4}
                    placeholder="Tell us what you miss most or share career advice for current students..."
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Join Alumni Network Directory
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
