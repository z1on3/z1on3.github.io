import { personalInfo } from "@/data/personal-info"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Social Links */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-6 mb-4">
              {personalInfo.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label={link.name}
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © {currentYear} - Carlo Vii. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Designed by{" "}
              <a
                href="https://www.facebook.com/CarloV.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Carlo Vii
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}