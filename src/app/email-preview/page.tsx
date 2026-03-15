import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Preview',
  robots: 'noindex, nofollow',
};

function getEmailHtml(name: string, email: string, message: string) {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#050507;color:#d1d5db;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050507;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="border:1px solid rgba(6,182,212,0.3);border-bottom:none;padding:20px 24px;background-color:rgba(255,255,255,0.02);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block;width:8px;height:8px;background-color:#06b6d4;border-radius:50%;margin-right:8px;box-shadow:0 0 8px rgba(6,182,212,0.8);"></span>
                    <span style="font-size:11px;color:#06b6d4;text-transform:uppercase;letter-spacing:3px;">Incoming Transmission</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:#6b7280;">${timestamp} UTC</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Gradient Divider -->
          <tr>
            <td style="height:1px;background:linear-gradient(to right,#06b6d4,transparent);"></td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="border:1px solid rgba(255,255,255,0.1);border-top:none;padding:32px 24px;background-color:rgba(255,255,255,0.02);">
              <!-- Sender Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 16px;background-color:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.15);">
                    <div style="font-size:11px;color:#06b6d4;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Source Identity</div>
                    <div style="font-size:15px;color:#e5e7eb;margin-bottom:4px;">
                      <span style="color:#06b6d4;">&#10095;</span> ${name}
                    </div>
                    <div style="font-size:13px;color:#9ca3af;">
                      <span style="color:#06b6d4;">&#10095;</span> <a href="mailto:${email}" style="color:#22d3ee;text-decoration:none;">${email}</a>
                    </div>
                  </td>
                </tr>
              </table>
              <!-- Message -->
              <div style="font-size:11px;color:#06b6d4;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">
                <span style="display:inline-block;width:6px;height:6px;background-color:#06b6d4;margin-right:8px;"></span>
                Message Payload
              </div>
              <div style="padding:16px;background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);font-size:14px;line-height:1.7;color:#d1d5db;white-space:pre-wrap;">${message}</div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 24px;border:1px solid rgba(255,255,255,0.05);border-top:none;background-color:rgba(255,255,255,0.01);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:11px;color:#4b5563;letter-spacing:1px;">
                    carlovii.com &middot; portfolio contact system
                  </td>
                  <td align="right" style="font-size:11px;color:#374151;">
                    &#9632; end transmission
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default function EmailPreviewPage() {
  const sampleName = 'Jane Doe';
  const sampleEmail = 'jane.doe@example.com';
  const sampleMessage =
    'Hey Carlo,\n\nI came across your portfolio and was really impressed by your work. I\'d love to discuss a potential collaboration on an upcoming project.\n\nLooking forward to hearing from you!';

  const emailHtml = getEmailHtml(sampleName, sampleEmail, sampleMessage);

  return (
    <div className="min-h-screen bg-[#050507] p-8 font-mono">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <h1 className="text-xs uppercase tracking-[3px] text-cyan-500">
              Email Template Preview
            </h1>
          </div>
          <a
            href="/"
            className="border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-400 transition-all hover:bg-cyan-500 hover:text-[#050507]"
          >
            Back to Portfolio
          </a>
        </div>

        <div className="mb-4 border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-2 text-xs uppercase tracking-widest text-gray-500">
            Subject
          </div>
          <div className="text-sm text-gray-300">
            New Transmission from {sampleName}
          </div>
        </div>

        <div className="border border-white/10">
          <iframe
            srcDoc={emailHtml}
            className="w-full border-0"
            style={{ height: '600px' }}
            title="Email preview"
          />
        </div>
      </div>
    </div>
  );
}
