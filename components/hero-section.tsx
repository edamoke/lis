'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import DecryptedText from "@/components/DecryptedText";
import { transitionVariants } from "@/lib/utils";
import LanyardWithControls from "@/components/lanyard-with-controls";
import Image from 'next/image'

const schoolImages = [
    "Nairobi Karen",
    "Nairobi Lavington",
    "Nairobi Kindergarten",
    "Mombasa",
    "Malindi"
];

export default function HeroSection({ isDuplicate = false }: { isDuplicate?: boolean }) {
    const [lanyardY, setLanyardY] = React.useState(0)
    const [lanyardZIndex, setLanyardZIndex] = React.useState(30)
    const [lanyardPosition, setLanyardPosition] = React.useState<'right' | 'left'>('right')
    const [lanyardOpacity, setLanyardOpacity] = React.useState(1.0)
    const agendaRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (isDuplicate) return;
        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY
                    const heroHeight = window.innerHeight
                    
                    // Gentle parallax: moves up slowly as user scrolls, max shift 80px
                    setLanyardY(Math.min(scrollTop * 0.08, 80))

                    // Smoothly fade out the lanyard as we scroll through the second section.
                    // Fade starts around 80% of window height (near the end of hero content)
                    // and fully fades out to 0 opacity by 180% of window height (at the end of features section)
                    const fadeStart = heroHeight * 0.8
                    const fadeEnd = heroHeight * 1.8
                    
                    let opacity = 1.0
                    if (scrollTop > fadeStart) {
                        opacity = Math.max(0, 1.0 - ((scrollTop - fadeStart) / (fadeEnd - fadeStart)))
                    }
                    setLanyardOpacity(opacity)
                    
                    if (opacity > 0) {
                        // In hero and features sections — visible on right
                        setLanyardZIndex(42)
                        setLanyardPosition('right')
                    } else {
                        // Everywhere else — hidden deep behind content
                        setLanyardZIndex(-50)
                        setLanyardPosition('left')
                    }
                    
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isDuplicate])

    const renderCarousel = (isRed: boolean) => {
        const bgClass = isRed ? "bg-red-950 dark:bg-red-950" : "bg-blue-950 dark:bg-blue-950";
        const fromBgClass = isRed ? "from-red-950" : "from-blue-950";
        const hoverTextClass = isRed ? "group-hover:text-red-300" : "group-hover:text-sky-300";
        return (
            <section className={`${bgClass} text-white dark:text-white pb-16 md:pb-32 pt-8 md:pt-16 overflow-hidden`}>
                <AnimatedGroup
                    variants={{
                        container: {
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.75,
                                },
                            },
                        },
                        ...transitionVariants,
                    } as any}
                    className="group relative m-auto max-w-6xl px-6"
                >

                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-44 md:border-r md:pr-6 border-white/20">
                            <p className="text-end text-sm font-mono uppercase text-white/70">Our Campuses</p>
                        </div>
                        <div className="relative py-6 md:w-[calc(100%-11rem)] overflow-hidden">
                            <InfiniteSlider
                                speedOnHover={20}
                                speed={40}
                                gap={112}>
                                <Link href="/schools/nairobi-karen" className="flex flex-col items-center group">
                                    <p className={`text-sm font-semibold ${hoverTextClass} transition-colors`}>Nairobi Karen</p>
                                    <p className="text-xs text-white/60">KG – A Levels</p>
                                </Link>
                                <Link href="/schools/nairobi-lavington" className="flex flex-col items-center group">
                                    <p className={`text-sm font-semibold ${hoverTextClass} transition-colors`}>Nairobi Lavington</p>
                                    <p className="text-xs text-white/60">Year 4 – 10</p>
                                </Link>
                                <Link href="/schools/nairobi-kindergarten" className="flex flex-col items-center group">
                                    <p className={`text-sm font-semibold ${hoverTextClass} transition-colors`}>Nairobi Kindergarten</p>
                                    <p className="text-xs text-white/60">Reception – Year 3</p>
                                </Link>
                                <Link href="/schools/mombasa" className="flex flex-col items-center group">
                                    <p className={`text-sm font-semibold ${hoverTextClass} transition-colors`}>Mombasa</p>
                                    <p className="text-xs text-white/60">KG – A Levels</p>
                                </Link>
                                <Link href="/schools/malindi" className="flex flex-col items-center group">
                                    <p className={`text-sm font-semibold ${hoverTextClass} transition-colors`}>Malindi</p>
                                    <p className="text-xs text-white/60">KG – A Levels</p>
                                </Link>
                            </InfiniteSlider>
                            <div
                                className={`bg-linear-to-r ${fromBgClass} absolute inset-y-0 left-0 w-20`}></div>
                            <div
                                className={`bg-linear-to-l ${fromBgClass} absolute inset-y-0 right-0 w-20`}></div>
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </AnimatedGroup>
            </section>
        );
    };

    return (
        <main className="overflow-x-hidden">
            {/* Fixed lanyard — dynamic position (right in hero/features, left in agenda), z-index hides behind features section */}
            {!isDuplicate && (
                <div
                    className={`fixed top-0 h-screen w-[60%] hidden lg:block pointer-events-none transition-all duration-700 ease-out ${
                        lanyardPosition === 'right' ? 'right-0' : 'left-0'
                    }`}
                    style={{
                        zIndex: lanyardZIndex,
                        transform: `translateY(${lanyardY}px)`,
                        transition: 'zIndex 0s, left 0.7s ease-out, right 0.7s ease-out, transform 0.15s ease-out, opacity 0.1s ease-out',
                        opacity: lanyardOpacity,
                    }}
                >
                    <div className="w-full h-full pointer-events-auto">
                        <LanyardWithControls
                            position={[0, 0, 25]}
                            containerClassName='w-full h-full select-none'
                            defaultName="Light International"
                        />
                    </div>
                </div>
            )}

            <section className='relative min-h-screen lg:h-screen flex flex-col'>
                {/* Background image */}
                <div className="absolute inset-0 z-0 opacity-90">
                    <Image
                        src={isDuplicate ? "/heroes/careers.png" : "/heroes/about.png"}
                        alt="Light International School"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div
                        className="absolute inset-0 bg-black/45"
                    />
                </div>

                <div className="relative z-10 flex-1 flex items-end">
                    <div className="w-full pb-24 pt-52 md:pb-32 md:pt-64 lg:pb-56 lg:pt-52 lg:grid lg:grid-cols-2 lg:grid-rows-1">
                        <div className="relative mx-auto flex max-w-xl flex-col px-6 lg:block">
                            <div className="mx-auto max-w-2xl text-center lg:ml-0 lg:text-left">
                                <div className='mt-8 lg:mt-16'>
                                    <DecryptedText
                                        text="20th June 2026"
                                        animateOn="view"
                                        revealDirection="start"
                                        sequential
                                        useOriginalCharsOnly={false}
                                        speed={70}
                                        className='font-mono text-white/70 bg-white/10 rounded-md uppercase py-2 px-3'
                                    />
                                </div>
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="max-w-2xl text-balance text-5xl font-semibold md:text-6xl xl:text-7xl text-white">
                                    Light International
                                </TextEffect>
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="max-w-2xl text-balance text-5xl font-semibold md:text-6xl xl:text-7xl bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                                    School
                                </TextEffect>
                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="mt-8 max-w-2xl text-pretty text-lg text-white/80 p-1 rounded-md">
                                    A premier Cambridge International institution in Kenya with five campuses across Nairobi, Mombasa, and Malindi. Empowering students to become confident, compassionate, and innovative learners.
                                </TextEffect>
                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    } as any}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start"
                                >
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-5 text-base">
                                        <Link href="tel:+254717998888">
                                            <span className="text-nowrap">Contact Nairobi: +254 717 998 888</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="px-5 text-base bg-blue-600/10 backdrop-blur-sm hover:bg-blue-600/20">
                                        <Link href="mailto:info@lis.sc.ke">
                                            <span className="text-nowrap">Email: info@lis.sc.ke</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>
                        {/* Mobile lanyard — only in hero section on small screens, 120% increase = h-[464px] * 2.20 = h-[1021px] */}
                        {!isDuplicate && (
                            <div className='block lg:hidden w-full h-[1021px] mt-8' aria-hidden="false">
                                <LanyardWithControls
                                    position={[0, 0, 25]}
                                    containerClassName='w-full h-full select-none'
                                    defaultName="Light International"
                                />
                            </div>
                        )}
                        {/* Spacer column so content doesn't sit behind the fixed lanyard on desktop */}
                        <div className='hidden lg:block' aria-hidden="true" />
                    </div>
                </div>
            </section>
            {!isDuplicate && renderCarousel(false)}
        </main>
    )
}
