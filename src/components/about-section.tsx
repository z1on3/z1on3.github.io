'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { personalInfo } from "@/data/personal-info"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-20" style={{backgroundColor: '#31363F'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#EEEEEE'}}>
            About Me
          </h2>
          <div className="w-24 h-1 mx-auto" style={{backgroundColor: '#76ABAE'}}></div>
        </div>
        
        {/* Profile Image */}
        <div className="flex justify-center mb-12">
          <div className="relative w-64 h-64">
            <Image
              src="/img/about.jpg"
              alt="Carlo Vii - IT worker"
              fill
              className="rounded-full object-cover border-4" style={{borderColor: '#76ABAE'}}
            />
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <div className="space-y-8">
            <Card className="p-6" style={{backgroundColor: '#222831', borderColor: '#76ABAE'}}>
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-semibold text-center mb-6" style={{color: '#EEEEEE'}}>Personal Info</h3>
                
                <div className="space-y-4">
                  <div className="flex">
                    <span className="font-semibold w-20" style={{color: '#76ABAE'}}>WHO:</span>
                    <span style={{color: '#EEEEEE'}}>{personalInfo.name}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-semibold w-20" style={{color: '#76ABAE'}}>WHAT:</span>
                    <span style={{color: '#EEEEEE'}}>{personalInfo.role}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-semibold w-20" style={{color: '#76ABAE'}}>WHERE:</span>
                    <span style={{color: '#EEEEEE'}}>{personalInfo.location}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-semibold w-20" style={{color: '#76ABAE'}}>WHEN:</span>
                    <span style={{color: '#EEEEEE'}}>{personalInfo.period}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-semibold w-20" style={{color: '#76ABAE'}}>WHY:</span>
                    <span style={{color: '#EEEEEE'}}>{personalInfo.motivation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Skills */}
          <div className="space-y-8">
            <Card className="p-6" style={{backgroundColor: '#222831', borderColor: '#76ABAE'}}>
              <CardContent>
                <h3 className="text-2xl font-semibold text-center mb-8" style={{color: '#EEEEEE'}}>Skill Level</h3>
                
                <div className="space-y-6">
                  {personalInfo.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium" style={{color: '#EEEEEE'}}>{skill.name}</span>
                        <span className="text-sm" style={{color: '#76ABAE'}}>{skill.level}%</span>
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