import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, phone, service_type, budget, message } = await request.json()

    // Validate required fields
    if (!name || !email || !service_type || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: 'devdarlcreates@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; padding: 10px; background: white; border-radius: 8px; border-left: 3px solid #4F46E5; }
            .label { font-weight: bold; color: #4F46E5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            .value { margin-top: 5px; font-size: 16px; color: #333; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .badge { display: inline-block; background: #4F46E5; color: white; padding: 5px 10px; border-radius: 5px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>✨ New Contact Form Submission</h2>
              <p>From your portfolio website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">📝 Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${phone ? `<div class="field">
                <div class="label">📞 Phone</div>
                <div class="value">${phone}</div>
              </div>` : ''}
              <div class="field">
                <div class="label">🎯 Service Type</div>
                <div class="value">${service_type.replace('_', ' ').toUpperCase()}</div>
              </div>
              ${budget ? `<div class="field">
                <div class="label">💰 Budget Range</div>
                <div class="value">${budget}</div>
              </div>` : ''}
              <div class="field">
                <div class="label">💬 Message</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <div class="label">📅 Submitted</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your portfolio contact form.</p>
              <p><span class="badge">Reply directly to this email</span></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Service Type: ${service_type.replace('_', ' ').toUpperCase()}
        Budget: ${budget || 'Not specified'}
        Message: ${message}
        Submitted: ${new Date().toLocaleString()}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)
    
    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    )
  }
}