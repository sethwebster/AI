"use client"

import { motion } from "framer-motion"
import { Terminal } from "@/components/terminal"
import { Github } from "lucide-react"

interface HeroProps {
  version: string
  releaseUrl: string
}

export function Hero({ version, releaseUrl }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-16">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[30%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        {/* Version Badge */}
        <motion.a
          href={releaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 mb-8 hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-green-400 font-mono">{version}</span>
          <span className="text-zinc-500">just shipped</span>
        </motion.a>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4"
        >
          Expert AI Agents for
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500">
            Claude Code & Codex
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-xl mx-auto text-lg md:text-xl text-zinc-400 mb-12"
        >
          One command. Eight specialized agents.
          <br className="hidden sm:block" />
          Better code, faster.
        </motion.p>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Terminal />
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8"
        >
          <a
            href="https://github.com/sethwebster/AI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
