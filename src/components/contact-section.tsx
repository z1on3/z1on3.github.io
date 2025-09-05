'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { personalInfo } from "@/data/personal-info"
import { Mail, MapPin } from "lucide-react"
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa"
import { useState } from "react"

const iconMap = {
  FaFacebook: FaFacebook,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
  FaEnvelope: FaEnvelope
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-20" style={{background: 'linear-gradient(to bottom right, #31363F, #222831)'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#EEEEEE'}}>
            Contact Me
          </h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#76ABAE'}}></div>
          <p className="text-lg max-w-2xl mx-auto" style={{color: '#76ABAE'}}>
            Let&apos;s discuss your next project or just say hello!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card style={{backgroundColor: '#222831', borderColor: '#76ABAE'}}>
              <CardHeader>
                <h3 className="text-2xl font-semibold" style={{color: '#EEEEEE'}}>Get in Touch</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#76ABAE'}}>
                    <Mail style={{color: '#222831'}} size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{color: '#EEEEEE'}}>Email</h4>
                    <p style={{color: '#76ABAE'}}>panercarlo99@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#76ABAE'}}>
                    <MapPin style={{color: '#222831'}} size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{color: '#EEEEEE'}}>Location</h4>
                    <p style={{color: '#76ABAE'}}>{personalInfo.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card style={{backgroundColor: '#222831', borderColor: '#76ABAE'}}>
              <CardHeader>
                <h3 className="text-2xl font-semibold" style={{color: '#EEEEEE'}}>Follow Me</h3>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {personalInfo.socialLinks.map((link, index) => {
                    const IconComponent = iconMap[link.icon as keyof typeof iconMap]
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{backgroundColor: '#76ABAE', color: '#222831'}}
                        aria-label={link.name}
                      >
                        {IconComponent && <IconComponent className="text-lg" />}
                      </a>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card style={{backgroundColor: '#222831', borderColor: '#76ABAE'}}>
            <CardHeader>
              <h3 className="text-2xl font-semibold" style={{color: '#EEEEEE'}}>Send Message</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your firstname *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="surname"
                      placeholder="Your lastname *"
                      value={formData.surname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Message for me *"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full hover:opacity-90 transition-opacity" style={{backgroundColor: '#76ABAE', color: '#222831'}}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}