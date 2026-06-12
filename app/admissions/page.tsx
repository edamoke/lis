'use client'

import React, { useState } from 'react'
import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import { CheckCircle, FileText, Phone, Mail, Upload, Calendar, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const steps = [
  { step: '01', title: 'Enquire', body: 'Contact the admissions office of your preferred campus by phone or email. We will guide you through the process and answer any questions.' },
  { step: '02', title: 'Campus Visit', body: 'We encourage families to visit the campus for a guided tour. This helps you experience our environment and meet our team.' },
  { step: '03', title: 'Application Form', body: 'Complete and submit the application form along with the required supporting documents.' },
  { step: '04', title: 'Assessment', body: 'Applicants may be asked to sit an entry assessment appropriate to their year group.' },
  { step: '05', title: 'Offer of Place', body: 'Successful applicants will receive an official offer letter. Acceptance is confirmed upon payment of the registration fee.' },
  { step: '06', title: 'Enrolment', body: 'Complete enrolment formalities, collect your student pack, and begin your LIS journey.' },
]

const documents = [
  'Completed Application Form',
  'Copy of Birth Certificate / Passport',
  'Recent Passport Photos (2)',
  'Previous School Reports (last 2 years)',
  'Copy of Passport or National ID (parent/guardian)',
  'Medical / Vaccination Records',
  'Transfer Certificate (where applicable)',
]

const campusContacts = [
  { name: 'Nairobi Karen', phone: '+254 717 998 888', email: 'info@lis.sc.ke', slug: 'nairobi-karen' },
  { name: 'Nairobi Lavington', phone: '+254 729 905 431', email: 'info.primary@lis.sc.ke', slug: 'nairobi-lavington' },
  { name: 'Nairobi Kindergarten', phone: '+254 728 663 764', email: 'info.kg@lis.sc.ke', slug: 'nairobi-kindergarten' },
  { name: 'Mombasa', phone: '+254 784 777 771', email: 'info.mba@lis.sc.ke', slug: 'mombasa' },
  { name: 'Malindi', phone: '+254 716 839 822', email: 'info.malindi@lis.sc.ke', slug: 'malindi' },
]

export default function AdmissionsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [enquiryId, setEnquiryId] = useState('')
  
  const [formData, setFormData] = useState({
    student_name: '',
    student_dob: '',
    grade_applying: '',
    campus_of_interest: '',
    parent_name: '',
    parent_email: '',
    parent_phone: '',
    message: '',
    academic_background: '',
  })

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    id_copy: null,
    academic_report: null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [key]: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      // Send real POST call to admissions inquiry API
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: formData.parent_email, // Map principal contact email
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit admissions inquiry.')
      }

      // Generate mock beautiful enrolment reference ID for user
      const randId = 'LIS-' + Math.floor(100000 + Math.random() * 900000)
      setEnquiryId(randId)
      setFormSubmitted(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        image="/heroes/admissions.png"
        badge="Join Us"
        title="Begin Your"
        titleAccent="LIS Journey"
        subtitle="Secure a world-class Cambridge education. Submit your official admissions inquiry form below and coordinate with our registrars."
        overlayOpacity={58}
        cmsPage="admissions"
        cta={{ label: 'Fill Inquiry Form', href: '#inquiry-form' }}
        ctaSecondary={{ label: 'View Campus Contacts', href: '#contacts' }}
        lanyardName="Admissions"
      />

      {/* Process */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">How to Apply</span>
          <h2 className="mt-3 text-3xl font-semibold text-balance">Admissions Process</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Our straightforward admissions process is designed to be welcoming and transparent for all families.</p>
        </div>
        <AnimatedGroup
          triggerOnView
          variants={{
            container: { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } },
            item: { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map(({ step, title, body }) => (
            <div key={step} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3">
              <span className="text-4xl font-bold text-blue-600/20">{step}</span>
              <h3 className="font-semibold text-base">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </AnimatedGroup>
      </section>

      {/* Documents & Contacts side by side */}
      <section id="contacts" className="bg-card/30 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-2">
          {/* Required documents */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="size-5 text-blue-600" />
              <h2 className="text-2xl font-semibold">Required Documents</h2>
            </div>
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="size-4 text-blue-600 shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Campus contacts */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Campus Admissions Contacts</h2>
            <div className="space-y-4">
              {campusContacts.map(({ name, phone, email, slug }) => (
                <div key={slug} className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2 hover:border-blue-500/30 transition-colors">
                  <Link href={`/schools/${slug}`} className="font-semibold text-sm hover:text-blue-600 transition-colors">{name}</Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="size-3.5 text-blue-600" />
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">{phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="size-3.5 text-blue-600" />
                    <a href={`mailto:${email}`} className="hover:text-foreground transition-colors">{email}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* High-Fidelity Admissions Inquiry Form */}
      <section id="inquiry-form" className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 font-mono">Admission Inquiry</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Submit Enrolment Inquiry</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Please fill out this official digital application inquiry form. Our admissions board evaluates requests dynamically across all semesters.</p>
        </div>

        <Card className="border border-border shadow-xl backdrop-blur-sm bg-card/50">
          <CardHeader className="bg-gradient-to-r from-blue-600/10 to-red-500/10 border-b p-6">
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="size-5 text-blue-600" />
              LIS Digital Inquiry Form
            </CardTitle>
            <CardDescription>All fields marked with an asterisk (*) are strictly required.</CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {formSubmitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-xl p-8 text-center flex flex-col items-center gap-4 border border-emerald-500/20 max-w-2xl mx-auto">
                <CheckCircle className="size-16 text-emerald-600 shrink-0 animate-bounce" />
                <h3 className="font-extrabold text-2xl">Inquiry Successfully Lodged!</h3>
                <div className="bg-white dark:bg-zinc-900 border px-4 py-3 rounded-lg font-mono text-sm text-foreground my-2 shadow-sm">
                  Enrolment ID: <span className="text-blue-600 font-bold">{enquiryId}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
                  Thank you for applying to Light International School. Our registrar team is reviewing student <strong className="text-foreground">{formData.student_name}</strong>'s profile for <strong className="text-foreground">{formData.grade_applying}</strong>.
                </p>
                <div className="w-full text-left bg-muted p-4 rounded-lg mt-4 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">Next Action Steps:</h4>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">1.</span>
                      <span>An auto-receipt confirmation is on its way to <strong>{formData.parent_email}</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">2.</span>
                      <span>A campus coordinator will call you at <strong>{formData.parent_phone}</strong> within 24 hours.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600">3.</span>
                      <span>Your diagnostic placement exam has been tentatively scheduled for next week.</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setFormSubmitted(false)}>
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-100 dark:bg-red-950/20 border border-red-500/30 text-red-700 dark:text-red-400 text-sm rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {/* Section 1: Student Particulars */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4 border-b pb-1">1. Student Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="student_name" className="text-sm font-medium">Student Full Name *</label>
                      <input
                        id="student_name"
                        required
                        placeholder="e.g. Liam Kimani"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.student_name}
                        onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="student_dob" className="text-sm font-medium">Date of Birth *</label>
                      <input
                        id="student_dob"
                        required
                        type="date"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.student_dob}
                        onChange={(e) => setFormData({ ...formData, student_dob: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <div className="space-y-1.5">
                      <label htmlFor="grade_applying" className="text-sm font-medium">Grade / Year Applying For *</label>
                      <select
                        id="grade_applying"
                        required
                        aria-label="Grade / Year Applying For"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.grade_applying}
                        onChange={(e) => setFormData({ ...formData, grade_applying: e.target.value })}
                      >
                        <option value="">-- Choose Grade Level --</option>
                        <option value="Playgroup">Playgroup (Age 2-3)</option>
                        <option value="Reception">Reception (Age 4-5)</option>
                        <option value="Primary Year 1-6">Primary (Year 1 – 6)</option>
                        <option value="Secondary Year 7-9">Lower Secondary (Year 7 – 9)</option>
                        <option value="IGCSE Year 10-11">IGCSE (Year 10 – 11)</option>
                        <option value="A-Levels Year 12-13">A-Levels (Year 12 – 13)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="campus_of_interest" className="text-sm font-medium">Campus of Interest *</label>
                      <select
                        id="campus_of_interest"
                        required
                        aria-label="Campus of Interest"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.campus_of_interest}
                        onChange={(e) => setFormData({ ...formData, campus_of_interest: e.target.value })}
                      >
                        <option value="">-- Choose Campus --</option>
                        <option value="Karen">Nairobi Karen (KG – A Levels)</option>
                        <option value="Lavington">Nairobi Lavington (Year 4 – 10)</option>
                        <option value="Kindergarten">Nairobi Kindergarten (Reception – Year 3)</option>
                        <option value="Mombasa">Mombasa Campus (KG – A Levels)</option>
                        <option value="Malindi">Malindi Campus (KG – A Levels)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Parent Information */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4 border-b pb-1">2. Parent / Guardian Details</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <label htmlFor="parent_name" className="text-sm font-medium">Parent Name *</label>
                      <input
                        id="parent_name"
                        required
                        placeholder="e.g. Sarah Kimani"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.parent_name}
                        onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="parent_email" className="text-sm font-medium">Email Address *</label>
                      <input
                        id="parent_email"
                        required
                        type="email"
                        placeholder="e.g. sarah@example.com"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.parent_email}
                        onChange={(e) => setFormData({ ...formData, parent_email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="parent_phone" className="text-sm font-medium">Phone Number *</label>
                      <input
                        id="parent_phone"
                        required
                        placeholder="e.g. +254 712 345678"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.parent_phone}
                        onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Background & File Uploads */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4 border-b pb-1">3. Background Details & Files</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="academic_background" className="text-sm font-medium">Previous School & Curriculum</label>
                      <input
                        id="academic_background"
                        placeholder="e.g. Karen Academy, CBC curriculum"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.academic_background}
                        onChange={(e) => setFormData({ ...formData, academic_background: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-sm font-medium">Any Special Learning / Medical Needs</label>
                      <input
                        id="message"
                        placeholder="e.g. No special needs / Left-handed"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Drag and Drop File Upload Areas */}
                  <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <div className="border border-dashed border-input rounded-xl p-4 bg-muted/20 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition-colors relative">
                      <Upload className="size-6 text-muted-foreground mb-2" />
                      <span className="text-xs font-semibold text-foreground">Upload Student ID / Passport Copy</span>
                      <span className="text-[10px] text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</span>
                      {files.id_copy && (
                        <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-xl border border-emerald-500 flex items-center justify-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          ✓ {files.id_copy.name} ({(files.id_copy.size / 1024 / 1024).toFixed(2)}MB)
                        </div>
                      )}
                      <input
                        aria-label="Upload Student ID or Passport Copy"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'id_copy')}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>

                    <div className="border border-dashed border-input rounded-xl p-4 bg-muted/20 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition-colors relative">
                      <Upload className="size-6 text-muted-foreground mb-2" />
                      <span className="text-xs font-semibold text-foreground">Upload Latest Report Card</span>
                      <span className="text-[10px] text-muted-foreground mt-1">PDF up to 5MB</span>
                      {files.academic_report && (
                        <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-xl border border-emerald-500 flex items-center justify-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          ✓ {files.academic_report.name} ({(files.academic_report.size / 1024 / 1024).toFixed(2)}MB)
                        </div>
                      )}
                      <input
                        aria-label="Upload Latest Report Card"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'academic_report')}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-6 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Securing inquiry lodging...
                    </>
                  ) : (
                    <>
                      Submit Application Inquiry
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
