import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// E-Mail-Transporter für Resend
const resend = new Resend('re_76UEi9qB_9ieJgJxZMSNHWYsAhBehecJc')

export async function POST(request: Request) {
  try {
    console.log('API wurde aufgerufen')
    const body = await request.json()
    console.log('Empfangene Daten:', body)
    
    const { name, email, subject, message } = body

    console.log('Versuche E-Mail zu senden...')
    const result = await resend.emails.send({
      from: 'Munich Golf <onboarding@resend.dev>',
      to: 'nestlercreation@gmail.com',
      replyTo: email,
      subject: `[Munich Golf] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Neue Nachricht von Munich Golf</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Von:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>E-Mail:</strong> ${email}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Betreff:</strong> ${subject}</p>
          </div>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0;"><strong>Nachricht:</strong></p>
            <div style="margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px; margin: 0;">
            Diese E-Mail wurde über das Kontaktformular von Munich Golf gesendet.
          </p>
        </div>
      `
    })

    console.log('E-Mail-Ergebnis:', result)
    return NextResponse.json({ message: 'E-Mail erfolgreich gesendet', result })
  } catch (error) {
    console.error('Detaillierter Fehler:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der E-Mail', details: error },
      { status: 500 }
    )
  }
}
