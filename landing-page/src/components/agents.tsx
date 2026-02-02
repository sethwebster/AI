"use client"

import { motion } from "framer-motion"
import { Shield, TrendingUp, FileText, BookOpen, Cpu } from "lucide-react"

const agents = [
  {
    name: "Sentinel",
    codename: "Morgan",
    tagline: "Your code's watchdog",
    description: "Rigorous code review, security analysis, and architecture oversight. Catches issues before they ship.",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    useCases: ["Code review", "Security audits", "Architecture decisions"],
  },
  {
    name: "Conversion Architect",
    codename: "Avery",
    tagline: "Design psychology expert",
    description: "Apple HIG expertise meets conversion optimization. User behavior, growth levers, and commercial UX clarity.",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    useCases: ["Landing pages", "User flows", "Growth design"],
  },
  {
    name: "Docs Engineer",
    codename: "Sam",
    tagline: "Documentation that ships",
    description: "Accurate, clear, and shippable documentation. No fluff, no outdated examples. Just docs developers trust.",
    icon: FileText,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    useCases: ["API docs", "READMEs", "Technical guides"],
  },
  {
    name: "Docs Architect",
    codename: "Emerson",
    tagline: "Narrative-driven documentation",
    description: "Beautiful, award-worthy docs that tell a story. Information architecture that scales with your product.",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    useCases: ["Doc sites", "Tutorials", "Information architecture"],
  },
  {
    name: "Systems Thinker",
    codename: "Jan",
    tagline: "Deep problem solver",
    description: "Multi-layer reasoning for complex challenges. Durable solutions built on first-principles thinking.",
    icon: Cpu,
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    useCases: ["System design", "Complex bugs", "Architecture planning"],
  },
]

export function Agents() {
  return (
    <section id="agents" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-3"
          >
            Meet the Agents
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Five specialists. One command.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Each agent brings deep expertise to Claude Code and Codex, transforming generic AI assistance into opinionated, production-ready guidance.
          </motion.p>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-2xl border ${agent.borderColor} ${agent.bgColor} p-6 hover:bg-opacity-20 transition-all duration-300`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <agent.icon className="w-6 h-6 text-white" />
              </div>

              {/* Name & Codename */}
              <div className="mb-3">
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p className="text-sm text-zinc-500">
                  {agent.codename && <span className="text-zinc-400">{agent.codename}</span>}
                  {agent.codename && " - "}
                  <span className="italic">{agent.tagline}</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                {agent.description}
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
          ))}
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
