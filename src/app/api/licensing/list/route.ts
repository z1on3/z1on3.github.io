import { NextResponse } from 'next/server';
import licensesData from '@/data/licenses.json';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const expectedPassword = process.env.EMAIL_LOGS_PASSWORD;
    if (!expectedPassword || password !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ licenses: licensesData });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
