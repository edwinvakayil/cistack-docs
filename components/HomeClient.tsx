import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Check,
  Globe,
  Package,
  Shield,
  Terminal,
} from "lucide-react";

import CopyButton from "@/components/CopyButton";
import InstallToggle from "@/components/InstallToggle";
import MotionReveal from "@/components/MotionReveal";
import TerminalCard from "@/components/TerminalCard";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/dictionary-types";

interface GithubIconProps {
  size?: number;
  className?: string;
}

interface RegistryPackageResponse {
  version?: string;
}

interface DownloadStatsResponse {
  downloads?: number;
}

const localeOptions = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "br", label: "BR (Brasil)" },
  { code: "de", label: "Deutsch" },
  { code: "cn", label: "简体中文" },
] as const;

const detectionPanels = [
  {
    id: "p1",
    idx: "S_01",
    name: "Firebase",
    signal: "firebase.json, firebase-tools dep",
    description:
      "Automatic Firebase Hosting detection with automated multi-project branch logic.",
    Icon: Package,
  },
  {
    id: "p2",
    idx: "S_02",
    name: "Vercel",
    signal: "vercel.json, .vercel dir, vercel dep",
    description:
      "Vercel deploy-gate generation with branch-aware environment provisioning.",
    Icon: Shield,
  },
  {
    id: "p3",
    idx: "S_03",
    name: "Netlify",
    signal: "netlify.toml, _redirects, netlify-cli dep",
    description:
      "Netlify edge detection with custom header and redirect validation.",
    Icon: Terminal,
  },
  {
    id: "p4",
    idx: "S_04",
    name: "GitHub Pages",
    signal: "gh-pages dep, github.io package.json",
    description:
      "Static site hosting recognition for the native GitHub Pages deployment service.",
    Icon: Globe,
  },
  {
    id: "p5",
    idx: "S_05",
    name: "AWS Cloud",
    signal: "serverless.yml, appspec.yml, cdk.json, aws-sdk dep",
    description:
      "Infrastructure-as-Code (IaC) recognition for AWS CDK, EC2, and Serverless.",
    Icon: Box,
  },
  {
    id: "p6",
    idx: "S_06",
    name: "GCP App Engine",
    signal: "app.yaml",
    description:
      "Automated deployment scanning for Google Cloud Platform App Engine targets.",
    Icon: Globe,
  },
  {
    id: "p7",
    idx: "S_07",
    name: "Azure",
    signal: "azure/pipelines.yml, @azure/* deps",
    description:
      "Azure App Service and native Azure pipeline definition identification.",
    Icon: Package,
  },
  {
    id: "p8",
    idx: "S_08",
    name: "Heroku",
    signal: "Procfile, heroku.yml",
    description:
      "Classic PaaS deployment via Heroku registry and git push logic.",
    Icon: Box,
  },
  {
    id: "p9",
    idx: "S_09",
    name: "Render / Railway",
    signal: "render.yaml, railway.json, railway.toml",
    description:
      "Modern PaaS detection utilizing automated app service descriptors.",
    Icon: Terminal,
  },
  {
    id: "p10",
    idx: "S_10",
    name: "Docker",
    signal: "Dockerfile, docker-compose.yml",
    description:
      "Containerization recognition with Buildx layer caching and GHCR authentication.",
    Icon: Box,
  },
] as const;

const frameworkCoverage = [
  "Next.js",
  "Nuxt",
  "SvelteKit",
  "Remix",
  "Astro",
  "Vite",
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Gatsby",
  "Express",
  "Fastify",
  "NestJS",
  "Hono",
  "Koa",
  "tRPC",
  "Django",
  "Flask",
  "FastAPI",
  "Ruby on Rails",
  "Spring Boot",
  "Laravel",
  "Go (gin)",
  "Rust (Cargo)",
] as const;

const testingTools = [
  "Jest",
  "Vitest",
  "Mocha",
  "Cypress",
  "Playwright",
  "Pytest",
  "RSpec",
  "Go Test",
  "Cargo Test",
  "PHPUnit",
  "JUnit/Maven",
  "Storybook",
] as const;

const exampleStacks = [
  {
    name: "Next.js + Vercel",
    description: "ci.yml (lint, test, build), deploy.yml (vercel deploy), security.yml",
  },
  {
    name: "React + Firebase",
    description:
      "ci.yml, deploy.yml (firebase deploy --only hosting), security.yml",
  },
  {
    name: "Node.js API + Docker",
    description: "ci.yml, docker.yml (GHCR push), security.yml",
  },
] as const;

const defaultPackageStats = {
  version: "3.0.0",
  downloads: "2.4k",
};

const packageFetchOptions = {
  next: { revalidate: 43200 },
} as const;

const GithubIcon = ({ size = 24, className = "" }: GithubIconProps) => (
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
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
  </svg>
);

async function getPackageStats() {
  let version = defaultPackageStats.version;
  let downloads = defaultPackageStats.downloads;

  const [registryResult, downloadsResult] = await Promise.allSettled([
    fetch("https://registry.npmjs.org/cistack/latest", packageFetchOptions),
    fetch(
      "https://api.npmjs.org/downloads/point/last-week/cistack",
      packageFetchOptions
    ),
  ]);

  if (registryResult.status === "fulfilled" && registryResult.value.ok) {
    const registryData =
      (await registryResult.value.json()) as RegistryPackageResponse;

    if (registryData.version) {
      version = registryData.version;
    }
  }

  if (downloadsResult.status === "fulfilled" && downloadsResult.value.ok) {
    const downloadsData =
      (await downloadsResult.value.json()) as DownloadStatsResponse;

    if (typeof downloadsData.downloads === "number") {
      downloads =
        downloadsData.downloads >= 1000
          ? `${(downloadsData.downloads / 1000).toFixed(1)}k`
          : downloadsData.downloads.toLocaleString();
    }
  }

  return { version, downloads };
}

export default async function HomeClient({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const { version, downloads } = await getPackageStats();
  const now = new Date();
  const manifestStamp = `${now.getFullYear()}_${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  const currentYear = now.getFullYear();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "cistack",
    operatingSystem: "Any",
    applicationCategory: "DeveloperApplication",
    softwareVersion: version,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    description: dict.hero.description,
    creator: {
      "@type": "Person",
      name: "Edwin Vakayil",
      url: "https://www.edwinvakayil.info/",
    },
    featureList: Object.values(dict.docs.capabilities).map(
      (capability) => capability.label
    ),
    keywords:
      "github actions, automation, ci/cd, devops, workflow generator, nextjs, docker, vercel, aws, firebase",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div
        className="page-root relative flex min-h-screen flex-col overflow-x-hidden bg-white text-zinc-900 selection:bg-black selection:text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        <MotionReveal
          as="nav"
          immediate
          initialY={-10}
          duration={0.8}
          className="relative z-50 mx-auto w-full max-w-[1400px] bg-white/80 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 border-x border-b border-zinc-100 md:grid-cols-12">
            <div className="flex items-center gap-3 border-b border-zinc-100 p-5 md:col-span-3 md:border-r md:border-b-0 md:p-6">
              <div className="flex items-center gap-2 text-[20px] font-bold tracking-tighter text-zinc-950">
                <Terminal size={18} className="text-zinc-400" />
                cistack
              </div>
              <span className="rounded-sm border border-zinc-100 bg-zinc-50 px-1.5 py-0.5 font-mono text-[9px] font-bold text-zinc-300">
                V{version}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-100 p-5 md:col-span-6 md:border-r md:border-b-0 md:p-6">
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-black leading-none tracking-[0.2em] text-zinc-400 uppercase">
                    {dict.navigation.version}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold tracking-tighter text-zinc-600 uppercase">
                      {dict.navigation.status}
                    </span>
                  </div>
                </div>
                <div className="mx-2 hidden h-6 w-px bg-zinc-100 lg:block" />
                <div className="hidden items-center gap-6 text-[12px] font-bold text-zinc-400 lg:flex">
                  <a
                    href="https://github.com/edwinvakayil/cistack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 tracking-widest uppercase transition-colors hover:text-zinc-950"
                  >
                    <GithubIcon
                      size={14}
                      className="opacity-40 transition-opacity group-hover:opacity-100"
                    />
                    {dict.navigation.repository}
                  </a>
                  <a
                    href="https://www.npmjs.com/package/cistack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 tracking-widest uppercase transition-colors hover:text-zinc-950"
                  >
                    <Package
                      size={14}
                      className="opacity-40 transition-opacity group-hover:opacity-100"
                    />
                    {dict.navigation.registry}
                  </a>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <Link
                  href="/en"
                  className={`rounded-sm border px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                    lang === "en"
                      ? "border-zinc-950 bg-zinc-950 text-white"
                      : "border-transparent text-zinc-400 hover:border-zinc-100 hover:text-zinc-950"
                  }`}
                >
                  EN
                </Link>

                {lang !== "en" && (
                  <>
                    <div className="mx-0.5 h-3 w-px bg-zinc-100" />
                    <Link
                      href={`/${lang}`}
                      className="rounded-sm border border-zinc-950 bg-zinc-950 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase"
                    >
                      {lang.toUpperCase()}
                    </Link>
                  </>
                )}

                <div className="group/lang relative ml-1 border-l border-zinc-100 pl-2">
                  <Globe
                    size={13}
                    className="cursor-pointer text-zinc-300 transition-colors group-hover/lang:text-zinc-950"
                  />
                  <div className="invisible absolute top-full right-0 z-[100] mt-2 flex w-24 flex-col gap-1 rounded-sm border border-zinc-100 bg-white p-1 opacity-0 shadow-xl transition-all group-hover/lang:visible group-hover/lang:opacity-100">
                    {localeOptions.map((locale) => (
                      <Link
                        key={locale.code}
                        href={`/${locale.code}`}
                        className="rounded-sm p-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase transition-colors hover:bg-zinc-50 hover:text-zinc-950"
                      >
                        {locale.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 bg-zinc-50/20 p-5 md:col-span-3 md:justify-end md:p-6">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-zinc-300 uppercase">
                {`${dict.navigation.core_manifest} // ${manifestStamp}`}
              </span>
              <a
                href="#docs"
                className="rounded-sm border border-zinc-900 px-4 py-2 text-[11px] font-black tracking-widest text-zinc-900 uppercase transition-all hover:bg-zinc-950 hover:text-white"
              >
                {dict.navigation.docs}
              </a>
            </div>
          </div>
        </MotionReveal>

        <main className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pt-6 sm:px-6 md:px-8 lg:pt-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 -mt-40 h-[600px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <div className="relative grid grid-cols-1 border-t border-l border-zinc-100 bg-white/40 lg:grid-cols-12">
            <div className="group/hero relative overflow-hidden border-r border-b border-zinc-100 p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <div className="absolute top-0 right-0 h-24 w-24 border-t border-r border-zinc-100/60 opacity-0 transition-all duration-700 group-hover/hero:opacity-100" />

              <MotionReveal
                initialY={15}
                duration={0.6}
                className="relative z-10 flex flex-col gap-8"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="rounded-sm border-zinc-200 bg-white px-2 py-0.5 text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase"
                  >
                    VERSION_{version}
                  </Badge>
                  <div className="h-px w-12 bg-zinc-100" />
                  <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
                    {dict.hero.scan_identity}
                  </span>
                </div>

                <div className="flex flex-col gap-8 md:gap-8">
                  <div className="group/h1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="font-mono text-[10px] font-bold text-zinc-300 transition-colors sm:text-zinc-200 md:text-[12px] group-hover/h1:text-zinc-400">
                      {dict.hero.s1_label}
                    </span>
                    <h1 className="break-words text-[2.2rem] leading-[0.9] font-[1000] tracking-tighter text-black min-[400px]:text-[2.5rem] sm:leading-none md:text-[3.8rem]">
                      {dict.hero.s1_title}
                    </h1>
                  </div>

                  <div className="group/h2 flex flex-col gap-1 sm:ml-6 sm:flex-row sm:items-baseline sm:gap-4 md:ml-12">
                    <span className="font-mono text-[10px] font-bold text-zinc-300 transition-colors sm:text-zinc-200 md:text-[12px] group-hover/h2:text-zinc-400">
                      {dict.hero.s2_label}
                    </span>
                    <h2 className="break-words text-[2.2rem] leading-[0.9] font-[1000] tracking-tighter text-black min-[400px]:text-[2.5rem] sm:leading-none md:text-[3.8rem]">
                      {dict.hero.s2_title}
                    </h2>
                  </div>

                  <div className="group/h3 flex flex-col gap-1 sm:ml-12 sm:flex-row sm:items-baseline sm:gap-4 md:ml-24">
                    <span className="font-mono text-[10px] font-bold text-zinc-300 transition-colors sm:text-zinc-200 md:text-[12px] group-hover/h3:text-zinc-400">
                      {dict.hero.s3_label}
                    </span>
                    <h2 className="break-words text-[2.2rem] leading-[0.9] font-[1000] tracking-tighter text-zinc-500 min-[400px]:text-[2.5rem] sm:text-zinc-400 sm:leading-none md:text-[3.8rem]">
                      {dict.hero.s3_title}
                    </h2>
                  </div>
                </div>

                <p className="max-w-[540px] text-xs leading-relaxed font-medium text-zinc-500 sm:text-sm">
                  {dict.hero.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-6">
                  <CopyButton text={dict.hero.npx_command} />

                  <div className="flex flex-col gap-1 border-l-2 border-zinc-100 px-2">
                    <span className="text-[10px] font-black tracking-widest text-zinc-300 uppercase">
                      {dict.hero.active_installs}
                    </span>
                    <span className="text-[14px] font-bold tracking-tight text-zinc-900">
                      {downloads} {dict.hero.per_week}
                    </span>
                  </div>
                </div>
              </MotionReveal>
            </div>

            <div className="flex flex-col border-r border-b border-zinc-100 lg:col-span-5">
              <div className="group/runtime group-hover/hero:bg-zinc-50/40 relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-50/20 p-8 transition-colors duration-700 sm:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.2]" />

                <MotionReveal
                  initialScale={0.98}
                  duration={0.8}
                  delay={0.1}
                  className="relative z-20 w-full overflow-hidden rounded-sm"
                >
                  <TerminalCard dict={dict.terminal} version={version} />
                </MotionReveal>

                <div className="absolute top-6 right-8 hidden items-center gap-2 sm:flex">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span className="font-mono text-[9px] font-black tracking-widest text-zinc-400 uppercase">
                    {dict.hero.realtime_synth}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-zinc-100 bg-white">
                <div className="group/meta flex cursor-default flex-col gap-2 border-r border-zinc-100 p-8 transition-colors hover:bg-zinc-50/50">
                  <span className="text-[9px] font-black tracking-[0.2em] text-zinc-300 uppercase transition-colors group-hover/meta:text-zinc-500">
                    {dict.hero.integrations}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] leading-none font-black text-zinc-900">
                      30+
                    </span>
                    <span className="text-[11px] font-bold tracking-tighter text-zinc-400 uppercase">
                      {dict.hero.stack_aware}
                    </span>
                  </div>
                </div>
                <div className="group/meta flex cursor-default flex-col gap-2 bg-zinc-50/30 p-8 transition-colors hover:bg-zinc-50/60">
                  <span className="text-[9px] font-black tracking-[0.2em] text-zinc-300 uppercase transition-colors group-hover/meta:text-zinc-500">
                    {dict.hero.success_rate}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[20px] leading-none font-black tracking-tighter text-emerald-600">
                      99.9%
                    </span>
                    <Check size={14} className="text-emerald-500/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section
          id="docs"
          className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-24 pb-40 sm:px-6 md:px-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.4]" />

          <div className="mb-16 flex max-w-[900px] flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="rounded-sm border-zinc-200 bg-white px-3 py-1 text-[10px] font-black tracking-[0.2em] text-zinc-600 uppercase"
              >
                {dict.docs.badge}
                {version}
              </Badge>
              <div className="h-px flex-1 bg-zinc-200/60" />
            </div>
            <h2 className="text-[36px] leading-[1.1] font-bold tracking-tight text-zinc-900 sm:text-[44px]">
              {dict.docs.title_part1}
              <br />
              {dict.docs.title_part2}
            </h2>
            <p className="max-w-[760px] text-xs leading-relaxed font-medium text-zinc-500 sm:text-sm">
              {dict.docs.description}
            </p>
          </div>

          <MotionReveal
            initialY={20}
            duration={0.8}
            className="grid grid-cols-1 border-t border-l border-zinc-100 lg:grid-cols-12"
          >
            <div className="group/cell relative border-r border-b border-zinc-100 bg-zinc-50/20 p-8 transition-colors duration-500 hover:bg-zinc-50/40 lg:col-span-4 lg:p-12">
              <div className="absolute top-4 right-4 font-mono text-[10px] font-bold text-zinc-200 transition-colors group-hover/cell:text-zinc-300">
                {dict.docs.section1_id}
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black tracking-[0.18em] text-zinc-400 uppercase">
                    {dict.docs.section1_num}
                  </span>
                  <h3 className="text-[18px] font-bold text-zinc-900">
                    {dict.docs.section1_title}
                  </h3>
                </div>
                <div className="flex flex-col divide-y divide-zinc-200/40">
                  {Object.values(dict.docs.capabilities).map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0"
                    >
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-zinc-200 bg-zinc-900 text-white">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[14px] leading-tight font-semibold text-zinc-800">
                          {item.label}
                        </span>
                        <span className="mt-0.5 text-[12px] leading-snug text-zinc-400">
                          {item.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:col-span-8">
              <div className="border-r border-b border-zinc-100 p-8 lg:p-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black tracking-[0.18em] text-zinc-400 uppercase">
                        {dict.docs.section2_num}
                      </span>
                      <h3 className="text-[18px] font-bold text-zinc-900">
                        {dict.docs.section2_title}
                      </h3>
                    </div>

                    <InstallToggle dict={dict} />

                    <div className="mt-2 flex flex-col gap-3">
                      <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                        {dict.docs.command_registry}
                      </span>
                      <div className="flex flex-col gap-2">
                        {[
                          { command: "audit", description: dict.docs.commands.audit },
                          { command: "upgrade", description: dict.docs.commands.upgrade },
                          { command: "init", description: dict.docs.commands.init },
                        ].map((command) => (
                          <div
                            key={command.command}
                            className="group flex items-center justify-between rounded-sm border border-zinc-100 bg-zinc-50/50 px-3 py-2 transition-colors hover:border-zinc-200"
                          >
                            <code className="text-[11px] font-extrabold text-zinc-800">
                              npx cistack {command.command}
                            </code>
                            <span className="text-[10px] font-medium text-zinc-400">
                              {command.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[13px] italic text-zinc-400">
                      {dict.docs.recommended_npx}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                        {dict.docs.parameters_manifest}
                      </span>
                      <div className="h-px flex-1 bg-zinc-200 opacity-60" />
                    </div>

                    <div className="flex flex-col divide-y divide-zinc-100 border-y border-zinc-200 bg-white/40">
                      {[
                        { flag: "--explain", type: "boolean", description: dict.docs.flags.explain },
                        { flag: "--path", type: "string", description: dict.docs.flags.path },
                        { flag: "--output", type: "string", description: dict.docs.flags.output },
                        { flag: "--dry-run", type: "boolean", description: dict.docs.flags.dry_run },
                        { flag: "--no-prompt", type: "boolean", description: dict.docs.flags.no_prompt },
                        { flag: "--verbose", type: "boolean", description: dict.docs.flags.verbose },
                        { flag: "--force", type: "boolean", description: dict.docs.flags.force },
                      ].map((flag) => (
                        <div
                          key={flag.flag}
                          className="group flex flex-col px-2 py-3 transition-colors hover:bg-zinc-50/80 md:flex-row md:items-center"
                        >
                          <div className="flex shrink-0 items-center gap-3 md:w-[150px]">
                            <div className="h-[12px] w-[3px] bg-zinc-200 transition-colors group-hover:bg-emerald-500" />
                            <code className="font-mono text-[11px] font-bold tracking-tight text-zinc-800">
                              {flag.flag}
                            </code>
                          </div>
                          <div className="mt-2 flex flex-1 flex-row items-center gap-4 pl-[15px] md:mt-0 md:pl-0">
                            <span className="rounded-sm bg-zinc-100 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
                              {flag.type}
                            </span>
                            <span className="text-[11px] font-medium text-zinc-500">
                              {flag.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid flex-1 grid-cols-1 border-r border-b border-zinc-100 md:grid-cols-2">
                <div className="border-b border-zinc-100 p-8 md:border-r md:border-b-0 lg:p-12">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[14px] font-bold tracking-widest text-zinc-900 uppercase">
                        {dict.docs.detection_logic_title}
                      </h4>
                      <p className="text-[13px] leading-relaxed font-medium text-zinc-400">
                        {dict.docs.detection_logic_desc}
                      </p>
                    </div>

                    <div className="max-h-[250px] w-full overflow-y-auto overflow-x-hidden pr-3 sm:max-h-[265px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-200 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
                      <div className="w-full">
                        {detectionPanels.map((panel) => (
                          <details
                            key={panel.id}
                            className="group border-b border-zinc-100 last:border-0"
                          >
                            <summary className="list-none cursor-pointer py-4 text-zinc-500 transition-colors hover:text-zinc-900 sm:py-5 [&::-webkit-details-marker]:hidden">
                              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 overflow-hidden text-start sm:gap-2">
                                <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                                  <span className="w-[24px] shrink-0 font-mono text-[10px] font-bold text-zinc-300 transition-colors group-hover:text-zinc-500">
                                    {panel.idx}
                                  </span>
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <panel.Icon
                                      size={14}
                                      className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-900"
                                    />
                                    <span className="text-[15px] font-semibold whitespace-nowrap sm:text-[16px]">
                                      {panel.name}
                                    </span>
                                  </div>
                                  <span className="ml-auto text-[10px] font-black tracking-[0.2em] text-zinc-300 uppercase">
                                    OPEN
                                  </span>
                                </div>
                                <div className="flex w-full justify-start overflow-hidden ps-[36px] sm:ps-[44px]">
                                  <Badge
                                    variant="outline"
                                    className="max-w-full truncate rounded-sm border-zinc-200 bg-zinc-50/50 text-[9px] font-mono font-normal tracking-tight opacity-60 sm:text-[10px]"
                                  >
                                    {panel.signal}
                                  </Badge>
                                </div>
                              </div>
                            </summary>
                            <div className="pb-6">
                              <div className="ms-[18px] border-s-2 border-zinc-200 bg-zinc-50/30 py-4 ps-6">
                                <p className="max-w-[440px] text-[15px] leading-relaxed text-zinc-500">
                                  {panel.description}
                                </p>
                                <div className="mt-4 flex items-center gap-2">
                                  <span className="text-[9px] font-bold tracking-widest text-zinc-300 uppercase">
                                    {dict.docs.signal_source}
                                  </span>
                                  <code className="rounded-sm border border-zinc-100 bg-white px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                                    {panel.signal}
                                  </code>
                                </div>
                              </div>
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-10 bg-zinc-50/20 p-8 lg:p-12">
                  <div className="flex flex-col gap-6">
                    <h4 className="text-[14px] font-bold tracking-wider text-zinc-900 uppercase">
                      {dict.docs.framework_coverage}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {frameworkCoverage.map((framework) => (
                        <Badge
                          key={framework}
                          variant="outline"
                          className="rounded-sm border-zinc-100 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-500"
                        >
                          {framework}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h4 className="text-[14px] font-bold tracking-wider text-zinc-900 uppercase">
                      {dict.docs.testing_tools}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {testingTools.map((tool) => (
                        <Badge
                          key={tool}
                          variant="secondary"
                          className="rounded-sm border-transparent bg-zinc-100/50 px-2 py-0.5 text-[11px] font-bold text-zinc-500"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal
            initialY={20}
            duration={0.8}
            delay={0.1}
            className="grid grid-cols-1 border-e border-b border-s border-zinc-100 lg:grid-cols-12"
          >
            <div className="group/artifacts border-e border-zinc-100 p-8 transition-colors duration-500 hover:bg-zinc-50/20 lg:col-span-8 lg:p-12">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-[0.18em] text-zinc-400 uppercase">
                      {dict.docs.section3_num}
                    </span>
                    <Terminal
                      size={14}
                      className="text-zinc-200 transition-colors group-hover/artifacts:text-zinc-300"
                    />
                  </div>
                  <h3 className="text-[18px] font-bold text-zinc-900">
                    {dict.docs.section3_title}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
                  {[
                    {
                      file: "ci.yml",
                      label: dict.docs.workflows.ci.label,
                      description: dict.docs.workflows.ci.desc,
                    },
                    {
                      file: "deploy.yml",
                      label: dict.docs.workflows.deploy.label,
                      description: dict.docs.workflows.deploy.desc,
                    },
                    {
                      file: "docker.yml",
                      label: dict.docs.workflows.docker.label,
                      description: dict.docs.workflows.docker.desc,
                    },
                    {
                      file: "security.yml",
                      label: dict.docs.workflows.security.label,
                      description: dict.docs.workflows.security.desc,
                    },
                  ].map((workflow) => (
                    <div
                      key={workflow.file}
                      className="group/item flex flex-col gap-3"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <code className="rounded-sm border border-zinc-100 px-2.5 py-1 text-[14px] leading-none font-black text-zinc-800 transition-colors group-hover/item:border-zinc-200">
                            {workflow.file}
                          </code>
                          <div className="h-px flex-1 bg-zinc-100 transition-colors group-hover/item:bg-zinc-200" />
                        </div>
                        <span className="text-[11px] font-bold tracking-tight text-zinc-400 uppercase">
                          {workflow.label}
                        </span>
                      </div>
                      <p className="text-[14px] leading-relaxed text-zinc-500 transition-colors group-hover/item:text-zinc-600">
                        {workflow.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:col-span-4">
              <div className="group relative flex-1 overflow-hidden bg-zinc-950 p-8 text-white lg:p-12">
                <div className="absolute top-0 end-0 -mt-32 -me-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
                <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black tracking-[0.18em] text-zinc-500 uppercase">
                      {dict.docs.security_requirement}
                    </span>
                    <h4 className="text-[18px] font-bold">
                      {dict.docs.encrypted_secrets}
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      "VERCEL_TOKEN",
                      "AWS_ACCESS_KEY",
                      "FIREBASE_TOKEN",
                      "GHCR_TOKEN",
                    ].map((token) => (
                      <div
                        key={token}
                        className="group/token flex items-center justify-between border-b border-white/5 py-3 last:border-0"
                      >
                        <code className="font-mono text-[13px] text-zinc-400 transition-colors group-hover/token:text-white">
                          {token}
                        </code>
                        <Shield
                          size={12}
                          className="text-zinc-700 transition-colors group-hover/token:text-emerald-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="border-l-2 border-emerald-500/30 pl-4 py-2 text-[13px] italic leading-relaxed text-zinc-500">
                      {dict.docs.add_secrets_at}
                      <br />
                      <span className="font-bold not-italic tracking-tight text-zinc-300">
                        Settings -&gt; Secrets and variables -&gt; Actions
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal
            initialScale={0.995}
            duration={0.8}
            delay={0.2}
            className="grid grid-cols-1 border-r border-b border-l border-zinc-100 bg-zinc-50/10 lg:grid-cols-12"
          >
            <div className="p-8 lg:col-span-12 lg:p-12">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black tracking-[0.18em] text-zinc-400 uppercase">
                    {dict.docs.section4_num}
                  </span>
                  <h3 className="text-[18px] font-bold text-zinc-900">
                    {dict.docs.section4_title}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {exampleStacks.map((example) => (
                    <div
                      key={example.name}
                      className="flex cursor-default flex-col gap-3 rounded-sm border border-zinc-200/60 bg-white p-6 transition-all hover:shadow-xl hover:shadow-zinc-200/40"
                    >
                      <span className="text-[14px] font-black text-zinc-900">
                        {example.name}
                      </span>
                      <p className="text-[13px] leading-relaxed font-medium text-zinc-500">
                        {example.description}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                          {dict.docs.validated_output}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>

        <MotionReveal
          as="footer"
          initialY={0}
          duration={1.2}
          className="relative z-20 border-t border-zinc-100 bg-white"
        >
          <div className="mx-auto max-w-[1400px] border-r border-l border-zinc-100">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="flex flex-col gap-6 border-b border-zinc-100 p-8 md:col-span-4 md:border-r md:border-b-0">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                    {dict.footer.project_origin}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-bold tracking-tighter text-zinc-900">
                      cistack
                    </span>
                    <span className="rounded-sm border border-zinc-100 bg-zinc-50 px-1.5 py-0.5 font-mono text-[9px] font-bold text-zinc-300">
                      {`V_${version} // PRODUCTION`}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                    {dict.footer.architected_by}
                  </span>
                  <a
                    href="https://www.edwinvakayil.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[14px] font-bold text-zinc-600 transition-colors hover:text-zinc-900"
                  >
                    Edwin Vakayil
                    <ArrowUpRight
                      size={12}
                      className="text-zinc-300 transition-colors group-hover:text-zinc-900"
                    />
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-8 border-b border-zinc-100 p-8 md:col-span-5 md:border-r md:border-b-0">
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                      {dict.footer.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      <span className="text-[12px] font-bold text-zinc-700">
                        {dict.footer.operational}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                      {dict.footer.license}
                    </span>
                    <span className="text-[12px] font-bold text-zinc-700 uppercase">
                      {dict.footer.open_source}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed font-medium text-zinc-400">
                  {dict.footer.footer_desc}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center gap-3 bg-zinc-50/30 p-8 md:col-span-3 md:items-end">
                <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
                  {dict.footer.global_install}
                </span>
                <code className="cursor-default rounded-sm border border-zinc-100 bg-white px-3 py-1.5 font-mono text-[13px] font-bold text-zinc-800 transition-colors">
                  npm install -g cistack
                </code>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-100 p-4 px-8 sm:flex-row">
              <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
                {`© ${currentYear} ${dict.footer.copyright}`}
              </span>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/edwinvakayil/cistack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black tracking-widest text-zinc-400 uppercase transition-colors hover:text-zinc-900"
                >
                  Github
                </a>
                <a
                  href="https://www.npmjs.com/package/cistack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black tracking-widest text-zinc-400 uppercase transition-colors hover:text-zinc-900"
                >
                  Npm
                </a>
                <a
                  href="#docs"
                  className="text-[10px] font-black tracking-widest text-zinc-400 uppercase transition-colors hover:text-zinc-900"
                >
                  {dict.navigation.docs}
                </a>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </>
  );
}
