import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const expectedPassword = process.env.EMAIL_LOGS_PASSWORD;
    if (!expectedPassword) {
      return NextResponse.json(
        { error: 'EMAIL_LOGS_PASSWORD not configured' },
        { status: 500 }
      );
    }

    if (password !== expectedPassword) {
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

    const allEmails: Array<{
      id: string;
      to: string[];
      from: string;
      subject: string;
      created_at: string;
      last_event: string;
      reply_to: string[] | null;
    }> = [];

    let hasMore = true;
    let lastId: string | undefined;

    while (hasMore) {
      const params: { limit: number; after?: string } = { limit: 100 };
      if (lastId) params.after = lastId;

      const response = await resend.emails.list(params);

      if (response.error || !response.data) {
        return NextResponse.json(
          { error: response.error?.message || 'Failed to fetch emails' },
          { status: 500 }
        );
      }

      const batch = response.data.data;
      if (batch.length === 0) break;

      allEmails.push(...batch);
      hasMore = response.data.has_more ?? false;
      lastId = batch[batch.length - 1].id;
    }

    const portfolioEmails = allEmails.filter((e) =>
      e.from.includes('portfolio@carlovii.com')
    );

    return NextResponse.json({ emails: portfolioEmails });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
