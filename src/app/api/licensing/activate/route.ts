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

async function getGitHubFile(): Promise<{ content: LicenseEntry[]; sha: string }> {
  const repo = process.env.GITHUB_REPO || 'z1on3/z1on3.github.io';
  const path = 'src/data/licenses.json';
  const token = process.env.GITHUB_TOKEN;

  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) throw new Error(`GitHub GET failed: ${res.status}`);
  const data = await res.json();
  const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
  return { content, sha: data.sha };
}

async function putGitHubFile(content: LicenseEntry[], sha: string, message: string): Promise<void> {
  const repo = process.env.GITHUB_REPO || 'z1on3/z1on3.github.io';
  const path = 'src/data/licenses.json';
  const token = process.env.GITHUB_TOKEN;

  const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');

  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, content: encoded, sha }),
  });

  if (!res.ok) throw new Error(`GitHub PUT failed: ${res.status}`);
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

    const localEntry = (licensesData as LicenseEntry[]).find(
      (l) => l.license_key === license_key
    );

    if (!localEntry) {
      return NextResponse.json(
        { error: 'License not found' },
        { status: 404, headers: corsHeaders() }
      );
    }

    if (localEntry.status !== 'active') {
      return NextResponse.json(
        { error: 'License revoked' },
        { status: 403, headers: corsHeaders() }
      );
    }

    if (localEntry.fingerprint === fingerprint) {
      return NextResponse.json({ success: true }, { headers: corsHeaders() });
    }

    if (localEntry.fingerprint !== null) {
      return NextResponse.json(
        { error: 'License already activated on another machine' },
        { status: 409, headers: corsHeaders() }
      );
    }

    // First activation — update via GitHub API
    const { content: licenses, sha } = await getGitHubFile();
    const entry = licenses.find((l) => l.license_key === license_key);
    if (!entry) {
      return NextResponse.json(
        { error: 'License not found in remote' },
        { status: 404, headers: corsHeaders() }
      );
    }

    entry.fingerprint = fingerprint;
    entry.activated_at = new Date().toISOString().split('T')[0];

    await putGitHubFile(licenses, sha, `license: activate ${entry.email}`);

    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
