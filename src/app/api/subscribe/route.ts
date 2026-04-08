import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Replace with your Mailchimp API credentials
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX // e.g., 'us14'

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
      console.warn('Mailchimp credentials not configured')
      // Still return success to not annoy users, but log the email
      console.log('Newsletter signup (not configured):', email)
      return NextResponse.json({ success: true, message: 'Thanks for subscribing!' })
    }

    // Add subscriber to Mailchimp
    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'pending', // Send confirmation email
        }),
      }
    )

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Check your email to confirm subscription!' })
    } else if (data.title === 'Member Exists') {
      return NextResponse.json({ success: true, message: 'You\'re already subscribed!' })
    } else {
      throw new Error(data.detail || 'Subscription failed')
    }
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}