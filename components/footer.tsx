import Link from 'next/link'
import React from "react"
import Image from 'next/image'
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Youtube, 
    Mail, 
    Phone, 
    MapPin,
    ArrowRight
} from 'lucide-react'

const campuses = [
    { label: 'Nairobi Karen', href: '/schools/nairobi-karen', grades: 'KG – A Levels' },
    { label: 'Nairobi Lavington', href: '/schools/nairobi-lavington', grades: 'Year 4 – 10' },
    { label: 'Nairobi Kindergarten', href: '/schools/nairobi-kindergarten', grades: 'Reception – Year 3' },
    { label: 'Mombasa', href: '/schools/mombasa', grades: 'KG – A Levels' },
    { label: 'Malindi', href: '/schools/malindi', grades: 'KG – A Levels' },
]

const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Academics', href: '/academics' },
    { label: 'Admissions & Fees', href: '/admissions' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Lanyard System', href: '/lanyard' },
]

export default function FooterSection() {
    return (
        <footer className="relative bg-blue-950 text-zinc-300 border-t border-blue-900/50 pt-20 pb-10">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-blue-900">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col space-y-6">
                        <Link href="/" aria-label="Home" className="flex items-center gap-3">
                            <Image 
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoe2-eXj4lw1EpKiFCgxXXVYOWalbObTTwo.png"
                                alt="Light International School Logo"
                                width={60}
                                height={60}
                                className="object-contain"
                            />
                            <div>
                                <span className="block text-lg font-bold tracking-wider text-white">LIGHT</span>
                                <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">International School</span>
                            </div>
                        </Link>
                        
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                            Light International School (LIS) is a co-educational day and boarding school offering the British National Curriculum from Kindergarten to A-Levels. We foster academic excellence and character.
                        </p>

                        <div className="flex items-center gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 text-zinc-400 hover:text-white transition-colors duration-200" aria-label="Facebook">
                                <Facebook className="size-4" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 text-zinc-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
                                <Twitter className="size-4" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 text-zinc-400 hover:text-white transition-colors duration-200" aria-label="Instagram">
                                <Instagram className="size-4" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 text-zinc-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                                <Linkedin className="size-4" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 text-zinc-400 hover:text-white transition-colors duration-200" aria-label="YouTube">
                                <Youtube className="size-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Explore</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link 
                                        href={link.href} 
                                        className="text-sm text-zinc-400 hover:text-white transition-colors duration-150 inline-flex items-center group"
                                    >
                                        <ArrowRight className="size-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 text-primary" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Campuses */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Our Campuses</h3>
                        <ul className="space-y-4">
                            {campuses.map((campus, idx) => (
                                <li key={idx}>
                                    <Link 
                                        href={campus.href} 
                                        className="group block"
                                    >
                                        <span className="block text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-150">
                                            {campus.label}
                                        </span>
                                        <span className="block text-xs text-zinc-500">
                                            {campus.grades}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div className="lg:col-span-3 flex flex-col space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Get in Touch</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm text-zinc-400">
                                        Off Lang'ata Road, Nairobi, Kenya
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="size-5 text-primary shrink-0" />
                                    <a href="tel:+254717998888" className="text-sm text-zinc-400 hover:text-white transition-colors duration-150">
                                        +254 717 998 888
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="size-5 text-primary shrink-0" />
                                    <a href="mailto:info@lis.ac.ke" className="text-sm text-zinc-400 hover:text-white transition-colors duration-150">
                                        info@lis.ac.ke
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <span className="block text-xs font-mono text-zinc-600 uppercase tracking-widest mb-2">Admissions Office</span>
                            <p className="text-xs text-zinc-500">
                                Mon - Fri: 8:00 AM – 4:30 PM<br />
                                Saturday: 9:00 AM – 1:00 PM
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 font-mono text-center sm:text-left">
                        Copyright © 2026 Light International Academy. All rights reserved.
                    </span>
                    <div className="flex gap-6 text-xs text-zinc-500">
                        <Link href="/privacy" className="hover:text-zinc-300 transition-colors duration-150">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-zinc-300 transition-colors duration-150">Terms of Service</Link>
                        <Link href="/contact" className="hover:text-zinc-300 transition-colors duration-150">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
