import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = await createClient()

    // Validate required fields
    const { event_id, participant_name, email } = body

    if (!event_id || !participant_name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if event exists
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('id, max_capacity')
      .eq('id', event_id)
      .single()

    if (eventError || !eventData) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Check capacity if max_capacity is set
    if (eventData.max_capacity) {
      const { data: registrations, error: countError } = await supabase
        .from('event_registrations')
        .select('num_guests')
        .eq('event_id', event_id)
        .eq('status', 'registered')

      if (!countError) {
        const totalRegistered = registrations?.reduce((sum, reg) => sum + (reg.num_guests || 1), 0) || 0
        if (totalRegistered >= eventData.max_capacity) {
          return NextResponse.json(
            { error: 'Event is at full capacity' },
            { status: 400 }
          )
        }
      }
    }

    // Insert event registration
    const { data, error } = await supabase
      .from('event_registrations')
      .insert([
        {
          event_id,
          participant_name,
          email,
          phone: body.phone || null,
          num_guests: body.num_guests || 1,
        },
      ])
      .select()

    if (error) {
      console.error('Event registration error:', error)
      return NextResponse.json(
        { error: 'Failed to register for event' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully registered for the event',
        data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Event registration API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const eventId = searchParams.get('event_id')

    if (!eventId) {
      return NextResponse.json(
        { error: 'event_id parameter is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('status', 'registered')

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch registrations' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Event registration GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
