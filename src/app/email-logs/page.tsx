'use client';

import { useEffect, useState } from 'react';

interface Email {
  id: string;
  to: string[];
  from: string;
  subject: string;
  created_at: string;
  last_event: string;
  reply_to: string[] | null;
}

interface EmailDetail extends Email {
  html: string | null;
  text: string | null;
}

const statusColor: Record<string, string> = {
  delivered: 'text-green-400',
  opened: 'text-cyan-400',
  clicked: 'text-blue-400',
  bounced: 'text-red-400',
  complained: 'text-orange-400',
  sent: 'text-yellow-400',
};

export default function EmailLogsPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Email | null>(null);
  const [emailDetail, setEmailDetail] = useState<EmailDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  async function fetchEmailDetail(emailId: string) {
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/emails/${emailId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmailDetail(data.email);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingDetail(false);
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelected(null);
        setEmailDetail(null);
      }
    }
    if (selected) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selected]);

  function handleSelectEmail(email: Email) {
    setSelected(email);
    setEmailDetail(null);
    fetchEmailDetail(email.id);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = typeof data.error === 'string' ? data.error : data.error?.message || 'Authentication failed';
        setError(msg);
        return;
      }

      setEmails(data.emails);
      setAuthenticated(true);
    } catch {
      setError('Failed to connect');
    } finally {
      setLoading(false);
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050507] p-8 font-mono">
        <div className="w-full max-w-md">
          <div className="border border-white/10 bg-white/[0.02]">
            {/* Header */}
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-xs uppercase tracking-[3px] text-cyan-500">
                  Authorization Required
                </span>
              </div>
            </div>
            {/* Gradient Divider */}
            <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent" />
            {/* Form */}
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <h1 className="text-xs uppercase tracking-[3px] text-cyan-500">
              Transmission Logs
            </h1>
            <span className="ml-2 border border-white/10 bg-white/[0.03] px-2 py-0.5 text-xs text-gray-500">
              {emails.length} records
            </span>
          </div>
          <a
            href="/"
            className="border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-[#050507]"
          >
            Back to Portfolio
          </a>
        </div>

        {/* Email List */}
        <div className="border border-white/10">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1.5fr_100px_160px] gap-4 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-widest text-gray-500">
            <span>Recipient</span>
            <span>Subject</span>
            <span>Status</span>
            <span>Timestamp</span>
          </div>
          {/* Gradient Divider */}
          <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent" />
          {/* Rows */}
          {emails.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-600">
              No transmissions found
            </div>
          ) : (
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {emails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => handleSelectEmail(email)}
                  className="grid w-full grid-cols-[1fr_1.5fr_100px_160px] gap-4 border-b border-white/5 px-4 py-3 text-left text-sm transition-all hover:bg-white/[0.03]"
                >
                  <span className="truncate text-gray-300">
                    {Array.isArray(email.to)
                      ? email.to.join(', ')
                      : email.to}
                  </span>
                  <span className="truncate text-gray-400">
                    {email.subject}
                  </span>
                  <span
                    className={`text-xs uppercase ${statusColor[email.last_event] || 'text-gray-500'}`}
                  >
                    {email.last_event}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(email.created_at).toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => { setSelected(null); setEmailDetail(null); }}
          >
            <div
              className="relative mx-4 flex max-h-[90vh] w-full max-w-2xl flex-col border border-white/10 bg-[#0a0a0f] shadow-[0_0_50px_rgba(6,182,212,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  <span className="text-xs uppercase tracking-[3px] text-cyan-500">
                    Transmission Detail
                  </span>
                </div>
                <button
                  onClick={() => { setSelected(null); setEmailDetail(null); }}
                  className="border border-white/10 px-3 py-1 text-xs text-gray-500 transition-all hover:border-cyan-500/30 hover:text-gray-300"
                >
                  ESC
                </button>
              </div>
              <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent" />

              {/* Modal Body */}
              <div className="overflow-y-auto">
                {/* Metadata */}
                <div className="space-y-4 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="From" value={selected.from} />
                    <Field
                      label="To"
                      value={
                        Array.isArray(selected.to)
                          ? selected.to.join(', ')
                          : selected.to
                      }
                    />
                  </div>
                  <Field label="Subject" value={selected.subject} />
                  <div className="grid grid-cols-3 gap-4">
                    {selected.reply_to && selected.reply_to.length > 0 && (
                      <Field label="Reply-To" value={selected.reply_to.join(', ')} />
                    )}
                    <Field
                      label="Status"
                      value={selected.last_event}
                      className={
                        statusColor[selected.last_event] || 'text-gray-400'
                      }
                    />
                    <Field
                      label="Sent At"
                      value={new Date(selected.created_at).toLocaleString()}
                    />
                  </div>
                </div>

                {/* Email Content Preview */}
                <div className="border-t border-white/10">
                  <div className="flex items-center gap-2 px-5 py-3">
                    <span className="inline-block h-1.5 w-1.5 bg-cyan-500" />
                    <span className="text-xs uppercase tracking-widest text-cyan-500">
                      Message Content
                    </span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent" />
                  {loadingDetail ? (
                    <div className="flex items-center justify-center p-12">
                      <span className="animate-pulse text-xs text-gray-500">
                        Decrypting transmission...
                      </span>
                    </div>
                  ) : emailDetail?.html ? (
                    <iframe
                      srcDoc={emailDetail.html}
                      className="w-full border-0"
                      style={{ height: '500px' }}
                      title="Email content"
                    />
                  ) : emailDetail?.text ? (
                    <div className="whitespace-pre-wrap p-5 text-sm leading-relaxed text-gray-300">
                      {emailDetail.text}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-xs text-gray-600">
                      No content available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <div className="mb-1 text-xs uppercase tracking-widest text-gray-600">
        {label}
      </div>
      <div className={`break-all text-sm ${className || 'text-gray-300'}`}>
        {value}
      </div>
    </div>
  );
}
