"use client";

<<<<<<< HEAD
import dynamic from "next/dynamic";
import { useMemo } from "react";

=======
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Check, RefreshCcw } from "lucide-react";
>>>>>>> parent of 0e9f037 (ci)
import type { Dictionary } from "@/lib/dictionary-types";

function TerminalCardFallback({ version, dict }: { version: string; dict: Dictionary["terminal"] }) {
  return (
    <div className="flex h-[300px] w-full flex-col rounded-sm border border-zinc-200 bg-white sm:h-[350px] lg:h-[380px]">
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" />
            <span className="text-[12px] font-bold tracking-[0.14em] text-zinc-600 uppercase">
              {dict.processing || "Processing Output..."}
            </span>
          </div>
        </div>
        <div className="rounded-sm border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[13px] font-bold tracking-tight text-zinc-800">
          npx cistack
        </div>
      </div>

<<<<<<< HEAD
      <div
        className="flex-1 bg-white p-6 pt-4 font-mono text-[12px] leading-relaxed tracking-tight text-zinc-700 sm:text-[13px]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="font-bold text-zinc-600">$</span>
          <span className="font-bold text-zinc-900">npx cistack</span>
          <span className="inline-block h-4 w-1.5 animate-pulse bg-emerald-600" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-zinc-900">cistack v{version}</div>
          <div>Project scanned</div>
          <div>Stack detected</div>
          <div>Detected Stack: Next.js, React, TypeScript</div>
        </div>
      </div>
    </div>
  );
}

export default function TerminalCard({
  dict,
  version,
}: {
  dict: Dictionary["terminal"];
  version: string;
}) {
  const TerminalCardMotion = useMemo(
    () =>
      dynamic(() => import("@/components/TerminalCardMotion"), {
        ssr: false,
        loading: () => <TerminalCardFallback version={version} dict={dict} />,
      }),
    [version]
  );

  return <TerminalCardMotion dict={dict} version={version} />;
}
=======
interface RegistryPackageResponse {
  version?: string;
}

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

const TerminalCard = ({ dict }: { dict: Dictionary["terminal"] }) => {
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [phase, setPhase] = useState<"typing" | "output" | "done">("typing");
  const [key, setKey] = useState(0);
  const [version, setVersion] = useState("3.0.0");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const loadVersion = async () => {
      try {
        const response = await fetch("https://registry.npmjs.org/cistack/latest");
        const data = (await response.json()) as RegistryPackageResponse;

        if (!cancelled && data.version) {
          setVersion(data.version);
        }
      } catch (error) {
        console.error("Error fetching version:", error);
      }
    };

    void loadVersion();

    return () => {
      cancelled = true;
    };
  }, []);

  const OUTPUT_LINES = useMemo((): OutputLine[] => {
    if (!dict) return [];
    
    return [
      { text: `  cistack v${version}`, type: "heading", delay: 100 },
      { text: "  " + "─".repeat(24), type: "detail", delay: 200 },
      { text: "", type: "blank", delay: 250 },
      { text: dict.project_scanned || "✔ Project scanned", type: "success", delay: 500 },
      { text: dict.stack_detected || "✔ Stack detected", type: "success", delay: 800 },
      { text: "", type: "blank", delay: 850 },
      { text: "  " + (dict.detected_stack || "Detected Stack"), type: "heading", delay: 1000 },
      { text: "  " + "─".repeat(48), type: "detail", delay: 1100 },
      { text: `  ${dict.languages || "Languages:"}           TypeScript`, type: "info", delay: 1300 },
      { text: `  ${dict.frameworks || "Frameworks:"}          Next.js, React`, type: "info", delay: 1450 },
      { text: `  ${dict.hosting || "Hosting:"}             Vercel`, type: "info", delay: 1600 },
      { text: `  ${dict.testing || "Testing:"}             none`, type: "info", delay: 1750 },
      { text: `  ${dict.release_tool || "Release tool:"}        none`, type: "info", delay: 1900 },
      { text: "", type: "blank", delay: 1950 },
      { text: dict.look_correct || "? Does this look correct? Generate pipeline with these settings? Yes", type: "detail", delay: 2200 },
      { text: dict.generated_workflows || "✔ Generated 3 CI workflow(s)", type: "success", delay: 2600 },
      { text: `  ${dict.smart_merged || "↻ Smart-merged: ci.yml"}`, type: "merged", delay: 2800 },
      { text: `    • ${dict.updated_on || "updated top-level \"on\""}`, type: "bullet", delay: 2900 },
      { text: `    • ${dict.updated_concurrency || "updated top-level \"concurrency\""}`, type: "bullet", delay: 2950 },
      { text: `    • ${dict.added_lint || "added job \"lint\""}`, type: "bullet", delay: 3000 },
      { text: `    •   ${dict.updated_build || "job \"build\" → updated \"name\""}`, type: "bullet", delay: 3050 },
      { text: `    •   ${dict.updated_needs || "job \"build\" → updated \"needs\""}`, type: "bullet", delay: 3100 },
      { text: `    •   ${dict.added_checkout || "job \"build\" → added step \"Checkout code\""}`, type: "bullet", delay: 3150 },
      { text: `    •   ${dict.added_node || "job \"build\" → added step \"Set up Node.js\""}`, type: "bullet", delay: 3200 },
      { text: `    •   ${dict.updated_step_build || "job \"build\" → updated step \"Build\""}`, type: "bullet", delay: 3250 },
      { text: `    •   ${dict.added_upload || "job \"build\" → added step \"Upload build artifact\""}`, type: "bullet", delay: 3300 },
      { text: `  ✔ ${dict.written_deploy || "Written:      deploy.yml"}`, type: "written", delay: 3500 },
      { text: `  ✔ ${dict.written_security || "Written:      security.yml"}`, type: "written", delay: 3650 },
      { text: `  ✔ ${dict.written_dependabot || "Written:      .github/dependabot.yml"}`, type: "written", delay: 3800 },
      { text: "", type: "blank", delay: 3850 },
      { text: `  ${dict.done_msg || "Done! Your GitHub Actions pipeline is ready."}`, type: "done", delay: 4100 },
      { text: `   ${dict.workflows_path || "Workflows → cistack/.github/workflows"}`, type: "path", delay: 4300 },
      { text: `   ${dict.dependabot_path || "Dependabot → cistack/.github/dependabot.yml"}`, type: "path", delay: 4450 },
    ];
  }, [version, dict]);

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
      const timeout = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(timeout);
    }
    const currentDelay = OUTPUT_LINES[visibleLines].delay - (visibleLines > 0 ? OUTPUT_LINES[visibleLines - 1].delay : 0);
    const t = setTimeout(() => setVisibleLines((v) => v + 1), Math.max(currentDelay, 30));
    return () => clearTimeout(t);
  }, [visibleLines, phase, OUTPUT_LINES]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [typedCommand, visibleLines]);

  return (
    <div key={key} className="w-full h-[300px] sm:h-[350px] lg:h-[380px] flex flex-col rounded-sm border border-zinc-100 bg-white">
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
                  <span className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold">{dict.processing || "Processing Output..."}</span>
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
>>>>>>> parent of 0e9f037 (ci)
