"use client";

import React, { useState, useEffect, useRef } from "react";
import { personalInfo } from "../../data/personal-info";
import { projects } from "../../data/projects";
import { Terminal as TerminalIcon, Cpu, Activity, Shield, Code, ChevronRight } from "lucide-react";

export default function V4Redesign() {
  const [input, setInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);
  const [mounted, setMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setTerminalOutput([
      <div key="init" className="text-cyan-400">System initialized. Type 'help' for commands.</div>
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalOutput]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      const newOutput = [...terminalOutput, <div key={terminalOutput.length} className="text-gray-400"><span className="text-cyan-500">❯</span> {cmd}</div>];

      if (cmd === "help") {
         newOutput.push(
          <div key="help" className="pl-4 text-gray-300">
            Available: <span className="text-cyan-400">about</span>, <span className="text-cyan-400">stack</span>, <span className="text-cyan-400">clear</span>
          </div>
         );
      } else if (cmd === "about") {
         newOutput.push(
          <div key="about" className="pl-4 text-gray-300">
            {personalInfo.bio}
          </div>
         );
      } else if (cmd === "stack") {
         newOutput.push(
          <div key="stack" className="pl-4 text-gray-300">
            {personalInfo.skills.map(s => s.name).join(' // ')}
          </div>
         );
      } else if (cmd === "clear") {
         setTerminalOutput([]);
         setInput("");
         return;
      } else if (cmd !== "") {
         newOutput.push(<div key="err" className="pl-4 text-red-400">Command not found.</div>);
      }

      setTerminalOutput(newOutput);
      setInput("");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050507] text-gray-300 font-sans p-4 sm:p-8 lg:p-12 relative overflow-hidden">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
        
        {/* Top Navbar / HUD Status */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="w-2 h-2 bg-cyan-500 animate-pulse rounded-full"></div>
            <span className="font-mono text-xs tracking-[0.2em] text-cyan-500 uppercase">System Active // {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6 font-mono text-xs uppercase text-gray-500">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">01. Identity</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">02. Capabilities</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">03. Databanks</span>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col gap-6 py-12 lg:py-20">
          <div className="font-mono text-sm text-cyan-400 flex items-center gap-2">
            <ChevronRight className="w-4 h-4" /> Initiating connection
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none">
            CARLO<br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">_VII</span>
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-gray-400 font-light leading-relaxed border-l-2 border-cyan-500/50 pl-6 mt-4">
            {personalInfo.bio}
          </p>
          
          <div className="flex gap-4 mt-8">
            <button className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-8 py-3 font-mono text-sm tracking-widest uppercase hover:bg-cyan-500 hover:text-[#050507] transition-all">
              Execute Call
            </button>
            <button className="text-gray-400 px-8 py-3 font-mono text-sm tracking-widest uppercase hover:text-white transition-colors">
              Access Logs
            </button>
          </div>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Module 1: Mini Terminal (col 1-5) */}
          <div className="col-span-1 md:col-span-5 border border-white/10 bg-white/5 backdrop-blur-sm relative group" onClick={() => inputRef.current?.focus()}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-50"></div>
            <div className="p-4 border-b border-white/5 flex items-center justify-between font-mono text-xs text-gray-500">
              <span className="flex items-center gap-2"><TerminalIcon className="w-4 h-4" /> ROOT_ACCESS</span>
              <span>v.1.0.4</span>
            </div>
            <div className="p-4 font-mono text-sm h-64 overflow-y-auto flex flex-col">
              <div className="flex-1 space-y-2">
                 {terminalOutput}
                 <div className="flex items-center gap-2 mt-2">
                  <span className="text-cyan-500">❯</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none flex-1 text-gray-300 placeholder:text-gray-700 w-full"
                    autoFocus
                    spellCheck={false}
                  />
                </div>
                <div ref={bottomRef} />
              </div>
            </div>
          </div>

          {/* Module 2: Tech Specs (col 6-12) */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
             
             {/* Core competency panel */}
             <div className="border border-white/10 bg-white/[0.02] p-6 relative flex flex-col justify-center">
               <div className="absolute -top-3 -right-3 text-white/5">
                 <Cpu className="w-24 h-24" />
               </div>
               <h3 className="font-mono text-xs text-cyan-500 tracking-widest uppercase mb-6">Core Specs</h3>
               <div className="space-y-4 relative z-10">
                 {personalInfo.skills.slice(0, 4).map(skill => (
                   <div key={skill.name}>
                     <div className="flex justify-between font-mono text-xs mb-1">
                       <span className="text-gray-300">{skill.name}</span>
                       <span className="text-cyan-500/70">{skill.level} _</span>
                     </div>
                     <div className="h-[2px] w-full bg-white/10">
                       <div className="h-full bg-cyan-500" style={{ width: `${skill.level}%`}}></div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Services Panel */}
             <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-center gap-6">
               <div className="flex items-center gap-4 text-gray-300 group">
                 <Shield className="w-6 h-6 text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />
                 <div>
                   <div className="font-mono text-sm text-cyan-400">Security</div>
                   <div className="text-xs text-gray-500">Audits & Testing</div>
                 </div>
               </div>
               <div className="flex items-center gap-4 text-gray-300 group">
                 <Code className="w-6 h-6 text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />
                 <div>
                   <div className="font-mono text-sm text-cyan-400">Full Stack</div>
                   <div className="text-xs text-gray-500">End-to-end dev</div>
                 </div>
               </div>
               <div className="flex items-center gap-4 text-gray-300 group">
                 <Activity className="w-6 h-6 text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />
                 <div>
                   <div className="font-mono text-sm text-cyan-400">Optimization</div>
                   <div className="text-xs text-gray-500">Performance</div>
                 </div>
               </div>
             </div>

          </div>
        </div>

        {/* Projects List minimal */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-mono text-xs text-cyan-500 tracking-widest uppercase">Archive // Latest Ingestions</h3>
            <span className="text-xs text-gray-600 font-mono">Found: {projects.length} entities</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {projects.slice(0,3).map((p, i) => (
              <div key={p.id} className="group cursor-pointer">
                 <div className="text-xs font-mono text-gray-600 mb-2">0{i+1}</div>
                 <h4 className="text-lg text-gray-200 group-hover:text-cyan-400 transition-colors mb-2">{p.title}</h4>
                 <div className="text-sm font-light text-gray-500 line-clamp-2">{p.description}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
