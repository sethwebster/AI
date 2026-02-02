"use client"

import { motion } from "framer-motion"
import { Download, FolderSync, Sparkles } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Install",
    description: "Run a single command to download and install all five agents to your machine.",
    icon: Download,
    code: "curl -fsSL ... | bash",
  },
  {
    number: "02",
    title: "Sync",
    description: "Agents are version-controlled and auto-update. Your CLAUDE.md stays current with upstream improvements.",
    icon: FolderSync,
    code: "ai update",
  },
  {
    number: "03",
    title: "Build",
    description: "Claude Code and Codex automatically load the right agent based on your task. Just prompt normally.",
    icon: Sparkles,
    code: 'claude "review this PR"',
  },
]

const benefits = [
  {
    title: "One-command setup",
    description: "No configuration, no dependency management, no breaking changes.",
  },
  {
    title: "Version controlled",
    description: "Git-friendly agents that evolve with best practices.",
  },
  {
    title: "Automatic migrations",
    description: "Updates preserve your customizations while adding new capabilities.",
  },
  {
    title: "Works everywhere",
    description: "Same agents across all your projects and machines.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-950 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Up and running in 30 seconds
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            No complex setup. No vendor lock-in. Just better AI assistance.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-zinc-700 to-zinc-800" />
              )}

              <div className="text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 mb-4">
                  <step.icon className="w-7 h-7 text-cyan-400" />
                </div>

                {/* Number */}
                <p className="text-xs font-mono text-zinc-600 mb-2">{step.number}</p>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm mb-4">{step.description}</p>

                {/* Code snippet */}
                <code className="inline-block px-3 py-1.5 rounded-md bg-black/50 border border-zinc-800 text-xs text-zinc-400 font-mono">
                  {step.code}
                </code>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50"
            >
              <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
              <p className="text-sm text-zinc-500">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
