'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Dither from '@/components/Dither'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import AiChatbot from '@/components/ai-chatbot'
import { isWebGLSupported } from '@/lib/utils'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null)

  useEffect(() => {
    setHasWebGL(isWebGLSupported())
  }, [])

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      {hasWebGL && (
        <div className="absolute w-full h-dvh max-h-155 sm:max-h-115 md:max-h-125 lg:max-h-190 xl:max-h-195 z-0">
          <Dither
            waveColor={[0.30980392156862746, 0.30980392156862746, 0.30980392156862746]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            pixelSize={2}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        </div>
      )}
      {!hasWebGL && hasWebGL !== null && (
        <div className="absolute w-full h-dvh max-h-155 sm:max-h-115 md:max-h-125 lg:max-h-190 xl:max-h-195 z-0 bg-gradient-to-b from-neutral-950 to-neutral-900 opacity-60 pointer-events-none" />
      )}
      <HeroHeader />
      {children}
      <AiChatbot />
      <FooterSection />
    </>
  )
}
