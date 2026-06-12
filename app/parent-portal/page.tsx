'use client'

import React, { useState } from 'react'
import PageHero from '@/components/page-hero'
import { Calendar, Download, Users, FileText, Bell, PhoneCall, HelpCircle, Heart, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'

export default function ParentPortalPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    studentName: '',
    studentGrade: '',
    interestType: 'pta_volunteer',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated submission success
    setFormSubmitted(true)
  }

  const upcomingEvents = [
    { date: 'June 18, 2026', time: '5:30 PM - 7:00 PM', title: 'PTA General Assembly', location: 'Nairobi Karen Auditorium & Zoom', type: 'Meeting' },
    { date: 'June 25, 2026', time: '8:30 AM - 10:30 AM', title: 'Parent Coffee Morning: Digital Wellness', location: 'Nairobi Lavington Cafe', type: 'Workshop' },
    { date: 'July 03, 2026', time: 'All Day', title: 'Term 3 Report Cards Released', location: 'Parent Portal Portal / Email', type: 'Academic' },
    { date: 'July 10, 2026', time: '9:00 AM - 1:00 PM', title: 'Annual Student Talent & Art Exhibition', location: 'All Campuses', type: 'Event' },
  ]

  const resourceDownloads = [
    { title: 'Parent & Student Handbook 2025/2026', size: '2.4 MB', format: 'PDF', category: 'Handbooks' },
    { title: 'Academic Calendar & Term Dates 2026/2027', size: '820 KB', format: 'PDF', category: 'Calendar' },
    { title: 'Uniform Guidelines & Purchasing Outlets', size: '1.1 MB', format: 'PDF', category: 'Guidelines' },
    { title: 'Fee Structure & Payment Schedule 2026/2027', size: '450 KB', format: 'PDF', category: 'Finance' },
    { title: 'Student Medical History & Consent Form', size: '290 KB', format: 'PDF', category: 'Medical' },
    { title: 'Co-Curricular & Club Registration Guide', size: '1.5 MB', format: 'PDF', category: 'Academics' },
  ]

  const ptaMembers = [
    { name: 'Dr. Jane Mwangi', role: 'PTA Chairperson (Karen)', email: 'pta.chair.karen@lis-parents.org', campus: 'Nairobi Karen' },
    { name: 'Mr. David Mutua', role: 'PTA Vice-Chairperson (Lavington)', email: 'pta.vice.lav@lis-parents.org', campus: 'Nairobi Lavington' },
    { name: 'Mrs. Sarah Al-Amin', role: 'Treasurer & Kindergarten Rep', email: 'pta.treasurer@lis-parents.org', campus: 'Nairobi Kindergarten' },
    { name: 'Mr. Joseph Kiprop', role: 'Board & Community Liaison', email: 'pta.liaison@lis-parents.org', campus: 'Mombasa Campus' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        image="/heroes/careers.png"
        badge="LIS Family"
        title="Parent Engagement"
        titleAccent="Portal"
        subtitle="A dedicated collaborative platform for Light International School parents. Stay connected, access critical resources, join the PTA, and support your child's academic journey."
        overlayOpacity={60}
        cmsPage="parent-portal"
        cta={{ label: 'Volunteer with PTA', href: '#pta-involvement' }}
        ctaSecondary={{ label: 'Download Resources', href: '#resources' }}
        lanyardName="LIS Parent"
      />

      {/* Intro section */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Stronger Together</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">Active partnership for student success</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At Light International School, we firmly believe that education is a shared responsibility. When schools and parents collaborate actively, students experience higher academic achievement, better self-esteem, and stronger social development.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This Parent Engagement Portal acts as your bridge to the school. Whether you are checking term dates, volunteering for PTA committees, or downloading required health forms, everything you need to support your family is right here.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
              <Users className="size-8 text-blue-600" />
              <p className="font-semibold text-sm">Active PTA Committees</p>
              <p className="text-xs text-muted-foreground">Every campus hosts dedicated PTA structures representing parent voices.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
              <Calendar className="size-8 text-blue-600" />
              <p className="font-semibold text-sm">Regular Workshops</p>
              <p className="text-xs text-muted-foreground">Monthly educational coffee mornings covering digital wellness, college prep, and parenting.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
              <FileText className="size-8 text-blue-600" />
              <p className="font-semibold text-sm">Centralized Resources</p>
              <p className="text-xs text-muted-foreground">Access handbooks, calendar details, fee updates, and medical forms in one place.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-3">
              <Bell className="size-8 text-blue-600" />
              <p className="font-semibold text-sm">Direct School Alerts</p>
              <p className="text-xs text-muted-foreground">Integrated messaging, emails, and SMS updates keep you perpetually informed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events / Workshops */}
      <section className="bg-card/30 border-y border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Save The Dates</span>
            <h2 className="mt-3 text-3xl font-semibold text-balance">Upcoming Parent Events & Workshops</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Participate in our interactive workshops, open assemblies, and campus exhibitions designed for families.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map((ev, index) => (
              <Card key={index} className="flex flex-col h-full border-border hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded px-2 py-0.5 font-semibold">
                      {ev.type}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">{ev.time}</span>
                  </div>
                  <CardTitle className="text-base mt-3 line-clamp-2 h-12">{ev.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground flex-1">
                  <p className="font-mono text-xs text-blue-600 dark:text-blue-400 mb-2">{ev.date}</p>
                  <p className="line-clamp-2">{ev.location}</p>
                </CardContent>
                <CardFooter className="pt-0 border-t mt-4 p-4">
                  <Button variant="ghost" size="sm" className="w-full text-xs hover:bg-blue-500/10 hover:text-blue-500">
                    Add to Calendar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Download Center */}
      <section id="resources" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Download Center</span>
          <h2 className="mt-3 text-3xl font-semibold text-balance">Parent Resources & Guidelines</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Get the latest school documents, guides, and policy details to stay perfectly aligned with school schedules.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourceDownloads.map((res, index) => (
            <div key={index} className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-blue-500/50 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-xs shrink-0">
                  {res.format}
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-blue-600 transition-colors">{res.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{res.category} • {res.size}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-blue-600 hover:text-white transition-colors shrink-0">
                <Download className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* PTA Committee List & Message */}
      <section className="bg-card/30 border-y border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Our PTA Leaders</span>
              <h2 className="mt-3 text-3xl font-bold">Parent Teacher Association</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The PTA is run by a dedicated executive committee consisting of elected parents and senior management. Each campus holds its own elections annually, and sub-committees oversee school events, sports development, and community welfare.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex gap-3 items-start">
                  <Shield className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Parent Advocacy</h4>
                    <p className="text-xs text-muted-foreground">The committee reviews constructive feedback to support curriculum development and extra-curricular initiatives.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Heart className="size-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Community Funding</h4>
                    <p className="text-xs text-muted-foreground">PTA funds help support local outreach, specialized playground infrastructure, and cultural events.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {ptaMembers.map((member, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-2.5 py-0.5">
                      {member.campus}
                    </span>
                    <h3 className="font-semibold text-base mt-3">{member.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <a href={`mailto:${member.email}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      {member.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Registration Form */}
      <section id="pta-involvement" className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Get Involved</span>
          <h2 className="mt-3 text-3xl font-bold">PTA Volunteering & Collaboration</h2>
          <p className="mt-4 text-muted-foreground">Register your interest to join a sub-committee, support school events, or share your professional expertise with student societies.</p>
        </div>

        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle>PTA / Volunteer Interest Form</CardTitle>
            <CardDescription>Tell us how you would like to contribute. We will share details on current vacancies or project groups.</CardDescription>
          </CardHeader>
          <CardContent>
            {formSubmitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-xl p-6 text-center flex flex-col items-center gap-3 border border-emerald-500/20">
                <CheckCircle className="size-12 text-emerald-600 shrink-0 animate-bounce" />
                <h3 className="font-bold text-lg">Thank You for Volunteering!</h3>
                <p className="text-sm max-w-md">Your registration has been successfully received. The PTA Chairperson of your selected campus will reach out to you within 3 business days.</p>
                <Button variant="outline" className="mt-4 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/10" onClick={() => setFormSubmitted(false)}>
                  Submit Another Form
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="parentName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Parent / Guardian Name *</label>
                    <input
                      id="parentName"
                      required
                      placeholder="e.g. Jane Doe"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.parentName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, parentName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="parentEmail" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address *</label>
                    <input
                      id="parentEmail"
                      required
                      type="email"
                      placeholder="e.g. jane.doe@example.com"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.parentEmail}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, parentEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="parentPhone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone Number *</label>
                    <input
                      id="parentPhone"
                      required
                      placeholder="e.g. +254 712 345678"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.parentPhone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, parentPhone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="studentGrade" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Selected Campus *</label>
                    <select
                      id="studentGrade"
                      aria-label="Selected Campus"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                      value={formData.studentGrade}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, studentGrade: e.target.value })}
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
                    <label htmlFor="studentName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Student Name(s) & Grade(s)</label>
                    <input
                      id="studentName"
                      placeholder="e.g. Alex Doe (Grade 5), Emily Doe (Year 10)"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.studentName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, studentName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="interestType" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Area of Collaborative Interest</label>
                    <select
                      id="interestType"
                      aria-label="Area of Collaborative Interest"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.interestType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, interestType: e.target.value })}
                    >
                      <option value="pta_volunteer">PTA Sub-Committee Volunteer</option>
                      <option value="event_planning">Event & Sports Day Coordinator</option>
                      <option value="career_talk">Student Mentorship & Guest Lecture</option>
                      <option value="fundraising">Charity & Community Service Liaison</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Your Message / Professional Expertise</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Briefly tell us how you would like to help (e.g. sharing your professional career insight, donating tools, helping paint campus murals, etc.)"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Submit Interest Form
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
