"use client"

import { motion } from "framer-motion"
import { Shield, TrendingUp, FileText, BookOpen, Cpu, Layers, Server, Zap, LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  TrendingUp,
  FileText,
  BookOpen,
  Cpu,
  Layers,
  Server,
  Zap,
};

interface Agent {
  slug: string;
  name: string;
  persona: string;
  role: string;
  useCases: string[];
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tagline: string;
}

interface AgentsClientProps {
  agents: Agent[];
}

export function AgentsClient({ agents }: AgentsClientProps) {
  return (
    <section id="agents" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-3"
          >
            Meet the Agents
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Eight specialists. One command.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Each agent brings deep expertise to Claude Code and Codex, transforming generic AI assistance into opinionated, production-ready guidance.
          </motion.p>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agents.map((agent, i) => {
            const IconComponent = ICON_MAP[agent.icon] || Shield;

            return (
              <motion.div
                key={agent.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative rounded-2xl border ${agent.borderColor} ${agent.bgColor} p-6 hover:bg-opacity-20 transition-all duration-300`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Name & Codename */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                  <p className="text-sm text-zinc-500">
                    {agent.persona && <span className="text-zinc-400">{agent.persona}</span>}
                    {agent.persona && " - "}
                    <span className="italic">{agent.tagline}</span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                  {agent.role}
                </p>

                {/* Use Cases */}
                <div className="flex flex-wrap gap-2">
                  {agent.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="px-2 py-1 text-xs rounded-md bg-white/5 text-zinc-400 border border-white/5"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-zinc-500 text-sm mt-12"
        >
          All agents install to <code className="text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">~/.ai-agents/</code> and integrate automatically with Claude Code and Codex.
        </motion.p>
      </div>
    </section>
  )
}
