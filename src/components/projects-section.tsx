'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects, projectCategories, type Project } from "@/data/projects"
import { ExternalLink, Github, Download } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="py-20" style={{backgroundColor: '#31363F'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#EEEEEE'}}>
            My Work
          </h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{backgroundColor: '#76ABAE'}}></div>
          <p className="text-lg max-w-2xl mx-auto" style={{color: '#76ABAE'}}>
            A selection of projects showcasing expertise in web development, data analysis, and software engineering solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projectCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              onClick={() => setActiveFilter(category.id)}
              style={activeFilter === category.id 
                ? {backgroundColor: '#76ABAE', color: '#222831'} 
                : {color: '#EEEEEE', borderColor: '#76ABAE', backgroundColor: 'transparent'}
              }
              className="hover:opacity-80 transition-opacity"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer pt-0"
              style={{backgroundColor: '#222831', borderColor: '#76ABAE'}}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs" style={{backgroundColor: '#76ABAE', color: '#222831'}}>
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-[#76ABAE] text-[#76ABAE] bg-transparent hover:bg-[#76ABAE] hover:text-[#222831]" 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.liveUrl) {
                          const url = project.liveUrl.startsWith('http') ? project.liveUrl : `/${project.liveUrl}`;
                          window.open(url, '_blank');
                        }
                      }}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[#76ABAE] text-[#76ABAE] bg-transparent hover:bg-[#76ABAE] hover:text-[#222831]"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank');
                      }}
                    >
                      <Github size={16} />
                    </Button>
                  )}
                  {project.caseStudyUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[#76ABAE] text-[#76ABAE] bg-transparent hover:bg-[#76ABAE] hover:text-[#222831]"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.caseStudyUrl) {
                          const url = project.caseStudyUrl.startsWith('http') ? project.caseStudyUrl : `/${project.caseStudyUrl}`;
                          window.open(url, '_blank');
                        }
                      }}
                    >
                      <Download size={16} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Modal/Detail View */}
        {selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{backgroundColor: 'rgba(34, 40, 49, 0.9)'}}>
            <div className="rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto" style={{backgroundColor: '#222831', borderColor: '#76ABAE', border: '1px solid'}}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold" style={{color: '#EEEEEE'}}>{selectedProject.title}</h3>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedProject(null)}
                    className="text-2xl"
                    style={{color: '#76ABAE'}}
                  >
                    ×
                  </Button>
                </div>
                
                <div className="mb-6">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <p className="mb-6 leading-relaxed" style={{color: '#76ABAE'}}>
                  {selectedProject.longDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" style={{backgroundColor: '#76ABAE', color: '#222831'}}>
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <Button 
                      className="bg-[#76ABAE] text-[#222831] hover:bg-[#76ABAE]/90"
                      onClick={() => {
                        if (selectedProject.liveUrl) {
                          const url = selectedProject.liveUrl.startsWith('http') ? selectedProject.liveUrl : `/${selectedProject.liveUrl}`;
                          window.open(url, '_blank');
                        }
                      }}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Visit Website
                    </Button>
                  )}
                  {selectedProject.caseStudyUrl && (
                    <Button 
                      variant="outline"
                      className="border-[#76ABAE] text-[#76ABAE] bg-transparent hover:bg-[#76ABAE] hover:text-[#222831]"
                      onClick={() => {
                        if (selectedProject.caseStudyUrl) {
                          const url = selectedProject.caseStudyUrl.startsWith('http') ? selectedProject.caseStudyUrl : `/${selectedProject.caseStudyUrl}`;
                          window.open(url, '_blank');
                        }
                      }}
                    >
                      <Download size={16} className="mr-2" />
                      Download Case Study
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}