import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {TextEffect} from "./motion-primitives/text-effect"
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";
import {transitionVariants} from "@/lib/utils";

export default function CallToAction() {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-red-900 to-red-950 border-t border-b border-red-800/30 text-white relative z-40">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl text-white">
                        Ready to Join Light International School?
                    </TextEffect>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                        className="mt-4 text-red-100/80 max-w-2xl mx-auto">
                        Contact our admissions team to schedule a campus visit and discuss your child's educational journey.
                    </TextEffect>
                    <AnimatedGroup
                        triggerOnView
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
                        }}
                        className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                        <Button
                            asChild
                            size="lg">
                            <Link href="tel:+254717998888">
                                <span>Call Nairobi Campus</span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="mailto:info@lis.sc.ke">
                                <span>Email Us</span>
                            </Link>
                        </Button>
                    </AnimatedGroup>
                    <div className="mt-12 pt-8 border-t border-red-800/50">
                        <p className="text-sm text-red-100/80 mb-4">Other Campuses:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="font-semibold text-sm text-white">Mombasa</p>
                                <p className="text-xs text-red-100/70 mt-1">+254 784 777 771</p>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-white">Malindi</p>
                                <p className="text-xs text-red-100/70 mt-1">+254 716 839 822</p>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-white">Kindergarten</p>
                                <p className="text-xs text-red-100/70 mt-1">+254 728 663 764</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
