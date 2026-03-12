"use client";

import React, { useState } from "react";
import { personalInfo, services } from "../../data/personal-info";
import { projects } from "../../data/projects";
import { FileJson, FileCode2, FileText, ChevronRight, ChevronDown, Settings, Bell, GitBranch } from "lucide-react";

type File = "about.json" | "skills.js" | "services.php" | "projects.ts";

export default function V1CodeEditor() {
  const [activeFile, setActiveFile] = useState<File>("about.json");
  const [isExplorerOpen] = useState(true);

  const getFileIcon = (filename: string) => {
    if (filename.endsWith(".json")) return <FileJson className="w-4 h-4 text-yellow-500" />;
    if (filename.endsWith(".js")) return <FileCode2 className="w-4 h-4 text-blue-400" />;
    if (filename.endsWith(".php")) return <FileCode2 className="w-4 h-4 text-purple-400" />;
    if (filename.endsWith(".ts")) return <FileCode2 className="w-4 h-4 text-blue-500" />;
    return <FileText className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#cccccc] font-sans selection:bg-[#264f78]">
      {/* Top Menu Bar */}
      <div className="flex items-center px-4 h-8 bg-[#323233] text-[13px] border-b border-[#1e1e1e]">
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-white">File</span>
          <span className="cursor-pointer hover:text-white">Edit</span>
          <span className="cursor-pointer hover:text-white">Selection</span>
          <span className="cursor-pointer hover:text-white">View</span>
          <span className="cursor-pointer hover:text-white">Go</span>
          <span className="cursor-pointer hover:text-white">Run</span>
          <span className="cursor-pointer hover:text-white">Terminal</span>
          <span className="cursor-pointer hover:text-white">Help</span>
        </div>
        <div className="mx-auto font-medium text-gray-400">
          z1on3-portfolio - Visual Studio Code
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 border-r border-[#252526] gap-6">
          <FileText className="w-6 h-6 text-white cursor-pointer" />
          <Settings className="w-6 h-6 text-[#858585] cursor-pointer hover:text-white mt-auto" />
        </div>

        {/* Sidebar Explorer */}
        {isExplorerOpen && (
          <div className="w-60 bg-[#252526] border-r border-[#1e1e1e] flex flex-col">
            <div className="px-4 py-2 text-[11px] font-semibold text-gray-400 tracking-wider">
              EXPLORER
            </div>
            
            <div className="flex flex-col text-[13px]">
              <div className="flex items-center px-2 py-1 cursor-pointer hover:bg-[#2a2d2e] font-bold">
                <ChevronDown className="w-4 h-4 mr-1" />
                PORTFOLIO
              </div>
              
              <div className="pl-6 flex flex-col">
                {(["about.json", "skills.js", "services.php", "projects.ts"] as File[]).map((f) => (
                  <div 
                    key={f}
                    onClick={() => setActiveFile(f)}
                    className={`flex items-center px-2 py-1 cursor-pointer ${activeFile === f ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                  >
                    {getFileIcon(f)}
                    <span className="ml-2">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
          {/* Editor Tabs */}
          <div className="flex h-9 bg-[#2d2d2d] overflow-x-auto scroolbar-hide">
            {(["about.json", "skills.js", "services.php", "projects.ts"] as File[]).map((f) => (
              <div 
                key={f}
                onClick={() => setActiveFile(f)}
                className={`flex items-center px-4 h-full cursor-pointer text-[13px] border-t-2 ${activeFile === f ? 'bg-[#1e1e1e] border-blue-500 text-white' : 'bg-[#2d2d2d] border-transparent text-[#969696] hover:bg-[#2b2b2b]'}`}
              >
                {getFileIcon(f)}
                <span className="ml-2">{f}</span>
              </div>
            ))}
          </div>

          {/* Breadcrumbs */}
          <div className="h-6 flex items-center px-4 text-[13px] text-[#969696] shadow-sm">
            <span>portfolio</span>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="flex items-center gap-1">
              {getFileIcon(activeFile)}
              {activeFile}
            </span>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-auto p-4 font-mono text-[14px] leading-6">
            {activeFile === "about.json" && (
              <pre className="text-[#d4d4d4]">
                <span className="text-[#ce9178]">{"{"}</span><br/>
                {"  "}<span className="text-[#9cdcfe]">&quot;name&quot;</span>: <span className="text-[#ce9178]">&quot;{personalInfo.name}&quot;</span>,<br/>
                {"  "}<span className="text-[#9cdcfe]">&quot;role&quot;</span>: <span className="text-[#ce9178]">&quot;{personalInfo.role}&quot;</span>,<br/>
                {"  "}<span className="text-[#9cdcfe]">&quot;location&quot;</span>: <span className="text-[#ce9178]">&quot;{personalInfo.location}&quot;</span>,<br/>
                {"  "}<span className="text-[#9cdcfe]">&quot;motivation&quot;</span>: <span className="text-[#ce9178]">&quot;{personalInfo.motivation}&quot;</span>,<br/>
                {"  "}<span className="text-[#9cdcfe]">&quot;bio&quot;</span>: <span className="text-[#ce9178]">&quot;{personalInfo.bio}&quot;</span>,<br/>
                {"  "}<span className="text-[#9cdcfe]">&quot;contact&quot;</span>: <span className="text-[#ce9178]">{"{"}</span><br/>
                {personalInfo.socialLinks.map((s, i) => (
                  <span key={s.name}>
                    {"    "}<span className="text-[#9cdcfe]">&quot;{s.name.toLowerCase()}&quot;</span>: <span className="text-[#ce9178]">&quot;{s.url}&quot;</span>{i < personalInfo.socialLinks.length - 1 ? ',' : ''}<br/>
                  </span>
                ))}
                {"  "}<span className="text-[#ce9178]">{"}"}</span><br/>
                <span className="text-[#ce9178]">{"}"}</span>
              </pre>
            )}

            {activeFile === "skills.js" && (
              <pre className="text-[#d4d4d4]">
                <span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">techStack</span> = [<br/>
                {personalInfo.skills.map((s, i) => (
                  <span key={s.name}>
                    {"  "}{"{\n"}
                    {"    "}<span className="text-[#9cdcfe]">name</span>: <span className="text-[#ce9178]">&apos;{s.name}&apos;</span>,<br/>
                    {"    "}<span className="text-[#9cdcfe]">proficiency</span>: <span className="text-[#b5cea8]">{s.level}</span><br/>
                    {"  "}{"}"}{i < personalInfo.skills.length - 1 ? ',' : ''}<br/>
                  </span>
                ))}
                ];<br/><br/>
                <span className="text-[#569cd6]">export</span> <span className="text-[#569cd6]">default</span> techStack;
              </pre>
            )}

            {activeFile === "services.php" && (
              <pre className="text-[#d4d4d4]">
                <span className="text-[#569cd6]">&lt;?php</span><br/><br/>
                <span className="text-[#569cd6]">class</span> <span className="text-[#4ec9b0]">ProfessionalServices</span> {"{"}<br/>
                {"  "}<span className="text-[#569cd6]">public</span> <span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">getOfferings</span>() {"{"}<br/>
                {"    "}<span className="text-[#c586c0]">return</span> [<br/>
                {services.map((s, i) => (
                  <span key={s.title}>
                    {"      "}[\n
                    {"        "}<span className="text-[#ce9178]">&apos;title&apos;</span> =&gt; <span className="text-[#ce9178]">&apos;{s.title}&apos;</span>,<br/>
                    {"        "}<span className="text-[#ce9178]">&apos;description&apos;</span> =&gt; <span className="text-[#ce9178]">&apos;{s.description}&apos;</span><br/>
                    {"      "}]{i < services.length - 1 ? ',' : ''}<br/>
                  </span>
                ))}
                {"    "}];<br/>
                {"  "}{"}"}<br/>
                {"}"}<br/><br/>
                <span className="text-[#569cd6]">?&gt;</span>
              </pre>
            )}

            {activeFile === "projects.ts" && (
              <pre className="text-[#d4d4d4]">
                <span className="text-[#569cd6]">import</span> {"{"} Project {"}"} <span className="text-[#569cd6]">from</span> <span className="text-[#ce9178]">&apos;@/types&apos;</span>;<br/><br/>
                <span className="text-[#569cd6]">export</span> <span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">featuredProjects</span>: <span className="text-[#4ec9b0]">Project</span>[] = [<br/>
                {projects.map((p, i) => (
                  <span key={p.id}>
                    {"  "}{"{\n"}
                    {"    "}<span className="text-[#9cdcfe]">id</span>: <span className="text-[#ce9178]">&apos;{p.id}&apos;</span>,<br/>
                    {"    "}<span className="text-[#9cdcfe]">title</span>: <span className="text-[#ce9178]">&apos;{p.title}&apos;</span>,<br/>
                    {"    "}<span className="text-[#9cdcfe]">technologies</span>: [<span className="text-[#ce9178]">&apos;{p.technologies.join("&apos;, &apos;")}&apos;</span>],<br/>
                    {"    "}<span className="text-[#9cdcfe]">category</span>: <span className="text-[#ce9178]">&apos;{p.category}&apos;</span><br/>
                    {p.liveUrl && <span className="text-[#9cdcfe]">{"    "}liveUrl</span> + `: ` + <span className="text-[#ce9178]">&apos;{p.liveUrl}&apos;</span> + `,\n`}
                    {"  "}{"}"}{i < projects.length - 1 ? ',' : ''}<br/>
                  </span>
                ))}
                ];
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[12px]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 cursor-pointer"><GitBranch className="w-3 h-3" /> main*</span>
          <span className="hover:bg-[#1f8ad2] px-1 cursor-pointer">0 \u26A0 0</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hover:bg-[#1f8ad2] px-1 cursor-pointer">UTF-8</span>
          <span className="hover:bg-[#1f8ad2] px-1 cursor-pointer">TypeScript React</span>
          <span className="hover:bg-[#1f8ad2] px-1 cursor-pointer"><Bell className="w-3 h-3" /></span>
        </div>
      </div>
    </div>
  );
}
