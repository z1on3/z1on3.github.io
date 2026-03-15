import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not set. Simulating success.");
      return NextResponse.json({ simulated: true });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <portfolio@carlovii.com>',
      to: ['panercarlo99+portfolio@gmail.com'],
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
