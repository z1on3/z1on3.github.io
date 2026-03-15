import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { password } = await request.json();

    const expectedPassword = process.env.EMAIL_LOGS_PASSWORD;
    if (!expectedPassword || password !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.get(id);

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message || 'Email not found' },
        { status: 500 }
      );
    }

    return NextResponse.json({ email: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
