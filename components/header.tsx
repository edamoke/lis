'use client'
import Link from 'next/link'
import {Menu, X, Moon, Sun, ChevronDown} from 'lucide-react'
import {Button} from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const campuses = [
    { label: 'Nairobi Karen', href: '/schools/nairobi-karen', grades: 'KG – A Levels' },
    { label: 'Nairobi Lavington', href: '/schools/nairobi-lavington', grades: 'Year 4 – 10' },
    { label: 'Nairobi Kindergarten', href: '/schools/nairobi-kindergarten', grades: 'Reception – Year 3' },
    { label: 'Mombasa', href: '/schools/mombasa', grades: 'KG – A Levels' },
    { label: 'Malindi', href: '/schools/malindi', grades: 'KG – A Levels' },
]

const communityItems = [
    { label: 'Student Life Hub', href: '/student-life', desc: 'Clubs, sports & council' },
    { label: 'STEM & Innovation', href: '/innovation', desc: 'Project showcase' },
    { label: 'Virtual Campus Tour', href: '/campus-tour', desc: 'Experience campuses' },
    { label: 'Parent Portal', href: '/parent-portal', desc: 'PTA & guidelines' },
    { label: 'Alumni Network', href: '/alumni', desc: 'Directory & stories' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const [rotation, setRotation] = React.useState(0)
    const [logoOpacity, setLogoOpacity] = React.useState(1)
    const { theme, setTheme } = useTheme()
    const logoRef = React.useRef<HTMLAnchorElement>(null)
    
    const leftMenuItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Academics', href: '/academics' },
        { label: 'Schools', href: '/schools' },
        { label: 'Community', href: '#' },
    ]
    
    const rightMenuItems = [
        { label: 'Admissions', href: '/admissions' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' }
    ]

    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setRotation(scrollTop * 0.5)

            // Fade out the logo as it approaches the end of the hero section.
            // Hero is ~100vh. Start fading at 60vh, fully gone by 90vh.
            const heroHeight = window.innerHeight
            const fadeStart = heroHeight * 0.60
            const fadeEnd   = heroHeight * 0.90
            if (scrollTop <= fadeStart) {
                setLogoOpacity(1)
            } else if (scrollTop >= fadeEnd) {
                setLogoOpacity(0)
            } else {
                setLogoOpacity(1 - (scrollTop - fadeStart) / (fadeEnd - fadeStart))
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full bg-transparent backdrop-blur-md border-b border-zinc-200 dark:border-white/5">
                <div className="mx-auto max-w-5xl w-full px-6 transition-all duration-300">
                    {/* Mobile Layout */}
                    <div className="lg:hidden">
                        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3">
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 block cursor-pointer p-2.5">
                                <Menu
                                    className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200"/>
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200"/>
                            </button>

                            <Link
                                href="/"
                                aria-label="home"
                                className="flex flex-1 justify-center items-center">
                                <Image 
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoe2-eXj4lw1EpKiFCgxXXVYOWalbObTTwo.png"
                                    alt="Light International School Logo"
                                    width={40}
                                    height={40}
                                    className='object-contain'
                                />
                            </Link>

                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2.5 -m-2.5 rounded-md hover:bg-accent"
                                aria-label="Toggle theme">
                                {mounted && theme === 'dark' ? (
                                    <Sun className="size-5" />
                                ) : (
                                    <Moon className="size-5" />
                                )}
                            </button>
                        </div>

                        <div
                            className="bg-background in-data-[state=active]:flex mb-6 hidden w-full flex-col space-y-3 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none">
                            <div className="flex flex-col space-y-3">
                                {[...leftMenuItems, ...rightMenuItems].map((item) => {
                                    if (item.label === 'Schools') {
                                        return (
                                            <div key="schools-mobile">
                                                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Our Campuses</p>
                                                {campuses.map((campus) => (
                                                    <Button
                                                        key={campus.href}
                                                        asChild
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-full justify-start text-white hover:text-sky-400 hover:bg-sky-500/10 dark:hover:bg-sky-500/20"
                                                        onClick={() => setMenuState(false)}>
                                                        <Link href={campus.href}>
                                                            <span>{campus.label}</span>
                                                            <span className="ml-auto text-xs text-muted-foreground">{campus.grades}</span>
                                                        </Link>
                                                    </Button>
                                                ))}
                                            </div>
                                        )
                                    } else if (item.label === 'Community') {
                                        return (
                                            <div key="community-mobile">
                                                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Community & Engagement</p>
                                                {communityItems.map((cItem) => (
                                                    <Button
                                                        key={cItem.href}
                                                        asChild
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-full justify-start text-white hover:text-sky-400 hover:bg-sky-500/10 dark:hover:bg-sky-500/20"
                                                        onClick={() => setMenuState(false)}>
                                                        <Link href={cItem.href}>
                                                            <span>{cItem.label}</span>
                                                        </Link>
                                                    </Button>
                                                ))}
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <Button
                                                key={item.label}
                                                asChild
                                                variant="ghost"
                                                size="sm"
                                                className="text-white hover:text-sky-400 hover:bg-sky-500/10 dark:hover:bg-sky-500/20"
                                                onClick={() => setMenuState(false)}>
                                                <Link href={item.href}>
                                                    <span>{item.label}</span>
                                                </Link>
                                            </Button>
                                        )
                                    }
                                })}
                                <Button
                                    asChild
                                    size="sm"
                                    className="text-white hover:text-sky-400 hover:bg-sky-500/10 dark:hover:bg-sky-500/20">
                                    <Link href="tel:+254717998888">
                                        <span>Call Now</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:flex items-center justify-between py-4 gap-4">
                        {/* Left Menu Items */}
                        <div className="flex items-center gap-1">
                            {leftMenuItems.map((item) => {
                                if (item.label === 'Schools') {
                                    return (
                                        <div key="schools" className="relative group">
                                            <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-sky-400 px-3 py-1.5 rounded-md hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-colors duration-150">
                                                Schools
                                                <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                                            </button>
                                            {/* Dropdown */}
                                            <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-white/10 bg-background/80 backdrop-blur-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                                                <div className="p-1.5">
                                                    {campuses.map((campus) => (
                                                        <Link
                                                            key={campus.href}
                                                            href={campus.href}
                                                            className="flex flex-col px-3 py-2 rounded-lg text-white hover:text-sky-400 hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-colors">
                                                            <span className="text-sm font-medium">{campus.label}</span>
                                                            <span className="text-xs text-muted-foreground">{campus.grades}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else if (item.label === 'Community') {
                                    return (
                                        <div key="community" className="relative group">
                                            <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-sky-400 px-3 py-1.5 rounded-md hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-colors duration-150">
                                                Community
                                                <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                                            </button>
                                            {/* Dropdown */}
                                            <div className="absolute top-full left-0 mt-1 w-64 rounded-xl border border-white/10 bg-background/80 backdrop-blur-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                                                <div className="p-1.5">
                                                    {communityItems.map((cItem) => (
                                                        <Link
                                                            key={cItem.href}
                                                            href={cItem.href}
                                                            className="flex flex-col px-3 py-2 rounded-lg text-white hover:text-sky-400 hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-colors text-left">
                                                            <span className="text-sm font-medium">{cItem.label}</span>
                                                            <span className="text-[10px] text-muted-foreground leading-tight">{cItem.desc}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="text-sm font-medium text-white hover:text-sky-400 px-3 py-1.5 rounded-md hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-colors duration-150">
                                            {item.label}
                                        </Link>
                                    )
                                }
                            })}
                        </div>

                        {/* Center Logo — fades out on scroll past hero section */}
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex flex-shrink-0 items-center transition-opacity duration-300"
                            ref={logoRef}
                            style={{ opacity: logoOpacity }}>
                            <div style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.1s ease-out' }}>
                                <Image 
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoe2-eXj4lw1EpKiFCgxXXVYOWalbObTTwo.png"
                                    alt="Light International School Logo"
                                    width={144}
                                    height={144}
                                    className='object-contain'
                                />
                            </div>
                        </Link>

                        {/* Right Menu Items + Theme Toggle */}
                        <div className="flex items-center gap-1">
                            {rightMenuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-sm font-medium text-white hover:text-sky-400 px-3 py-1.5 rounded-md hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-colors duration-150">
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="tel:+254717998888"
                                className="text-sm font-medium text-white hover:text-sky-400 px-3 py-1.5 rounded-md hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-colors duration-150">
                                Call Now
                            </Link>
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 -m-1 rounded-md hover:bg-accent ml-2"
                                aria-label="Toggle theme">
                                {mounted && theme === 'dark' ? (
                                    <Sun className="size-5" />
                                ) : (
                                    <Moon className="size-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
