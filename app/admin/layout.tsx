import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Light International School',
  robots: { index: false, follow: false },
}

/** Admin has its own layout — no site header/footer/dither background */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>
}
