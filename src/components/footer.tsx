import { personalInfo } from "@/data/personal-info"
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa"

const iconMap = {
  FaFacebook: FaFacebook,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
  FaEnvelope: FaEnvelope
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12" style={{backgroundColor: '#222831', color: '#EEEEEE'}}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Social Links */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-6 mb-4">
              {personalInfo.socialLinks.map((link, index) => {
                const IconComponent = iconMap[link.icon as keyof typeof iconMap]
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/20" style={{backgroundColor: 'rgba(238, 238, 238, 0.1)'}}
                    aria-label={link.name}
                  >
                    {IconComponent && <IconComponent className="text-lg" />}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p style={{color: '#76ABAE'}}>
              © {currentYear} - Carlo Vii. All rights reserved.
            </p>
            <p className="text-sm mt-2" style={{color: '#31363F'}}>
              Designed by{" "}
              <a
                href="https://www.facebook.com/CarloV.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white" style={{color: '#76ABAE'}}
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