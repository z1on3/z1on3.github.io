"use client";

import React from "react";
import { personalInfo, services } from "../../data/personal-info";
import { projects } from "../../data/projects";
import { Code2, Server, Shield, Database, Layout, Mail, Terminal, MapPin, User, Star, ChevronRight } from "lucide-react";

export default function V3Dashboard() {
  const getIcon = (title: string) => {
    if (title.includes("Security")) return <Shield className="w-5 h-5 text-emerald-400" />;
    if (title.includes("Frontend")) return <Layout className="w-5 h-5 text-blue-400" />;
    if (title.includes("Backend")) return <Server className="w-5 h-5 text-purple-400" />;
    return <Code2 className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#131316] border border-white/5 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-3xl font-bold tracking-tighter">CV</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 border-4 border-[#131316] rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1">{personalInfo.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"><Terminal className="w-3.5 h-3.5"/> {personalInfo.role}</span>
                <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"><MapPin className="w-3.5 h-3.5"/> {personalInfo.location}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0 flex gap-3">
            <button className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg shadow-white/10">
              Download CV
            </button>
            <button className="px-5 py-2.5 bg-[#1e1e24] text-white text-sm font-semibold rounded-xl hover:bg-[#2a2a32] border border-white/10 transition-colors">
              Contact Me
            </button>
          </div>
        </header>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(0,_1fr)]">
          
          {/* Bio / About */}
          <div className="md:col-span-2 lg:col-span-2 bg-[#131316] border border-white/5 rounded-3xl p-6 flex flex-col justify-center gap-4 group hover:border-white/10 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-indigo-500/20 transition-all duration-500"></div>
            <div className="flex items-center gap-2 text-indigo-400 font-medium mb-2">
              <User className="w-4 h-4" /> About Me
            </div>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              Experienced full stack developer specializing in web applications and modern technologies. 
              <span className="text-white font-medium"> Dedicated to creating efficient, scalable solutions that drive business growth.</span>
            </p>
          </div>

          {/* Stats */}
          <div className="bg-[#131316] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-2 group hover:border-white/10 transition-colors">
            <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {projects.length}+
            </div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Projects Completed</div>
          </div>

          <div className="bg-[#131316] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-2 group hover:border-white/10 transition-colors">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {new Date().getFullYear() - 2016}+
            </div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Years Experience</div>
          </div>

          {/* Skills Breakdown */}
          <div className="md:col-span-3 lg:col-span-2 bg-[#131316] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 text-indigo-400 font-medium mb-6">
              <Database className="w-4 h-4" /> Tech Stack Stack
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.skills.map((s) => (
                <div key={s.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-200 font-medium">{s.name}</span>
                    <span className="text-gray-500">{s.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1e1e24] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services offered */}
          <div className="md:col-span-3 lg:col-span-2 bg-[#131316] border border-white/5 rounded-3xl p-6 flex flex-col hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 text-indigo-400 font-medium mb-6">
              <Star className="w-4 h-4" /> Professional Services
            </div>
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              {services.map((s) => (
                <div key={s.title} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="p-3 bg-[#1e1e24] rounded-xl border border-white/5 group-hover:bg-[#2a2a32] transition-colors">
                    {getIcon(s.title)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm md:text-base mb-1">{s.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500 line-clamp-2">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Highlight */}
          <div className="md:col-span-3 lg:col-span-4 bg-[#131316] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -z-10"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-indigo-400 font-medium">
                <Code2 className="w-4 h-4" /> Featured Deployments
              </div>
              <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 mt-4 sm:mt-0 transition-colors">
                View all projects <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="w-full aspect-video bg-[#1e1e24] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:border-indigo-500/30 transition-colors relative">
                    <img 
                      src={p.image.startsWith('/') ? p.image : `/${p.image}`} 
                      alt={p.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 flex items-center justify-center font-mono text-xs text-gray-500">Image unvailable</div>
                  </div>
                  <h3 className="text-white font-semibold mb-1 group-hover:text-indigo-400 transition-colors">{p.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.technologies.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-white/10 text-gray-400 bg-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
