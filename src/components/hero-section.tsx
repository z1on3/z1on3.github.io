'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown } from "lucide-react"
import { FaGithub, FaLinkedin, FaEnvelope, FaFile } from "react-icons/fa"
import Image from "next/image"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-16" style={{background: 'linear-gradient(to bottom right, #222831, #31363F, #222831)'}}>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="secondary" className="mb-4" style={{backgroundColor: '#76ABAE', color: '#222831'}}>
              Welcome to my portfolio
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" style={{color: '#EEEEEE'}}>
              <span style={{color: '#76ABAE'}}>Carlo Vii</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-6" style={{color: '#76ABAE'}}>
              Full Stack Developer
            </h2>
            
            <p className="text-lg md:text-xl mb-8 max-w-2xl" style={{color: '#76ABAE'}}>
              Specializing in web development, I create efficient and scalable solutions using modern technologies. 
              With expertise in frontend and backend development, I deliver professional digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                onClick={() => window.open('/pdf/CarloVii-updated-cv.pdf', '_blank')}
                style={{backgroundColor: '#76ABAE', color: '#222831'}} className="hover:opacity-90 transition-opacity"
              >
                Download CV
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="border-[#76ABAE] text-[#76ABAE] bg-transparent hover:bg-[#76ABAE] hover:text-[#222831]"
              >
                Get In Touch
              </Button>
            </div>
            
            <div className="flex justify-center lg:justify-start gap-6">
              <a 
                href="https://github.com/z1on3" 
                className="transition-colors hover:text-white" style={{color: '#76ABAE'}}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/carlo-vii" 
                className="transition-colors hover:text-white" style={{color: '#76ABAE'}}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="mailto:panercarlo99@gmail.com" 
                className="transition-colors hover:text-white" style={{color: '#76ABAE'}}
                aria-label="Email"
              >
                <FaEnvelope size={24} />
              </a>
             
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full p-1" style={{background: 'linear-gradient(to right, #76ABAE, #76ABAE)'}}>
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{backgroundColor: '#31363F'}}>
                  <Image
                    src="/img/logo-big.png"
                    alt="Carlo Vii"
                    width={200}
                    height={200}
                    className="rounded-full"
                  />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection('about')}
            className="transition-colors animate-bounce hover:text-white" style={{color: '#76ABAE'}}
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}