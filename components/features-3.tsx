import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {BookOpen, Lightbulb, Users} from 'lucide-react'
import React, {ReactNode} from 'react'
import {TextEffect} from "@/components/motion-primitives/text-effect";
import {transitionVariants} from "@/lib/utils";
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";

export default function Features() {
    return (
        <section className="py-16 md:py-32 bg-[#F3F3F3] dark:bg-[#F3F3F3] text-zinc-900 dark:text-zinc-900 relative z-40">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl">
                        Why Choose Light International School?
                    </TextEffect>
                </div>
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
                >
                    <Card
                        className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 bg-gradient-to-br from-red-900 to-red-950 border border-red-800/50 text-white divide-red-800/50 shadow-lg">
                        <div className="group shadow-zinc-950/5">
                            <CardHeader className="pb-3">
                                <CardDecorator>
                                    <BookOpen
                                        className="size-6 text-white"
                                        aria-hidden
                                    />
                                </CardDecorator>

                                <h3 className="mt-6 font-medium text-xl text-white">Cambridge Curriculum</h3>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-red-100/80">International Cambridge curriculum with IGCSE and A Levels for comprehensive education.</p>
                            </CardContent>
                        </div>

                        <div className="group shadow-zinc-950/5">
                            <CardHeader className="pb-3">
                                <CardDecorator>
                                    <Lightbulb
                                        className="size-6 text-white"
                                        aria-hidden
                                    />
                                </CardDecorator>

                                <h3 className="mt-6 font-medium text-xl text-white">Modern Facilities</h3>
                            </CardHeader>

                            <CardContent>
                                <p className="mt-3 text-sm text-red-100/80">State-of-the-art learning facilities with technology-enhanced education systems.</p>
                            </CardContent>
                        </div>

                        <div className="group shadow-zinc-950/5">
                            <CardHeader className="pb-3">
                                <CardDecorator>
                                    <Users
                                        className="size-6 text-white"
                                        aria-hidden
                                    />
                                </CardDecorator>

                                <h3 className="mt-6 font-medium text-xl text-white">Internship Programs</h3>
                            </CardHeader>

                            <CardContent>
                                <p className="mt-3 text-sm text-red-100/80">A-Level students experience real corporate world through partnerships with leading companies.</p>
                            </CardContent>
                        </div>
                    </Card>
                </AnimatedGroup>
            </div>
        </section>
    )
}

const CardDecorator = ({children}: { children: ReactNode }) => (
    <div
        className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-white)25%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] opacity-40"
        />

        <div
            className="bg-red-950/60 border-red-800/50 absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t text-white">{children}</div>
    </div>
)
