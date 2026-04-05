"use client";

import React, { useState } from "react";
import TerminalCard from "../components/TerminalCard";
import { CanvasText } from "../components/CanvasText";
import { Terminal, Copy, Check, Package, ArrowRight, Zap, Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";

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

export default function Home() {
  const [copiedLocal, setCopiedLocal] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLocal(true);
    setTimeout(() => setCopiedLocal(false), 2000);
  };

  return (
    <>
      <div
        className="page-root relative flex flex-col min-h-screen text-zinc-900 selection:bg-black selection:text-white bg-white overflow-x-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 max-w-[1400px] mx-auto z-10 relative"
        >
          <div className="flex items-center gap-2 font-bold tracking-tight text-base sm:text-lg text-zinc-900 shrink-0">
            <Terminal size={18} className="text-zinc-400" />
            cistack
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-zinc-500">
            <a
              href="https://github.com/edwinvs/cistack"
              className="hover:text-zinc-900 transition-colors flex items-center gap-1.5 sm:gap-2"
            >
              <GithubIcon size={15} />
              <span className="hidden xs:inline">GitHub</span>
            </a>
            <a
              href="https://www.npmjs.com/package/cistack"
              className="hover:text-zinc-900 transition-colors flex items-center gap-1.5 sm:gap-2"
            >
              <Package size={15} />
              <span className="hidden xs:inline">npm</span>
            </a>
          </div>
        </motion.nav>

        {/* Main content */}
        <main className="w-full max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center justify-between pt-6 lg:pt-12 pb-16 px-4 sm:px-6 md:px-8 z-10 relative gap-8 lg:gap-8 min-h-[calc(100vh-80px)]">

          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start gap-4 sm:gap-5 w-full lg:max-w-[500px]"
          >
            <h1 className="text-[3.0rem] min-[1445px]:text-[4.0rem] font-bold tracking-tight text-zinc-900 leading-[1.1] flex flex-col gap-1 w-full">

              {/* First line */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-y-1 sm:gap-x-3">
                <span className="italic font-black tracking-tighter text-zinc-900 sm:whitespace-nowrap">
                  Your stack.
                </span>

                <div className="shrink-0">
                  <CanvasText
                    text="Your pipeline."
                    className="text-[3.0rem] min-[1445px]:text-[4.0rem] font-bold tracking-tight"
                    backgroundClassName="bg-[#1d4ed8]"
                    colors={[
                      "#60a5fa",
                      "#3b82f6",
                      "#bfdbfe",
                      "#93c5fd",
                      "#38bdf8",
                      "#0ea5e9",
                    ]}
                    animationDuration={4}
                    lineGap={6}
                    curveIntensity={30}
                    lineWidth={2}
                  />
                </div>
              </div>

              {/* Second line */}
              <div className="flex items-baseline">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-600 font-bold tracking-tight sm:whitespace-nowrap">
                  engineered in seconds.
                </span>
              </div>
            </h1>

            {/* Description */}
            <p className="text-[13px] sm:text-[14px] md:text-[15px] text-zinc-500 leading-[1.7] w-full font-normal">
              cistack auto-detects your stack and generates
              production-ready GitHub Actions workflows across 30+ frameworks and 10+ platforms.
            </p>

            {/* CTA row */}
            <div className="flex flex-row items-center gap-6 sm:gap-8 mt-2 w-full">
              <button
                onClick={() => copyToClipboard("npx cistack")}
                className="flex items-center justify-between gap-3 bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800 text-white rounded-full pl-5 pr-2 py-2 sm:py-1.5 text-[13px] sm:text-[13px] w-auto shadow-sm"
              >
                <span className="font-mono">npx cistack</span>
                <div className="bg-zinc-800 rounded-full p-2 sm:p-1.5 flex items-center justify-center shrink-0">
                  {copiedLocal ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} className="text-zinc-300" />
                  )}
                </div>
              </button>

              {/* <a
                href="#"
                className="text-[14px] sm:text-[15px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1.5 px-1 xs:px-0 whitespace-nowrap"
              >
                Documentation{" "}
                <ArrowRight size={15} className="text-zinc-400 shrink-0" />
              </a> */}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[680px] lg:flex-shrink-0 min-w-0"
          >
            <TerminalCard />
          </motion.div>
        </main>

        {/* Documentation Section */}
        <section id="docs" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-24 sm:py-32 z-10 relative">
          <div className="flex flex-col gap-20 items-start">
            {/* Intro & Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900">
                  Automatically generate CI/CD pipelines by analyzing your codebase.
                </h2>
                <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-[800px]">
                  cistack scans your project directory and produces production-grade GitHub Actions workflow YAML files. 
                  It detects your language, framework, testing tools, and hosting platform — then writes the best pipeline for your stack.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-wider">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    { title: "Deep codebase analysis", desc: "Reads package.json, lock files, config files, and directory structure" },
                    { title: "Smart detection", desc: "Identifies 30+ frameworks, 12 languages, 12+ testing tools, and 10+ hosting platforms" },
                    { title: "Hosting auto-detect", desc: "Firebase, Vercel, Netlify, AWS, GCP, Azure, Heroku, Render, and more" },
                    { title: "Multi-workflow output", desc: "Generates separate ci.yml, deploy.yml, docker.yml, and security.yml" },
                    { title: "Security built-in", desc: "CodeQL analysis + dependency auditing on every pipeline" },
                    { title: "Monorepo aware", desc: "Detects Turborepo, Nx, Lerna, pnpm workspaces" },
                    { title: "Interactive mode", desc: "Confirms detected settings before writing files" },
                    { title: "Zero config", desc: "Works out of the box with no configuration needed" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="font-bold text-zinc-900 text-sm">{item.title}</span>
                      <span className="text-zinc-500 text-sm leading-relaxed">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Installation & Usage */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-wider">Installation</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-zinc-500 font-medium italic">Run without installing (recommended for one-off use)</p>
                    <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 font-mono text-sm text-zinc-800">
                      npx cistack
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-zinc-500 font-medium italic">Install globally</p>
                    <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 font-mono text-sm text-zinc-800">
                      npm install -g cistack
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-wider">Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { cmd: "npx cistack", desc: "In your project directory" },
                    { cmd: "npx cistack --path /path/to/project", desc: "Specify a project path" },
                    { cmd: "npx cistack --output .github/workflows", desc: "Custom output directory" },
                    { cmd: "npx cistack --dry-run", desc: "Dry run (print YAML without writing)" },
                    { cmd: "npx cistack --no-prompt", desc: "Skip interactive prompts" },
                    { cmd: "npx cistack --verbose", desc: "Verbose output" },
                    { cmd: "npx cistack --force", desc: "Force overwrite existing files" }
                  ].map((item, i) => (
                    <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 flex flex-col gap-2">
                      <code className="text-[13px] font-mono text-zinc-900 font-bold">{item.cmd}</code>
                      <span className="text-[12px] text-zinc-500">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Matrix Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-12"
            >
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-wider">Detected Platforms</h3>
                <div className="overflow-x-auto rounded-2xl border border-zinc-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-100">
                      <tr>
                        <th className="px-6 py-4 font-bold text-zinc-900">Platform</th>
                        <th className="px-6 py-4 font-bold text-zinc-900">Detection Signal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {[
                        { name: "Firebase", signal: "firebase.json, .firebaserc, firebase-tools dep" },
                        { name: "Vercel", signal: "vercel.json, .vercel dir, vercel dep" },
                        { name: "Netlify", signal: "netlify.toml, _redirects, netlify-cli dep" },
                        { name: "GitHub Pages", signal: "gh-pages dep, github.io homepage" },
                        { name: "AWS", signal: "serverless.yml, appspec.yml, cdk.json, aws-sdk dep" },
                        { name: "GCP App Engine", signal: "app.yaml" },
                        { name: "Azure", signal: "azure/pipelines.yml, @azure/* deps" },
                        { name: "Heroku", signal: "Procfile, heroku.yml" },
                        { name: "Render", signal: "render.yaml" },
                        { name: "Railway", signal: "railway.json, railway.toml" },
                        { name: "Docker", signal: "Dockerfile, docker-compose.yml" }
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-3 font-semibold text-zinc-900">{item.name}</td>
                          <td className="px-6 py-3 text-zinc-500 font-mono text-[13px]">{item.signal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-sm">Detected Frameworks</h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-mono bg-zinc-50/50 p-6 rounded-2xl border border-dashed border-zinc-200">
                  Next.js, Nuxt, SvelteKit, Remix, Astro, Vite, React, Vue, Angular, Svelte, Gatsby, Express, Fastify, NestJS, Hono, Koa, tRPC, Django, Flask, FastAPI, Ruby on Rails, Spring Boot, Laravel, Go (gin), Rust (Cargo)
                </p>
              </div>
            </motion.div>

            {/* Workflows */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-wider">Generated Workflows</h3>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { 
                      title: "ci.yml — Continuous Integration", 
                      desc: "Runs on every push and pull request. Includes Lint (ESLint, TS type-check), Test (Unit tests with matrix), Build (Production build), and E2E (Cypress/Playwright if detected)."
                    },
                    { 
                      title: "deploy.yml — Continuous Deployment", 
                      desc: "Triggers on push to main/master. Sets up platform-specific deployment using best-practice GitHub Actions and provides documentation for required secrets."
                    },
                    { 
                      title: "docker.yml — Docker Build & Push", 
                      desc: "Triggers on push to main and version tags. Handles multi-platform builds via Buildx and pushes to GHCR with integrated caching."
                    },
                    { 
                      title: "security.yml — Security Audit", 
                      desc: "Runs on push and weekly schedule. Performs dependency vulnerability audits and GitHub CodeQL analysis for the detected language."
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-3 p-8 rounded-3xl border border-zinc-100 bg-white shadow-sm">
                      <h4 className="font-bold text-zinc-900 text-lg">{item.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900 rounded-[2.5rem] p-10 sm:p-12 text-white flex flex-col gap-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50"></div>
                <div className="flex flex-col gap-3 z-10">
                  <h3 className="text-2xl font-bold tracking-tight">Required Secrets</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-[500px]">
                    After generating, add the required secrets to your repository at: <br/>
                    <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-[12px]">Settings → Secrets and variables → Actions</code>
                  </p>
                </div>
                <div className="flex flex-col gap-4 mt-4 z-10">
                  <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Examples</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
                      <span className="text-xs font-bold text-zinc-400">Next.js + Vercel</span>
                      <code className="text-xs text-white">npx cistack</code>
                      <span className="text-[10px] text-zinc-500 leading-tight">Generates CI, Deploy (Vercel), and Security workflows.</span>
                    </div>
                    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
                      <span className="text-xs font-bold text-zinc-400">Node + Docker</span>
                      <code className="text-xs text-white">npx cistack</code>
                      <span className="text-[10px] text-zinc-500 leading-tight">Generates CI, Docker (GHCR), and Security workflows.</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-20 border-t border-zinc-100"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <span className="text-xs text-zinc-400">cistack — MIT license</span>
            <span className="text-xs text-zinc-400">npm install -g cistack</span>
          </div>
        </motion.footer>
      </div>
    </>
  );
}