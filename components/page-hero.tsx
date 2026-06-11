'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import DecryptedText from '@/components/DecryptedText'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { transitionVariants } from '@/lib/utils'
import LanyardWithControls from '@/components/lanyard-with-controls'
import { useCmsSection } from '@/hooks/use-cms-section'

interface PageHeroProps {
  /** Background image path from /public */
  image: string
  /** Small badge/date text shown above the title (DecryptedText) */
  badge?: string
  /** Page main title — first line */
  title: string
  /** Second line of the title rendered in the blue-red gradient */
  titleAccent?: string
  /** Subtitle / description */
  subtitle?: string
  /** Optional back link */
  backHref?: string
  backLabel?: string
  /** Overlay darkness 0–100, default 45 */
  overlayOpacity?: number
  /** Primary CTA label + href */
  cta?: { label: string; href: string }
  /** Secondary CTA label + href */
  ctaSecondary?: { label: string; href: string }
  /**
   * CMS page key — if provided, content will be overridden by the CMS store.
   * e.g. 'about', 'contact', 'schools/nairobi-karen'
   */
  cmsPage?: string
  /** Name displayed on the 3D lanyard card */
  lanyardName?: string
}

export default function PageHero({
  image,
  badge,
  title,
  titleAccent,
  subtitle,
  backHref,
  backLabel = 'Back',
  overlayOpacity = 45,
  cta,
  ctaSecondary,
  cmsPage,
  lanyardName = 'Light International',
}: PageHeroProps) {
  // Live CMS overrides
  const cmsSection = useCmsSection(cmsPage ?? '', 'hero')
  const resolvedImage = (cmsPage && (cmsSection?.content.image as string)) || image
  const resolvedBadge = (cmsPage && (cmsSection?.content.badge as string)) || badge
  const resolvedTitle = (cmsPage && (cmsSection?.content.title as string)) || title
  const resolvedSubtitle = (cmsPage && (cmsSection?.content.subtitle as string)) || subtitle

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={resolvedImage}
          alt={resolvedTitle}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlayOpacity / 100})` }}
        />
      </div>

      {/* Content — z-10 relative positioning */}
      <div className="relative z-10 flex-1 flex items-end">
        <div className="w-full pb-24 pt-52 md:pb-32 md:pt-64 lg:pb-56 lg:pt-52 lg:grid lg:grid-cols-2 lg:grid-rows-1">
          <div className="relative mx-auto flex max-w-xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-2xl text-center lg:ml-0 lg:text-left">

              {/* Back link */}
              {backHref && (
                <div className="mb-6">
                  <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="size-4" />
                    {backLabel}
                  </Link>
                </div>
              )}

              {/* Badge / date — DecryptedText */}
              {resolvedBadge && (
                <div className="mt-8 lg:mt-0 mb-4">
                  <DecryptedText
                    text={resolvedBadge}
                    animateOn="view"
                    revealDirection="start"
                    sequential
                    useOriginalCharsOnly={false}
                    speed={70}
                    className="font-mono text-white/70 bg-white/10 rounded-md uppercase py-2 px-3 backdrop-blur-sm"
                  />
                </div>
              )}

              {/* Title */}
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="max-w-2xl text-balance text-5xl font-semibold text-white md:text-6xl xl:text-7xl"
              >
                {resolvedTitle}
              </TextEffect>

              {/* Title accent line */}
              {titleAccent && (
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="max-w-2xl text-balance text-5xl font-semibold md:text-6xl xl:text-7xl bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
                >
                  {titleAccent}
                </TextEffect>
              )}

              {/* Subtitle */}
              {resolvedSubtitle && (
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mt-6 max-w-2xl text-pretty text-lg text-white/80 leading-relaxed"
                >
                  {resolvedSubtitle}
                </TextEffect>
              )}

              {/* CTAs */}
              {(cta || ctaSecondary) && (
                <AnimatedGroup
                  variants={{
                    container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                    ...transitionVariants,
                  }}
                  className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start"
                >
                  {cta && (
                    <Button asChild size="lg" className="px-5 text-base">
                      <Link href={cta.href}>
                        <span className="text-nowrap">{cta.label}</span>
                      </Link>
                    </Button>
                  )}
                  {ctaSecondary && (
                    <Button
                      asChild
                      size="lg"
                      variant="ghost"
                      className="px-5 text-base bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white hover:text-white"
                    >
                      <Link href={ctaSecondary.href}>
                        <span className="text-nowrap">{ctaSecondary.label}</span>
                      </Link>
                    </Button>
                  )}
                </AnimatedGroup>
              )}
            </div>
          </div>

          {/* Mobile lanyard — inline in hero only on small screens, 120% increase = h-[464px] * 2.20 */}
          <div className="block lg:hidden w-full h-[1021px] mt-8">
            <LanyardWithControls
              position={[0, 0, 25]}
              containerClassName="w-full h-full select-none"
              defaultName={lanyardName}
            />
          </div>

          {/* Desktop spacer column */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
