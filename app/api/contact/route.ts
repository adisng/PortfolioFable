import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Forward to Webhook (Discord / Slack / Zapier / Make) if configured
    if (process.env.CONTACT_WEBHOOK_URL) {
      try {
        await fetch(process.env.CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📬 **New Portfolio Message**\n**From:** ${name} (${email})\n**Message:**\n${message}`,
          }),
        })
      } catch (webhookErr) {
        console.error('Failed to forward to webhook:', webhookErr)
      }
    }

    // Forward to Formspree if configured
    if (process.env.FORMSPREE_ENDPOINT) {
      try {
        await fetch(process.env.FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        })
      } catch (formspreeErr) {
        console.error('Failed to forward to Formspree:', formspreeErr)
      }
    }

    // Log to Vercel/server logs so the message is always preserved
    console.log('[Portfolio Contact Form Submission]', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form submission error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
