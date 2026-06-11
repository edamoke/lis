import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = await createClient()

    // Validate required fields
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert into inquiries table
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          email,
          phone: body.phone || null,
          subject,
          message,
          inquiry_type: body.inquiry_type || 'general',
        },
      ])
      .select()

    if (error) {
      console.error('Inquiry submission error:', error)
      return NextResponse.json(
        { error: 'Failed to submit inquiry' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry. We will respond shortly.',
        data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Inquiries API error:', error)
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
