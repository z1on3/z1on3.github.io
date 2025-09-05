'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { services } from "@/data/personal-info"
import { FaSearch, FaCode, FaBolt } from "react-icons/fa"

const iconMap = {
  FaSearch: FaSearch,
  FaCode: FaCode,
  FaBolt: FaBolt
}

export function ServicesSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20" style={{background: 'linear-gradient(to bottom right, #31363F, #222831)'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#EEEEEE'}}>
            Services
          </h2>
          <div className="w-24 h-1 mx-auto" style={{backgroundColor: '#76ABAE'}}></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{backgroundColor: '#222831', borderColor: '#76ABAE'}}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{backgroundColor: '#76ABAE'}}>
                    {IconComponent && <IconComponent className="text-2xl" style={{color: '#222831'}} />}
                  </div>
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-[#76ABAE]" style={{color: '#EEEEEE'}}>
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="leading-relaxed" style={{color: '#76ABAE'}}>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg mb-4" style={{color: '#76ABAE'}}>
              Would you like to know more or just discuss something?
            </p>
          </div>
          <Button 
            size="lg"
            onClick={scrollToContact}
            style={{backgroundColor: '#76ABAE', color: '#222831'}} className="hover:opacity-90 transition-opacity"
          >
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  )
}