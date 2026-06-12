'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { transitionVariants } from "@/lib/utils";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function GlobalCommunity() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);
    const rightContentRef = useRef<HTMLDivElement>(null);
    const parallaxContainerRef = useRef<HTMLDivElement>(null);
    const animalSvgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const leftContent = leftContentRef.current;
        const rightContent = rightContentRef.current;
        const parallaxContainer = parallaxContainerRef.current;

        if (!section || !leftContent || !rightContent || !parallaxContainer) return;

        // Immediately set opacity to 1 for instant visibility
        leftContent.style.opacity = '1';
        rightContent.style.opacity = '1';

        // Create a timeline for parallax effects with increased speed
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
                markers: false,
            },
        });

        // Parallax effect for left content - moves up with increased distance (reduced by 40%)
        tl.to(leftContent, {
            y: -150,
            duration: 1,
        }, 0);

        // Parallax effect for right content - moves down with increased distance (reduced by 40%)
        tl.to(rightContent, {
            y: 150,
            duration: 1,
        }, 0);

        // Enhanced parallax for the decorative background (reduced by 40%)
        tl.to(parallaxContainer, {
            y: -90,
            duration: 1,
        }, 0);

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-32 overflow-hidden bg-white dark:bg-white"
        >
            {/* Decorative Background Elements with Parallax */}
            <div
                ref={parallaxContainerRef}
                className="absolute inset-0 pointer-events-none overflow-hidden"
            >
                {/* Organic wavy shape at top */}
                <svg
                    viewBox="0 0 1440 120"
                    className="absolute top-0 left-0 w-full h-auto fill-slate-50 dark:fill-slate-50"
                    preserveAspectRatio="none"
                >
                    <path d="M0,40 Q360,0 720,40 T1440,40 L1440,0 L0,0 Z" />
                </svg>

                {/* Animal line illustrations */}
                <svg
                    ref={animalSvgRef}
                    viewBox="0 0 1200 500"
                    className="absolute -top-20 left-0 w-full h-auto opacity-40 text-slate-900/10 dark:text-slate-900/10"
                    preserveAspectRatio="none"
                >
                    {/* Tree outline - top center */}
                    <g stroke="currentColor" strokeWidth="1.5" fill="none">
                        <path d="M350,420 L350,300" />
                        <path d="M330,330 L370,330" />
                        <path d="M320,360 L380,360" />
                        <path d="M310,390 L390,390" />
                    </g>
                </svg>
            </div>

            <div className="mx-auto max-w-6xl px-6 relative z-10">
                {/* Section Header */}
                <AnimatedGroup
                    triggerOnView
                    variants={{
                        container: {
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.2,
                                },
                            },
                        },
                        ...transitionVariants,
                    } as any}
                    className="text-center mb-12 md:mb-16"
                >
                    <p className="text-sm font-mono uppercase text-slate-500 dark:text-slate-500 tracking-widest mb-4">
                        A LEADING INTERNATIONAL SCHOOL IN KENYA
                    </p>
                    <h2 className="text-balance text-4xl md:text-5xl font-bold mb-8">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
                            Our Global School
                        </span>
                        <br />
                        <span className="text-slate-900 dark:text-slate-900">Community</span>
                    </h2>
                </AnimatedGroup>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content Block */}
                    <div
                        ref={leftContentRef}
                        className="group"
                    >
                        <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-lg p-8 md:p-10 text-white space-y-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-red-800/50">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                    Pupils from over 35 different countries
                                </h3>
                            </div>
                            <p className="text-sm md:text-base leading-relaxed text-white/85">
                                Light International School is situated on Co-operative College Road, off Karen Road, in the tranquil suburb of Karen
                            </p>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 group-hover:translate-x-1"
                                size="lg"
                            >
                                Learn More →
                            </Button>
                        </div>

                        {/* Images Gallery */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {/* Art Class Image */}
                            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-48 md:h-56">
                                <Image
                                    src="/art-class.jpeg"
                                    alt="Student painting in art class"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            {/* Science Class Image */}
                            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-48 md:h-56">
                                <Image
                                    src="/science-class.jpeg"
                                    alt="Student conducting chemistry experiment in science lab"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Content Block */}
                    <div
                        ref={rightContentRef}
                        className="group"
                    >
                        {/* Images Gallery (the 2 lady images in the spot marked X) */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {/* KG Lab Image */}
                            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-48 md:h-56">
                                <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KG-L2kHMVqhnWIWyhyE1YAdRbuDbnpPtp.jpg"
                                    alt="Students in computer lab learning with technology"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            {/* Physics Lab Image */}
                            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-48 md:h-56">
                                <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LIS-NBO-Phy-Lab-RzE3GLkwNMNtGAIB2dc4zUMlggeG1G.jpg"
                                    alt="Teacher demonstrating science experiment with students"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-8 md:p-10 text-white space-y-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-800/50">
                            <div className="space-y-4">
                                <h3 className="text-xl md:text-2xl font-bold leading-tight">
                                    Our cultural roots are varied - we are so proud of the diversity of our children at Light International School.
                                </h3>
                                <blockquote className="border-l-4 border-amber-400 pl-6 italic text-sm md:text-base text-white/90 space-y-2">
                                    <p>"Every individual matters. Every individual has a role to play. Every individual makes a difference."</p>
                                    <footer className="font-semibold not-italic text-amber-300">— Jane Goodall</footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
