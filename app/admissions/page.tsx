import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import { CheckCircle, FileText, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Admissions — Light International School',
  description: 'Apply to Light International School. Learn about our admissions process, requirements, and how to join our Cambridge International community in Kenya.',
}

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
  'Copy of Birth Certificate',
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
  return (
    <main className="min-h-screen bg-background">
      {/* Hero — edit title, subtitle, image and badge here */}
      <PageHero
        image="/heroes/admissions.png"
        badge="Join Us"
        title="Begin Your"
        titleAccent="LIS Journey"
        subtitle="We welcome applications year-round for all year groups across all five campuses."
        overlayOpacity={58}
        cmsPage="admissions"
        cta={{ label: 'Call Nairobi Karen', href: 'tel:+254717998888' }}
        ctaSecondary={{ label: 'Email Admissions', href: 'mailto:info@lis.sc.ke' }}
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
          variants={{ container: { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }, ...transitionVariants }}
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
      <section className="bg-card/30 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-2">
          {/* Required documents */}
          <AnimatedGroup triggerOnView variants={{ container: { visible: { transition: { staggerChildren: 0.07 } } }, ...transitionVariants }}>
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
          </AnimatedGroup>

          {/* Campus contacts */}
          <AnimatedGroup triggerOnView variants={{ container: { visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }, ...transitionVariants }}>
            <div>
              <h2 className="text-2xl font-semibold mb-6">Campus Admissions Contacts</h2>
              <div className="space-y-4">
                {campusContacts.map(({ name, phone, email, slug }) => (
                  <div key={slug} className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2">
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
          </AnimatedGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24 text-center">
        <h2 className="text-2xl font-semibold text-balance">Ready to Apply?</h2>
        <p className="mt-4 text-muted-foreground">Contact your nearest campus admissions office today and take the first step in your child&apos;s Cambridge journey.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <a href="tel:+254717998888">Call Nairobi Karen</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="mailto:info@lis.sc.ke">Email Us</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
