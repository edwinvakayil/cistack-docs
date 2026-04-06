"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RefreshCcw } from "lucide-react";

const COMMAND = "npx cistack";

interface OutputLine {
  text: string;
  type: "success" | "info" | "heading" | "detail" | "merged" | "bullet" | "written" | "done" | "path" | "blank";
  delay: number;
}

const lineColor: Record<OutputLine["type"], string> = {
  success: "text-emerald-500",
  info: "text-zinc-500",
  heading: "text-zinc-900 font-bold",
  detail: "text-zinc-500",
  merged: "text-amber-500",
  bullet: "text-zinc-400 font-medium",
  written: "text-emerald-500",
  done: "text-zinc-950 font-bold",
  path: "text-zinc-400",
  blank: "",
};

const CopyButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx cistack");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.button
      className="text-zinc-400 hover:text-zinc-900 transition-colors p-1"
      onClick={handleCopy}
      whileTap={{ scale: 0.85 }}
      aria-label="Copy command"
    >
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </motion.button>
  );
};

const TerminalCard = () => {
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [phase, setPhase] = useState<"typing" | "output" | "done">("typing");
  const [key, setKey] = useState(0);
  const [version, setVersion] = useState("3.0.0");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://registry.npmjs.org/cistack/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.version) setVersion(data.version);
      })
      .catch((err) => console.error("Error fetching version:", err));
  }, []);

  const OUTPUT_LINES = useMemo((): OutputLine[] => [
    { text: `  cistack v${version}`, type: "heading", delay: 100 },
    { text: "  " + "─".repeat(24), type: "detail", delay: 200 },
    { text: "", type: "blank", delay: 250 },
    { text: "✔ Project scanned", type: "success", delay: 500 },
    { text: "✔ Stack detected", type: "success", delay: 800 },
    { text: "", type: "blank", delay: 850 },
    { text: "  Detected Stack", type: "heading", delay: 1000 },
    { text: "  " + "─".repeat(48), type: "detail", delay: 1100 },
    { text: "  Languages:           TypeScript", type: "info", delay: 1300 },
    { text: "  Frameworks:          Next.js, React", type: "info", delay: 1450 },
    { text: "  Hosting:             Vercel", type: "info", delay: 1600 },
    { text: "  Testing:             none", type: "info", delay: 1750 },
    { text: "  Release tool:        none", type: "info", delay: 1900 },
    { text: "", type: "blank", delay: 1950 },
    { text: "? Does this look correct? Generate pipeline with these settings? Yes", type: "detail", delay: 2200 },
    { text: "✔ Generated 3 CI workflow(s)", type: "success", delay: 2600 },
    { text: "  ↻ Smart-merged: ci.yml", type: "merged", delay: 2800 },
    { text: '    • updated top-level "on"', type: "bullet", delay: 2900 },
    { text: '    • updated top-level "concurrency"', type: "bullet", delay: 2950 },
    { text: '    • added job "lint"', type: "bullet", delay: 3000 },
    { text: '    •   job "build" → updated "name"', type: "bullet", delay: 3050 },
    { text: '    •   job "build" → updated "needs"', type: "bullet", delay: 3100 },
    { text: '    •   job "build" → added step "Checkout code"', type: "bullet", delay: 3150 },
    { text: '    •   job "build" → added step "Set up Node.js"', type: "bullet", delay: 3200 },
    { text: '    •   job "build" → updated step "Build"', type: "bullet", delay: 3250 },
    { text: '    •   job "build" → added step "Upload build artifact"', type: "bullet", delay: 3300 },
    { text: "  ✔ Written:      deploy.yml", type: "written", delay: 3500 },
    { text: "  ✔ Written:      security.yml", type: "written", delay: 3650 },
    { text: "  ✔ Written:      .github/dependabot.yml", type: "written", delay: 3800 },
    { text: "", type: "blank", delay: 3850 },
    { text: "  Done! Your GitHub Actions pipeline is ready.", type: "done", delay: 4100 },
    { text: "   Workflows → cistack/.github/workflows", type: "path", delay: 4300 },
    { text: "   Dependabot → cistack/.github/dependabot.yml", type: "path", delay: 4450 },
  ], [version]);

  const handleReplay = () => {
    setTypedCommand("");
    setVisibleLines(0);
    setPhase("typing");
    setKey((k) => k + 1);
  };

  useEffect(() => {
    if (phase !== "typing") return;
    if (typedCommand.length < COMMAND.length) {
      const t = setTimeout(() => {
        setTypedCommand(COMMAND.slice(0, typedCommand.length + 1));
      }, 60 + Math.random() * 60);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("output"), 400);
    return () => clearTimeout(t);
  }, [typedCommand, phase, key]);

  useEffect(() => {
    if (phase !== "output") return;
    if (visibleLines >= OUTPUT_LINES.length) {
      setPhase("done");
      return;
    }
    const currentDelay = OUTPUT_LINES[visibleLines].delay - (visibleLines > 0 ? OUTPUT_LINES[visibleLines - 1].delay : 0);
    const t = setTimeout(() => setVisibleLines((v) => v + 1), Math.max(currentDelay, 30));
    return () => clearTimeout(t);
  }, [visibleLines, phase, OUTPUT_LINES]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [typedCommand, visibleLines]);

  return (
    <div key={key} className="w-full h-[300px] sm:h-[350px] lg:h-[380px] flex flex-col rounded-sm border border-zinc-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-white border-b border-zinc-100 flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-[0.2em] font-mono">TERMINAL</span>
          </div>
          <div className="h-3 w-[1px] bg-zinc-100" />
          <span className="text-[9px] font-mono font-bold text-zinc-300 uppercase tracking-widest hidden sm:block">CORE_MISSION // L_02</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-100 rounded-sm px-2.5 py-1">
            <span className="text-[11px] text-zinc-700 font-mono font-bold tracking-tight">npx cistack</span>
            <div className="w-[1px] h-3 bg-zinc-200" />
            <CopyButton />
          </div>
          <button
            onClick={handleReplay}
            className="p-1.5 text-zinc-300 hover:text-zinc-900 transition-colors border border-transparent hover:border-zinc-100 rounded-sm"
            aria-label="Replay animation"
          >
            <RefreshCcw size={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 bg-white p-6 pt-4 font-mono text-[11px] sm:text-[13px] tracking-tight leading-relaxed overflow-y-auto custom-scrollbar selection:bg-zinc-900 selection:text-white"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-zinc-300 font-bold">$</span>
            <span className="text-zinc-800 font-bold">{typedCommand}</span>
            {phase === "typing" && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-4 bg-emerald-500"
              />
            )}
          </div>

          {phase !== "typing" && (
            <div className="space-y-0.5">
              {OUTPUT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  key={i}
                  className={`whitespace-pre-wrap break-words ${lineColor[line.type]}`}
                  style={{ minHeight: line.type === "blank" ? "0.75rem" : undefined }}
                >
                  {line.text}
                </motion.div>
              ))}
              {phase === "output" && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-1 h-3 bg-zinc-200 animate-pulse" />
                  <span className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold">Processing Output...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalCard;
