import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = await createClient()

    // Validate required fields
    const { student_name, email, grade_applying, parent_name, parent_email } = body

    if (!student_name || !email || !grade_applying || !parent_name || !parent_email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert into admissions table
    const { data, error } = await supabase
      .from('admissions')
      .insert([
        {
          student_name,
          email,
          phone: body.phone || null,
          date_of_birth: body.date_of_birth || null,
          current_school: body.current_school || null,
          grade_applying,
          parent_name,
          parent_email,
          parent_phone: body.parent_phone || null,
        },
      ])
      .select()

    if (error) {
      console.error('Admissions submission error:', error)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Admissions API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
