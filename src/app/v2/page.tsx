"use client";

import React, { useState, useEffect, useRef } from "react";
import { personalInfo, services } from "../../data/personal-info";
import { projects } from "../../data/projects";

type TerminalLine = {
  type: "input" | "output" | "system" | "error";
  content: React.ReactNode;
};

export default function V2SecurityConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [mounted, setMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setHistory([
      { type: "system", content: "Init v2.43.1-kali - boot sequence initiated" },
      { type: "system", content: "Loading kernel modules... OK" },
      { type: "system", content: "Mounting file systems... OK" },
      { type: "system", content: "Initializing network interfaces... OK" },
      { type: "system", content: "" },
      { type: "system", content: `Welcome to ${personalInfo.name} security console.` },
      { type: "system", content: "Type 'help' to list available modules." },
      { type: "system", content: "" },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      const lowerCmd = cmd.toLowerCase();
      
      const newHistory: TerminalLine[] = [...history, { type: "input", content: cmd }];
      
      if (lowerCmd === "help") {
        newHistory.push({
          type: "output",
          content: (
            <div className="text-cyan-400">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <span className="text-pink-500 font-bold">whoami</span><span>Display identity details</span>
                <span className="text-pink-500 font-bold">scan --skills</span><span>Analyze technical stack</span>
                <span className="text-pink-500 font-bold">cat services.txt</span><span>List consulting domains</span>
                <span className="text-pink-500 font-bold">ls /projects</span><span>List system projects</span>
                <span className="text-pink-500 font-bold">clear</span><span>Clear system logs</span>
              </div>
            </div>
          )
        });
      } else if (lowerCmd === "whoami") {
        newHistory.push({
          type: "output",
          content: (
            <div className="text-gray-300">
              <span className="text-cyan-500 font-bold">Name:</span> {personalInfo.name}<br/>
              <span className="text-cyan-500 font-bold">Role:</span> {personalInfo.role}<br/>
              <span className="text-cyan-500 font-bold">Status:</span> {personalInfo.bio}
            </div>
          )
        });
      } else if (lowerCmd === "scan --skills") {
        newHistory.push({
          type: "output",
          content: (
            <div className="text-gray-300">
              <div className="text-green-400 mb-2">[+] Commencing scan...</div>
              {personalInfo.skills.map(s => (
                <div key={s.name} className="flex items-center gap-4 my-1">
                  <span className="w-24 text-cyan-400">{s.name}</span>
                  <div className="flex-1 max-w-xs h-2 bg-gray-800 rounded">
                    <div className="h-full rounded bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" style={{ width: `${s.level}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{s.level}%</span>
                </div>
              ))}
              <div className="text-green-400 mt-2">[+] Scan complete.</div>
            </div>
          )
        });
      } else if (lowerCmd === "cat services.txt") {
        newHistory.push({
          type: "output",
          content: (
            <div className="text-gray-300">
              {services.map(s => (
                <div key={s.title} className="mb-4">
                  <div className="text-pink-500 font-bold mb-1"># {s.title}</div>
                  <div className="pl-4 border-l-2 border-cyan-500/30 text-gray-400">{s.description}</div>
                </div>
              ))}
            </div>
          )
        });
      } else if (lowerCmd === "ls /projects") {
        newHistory.push({
          type: "output",
          content: (
            <div className="text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(p => (
                <div key={p.id} className="border border-cyan-500/20 p-2 bg-gray-900/50">
                  <div className="text-cyan-400 font-bold mb-1">{p.title}</div>
                  <div className="text-xs text-pink-400 mb-2">[{p.technologies.join(", ")}]</div>
                  <div className="text-sm text-gray-400">{p.description}</div>
                </div>
              ))}
            </div>
          )
        });
      } else if (lowerCmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (lowerCmd !== "") {
        newHistory.push({
          type: "error",
          content: <span className="text-red-500">zsh: command not found: {cmd}</span>
        });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#a0a0a0] font-mono p-4 sm:p-8 flex flex-col"
         onClick={() => inputRef.current?.focus()}>
      
      {/* Scanlines effect overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,_3px_100%] z-50"></div>

      <div className="max-w-4xl mx-auto w-full flex-1">
        {history.map((h, i) => (
          <div key={i} className="mb-1 leading-relaxed text-sm sm:text-base selection:bg-cyan-500/30">
            {h.type === "input" ? (
              <div className="flex">
                <span className="text-green-500 font-bold mr-2">root@z1on3<span className="text-gray-500">:</span><span className="text-blue-500">~</span>$</span>
                <span className="text-gray-200">{h.content}</span>
              </div>
            ) : h.type === "system" ? (
              <span className="text-gray-500">{h.content}</span>
            ) : (
              <div className="my-2">{h.content}</div>
            )}
          </div>
        ))}

        <div className="flex items-center mb-10 text-sm sm:text-base">
          <span className="text-green-500 font-bold mr-2 whitespace-nowrap">root@z1on3<span className="text-gray-500">:</span><span className="text-blue-500">~</span>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none flex-1 text-gray-200"
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
