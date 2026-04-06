"use client";

import { useState, useEffect } from "react";
import TerminalCard from "../components/TerminalCard";
import { Terminal, Copy, Check, Package, Shield, Globe, Box, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

function InstallToggle() {
  const [mode, setMode] = useState<"npx" | "npm">("npx");
  return (
    <div className="flex flex-col gap-4">
      {/* inline text switcher */}
      <div className="flex items-center">
        <button
          onClick={() => setMode("npx")}
          className={`text-[12px] font-semibold pr-4 py-1 transition-colors ${mode === "npx" ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
            }`}
        >
          npx
          {mode === "npx" && (
            <span className="ml-1.5 text-zinc-400 font-normal text-[11px]">— recommended</span>
          )}
        </button>
        <Separator orientation="vertical" className="h-3.5 bg-zinc-200" />
        <button
          onClick={() => setMode("npm")}
          className={`text-[12px] font-semibold pl-4 py-1 transition-colors ${mode === "npm" ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
            }`}
        >
          npm install -g
        </button>
      </div>

      {/* dark code block */}
      <div className="bg-zinc-950 rounded-sm px-6 pt-5 pb-6 font-mono text-sm text-zinc-300 relative overflow-hidden">
        <div className="flex items-center justify-between mb-5">
          {mode === "npx" ? (
            <Badge className="text-[9px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20 uppercase tracking-widest font-black px-2 py-0.5">Recommended</Badge>
          ) : (
            <Badge className="text-[9px] bg-zinc-500/10 text-zinc-400 border-zinc-700 uppercase tracking-widest font-black px-2 py-0.5">Global</Badge>
          )}
          {mode === "npx" ? (
            <Terminal size={13} className="text-zinc-700" />
          ) : (
            <Package size={13} className="text-zinc-700" />
          )}
        </div>
        <code className="text-[15px] text-emerald-400 tracking-tight">
          {mode === "npx" ? "$ npx cistack" : "$ npm install -g cistack"}
        </code>
        <Separator className="bg-zinc-800 my-4" />
        <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
          {mode === "npx"
            ? "Always fetches the latest version. No install step."
            : "Best for developers across multiple repos."}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [copiedLocal, setCopiedLocal] = useState(false);
  const [version, setVersion] = useState("3.0.0");
  const [downloads, setDownloads] = useState("2.4k");

  useEffect(() => {
    fetch("https://registry.npmjs.org/cistack/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.version) setVersion(data.version);
      })
      .catch((err) => console.error("Error fetching version:", err));

    fetch("https://api.npmjs.org/downloads/point/last-week/cistack")
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads) {
          const count = data.downloads;
          const formatted = count >= 1000
            ? (count / 1000).toFixed(1) + "k"
            : count.toLocaleString();
          setDownloads(formatted);
        }
      })
      .catch((err) => console.error("Error fetching downloads:", err));
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLocal(true);
    setTimeout(() => setCopiedLocal(false), 2000);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "cistack",
            "operatingSystem": "Any",
            "applicationCategory": "DeveloperApplication",
            "softwareVersion": version,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "description": "cistack deep-scans your repository to generate production-ready GitHub Actions workflows instantly. Supports 30+ frameworks and 12+ platforms.",
            "creator": {
              "@type": "Person",
              "name": "Edwin Vakayil",
              "url": "https://www.edwinvakayil.info/"
            },
            "featureList": [
              "Deep codebase analysis",
              "Smart detection of 30+ frameworks",
              "Native Cache support",
              "PR Preview Deploys",
              "Workflow Audit & Upgrade",
              "Hosting auto-detect (AWS, Vercel, Firebase)",
              "Monorepo awareness"
            ],
            "keywords": "github actions, automation, ci/cd, devops, workflow generator, nextjs, docker, vercel, aws, firebase"
          })
        }}
      />
      <div
        className="page-root relative flex flex-col min-h-screen text-zinc-900 selection:bg-black selection:text-white bg-white overflow-x-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Navigation */}
        {/* Redesigned Technical Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1400px] mx-auto z-50 relative bg-white/80 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 border-x border-b border-zinc-100">

            {/* Branding Cell */}
            <div className="md:col-span-3 p-5 md:p-6 border-b md:border-b-0 md:border-r border-zinc-100 flex items-center gap-3">
              <div className="flex items-center gap-2 font-bold tracking-tighter text-[20px] text-zinc-950">
                <Terminal size={18} className="text-zinc-400" />
                cistack
              </div>
              <span className="text-[9px] font-mono font-bold text-zinc-300 bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded-sm">V{version}</span>
            </div>

            {/* Navigation Metadata Cell */}
            <div className="md:col-span-6 p-5 md:p-6 flex items-center justify-between border-b md:border-b-0 md:border-r border-zinc-100">
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 leading-none">VERSION</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-tighter">Pipelines_Synced</span>
                  </div>
                </div>
                <div className="h-6 w-[1px] bg-zinc-100 mx-2 hidden sm:block" />
                <div className="flex items-center gap-6 text-[12px] font-bold text-zinc-400">
                  <a href="https://github.com/edwinvs/cistack" target="_blank" className="hover:text-zinc-950 transition-colors uppercase tracking-widest flex items-center gap-2 group">
                    <GithubIcon size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    Repository
                  </a>
                  <a href="https://www.npmjs.com/package/cistack" target="_blank" className="hover:text-zinc-950 transition-colors uppercase tracking-widest flex items-center gap-2 group">
                    <Package size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    Registry
                  </a>
                </div>
              </div>
            </div>

            {/* System Identification Cell */}
            <div className="md:col-span-3 p-5 md:p-6 flex items-center justify-between md:justify-end gap-6 bg-zinc-50/20">
              <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-[0.2em]">CORE_MANIFEST // {new Date().getFullYear()}_{(new Date().getMonth() + 1).toString().padStart(2, '0')}</span>
              <button
                onClick={() => document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[11px] font-black uppercase tracking-widest text-zinc-900 px-4 py-2 border border-zinc-900 hover:bg-zinc-950 hover:text-white transition-all rounded-sm"
              >
                Docs
              </button>
            </div>

          </div>
        </motion.nav>

        {/* Main content */}
        {/* Hero Section: Technical Matrix UI */}
        <main className="w-full max-w-[1500px] mx-auto pt-6 lg:pt-12 px-4 sm:px-6 md:px-8 z-10 relative">

          {/* Subtle Global Dot Grid for Hero */}
          <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.35] pointer-events-none -mt-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-zinc-100 relative bg-white/40">

            {/* L_01 / CORE MISSION (7/12) */}
            <div className="lg:col-span-7 border-r border-b border-zinc-100 p-8 sm:p-12 lg:p-16 relative overflow-hidden group/hero">
              {/* Decorative Blueprint Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-zinc-100/60 opacity-0 group-hover:opacity-100 transition-all duration-700" />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-8 relative z-10"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] font-black border-zinc-200 text-zinc-400 rounded-sm bg-white">
                    VERSION_{version}
                  </Badge>
                  <div className="h-[1px] w-12 bg-zinc-100" />
                  <span className="text-[10px] font-mono text-zinc-300 font-bold tracking-widest uppercase">SCAN_IDENTITY</span>
                </div>

                <div className="flex flex-col gap-8 md:gap-8">
                  {/* S_01: Input Stage */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 group/h1">
                    <span className="text-[10px] md:text-[12px] font-mono font-bold text-zinc-300 sm:text-zinc-200 group-hover/h1:text-zinc-400 transition-colors">S_01 // INGEST_ENGINE</span>
                    <h1 className="text-[2.2rem] min-[400px]:text-[2.5rem] md:text-[3.8rem] font-black tracking-tighter text-zinc-950 leading-[0.9] sm:leading-none break-words">
                      YOUR STACK.
                    </h1>
                  </div>

                  {/* S_02: Transformation Stage */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 sm:ml-6 md:ml-12 group/h2">
                    <span className="text-[10px] md:text-[12px] font-mono font-bold text-zinc-300 sm:text-zinc-200 group-hover/h2:text-zinc-400 transition-colors">S_02 // PIPELINE_SYNTH</span>
                    <h2 className="text-[2.2rem] min-[400px]:text-[2.5rem] md:text-[3.8rem] font-black tracking-tighter text-zinc-900 leading-[0.9] sm:leading-none break-words">
                      YOUR PIPELINE.
                    </h2>
                  </div>

                  {/* S_03: Reification Stage */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 sm:ml-12 md:ml-24 group/h3">
                    <span className="text-[10px] md:text-[12px] font-mono font-bold text-zinc-300 sm:text-zinc-200 group-hover/h3:text-zinc-400 transition-colors">S_03 // ACTION_COMMIT</span>
                    <h2 className="text-[2.2rem] min-[400px]:text-[2.5rem] md:text-[3.8rem] font-black tracking-tighter text-zinc-400 sm:text-zinc-300 leading-[0.9] sm:leading-none break-words">
                      ORCHESTRATED.
                    </h2>
                  </div>
                </div>

                <p className="text-[15px] sm:text-[17px] text-zinc-500 leading-relaxed max-w-[540px] font-medium">
                  cistack deep-scans your repository to generate production-ready
                  GitHub Actions workflows across 30+ frameworks and 12+ platforms.
                </p>

                <div className="flex flex-wrap items-center gap-6 mt-4">
                  <Button
                    onClick={() => copyToClipboard("npx cistack")}
                    className="flex h-auto items-center justify-between gap-6 bg-zinc-950 hover:bg-black transition-all border border-zinc-800 text-white rounded-sm px-6 py-3.5 text-[14px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-zinc-300/50 group/btn"
                  >
                    <span className="font-mono font-bold tracking-tight text-emerald-400 group-hover:text-emerald-300 transition-colors">npx cistack</span>
                    <div className="flex items-center justify-center shrink-0 border-l border-zinc-800 pl-6 ml-2">
                      {copiedLocal ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />}
                    </div>
                  </Button>

                  <div className="flex flex-col gap-1 px-2 border-l-2 border-zinc-100">
                    <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Active Installs</span>
                    <span className="text-[14px] font-bold text-zinc-900 tracking-tight">{downloads} / week</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* L_02 / RUNTIME STAGE (5/12) */}
            <div className="lg:col-span-5 border-r border-b border-zinc-100 flex flex-col">

              {/* Visual Terminal Area */}
              <div className="flex-1 p-8 sm:p-12 bg-zinc-50/20 flex items-center justify-center relative overflow-hidden group/runtime group-hover/hero:bg-zinc-50/40 transition-colors duration-700">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.2]" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="w-full relative z-20 rounded-sm overflow-hidden"
                >
                  <TerminalCard />
                </motion.div>

                <div className="absolute top-6 right-8 hidden sm:flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-zinc-400 tracking-widest font-black uppercase">REALTIME_SYNTH</span>
                </div>
              </div>

              {/* Matrix Footer Row */}
              <div className="border-t border-zinc-100 grid grid-cols-2 bg-white">
                <div className="p-8 border-r border-zinc-100 flex flex-col gap-2 hover:bg-zinc-50/50 transition-colors cursor-default group/meta">
                  <span className="text-[9px] font-black uppercase text-zinc-300 tracking-[0.2em] group-hover/meta:text-zinc-500 transition-colors">Integrations</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] font-black text-zinc-900 leading-none">30+</span>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tighter">Stack-Aware</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-2 bg-zinc-50/30 hover:bg-zinc-50/60 transition-colors cursor-default group/meta">
                  <span className="text-[9px] font-black uppercase text-zinc-300 tracking-[0.2em] group-hover/meta:text-zinc-500 transition-colors">Success Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] font-black text-emerald-600 leading-none tracking-tighter">99.9%</span>
                    <Check size={14} className="text-emerald-500/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Documentation Section */}
        <section id="docs" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-24 pb-40 z-10 relative">
          {/* subtle dot background mask */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.4] pointer-events-none" />

          {/* Section Header: Compact & Professional */}
          <div className="flex flex-col gap-4 mb-16 max-w-[900px]">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-black border-zinc-200 text-zinc-600 bg-white rounded-sm shadow-sm">
                Technical Specification v{version}
              </Badge>
              <div className="h-[1px] flex-1 bg-zinc-200/60" />
            </div>
            <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-zinc-900 leading-[1.1]">
              Engineered for consistency.<br />
              Generated for speed.
            </h2>
            <p className="text-[17px] text-zinc-500 leading-relaxed max-w-[760px] font-medium">
              cistack deep-scans your project directory to produce production-grade GitHub Actions YAML.
              It detects your language, framework, testing tools, and hosting platform — then writes the best pipeline for your stack.
            </p>
          </div>

          {/* Integrated High-Density Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-zinc-100"
          >

            {/* 01. Capabilities Grid (4 columns) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-4 border-r border-b border-zinc-100 p-8 lg:p-12 bg-zinc-50/20 hover:bg-zinc-50/40 transition-colors duration-500 relative group/cell"
            >
              <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-200 font-bold group-hover/cell:text-zinc-300 transition-colors">01 / 04</div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">01. Capabilities</span>
                  <h3 className="text-[18px] font-bold text-zinc-900">Analysis & Detection</h3>
                </div>
                <div className="flex flex-col divide-y divide-zinc-200/40">
                  {[
                    { label: "Deep codebase analysis", sub: "Reads package.json, lock files, configs" },
                    { label: "Smart detection", sub: "Identifies 30+ frameworks & 12 languages" },
                    { label: "Native Cache support", sub: "Speeds up pipelines for npm, pip, go, cargo & more" },
                    { label: "PR Preview Deploys", sub: "Automatic environments for Vercel and Netlify" },
                    { label: "Workflow Audit & Upgrade", sub: "Bumps action versions & checks best practices" },
                    { label: "Hosting auto-detect", sub: "AWS, Vercel, Firebase, Docker & more" },
                    { label: "Multi-workflow output", sub: "ci.yml, deploy.yml, docker.yml, security.yml" },
                    { label: "Security built-in", sub: "CodeQL + dependency auditing checkpoints" },
                    { label: "Monorepo aware", sub: "Turborepo, Nx, Lerna, pnpm workspaces" },
                    { label: "Interactive mode", sub: "Confirms settings before writing files" },
                    { label: "Zero config", sub: "Works out of the box with no config needed" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                      <Checkbox checked readOnly className="mt-0.5 border-zinc-200 data-[state=checked]:bg-zinc-900 data-[state=checked]:border-zinc-900 shrink-0 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-zinc-800 leading-tight">{item.label}</span>
                        <span className="text-[12px] text-zinc-400 leading-snug mt-0.5">{item.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 02. Setup & Compatibility (8 columns) */}
            <div className="lg:col-span-8 flex flex-col">

              {/* Row: Activation & Detailed Flags */}
              <div className="border-r border-b border-zinc-100 p-8 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">02. Activation</span>
                      <h3 className="text-[18px] font-bold text-zinc-900">Installation</h3>
                    </div>
                    <InstallToggle />
                    <div className="flex flex-col gap-3 mt-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">COMMAND_REGISTRY</span>
                      <div className="flex flex-col gap-2">
                        {[
                          { cmd: "audit", d: "Check workflows for outdated actions" },
                          { cmd: "upgrade", d: "Bump all actions to latest versions" },
                          { cmd: "init", d: "Create override config file" }
                        ].map((c, i) => (
                          <div key={i} className="flex items-center justify-between px-3 py-2 border border-zinc-100 bg-zinc-50/50 rounded-sm group hover:border-zinc-200 transition-colors">
                            <code className="text-[11px] font-extrabold text-zinc-800">npx cistack {c.cmd}</code>
                            <span className="text-[10px] text-zinc-400 font-medium">{c.d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[13px] text-zinc-400 italic">Recommended: Use npx for one-off generation.</p>
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">PARAMETERS_MANIFEST</span>
                      <div className="h-[1px] flex-1 bg-zinc-200 opacity-60" />
                    </div>

                    <div className="flex flex-col border-y border-zinc-200 divide-y divide-zinc-100 bg-white/40">
                      {[
                        { cmd: "--explain", t: "boolean", d: "Show reasoning for detected stack" },
                        { cmd: "--path", t: "string", d: "Target directory scanning path" },
                        { cmd: "--output", t: "string", d: "Redefine workflow output dir" },
                        { cmd: "--dry-run", t: "boolean", d: "Simulate output without writing" },
                        { cmd: "--no-prompt", t: "boolean", d: "Bypass interactive safety checks" },
                        { cmd: "--verbose", t: "boolean", d: "Enable maximum stdout tracing" },
                        { cmd: "--force", t: "boolean", d: "Ignore existing files and overwrite" }
                      ].map((flag, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center py-3 px-2 hover:bg-zinc-50/80 transition-colors group">
                          <div className="flex items-center gap-3 md:w-[150px] shrink-0">
                            <div className="w-[3px] h-[12px] bg-zinc-200 group-hover:bg-emerald-500 transition-colors" />
                            <code className="text-[11px] font-bold text-zinc-800 font-mono tracking-tight">{flag.cmd}</code>
                          </div>
                          <div className="flex flex-row items-center flex-1 gap-4 mt-2 md:mt-0 pl-[15px] md:pl-0">
                            <span className="text-[9px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded-sm uppercase tracking-widest">{flag.t}</span>
                            <span className="text-[11px] text-zinc-500 font-medium">{flag.d}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row: Hosting & Framework Split */}
              <div className="border-r border-b border-zinc-100 grid grid-cols-1 md:grid-cols-2 flex-1">
                <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-zinc-100">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[14px] font-bold text-zinc-900 uppercase tracking-widest">Detection Logic</h4>
                      <p className="text-[13px] text-zinc-400 leading-relaxed font-medium">Automatic recognition triggers based on filesystem signals.</p>
                    </div>
                    <div className="w-full max-h-[250px] sm:max-h-[265px] overflow-y-auto overflow-x-hidden pr-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300">
                      <Accordion className="w-full">
                        {[
                          { id: "p1", idx: "S_01", n: "Firebase", s: "firebase.json, firebase-tools dep", d: "Automatic Firebase Hosting detection with automated multi-project branch logic.", icon: <Package size={14} /> },
                          { id: "p2", idx: "S_02", n: "Vercel", s: "vercel.json, .vercel dir, vercel dep", d: "Vercel deploy-gate generation with branch-aware environment provisioning.", icon: <Shield size={14} /> },
                          { id: "p3", idx: "S_03", n: "Netlify", s: "netlify.toml, _redirects, netlify-cli dep", d: "Netlify edge detection with custom header and redirect validation.", icon: <Terminal size={14} /> },
                          { id: "p4", idx: "S_04", n: "GitHub Pages", s: "gh-pages dep, github.io package.json", d: "Static site hosting recognition for the native GitHub Pages deployment service.", icon: <Globe size={14} /> },
                          { id: "p5", idx: "S_05", n: "AWS Cloud", s: "serverless.yml, appspec.yml, cdk.json, aws-sdk dep", d: "Infrastructure-as-Code (IaC) recognition for AWS CDK, EC2, and Serverless.", icon: <Box size={14} /> },
                          { id: "p6", idx: "S_06", n: "GCP App Engine", s: "app.yaml", d: "Automated deployment scanning for Google Cloud Platform App Engine targets.", icon: <Globe size={14} /> },
                          { id: "p7", idx: "S_07", n: "Azure", s: "azure/pipelines.yml, @azure/* deps", d: "Azure App Service and native Azure pipeline definition identification.", icon: <Package size={14} /> },
                          { id: "p8", idx: "S_08", n: "Heroku", s: "Procfile, heroku.yml", d: "Classic PaaS deployment via Heroku registry and git push logic.", icon: <Box size={14} /> },
                          { id: "p9", idx: "S_09", n: "Render / Railway", s: "render.yaml, railway.json, railway.toml", d: "Modern PaaS detection utilizing automated app service descriptors.", icon: <Terminal size={14} /> },
                          { id: "p10", idx: "S_10", n: "Docker", s: "Dockerfile, docker-compose.yml", d: "Containerization recognition with Buildx layer caching and GHCR authentication.", icon: <Box size={14} /> }
                        ].map((p) => (
                          <AccordionItem key={p.id} value={p.id} className="border-b border-zinc-100 last:border-0">
                            <AccordionTrigger className="py-4 sm:py-5 hover:no-underline text-zinc-500 hover:text-zinc-900 transition-colors group/trigger data-[state=open]:text-zinc-950 [&>svg]:shrink-0">
                              <div className="flex flex-col justify-center flex-1 min-w-0 gap-1.5 sm:gap-2 pr-2 sm:pr-4 text-left overflow-hidden">
                                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                                  <span className="text-[10px] font-mono font-bold text-zinc-300 group-hover/trigger:text-zinc-500 transition-colors w-[24px] shrink-0">{p.idx}</span>
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <span className="text-zinc-400 group-hover/trigger:text-zinc-900 transition-colors shrink-0">{p.icon}</span>
                                    <span className="text-[15px] sm:text-[16px] font-semibold whitespace-nowrap">{p.n}</span>
                                  </div>
                                </div>
                                <div className="flex justify-start pl-[36px] sm:pl-[44px] w-full overflow-hidden">
                                  <Badge variant="outline" className="text-[9px] sm:text-[10px] opacity-60 font-mono tracking-tight font-normal rounded-sm border-zinc-200 bg-zinc-50/50 truncate max-w-full">{p.s}</Badge>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-6">
                              <div className="bg-zinc-50/30 border-l-2 border-zinc-200 ml-[18px] pl-6 py-4">
                                <p className="text-[15px] text-zinc-500 leading-relaxed max-w-[440px]">
                                  {p.d}
                                </p>
                                <div className="flex items-center gap-2 mt-4">
                                  <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">Signal source:</span>
                                  <code className="text-[10px] text-zinc-400 font-mono bg-white px-2 py-0.5 rounded-sm border border-zinc-100">{p.s}</code>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-12 bg-zinc-50/20 flex flex-col gap-10">
                  <div className="flex flex-col gap-6">
                    <h4 className="text-[14px] font-bold text-zinc-900 uppercase tracking-wider">Framework coverage</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "Nuxt", "SvelteKit", "Remix", "Astro", "Vite", "React", "Vue", "Angular", "Svelte", "Gatsby", "Express", "Fastify", "NestJS", "Hono", "Koa", "tRPC", "Django", "Flask", "FastAPI", "Ruby on Rails", "Spring Boot", "Laravel", "Go (gin)", "Rust (Cargo)"].map((f, i) => (
                        <Badge key={i} variant="outline" className="text-[11px] font-medium text-zinc-500 bg-white border-zinc-100 px-2 py-0.5 rounded-sm">
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h4 className="text-[14px] font-bold text-zinc-900 uppercase tracking-wider">Testing tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Jest", "Vitest", "Mocha", "Cypress", "Playwright", "Pytest", "RSpec", "Go Test", "Cargo Test", "PHPUnit", "JUnit/Maven", "Storybook"].map((t, i) => (
                        <Badge key={i} variant="secondary" className="text-[11px] font-bold text-zinc-500 bg-zinc-100/50 border-transparent px-2 py-0.5 rounded-sm">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 03. Workflow Outputs (Bento Layout) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-12 border-l border-r border-b border-zinc-100"
          >

            <div className="lg:col-span-8 p-8 lg:p-12 border-r border-zinc-100 group/artifacts hover:bg-zinc-50/20 transition-colors duration-500">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">03. Artifacts</span>
                    <Terminal size={14} className="text-zinc-200 group-hover/artifacts:text-zinc-300 transition-colors" />
                  </div>
                  <h3 className="text-[18px] font-bold text-zinc-900">Generated Workflows</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                  {[
                    { f: "ci.yml", l: "Continuous Integration", d: "Runs on push/PR: Lint (ESLint, TS type-check), Test (Node versions matrix), Build (production), and E2E." },
                    { f: "deploy.yml", l: "Continuous Deployment", d: "Triggers on main: Platform deployment with automatic PR Preview environments for Vercel and Netlify." },
                    { f: "docker.yml", l: "Docker Build & Push", d: "Triggers on main/tags: Multi-platform build via Docker Buildx, GHCR push, and GitHub Actions caching." },
                    { f: "security.yml", l: "Security Audit", d: "Runs on push/PR/weekly schedules: Dependency analysis and deep CodeQL auditing for the detected language." }
                  ].map((wf, i) => (
                    <div key={i} className="flex flex-col gap-3 group/item">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <code className="text-[14px] font-black text-zinc-800  px-2.5 py-1 rounded-sm leading-none border border-zinc-100 group-hover/item:border-zinc-200 transition-colors">{wf.f}</code>
                          <div className="h-[1px] flex-1 bg-zinc-100 group-hover/item:bg-zinc-200 transition-colors" />
                        </div>
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight">{wf.l}</span>
                      </div>
                      <p className="text-[14px] text-zinc-500 leading-relaxed group-hover/item:text-zinc-600 transition-colors">{wf.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security side panel */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="p-8 lg:p-12 bg-zinc-950 text-white relative overflow-hidden group flex-1">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="flex flex-col gap-8 relative z-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Security Requirement</span>
                    <h4 className="text-[18px] font-bold">Encrypted Secrets</h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    {["VERCEL_TOKEN", "AWS_ACCESS_KEY", "FIREBASE_TOKEN", "GHCR_TOKEN"].map((token) => (
                      <div key={token} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group/token">
                        <code className="text-[13px] font-mono text-zinc-400 group-hover/token:text-white transition-colors">{token}</code>
                        <Shield size={12} className="text-zinc-700 group-hover/token:text-emerald-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-[13px] text-zinc-500 italic leading-relaxed border-l-2 border-emerald-500/30 pl-4 py-2">
                      Add secrets at: <br />
                      <span className="text-zinc-300 not-italic font-bold tracking-tight">Settings → Secrets and variables → Actions</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 04. Tactical Examples Row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.995 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 border-l border-r border-b border-zinc-100 bg-zinc-50/10"
          >
            <div className="lg:col-span-12 p-8 lg:p-12">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">04. Structural Examples</span>
                  <h3 className="text-[18px] font-bold text-zinc-900">Standard Stack Scenarios</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { name: "Next.js + Vercel", desc: "ci.yml (lint, test, build), deploy.yml (vercel deploy), security.yml" },
                    { name: "React + Firebase", desc: "ci.yml, deploy.yml (firebase deploy --only hosting), security.yml" },
                    { name: "Node.js API + Docker", desc: "ci.yml, docker.yml (GHCR push), security.yml" }
                  ].map((ex, i) => (
                    <div key={i} className="p-6 border border-zinc-200/60 bg-white rounded-sm flex flex-col gap-3 hover:shadow-xl hover:shadow-zinc-200/40 transition-all cursor-default">
                      <span className="text-[14px] font-black text-zinc-900">{ex.name}</span>
                      <p className="text-[13px] text-zinc-500 leading-relaxed font-medium">{ex.desc}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">Validated Output</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </section>

        {/* Redesigned Architectural Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative z-20 border-t border-zinc-100 bg-white"
        >
          <div className="max-w-[1400px] mx-auto border-l border-r border-zinc-100">
            <div className="grid grid-cols-1 md:grid-cols-12">

              {/* Branding & Attribution */}
              <div className="md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-zinc-100 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Project_Origin</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[18px] tracking-tighter text-zinc-900">cistack</span>
                    <span className="text-[9px] font-mono font-bold text-zinc-300 bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded-sm">V_{version} // PRODUCTION</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Architected_By</span>
                  <a href="https://www.edwinvakayil.info/" target="_blank" rel="noopener noreferrer" className="text-[14px] font-bold text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-2 group">
                    Edwin Vakayil
                    <ArrowUpRight size={12} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Technical Status & License */}
              <div className="md:col-span-5 p-8 border-b md:border-b-0 md:border-r border-zinc-100 flex flex-col justify-between gap-8">
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[12px] font-bold text-zinc-700">All Systems Operational</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">License</span>
                    <span className="text-[12px] font-bold text-zinc-700 uppercase">Open Source</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                  Automated CI/CD infrastructure generation for the modern web. Built with precision for developers who value visibility and security in their deployment pipelines.
                </p>
              </div>

              {/* Final Install Command */}
              <div className="md:col-span-3 p-8 bg-zinc-50/30 flex flex-col justify-center items-start md:items-end gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Global_Install</span>
                <code className="text-[13px] font-mono font-bold text-zinc-800 bg-white border border-zinc-100 px-3 py-1.5 rounded-sm group hover:border-zinc-300 transition-colors cursor-pointer">
                  npm install -g cistack
                </code>
              </div>

            </div>

            {/* Sub-footer detail */}
            <div className="border-t border-zinc-100 p-4 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-widest">© {new Date().getFullYear()} CISTACK ENGINE — ALL PIPELINES REIFIED.</span>
              <div className="flex items-center gap-6">
                <a href="https://github.com/edwinvs/cistack" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Github</a>
                <a href="https://www.npmjs.com/package/cistack" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Npm</a>
                <button
                  onClick={() => document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Documentation
                </button>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
}