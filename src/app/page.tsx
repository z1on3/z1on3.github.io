"use client";

import React, { useState, useEffect, useRef } from "react";
import { personalInfo } from "../data/personal-info";
import { projects, Project } from "../data/projects";
import { Terminal as TerminalIcon, Cpu, Activity, Shield, Code, ChevronRight, Mail, ExternalLink, Download, X, Maximize2, Minus, Square } from "lucide-react";

export default function PortfolioHome() {
  const [input, setInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<React.ReactNode[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setTerminalOutput([
      <div key="init" className="text-cyan-400">System initialized. Type &apos;help&apos; for commands.</div>
    ]);
  }, []);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    
    try {
      const formTarget = e.currentTarget;
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        setSubmitStatus("success");
        formTarget.reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex < 0 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(cmdHistory[nextIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const currentInput = input.trimStart();
      const words = currentInput.split(" ");
      const availableCmds = ["help", "about", "stack", "contact", "pwd", "ls", "cat", "whoami", "date", "sudo", "echo", "ping", "clear"];
      
      if (words.length <= 1) {
        const matches = availableCmds.filter(c => c.startsWith(currentInput.toLowerCase()));
        if (matches.length === 1) setInput(matches[0] + " ");
      } else if (words.length === 2 && words[0].toLowerCase() === "cat") {
        const files = ["README.md", "package.json"];
        const prefix = words[1];
        const matches = files.filter(f => f.startsWith(prefix));
        if (matches.length === 1) setInput("cat " + matches[0]);
      }
    } else if (e.key === "Enter") {
      const rawCmd = input.trim();
      
      if (rawCmd) {
        setCmdHistory(prev => [...prev, rawCmd]);
      }
      setHistoryIndex(-1);
      
      const args = rawCmd.split(" ").filter(Boolean);
      const cmd = args.length > 0 ? args[0].toLowerCase() : "";
      
      const addedNodes: React.ReactNode[] = [
        <div key={`cmd-${Date.now()}`} className="text-gray-400"><span className="text-cyan-500">❯</span> {rawCmd}</div>
      ];

      if (cmd === "help") {
         addedNodes.push(
           <div key={`help-${Date.now()}`} className="pl-4 text-gray-300">
             Available commands:<br/>
             <span className="text-cyan-400">about</span>, <span className="text-cyan-400">stack</span>, <span className="text-cyan-400">contact</span>, <span className="text-cyan-400">clear</span><br/>
             <span className="text-cyan-400">ls</span>, <span className="text-cyan-400">cat</span>, <span className="text-cyan-400">pwd</span>, <span className="text-cyan-400">ping</span>, <span className="text-cyan-400">whoami</span>, <span className="text-cyan-400">date</span>, <span className="text-cyan-400">echo</span>, <span className="text-cyan-400">sudo</span>
           </div>
         );
      } else if (cmd === "about") {
         addedNodes.push(<div key={`about-${Date.now()}`} className="pl-4 text-gray-300">{personalInfo.bio}</div>);
      } else if (cmd === "stack") {
         addedNodes.push(<div key={`stack-${Date.now()}`} className="pl-4 text-gray-300">{personalInfo.skills.map(s => s.name).join(' // ')}</div>);
      } else if (cmd === "contact") {
         addedNodes.push(
           <div key={`contact-${Date.now()}`} className="pl-4 text-gray-300">
             Initialization of secure channel...<br />
             Email: <a href="mailto:panercarlo99+portfolio@gmail.com" className="text-cyan-500 hover:underline">panercarlo99@gmail.com</a>
           </div>
         );
      } else if (cmd === "pwd") {
         addedNodes.push(<div key={`pwd-${Date.now()}`} className="pl-4 text-gray-300">/home/root/portfolio</div>);
      } else if (cmd === "ls") {
         addedNodes.push(<div key={`ls-${Date.now()}`} className="pl-4 text-gray-300 flex gap-4"><span className="text-blue-400">src/</span> <span className="text-blue-400">public/</span> <span>package.json</span> <span>README.md</span></div>);
      } else if (cmd === "cat") {
         const file = args[1];
        if (!file) {
          addedNodes.push(<div key={`err-${Date.now()}`} className="pl-4 text-red-500">cat: missing operand</div>);
        } else if (file === "README.md") {
          addedNodes.push(
            <div key={`readme-${Date.now()}`} className="pl-4 text-gray-300 font-mono text-xs sm:text-sm whitespace-pre-wrap mt-2">
              <span className="text-cyan-400 font-bold"># {personalInfo.name}</span><br/><br/>
              {personalInfo.bio}<br/><br/>
              <span className="text-cyan-400 font-bold">## Core Technologies</span><br/>
              {personalInfo.skills.map(s => `- ${s.name}`).join('\n')}<br/><br/>
              <span className="text-cyan-400 font-bold">## Network</span><br/>
              [Email] <a href="mailto:panercarlo99@gmail.com" className="text-blue-400 hover:underline">panercarlo99@gmail.com</a><br/>
              [GitHub] <a href="https://github.com/z1on3" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">https://github.com/z1on3</a>
            </div>
          );
        } else if (file === "package.json") {
          addedNodes.push(
            <div key={`pkg-${Date.now()}`} className="pl-4 text-gray-300 font-mono text-xs whitespace-pre-wrap mt-2">
{`{
  "name": "portfolio-z1on3",
  "version": "1.0.0",
  "author": "Carlo VII",
  "dependencies": {
    "next": "15.0",
    "react": "19.0",
    "tailwindcss": "3.4"
  }
}`}
            </div>
          );
        } else {
          addedNodes.push(<div key={`err-${Date.now()}`} className="pl-4 text-red-500">cat: {file}: No such file or directory</div>);
        }
      } else if (cmd === "whoami") {
         addedNodes.push(<div key={`whoami-${Date.now()}`} className="pl-4 text-gray-300">root</div>);
      } else if (cmd === "date") {
         addedNodes.push(<div key={`date-${Date.now()}`} className="pl-4 text-gray-300">{new Date().toString()}</div>);
      } else if (cmd === "sudo") {
         addedNodes.push(<div key={`sudo-${Date.now()}`} className="pl-4 text-red-500">z1on3 is not in the sudoers file. This incident will be reported.</div>);
      } else if (cmd === "echo") {
         addedNodes.push(<div key={`echo-${Date.now()}`} className="pl-4 text-gray-300">{args.slice(1).join(" ")}</div>);
      } else if (cmd === "ping") {
         const target = args.length > 1 ? args[1] : "carlovii.com";
         const targetHost = target.replace(/^https?:\/\//, '').split('/')[0];
         const targetUrl = target.startsWith("http") ? target : `https://${target}`;
         
         addedNodes.push(<div key={`ping-start-${Date.now()}`} className="pl-4 text-gray-300">Resolving {target}...</div>);
         setTerminalOutput(prev => [...prev, ...addedNodes]);
         setInput("");
         
         const runPing = async () => {
           let targetIp = "192.168.1.1";
           try {
             const dnsRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${targetHost}&type=A`, { headers: { 'Accept': 'application/dns-json' } });
             const dnsData = await dnsRes.json();
             if (dnsData.Answer && dnsData.Answer.length > 0) {
                targetIp = dnsData.Answer[0].data;
             }
           } catch { /* ignore fallback */ }
           
           setTerminalOutput(prev => [...prev, <div key={`ping-info-${Date.now()}`} className="pl-4 text-gray-300">PING {target} ({targetIp}): 56 data bytes</div>]);

           for(let i=1; i<=4; i++) {
              let pingRes: React.ReactNode;
              try {
                 const start = performance.now();
                 await fetch(targetUrl, { mode: 'no-cors', cache: 'no-store' });
                 const end = performance.now();
                 const time = (end - start).toFixed(1);
                 pingRes = <div key={`ping-res-${Date.now()}-${i}`} className="pl-4 text-green-400">64 bytes from {targetIp}: icmp_seq={i-1} ttl=116 time={time} ms</div>;
              } catch {
                 pingRes = <div key={`ping-err-${Date.now()}-${i}`} className="pl-4 text-red-400">Request timeout to {targetIp}</div>;
              }
              setTerminalOutput(prev => [...prev, pingRes]);
              await new Promise(r => setTimeout(r, 600)); 
           }
           setTerminalOutput(prev => [...prev, <div key={`ping-end-${Date.now()}`} className="pl-4 text-gray-400">--- {target} ping statistics ---<br/>4 packets transmitted, done.</div>]);
         };
         runPing();
         return; 
      } else if (cmd === "clear") {
         setTerminalOutput([]);
         setInput("");
         return;
      } else if (cmd !== "") {
         addedNodes.push(<div key={`err-${Date.now()}`} className="pl-4 text-red-400">zsh: command not found: {cmd}</div>);
      }

      setTerminalOutput(prev => [...prev, ...addedNodes]);
      setInput("");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050507] text-gray-300 font-sans p-4 sm:p-8 lg:p-12 relative overflow-y-auto selection:bg-cyan-500/30 selection:text-cyan-100">

      {/* Grid Pattern Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">

        {/* Top Navbar / HUD Status */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="w-2 h-2 bg-cyan-500 animate-pulse rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            <span className="font-mono text-xs tracking-[0.2em] text-cyan-500 uppercase">System Active // {new Date().getFullYear()}</span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 font-mono text-xs uppercase text-gray-500">
            <span onClick={() => scrollToSection('identity')} className="hover:text-cyan-400 cursor-pointer transition-colors">01. Identity</span>
            <span onClick={() => scrollToSection('capabilities')} className="hover:text-cyan-400 cursor-pointer transition-colors">02. Capabilities</span>
            <span onClick={() => scrollToSection('databanks')} className="hover:text-cyan-400 cursor-pointer transition-colors">03. Databanks</span>
            <span onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 cursor-pointer transition-colors">04. Transmission</span>
          </div>
        </header>

        {/* Hero Section */}
        <div id="identity" className="flex flex-col gap-6 py-8 lg:py-16">
          <div className="font-mono text-sm text-cyan-400 flex items-center gap-2">
            <ChevronRight className="w-4 h-4" /> Initiating connection... root access granted.
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
            CARLO<br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">_VII</span>
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-gray-400 font-light leading-relaxed border-l-2 border-cyan-500/50 pl-6 mt-4">
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href="mailto:panercarlo99+portfolio@gmail.com" className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-8 py-3 font-mono text-sm tracking-widest uppercase hover:bg-cyan-500 hover:text-[#050507] transition-all flex items-center gap-2">
              <Mail className="w-4 h-4" /> Execute Call
            </a>
            <button onClick={() => scrollToSection('databanks')} className="text-gray-400 px-8 py-3 font-mono text-sm tracking-widest uppercase border border-transparent hover:border-gray-700 hover:text-white transition-colors flex items-center gap-2">
              Access Logs
            </button>
            <a href="/pdf/CarloVii-updated-cv.pdf" target="_blank" className="text-gray-400 px-8 py-3 font-mono text-sm tracking-widest uppercase hover:text-cyan-400 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Download CV
            </a>
          </div>
        </div>

        {/* Modular Grid Layout */}
        <div id="capabilities" className="grid grid-cols-1 md:grid-cols-12 gap-6 scroll-mt-24">

          {/* Left Column (col 1-5) */}
          <div className="col-span-1 md:col-span-6 lg:col-span-5 flex flex-col gap-6">
            {/* Module 1: Mini Terminal */}
            <div className={`${isTerminalExpanded ? 'fixed inset-4 sm:inset-12 z-[100] shadow-[0_0_50px_rgba(6,182,212,0.15)] bg-[#050507]/95 backdrop-blur-md' : 'relative bg-white/5 backdrop-blur-sm flex-1'} border border-white/10 group cursor-text flex flex-col`} onClick={() => inputRef.current?.focus()}>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500 to-transparent opacity-50"></div>
              <div className="p-4 border-b border-white/5 flex items-center justify-between font-mono text-xs text-gray-500 shrink-0">
                <span className="flex items-center gap-2"><TerminalIcon className="w-4 h-4" /> ROOT_ACCESS</span>
                <div className="flex items-center gap-4 z-10">
                  <span className="hidden sm:inline-block">sys.ver.1.0.4</span>
                  {isTerminalExpanded ? (
                    <div className="flex items-center gap-3 ml-2">
                      <button onClick={(e) => { e.stopPropagation(); setIsTerminalExpanded(false); }} className="hover:text-cyan-400 transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setIsTerminalExpanded(false); }} className="hover:text-cyan-400 transition-colors">
                        <Square className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setIsTerminalExpanded(false); }} className="hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={(e) => { e.stopPropagation(); setIsTerminalExpanded(true); }} className="hover:text-cyan-400 transition-colors p-1 bg-black/20 rounded">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className={`p-4 font-mono text-sm overflow-y-auto flex flex-col scroll-smooth flex-1 min-h-[16rem] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-cyan-500/20 [&::-webkit-scrollbar-thumb]:rounded hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/40`} ref={terminalContainerRef}>
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
                  <div className="h-4" />
                </div>
              </div>
            </div>
            {isTerminalExpanded && <div className="h-72 sm:h-64 hidden sm:block border border-dashed border-white/10 opacity-50"></div>}

            {/* Domain Expertise */}
            <div className="border border-white/10 bg-white/[0.02] p-6">
               <h3 className="font-mono text-xs text-cyan-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-cyan-500"></div> Domain Expertise
               </h3>
               <div className="flex flex-wrap gap-2">
                 {["Web Development", "Software Development", "Mobile Development", "API Development", "AI & Machine Learning", "Cloud Management", "Cybersecurity"].map(exp => (
                   <span key={exp} className="font-mono text-xs uppercase text-cyan-400 border border-cyan-500/30 px-3 py-1.5 bg-cyan-500/5">
                     {exp}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Column (col 6-12) */}
          <div className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-6">
            
            {/* Top Row: Core Specs & Frameworks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Core competency panel */}
            <div className="border border-white/10 bg-white/[0.02] p-6 relative flex flex-col justify-center overflow-hidden">
              <div className="absolute -top-6 -right-6 text-white-[0.02]">
                <Cpu className="w-32 h-32 opacity-10" />
              </div>
              <h3 className="font-mono text-xs text-cyan-500 tracking-widest uppercase mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500"></div> Core Specs
              </h3>
              <div className="space-y-5 relative z-10">
                {personalInfo.skills.slice(0, 5).map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between font-mono text-xs mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-cyan-500/70">{skill.level} _</span>
                    </div>
                    <div className="h-[1px] w-full bg-white/10 relative">
                      <div className="absolute top-0 left-0 h-full bg-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Panel */}
            <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-center gap-8">
              <h3 className="font-mono text-xs text-cyan-500 tracking-widest uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500"></div> Frameworks
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 text-gray-300 group">
                  <Shield className="w-5 h-5 text-cyan-500/50 group-hover:text-cyan-400 transition-colors mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-sm text-cyan-400 mb-1">Security Systems</div>
                    <div className="text-xs text-gray-500 leading-relaxed font-sans">Audits, penetration testing, and secure infrastructure.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-300 group">
                  <Code className="w-5 h-5 text-cyan-500/50 group-hover:text-cyan-400 transition-colors mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-sm text-cyan-400 mb-1">Full Stack Development</div>
                    <div className="text-xs text-gray-500 leading-relaxed font-sans">End-to-end architecture using Next.js, Node, and PHP.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-300 group">
                  <Activity className="w-5 h-5 text-cyan-500/50 group-hover:text-cyan-400 transition-colors mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-sm text-cyan-400 mb-1">System Optimization</div>
                    <div className="text-xs text-gray-500 leading-relaxed font-sans">Performance tuning for databases and APIs.</div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Bottom Row: Technical Skills */}
            <div className="border border-white/10 bg-white/[0.02] p-6">
               <h3 className="font-mono text-xs text-cyan-500 tracking-widest uppercase mb-6 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-cyan-500"></div> Technical Skills
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                 {[
                   { name: 'Version Control', desc: 'Proficient in Git for managing code versions and collaboration.' },
                   { name: 'JavaScript Frameworks', desc: 'Experience with Node.js and React for web applications.' },
                   { name: 'PHP Frameworks', desc: 'Skilled in CodeIgniter and Laravel for back-end development.' },
                   { name: 'Python', desc: 'Strong experience in AI and machine learning applications.' },
                   { name: 'Docker', desc: 'Experience in containerization and deployment.' },
                   { name: 'Cloud Management', desc: 'Familiarity with cloud platforms for application deployment.' }
                 ].map(skill => (
                   <div key={skill.name} className="flex flex-col gap-1">
                     <div className="font-mono text-sm text-cyan-400 flex items-center gap-2">
                       <span className="text-cyan-500/50">▹</span> {skill.name}
                     </div>
                     <div className="text-xs text-gray-500 leading-relaxed font-sans">{skill.desc}</div>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>

        {/* Projects List minimal */}
        <div id="databanks" className="border-t border-white/10 pt-12 mt-6 scroll-mt-24">
          <div className="flex flex-col mb-10">
            <h3 className="font-mono text-xs text-cyan-500 tracking-widest uppercase flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-cyan-500"></div> Archive // Latest Ingestions
            </h3>
            <span className="text-xs text-gray-600 font-mono">Records Found: {projects.length} Entities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="group flex flex-col h-full border border-transparent hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.03] p-6 transition-all cursor-pointer"
                onClick={() => { setSelectedProject(p); setSelectedImageIndex(0); }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-mono text-cyan-500/50 group-hover:text-cyan-500">0{i + 1}</div>
                  {p.liveUrl && (
                    <a href={p.liveUrl.startsWith('http') ? p.liveUrl : `#`} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-cyan-400" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <h4 className="text-xl text-white group-hover:text-cyan-400 transition-colors mb-3 font-semibold tracking-tight">{p.title}</h4>
                <div className="text-sm font-light text-gray-500 leading-relaxed mb-6 flex-1">{p.description}</div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.technologies.map(t => (
                    <span key={t} className="font-mono text-[10px] uppercase text-gray-500 border border-gray-800 px-2 py-1 bg-black/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Module / Transmission */}
        <div id="contact" className="border-t border-white/10 pt-12 pb-24 mt-6 scroll-mt-24">
          <div className="flex flex-col mb-10">
            <h3 className="font-mono text-xs text-cyan-500 tracking-widest uppercase flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 animate-ping"></div> Secure Transmission
            </h3>
            <span className="text-xs text-gray-600 font-mono">Status: Awaiting Handshake</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-6">ESTABLISH<br /><span className="text-cyan-500">CONNECTION</span></h4>
              <p className="text-gray-400 font-light max-w-md mb-8">
                Currently available for new opportunities. Whether you have a question about security architecture or want to launch a new web app, my inbox is open.
              </p>
              <div className="flex flex-col gap-4 font-mono text-sm">
                <a href="mailto:panercarlo99+portfolio@gmail.com" className="flex items-center gap-4 text-gray-400 hover:text-cyan-400 group transition-colors">
                  <span className="opacity-50 group-hover:opacity-100">01</span>
                  <span>EMAIL</span>
                  <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-cyan-500/50 transition-colors"></div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>

                {personalInfo.socialLinks.map((social, index) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-cyan-400 group transition-colors">
                    <span className="opacity-50 group-hover:opacity-100">0{index + 2}</span>
                    <span className="uppercase">{social.name}</span>
                    <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-cyan-500/50 transition-colors"></div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <form className="flex flex-col gap-4 border border-white/5 bg-white/[0.01] p-6 sm:p-8 relative group" onSubmit={handleContactSubmit}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
              
              <div className="flex flex-col gap-2 relative z-10">
                <label className="font-mono text-xs text-cyan-500 tracking-widest uppercase">01. IDENTIFICATION</label>
                <input type="text" name="name" required placeholder="Name / Callsign" className="bg-[#0a0a0e] border border-white/10 text-gray-300 p-3 font-mono text-sm outline-none focus:border-cyan-500/50 transition-colors w-full placeholder:text-gray-700" />
              </div>
              
              <div className="flex flex-col gap-2 relative z-10">
                <label className="font-mono text-xs text-cyan-500 tracking-widest uppercase">02. RETURN ADDRESS</label>
                <input type="email" name="email" required placeholder="Email Address" className="bg-[#0a0a0e] border border-white/10 text-gray-300 p-3 font-mono text-sm outline-none focus:border-cyan-500/50 transition-colors w-full placeholder:text-gray-700" />
              </div>

              <div className="flex flex-col gap-2 mt-2 relative z-10 text-gray-300">
                <label className="font-mono text-xs text-cyan-500 tracking-widest uppercase">03. MESSAGE PAYLOAD</label>
                <textarea required name="message" placeholder="Enter transmission..." rows={5} className="bg-[#0a0a0e] border border-white/10 text-gray-300 p-3 font-mono text-sm outline-none focus:border-cyan-500/50 transition-colors w-full resize-none placeholder:text-gray-700"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="mt-4 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-8 py-3 font-mono text-sm tracking-widest uppercase hover:bg-cyan-500 hover:text-[#050507] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 relative z-10">
                <Mail className="w-4 h-4" /> {isSubmitting ? "DISPATCHING..." : submitStatus === "success" ? "TRANSMISSION DELIVERED ✓" : submitStatus === "error" ? "TRANSMISSION FAILED" : "DISPATCH MESSAGE"}
              </button>

              <div className="flex justify-between items-end font-mono text-[10px] text-gray-600 mt-2 select-none relative z-10">
                <div>© {new Date().getFullYear()} CARLO VII.</div>
                <div className="text-right">
                  <div>SYS.TERM // 100%</div>
                  <div>END OF FILE</div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div
            className="bg-[#050507] border border-cyan-500/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm relative flex flex-col shadow-[0_0_30px_rgba(6,182,212,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-cyan-400 transition-colors z-10 bg-[#050507]/80 p-1 backdrop-blur"
              onClick={() => setSelectedProject(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-8 border-b border-white/5 sticky top-0 bg-[#050507]/95 backdrop-blur z-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight pr-8">{selectedProject.title}</h3>
              <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400"></div> {selectedProject.category} PROJECT
              </p>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Image Gallery */}
              <div className="flex flex-col gap-4">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <>
                    <div className="w-full aspect-video bg-[#0a0a0e] rounded border border-white/5 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedProject.images[selectedImageIndex]} alt={`${selectedProject.title} screenshot`} className="w-full h-full object-contain" />
                    </div>
                    {selectedProject.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {selectedProject.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`w-20 h-12 md:w-24 md:h-14 flex-shrink-0 bg-[#0a0a0e] border rounded overflow-hidden transition-all ${selectedImageIndex === idx ? 'border-cyan-400 opacity-100' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : selectedProject.image ? (
                  <div className="w-full aspect-video bg-[#0a0a0e] rounded border border-white/5 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain" />
                  </div>
                ) : null}
              </div>

              {/* Right Column: Details */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-mono tracking-widest text-cyan-500 uppercase">Transmission Details</h4>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm border-l-2 border-cyan-500/30 pl-4">{selectedProject.longDescription || selectedProject.description}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-mono tracking-widest text-cyan-500 uppercase">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(t => (
                      <span key={t} className="font-mono text-[10px] uppercase text-cyan-400 border border-cyan-500/30 px-2 py-1 bg-cyan-500/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.liveUrl && (
                  <div className="mt-auto pt-6 flex gap-4 text-center">
                    <a href={selectedProject.liveUrl.startsWith('http') ? selectedProject.liveUrl : `#`} target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-8 py-3 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500 hover:text-[#050507] transition-all flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" /> Launch Live URL
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
