import { NextResponse } from 'next/server';
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2.js';

ed.hashes.sha512 = sha512;

function toBase64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

interface LicensePayload {
  email: string;
  type: 'lifetime' | 'trial';
  days: number | null;
  app: string;
  created_at: string;
}

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

  if (res.status === 409) {
    const fresh = await getGitHubFile();
    const lastEntry = content[content.length - 1];
    fresh.content.push(lastEntry);
    const retryEncoded = Buffer.from(JSON.stringify(fresh.content, null, 2)).toString('base64');
    const retry = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, content: retryEncoded, sha: fresh.sha }),
    });
    if (!retry.ok) throw new Error(`GitHub PUT retry failed: ${retry.status}`);
    return;
  }

  if (!res.ok) throw new Error(`GitHub PUT failed: ${res.status}`);
}

export async function POST(request: Request) {
  try {
    const { password, email, app: appName, type, days } = await request.json();

    const expectedPassword = process.env.EMAIL_LOGS_PASSWORD;
    if (!expectedPassword || password !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!email || !type) {
      return NextResponse.json({ error: 'Missing email or type' }, { status: 400 });
    }
    if (type !== 'lifetime' && type !== 'trial') {
      return NextResponse.json({ error: 'Type must be "lifetime" or "trial"' }, { status: 400 });
    }
    if (type === 'trial' && (!days || days <= 0)) {
      return NextResponse.json({ error: 'Trial requires positive days' }, { status: 400 });
    }

    const signingKeyB64 = process.env.SPEECY_SIGNING_KEY;
    if (!signingKeyB64) {
      return NextResponse.json({ error: 'SPEECY_SIGNING_KEY not configured' }, { status: 500 });
    }
    const privateKey = new Uint8Array(Buffer.from(signingKeyB64, 'base64'));

    const payload: LicensePayload = {
      email,
      type,
      days: type === 'lifetime' ? null : days,
      app: appName || 'speecy',
      created_at: new Date().toISOString().split('T')[0],
    };
    const payloadJson = JSON.stringify(payload);
    const payloadBytes = new TextEncoder().encode(payloadJson);
    const payloadB64 = toBase64Url(payloadBytes);

    const signature = ed.sign(payloadBytes, privateKey);
    const signatureB64 = toBase64Url(signature);

    const prefix = (appName || 'speecy').toUpperCase();
    const licenseKey = `${prefix}-${payloadB64}.${signatureB64}`;

    const id = crypto.randomUUID();

    const { content: licenses, sha } = await getGitHubFile();
    const newEntry: LicenseEntry = {
      id,
      app: appName || 'speecy',
      email,
      license_key: licenseKey,
      type,
      days: type === 'lifetime' ? null : days,
      fingerprint: null,
      activated_at: null,
      created_at: payload.created_at,
      status: 'active',
    };
    licenses.push(newEntry);
    await putGitHubFile(licenses, sha, `license: generate key for ${email}`);

    return NextResponse.json({ license_key: licenseKey, id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
