import { notFound } from 'next/navigation'
import { getSchoolBySlug, schools } from '@/lib/schools-data'
import SchoolPageContent from '@/components/school-page-content'

export async function generateStaticParams() {
  return schools.map((school) => ({ slug: school.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const school = getSchoolBySlug(slug)
  if (!school) return {}
  return {
    title: `${school.name} | Light International School`,
    description: school.description,
  }
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const school = getSchoolBySlug(slug)
  if (!school) notFound()

  return <SchoolPageContent school={school} />
}
