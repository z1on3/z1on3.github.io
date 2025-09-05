'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { personalInfo } from "@/data/personal-info"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Info */}
          <div className="space-y-8">
            <Card className="p-6">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-semibold text-center mb-6">Personal Info</h3>
                
                <div className="space-y-4">
                  <div className="flex">
                    <span className="font-semibold text-purple-600 w-20">WHO:</span>
                    <span className="text-gray-700">{personalInfo.name}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-semibold text-purple-600 w-20">WHAT:</span>
                    <span className="text-gray-700">{personalInfo.role}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-semibold text-purple-600 w-20">WHERE:</span>
                    <span className="text-gray-700">{personalInfo.location}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-semibold text-purple-600 w-20">WHEN:</span>
                    <span className="text-gray-700">{personalInfo.period}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-semibold text-purple-600 w-20">WHY:</span>
                    <span className="text-gray-700">{personalInfo.motivation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <Image
                  src="/img/about.jpg"
                  alt="Carlo Vii - IT worker"
                  fill
                  className="rounded-full object-cover border-4 border-purple-200"
                />
              </div>
            </div>
          </div>
          
          {/* Skills */}
          <div className="space-y-8">
            <Card className="p-6">
              <CardContent>
                <h3 className="text-2xl font-semibold text-center mb-8">Skill Level</h3>
                
                <div className="space-y-6">
                  {personalInfo.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-3"
                        style={{
                          '--progress-background': skill.color
                        } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}