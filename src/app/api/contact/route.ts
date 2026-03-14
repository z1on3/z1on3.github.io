import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!resendApiKey) {
      // Allow simulation if API key is not yet set
      console.warn("RESEND_API_KEY is not set. Simulating success.");
      return NextResponse.json({ simulated: true });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: ['panercarlo99+portfolio@gmail.com'], // Deliver to the user's email
      subject: `New Transmission from ${name}`,
      text: `Sender: ${name} (${email})\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
