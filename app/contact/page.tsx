import PageHero from '@/components/page-hero'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Contact — Light International School',
  description: 'Contact Light International School. Find phone numbers, email addresses, and locations for all our campuses across Kenya.',
}

const campuses = [
  {
    name: 'LIS Nairobi Karen',
    slug: 'nairobi-karen',
    address: 'Karen Campus, Nairobi, Kenya',
    phone: '+254 717 998 888',
    email: 'info@lis.sc.ke',
    hours: 'Mon–Fri, 7:30 am – 5:00 pm',
  },
  {
    name: 'LIS Nairobi Lavington',
    slug: 'nairobi-lavington',
    address: 'Lavington, Nairobi, Kenya',
    phone: '+254 729 905 431',
    email: 'info.primary@lis.sc.ke',
    hours: 'Mon–Fri, 7:30 am – 5:00 pm',
  },
  {
    name: 'LIS Nairobi Kindergarten',
    slug: 'nairobi-kindergarten',
    address: 'Lenana Road, Nairobi, Kenya',
    phone: '+254 728 663 764',
    email: 'info.kg@lis.sc.ke',
    hours: 'Mon–Fri, 7:30 am – 4:00 pm',
  },
  {
    name: 'LIS Mombasa',
    slug: 'mombasa',
    address: 'Nyali, Mombasa, Kenya',
    phone: '+254 784 777 771',
    email: 'info.mba@lis.sc.ke',
    hours: 'Mon–Fri, 7:30 am – 5:00 pm',
  },
  {
    name: 'LIS Malindi',
    slug: 'malindi',
    address: 'Suli-Suli Road, Malindi Town, Kilifi County',
    phone: '+254 716 839 822',
    email: 'info.malindi@lis.sc.ke',
    hours: 'Mon–Fri, 7:30 am – 5:00 pm',
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero — edit title, subtitle, image and badge here */}
      <PageHero
        image="/heroes/contact.png"
        badge="Get in Touch"
        title="We Would Love"
        titleAccent="to Hear From You"
        subtitle="Reach out to any of our campuses and our team will be happy to assist."
        overlayOpacity={60}
        cmsPage="contact"
        cta={{ label: '+254 717 998 888', href: 'tel:+254717998888' }}
        ctaSecondary={{ label: 'info@lis.sc.ke', href: 'mailto:info@lis.sc.ke' }}
        lanyardName="Contact LIS"
      />

      {/* Campus contacts grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Our Campuses</span>
          <h2 className="mt-3 text-3xl font-semibold text-balance">Find Your Nearest Campus</h2>
        </div>
        <AnimatedGroup
          triggerOnView
          variants={{ container: { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }, ...transitionVariants }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {campuses.map(({ name, slug, address, phone, email, hours }) => (
            <div key={slug} className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
              <Link href={`/schools/${slug}`} className="font-semibold hover:text-blue-600 transition-colors">{name}</Link>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 text-blue-600 shrink-0" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">{phone}</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="size-4 text-blue-600 shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-foreground transition-colors break-all">{email}</a>
                </div>
              </div>
              <p className="text-xs text-muted-foreground border-t border-border pt-3">{hours}</p>
              <div className="flex gap-2 mt-auto">
                <Button size="sm" asChild className="flex-1">
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>Call</a>
                </Button>
                <Button size="sm" variant="outline" asChild className="flex-1">
                  <a href={`mailto:${email}`}>Email</a>
                </Button>
              </div>
            </div>
          ))}
        </AnimatedGroup>
      </section>

      {/* General enquiry note */}
      <section className="bg-card/30 border-y border-border">
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-20 text-center">
          <h2 className="text-2xl font-semibold text-balance">General Enquiries</h2>
          <p className="mt-4 text-muted-foreground">For general enquiries not specific to a campus, you can reach our head office through the Karen campus contact details above.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <a href="tel:+254717998888">+254 717 998 888</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:info@lis.sc.ke">info@lis.sc.ke</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
