import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Log for now — backend integration to be wired later
    console.log('[waitlist] New submission:', { name, email, timestamp: new Date().toISOString() })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[waitlist] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
