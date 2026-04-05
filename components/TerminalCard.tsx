"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMAND = "npx cistack";

const LOGO = [
  "  ██████╗██╗███████╗████████╗ █████╗  ██████╗██╗  ██╗",
  " ██╔════╝██║██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝",
  " ██║     ██║███████╗   ██║   ███████║██║     █████╔╝ ",
  " ██║     ██║╚════██║   ██║   ██╔══██║██║     ██╔═██╗ ",
  " ╚██████╗██║███████║   ██║   ██║  ██║╚██████╗██║  ██╗",
  "  ╚═════╝╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝",
];

interface OutputLine {
  text: string;
  type: "logo" | "subtitle" | "success" | "info" | "heading" | "detail" | "merged" | "bullet" | "written" | "done" | "path" | "blank";
  delay: number;
}

const OUTPUT_LINES: OutputLine[] = [
  ...LOGO.map((l, i) => ({ text: l, type: "logo" as const, delay: i * 40 })),
  { text: "", type: "blank", delay: 250 },
  { text: "  GitHub Actions pipeline generator  v2.0.0", type: "subtitle", delay: 300 },
  { text: "─".repeat(50), type: "detail", delay: 400 },
  { text: "", type: "blank", delay: 450 },
  { text: "✔ Project scanned", type: "success", delay: 600 },
  { text: "✔ Stack detected", type: "success", delay: 900 },
  { text: "", type: "blank", delay: 950 },
  { text: "🏗  Detected Stack", type: "heading", delay: 1100 },
  { text: "", type: "blank", delay: 1150 },
  { text: "  Languages:          TypeScript", type: "info", delay: 1300 },
  { text: "  Frameworks:         Next.js, React", type: "info", delay: 1450 },
  { text: "  Hosting:            Vercel", type: "info", delay: 1600 },
  { text: "  Testing:            none", type: "info", delay: 1750 },
  { text: "  Release tool:       none", type: "info", delay: 1900 },
  { text: "", type: "blank", delay: 1950 },
  { text: "? Does this look correct? Generate pipeline with these settings? Yes", type: "detail", delay: 2200 },
  { text: "✔ Generated 3 CI workflow(s)", type: "success", delay: 2600 },
  { text: "  ⊙ Smart-merged: ci.yml", type: "merged", delay: 2800 },
  { text: '      • updated top-level "on"', type: "bullet", delay: 2900 },
  { text: '      • updated top-level "concurrency"', type: "bullet", delay: 2950 },
  { text: '      • added job "lint"', type: "bullet", delay: 3000 },
  { text: '      • job "build" → updated "name"', type: "bullet", delay: 3050 },
  { text: '      • job "build" → updated "needs"', type: "bullet", delay: 3100 },
  { text: '      • job "build" → added step "Checkout code"', type: "bullet", delay: 3150 },
  { text: '      • job "build" → added step "Set up Node.js"', type: "bullet", delay: 3200 },
  { text: '      • job "build" → updated step "Build"', type: "bullet", delay: 3250 },
  { text: '      • job "build" → added step "Upload build artifact"', type: "bullet", delay: 3300 },
  { text: "  ✔ Written:      deploy.yml", type: "written", delay: 3500 },
  { text: "  ✔ Written:      security.yml", type: "written", delay: 3650 },
  { text: "  ✔ Written:      .github/dependabot.yml", type: "written", delay: 3800 },
  { text: "", type: "blank", delay: 3850 },
  { text: "  Done! Your GitHub Actions pipeline is ready.", type: "done", delay: 4100 },
  { text: "  Workflows → /Users/edwinvakayil/cistack/.github/workflows", type: "path", delay: 4300 },
  { text: "  Dependabot → /Users/edwinvakayil/cistack/.github/dependabot.yml", type: "path", delay: 4450 },
];

const lineColor: Record<OutputLine["type"], string> = {
  logo: "text-zinc-500", // Soft zinc for light theme
  subtitle: "text-zinc-500",
  success: "text-emerald-600", // emerald-600
  info: "text-blue-500", // sky-500
  heading: "text-zinc-900 font-bold",
  detail: "text-zinc-500",
  merged: "text-amber-600", // amber-600
  bullet: "text-zinc-400",
  written: "text-emerald-600", // emerald-600
  done: "text-emerald-600 font-bold",
  path: "text-zinc-400",
  blank: "",
};

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);

const CopyButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx cistack");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.button
      className="text-zinc-400 hover:text-zinc-700 relative p-1"
      onClick={handleCopy}
      whileTap={{ scale: 0.75 }}
      whileHover={{ scale: 1.15 }}
      aria-label="Copy command"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-emerald-600 block"
          >
            <CheckIcon />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="block"
          >
            <CopyIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const TerminalCard = () => {
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [phase, setPhase] = useState<"typing" | "output" | "done">("typing");
  const [key, setKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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
  }, [typedCommand, phase]);

  useEffect(() => {
    if (phase !== "output") return;
    if (visibleLines >= OUTPUT_LINES.length) {
      setPhase("done");
      return;
    }
    const currentDelay = OUTPUT_LINES[visibleLines].delay - (visibleLines > 0 ? OUTPUT_LINES[visibleLines - 1].delay : 0);
    const t = setTimeout(() => setVisibleLines((v) => v + 1), Math.max(currentDelay, 30));
    return () => clearTimeout(t);
  }, [visibleLines, phase]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [typedCommand, visibleLines]);

  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[380px] flex flex-col rounded-xl overflow-hidden border border-zinc-200/60 bg-white">
      {/* Terminal header */}
      <div className="bg-zinc-50 border-b border-zinc-200/60 flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-3 bg-white border border-zinc-200/80 rounded-md px-2 sm:px-3 py-1">
            <span className="text-[11px] sm:text-[13px] text-zinc-600 font-mono truncate max-w-[80px] sm:max-w-none">npx cistack</span>
            <CopyButton />
          </div>
          <motion.button
            onClick={handleReplay}
            className="bg-white border border-zinc-200/80 rounded-md p-1 sm:p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.75 }}
            aria-label="Replay animation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" /></svg>
          </motion.button>
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 bg-white p-3 sm:p-4 font-mono text-[10px] sm:text-[12px] tracking-tight leading-relaxed overflow-y-auto w-full custom-scrollbar selection:bg-zinc-900 selection:text-white"
        style={{ fontFamily: "'Fira Code', monospace !important" }}
      >
        {/* Prompt + command */}
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 font-medium">~ $</span>
          <span className="text-zinc-800 font-medium">{typedCommand}</span>
          {phase === "typing" && (
            <span className="inline-block w-2 h-4 bg-zinc-400 animate-pulse" />
          )}
        </div>

        {/* Output */}
        {phase !== "typing" && (
          <div className="mt-3 space-y-0.5 sm:space-y-0 text-left">
            {OUTPUT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                key={i}
                className={`${line.type === "logo" ? "whitespace-pre text-[7px] min-[400px]:text-[8px] sm:text-[10px] md:text-[13px] leading-none" : "whitespace-pre-wrap break-words"} ${lineColor[line.type]}`}
                style={{ minHeight: line.type === "blank" ? "0.75rem" : undefined }}
              >
                {line.text}
              </motion.div>
            ))}
            {phase === "output" && (
              <div className="mt-1 flex">
                <span className="inline-block w-2 h-4 bg-zinc-300 animate-pulse" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalCard;
