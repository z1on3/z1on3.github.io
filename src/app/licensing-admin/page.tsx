'use client';

import { useState } from 'react';

interface License {
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

export default function LicensingAdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [licenseType, setLicenseType] = useState<'lifetime' | 'trial'>('lifetime');
  const [days, setDays] = useState(14);
  const [generating, setGenerating] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/licensing/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        return;
      }

      setLicenses(data.licenses);
      setAuthenticated(true);
    } catch {
      setError('Failed to connect');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setGenerating(true);
    setError('');
    setGeneratedKey('');

    try {
      const res = await fetch('/api/licensing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          email,
          type: licenseType,
          days: licenseType === 'trial' ? days : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Generation failed');
        return;
      }

      setGeneratedKey(data.license_key);

      // Refresh the list
      const listRes = await fetch('/api/licensing/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const listData = await listRes.json();
      if (listRes.ok) setLicenses(listData.licenses);
    } catch {
      setError('Failed to generate');
    } finally {
      setGenerating(false);
    }
  }

  async function copyKey() {
    await navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050507] p-8 font-mono">
        <div className="w-full max-w-md">
          <div className="border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-xs uppercase tracking-[3px] text-cyan-500">
                  Authorization Required
                </span>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent" />
            <form onSubmit={handleLogin} className="p-6">
              <div className="mb-4">
                <label className="mb-2 block text-xs uppercase tracking-widest text-gray-500">
                  Access Key
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-gray-300 outline-none transition-all placeholder:text-gray-700 focus:border-cyan-500/50"
                  placeholder="Enter password..."
                  autoFocus
                />
              </div>
              {error && (
                <div className="mb-4 border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                  <span className="text-red-500">&#9632;</span> {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-cyan-500/50 bg-cyan-500/10 py-3 font-mono text-xs uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-[#050507] disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Authenticate'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] p-8 font-mono">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <h1 className="text-xs uppercase tracking-[3px] text-cyan-500">
            License Management
          </h1>
          <span className="ml-2 border border-white/10 bg-white/[0.03] px-2 py-0.5 text-xs text-gray-500">
            {licenses.length} licenses
          </span>
        </div>

        {/* Generate Form */}
        <div className="mb-6 border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 p-4">
            <span className="text-xs uppercase tracking-widest text-gray-500">
              Generate New License
            </span>
          </div>
          <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent" />
          <form onSubmit={handleGenerate} className="p-4">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-end">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-widest text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-gray-300 outline-none focus:border-cyan-500/50"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-widest text-gray-600">
                  Type
                </label>
                <select
                  value={licenseType}
                  onChange={(e) => setLicenseType(e.target.value as 'lifetime' | 'trial')}
                  className="border border-white/10 bg-[#0a0a0f] px-3 py-2 text-sm text-gray-300 outline-none focus:border-cyan-500/50"
                >
                  <option value="lifetime">Lifetime</option>
                  <option value="trial">Trial</option>
                </select>
              </div>
              {licenseType === 'trial' && (
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-widest text-gray-600">
                    Days
                  </label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    min={1}
                    className="w-20 border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-gray-300 outline-none focus:border-cyan-500/50"
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={generating}
                className="border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-[#050507] disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </form>

          {generatedKey && (
            <div className="border-t border-white/10 p-4">
              <div className="mb-2 text-xs uppercase tracking-widest text-green-400">
                Key Generated Successfully
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 break-all border border-white/10 bg-white/[0.03] p-3 text-xs text-cyan-400">
                  {generatedKey}
                </code>
                <button
                  onClick={copyKey}
                  className="shrink-0 border border-cyan-500/50 bg-cyan-500/10 px-3 py-2 text-xs uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-[#050507]"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="border-t border-white/10 p-4">
              <div className="border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                <span className="text-red-500">&#9632;</span> {error}
              </div>
            </div>
          )}
        </div>

        {/* Licenses Table */}
        <div className="border border-white/10">
          <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_1fr] gap-4 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-widest text-gray-500">
            <span>Email</span>
            <span>Type</span>
            <span>Status</span>
            <span>Bound</span>
            <span>Created</span>
          </div>
          <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent" />
          {licenses.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-600">
              No licenses issued
            </div>
          ) : (
            <div className="max-h-[calc(100vh-500px)] overflow-y-auto">
              {licenses.map((lic) => (
                <div
                  key={lic.id}
                  className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_1fr] gap-4 border-b border-white/5 px-4 py-3 text-sm"
                >
                  <span className="truncate text-gray-300">{lic.email}</span>
                  <span className="text-xs uppercase text-gray-400">
                    {lic.type}
                    {lic.days ? ` (${lic.days}d)` : ''}
                  </span>
                  <span
                    className={`text-xs uppercase ${
                      lic.status === 'active' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {lic.status}
                  </span>
                  <span className={`text-xs ${lic.fingerprint ? 'text-cyan-400' : 'text-gray-600'}`}>
                    {lic.fingerprint ? 'Yes' : 'No'}
                  </span>
                  <span className="text-xs text-gray-600">{lic.created_at}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
