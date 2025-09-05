'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="secondary" className="mb-4">
              👋 Welcome to my portfolio
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Hola!</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6">
              I&apos;m <span className="text-white font-semibold">Carlo Vii</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">
              I grind HTML and CSS and then weld them with PHP into beautiful and efficient websites, 
              and after long day of work I drink Java then relax by listening to C# melodies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
              >
                Get In Touch
              </Button>
            </div>
            
            <div className="flex justify-center lg:justify-start gap-6">
              <a 
                href="https://github.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:panercarlo99@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
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
            className="text-gray-400 hover:text-white transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}