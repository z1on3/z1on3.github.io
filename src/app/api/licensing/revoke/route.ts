import { NextResponse } from 'next/server';

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
    const { password, license_id } = await request.json();

    const expectedPassword = process.env.EMAIL_LOGS_PASSWORD;
    if (!expectedPassword || password !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!license_id) {
      return NextResponse.json({ error: 'Missing license_id' }, { status: 400 });
    }

    const { content: licenses, sha } = await getGitHubFile();
    const entry = licenses.find((l) => l.id === license_id);
    if (!entry) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 });
    }

    entry.status = 'revoked';

    await putGitHubFile(licenses, sha, `license: revoke ${entry.email}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
