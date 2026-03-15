import { NextResponse } from 'next/server';
import licensesData from '@/data/licenses.json';

interface LicenseEntry {
  id: string;
  app: string;
  email: string;
  license_key: string;
  type: string;
  days: number | null;
  fingerprint: string | null;
  activated_at: string | null;
  created_at: string;
  status: string;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: Request) {
  try {
    const { license_key, fingerprint } = await request.json();

    if (!license_key || !fingerprint) {
      return NextResponse.json(
        { error: 'Missing license_key or fingerprint' },
        { status: 400, headers: corsHeaders() }
      );
    }

    const entry = (licensesData as LicenseEntry[]).find(
      (l) => l.license_key === license_key
    );

    if (!entry) {
      return NextResponse.json(
        { valid: false, reason: 'not_found' },
        { headers: corsHeaders() }
      );
    }

    if (entry.fingerprint !== fingerprint) {
      return NextResponse.json(
        { valid: false, reason: 'fingerprint_mismatch' },
        { headers: corsHeaders() }
      );
    }

    if (entry.status !== 'active') {
      return NextResponse.json(
        { valid: false, reason: 'revoked' },
        { headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      { valid: true, status: entry.status },
      { headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
