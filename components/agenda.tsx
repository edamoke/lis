import {TextEffect} from "@/components/motion-primitives/text-effect";
import React from "react";
import {transitionVariants} from "@/lib/utils";
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";
import Image from "next/image";

export default function Agenda() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:grid-cols-[1fr_auto] lg:gap-x-12 items-start">
                    <div className="text-center lg:text-left space-y-6">
                        <TextEffect
                            triggerOnView
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h2"
                            className="text-3xl font-semibold md:text-4xl">
                            Our School Programs
                        </TextEffect>
                        <div className="mx-auto lg:mx-0 max-w-[340px] w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/30 shadow-lg">
                            <Image
                                src="/heroes/program.jpg"
                                alt="Our School Programs"
                                width={340}
                                height={580}
                                className="w-full h-[580px] object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
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
                        } as any}
                        className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0"
                    >
                        <div className="pb-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono '>Early Years</span>
                                <span>Kindergarten & Primary</span>
                            </div>
                            <p className="text-muted-foreground mt-4">Reception to Year 6 with focused development in numeracy, literacy, and foundational skills.</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono '>Secondary</span>
                                <span>Year 7-11 (IGCSE)</span>
                            </div>
                            <p className="text-muted-foreground mt-4">Cambridge IGCSE curriculum with rigorous academics and well-rounded development.</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono '>A Levels</span>
                                <span>Year 12-13 Specialized</span>
                            </div>
                            <p className="text-muted-foreground mt-4">Advanced studies with internship opportunities at leading companies in Kenya.</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono '>Activities</span>
                                <span>Clubs & Competitions</span>
                            </div>
                            <p className="text-muted-foreground mt-4">Sports, robotics, arts, Model UN, World Scholars Cup, and various international competitions.</p>
                        </div>
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
