
"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Brain, Command, GitBranch, Lock, MessageSquare, Zap } from "lucide-react"

const features = [
  {
    title: "Orchestration Engine",
    description: "Manage complex multi-agent workflows with our DAG-based execution engine.",
    icon: GitBranch,
    className: "md:col-span-2 md:row-span-2",
    color: "from-purple-500/20 to-blue-500/20"
  },
  {
    title: "Semantic Memory",
    description: "Built-in vector store integration for infinite context windows.",
    icon: Brain,
    className: "md:col-span-1 md:row-span-1",
    color: "from-cyan-500/20 to-teal-500/20"
  },
  {
    title: "Tool Protocol",
    description: "Standardized MCP support for connecting to any API or service.",
    icon: Command,
    className: "md:col-span-1 md:row-span-1",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Secure Sandbox",
    description: "Agents run in isolated environments with strict permission controls.",
    icon: Lock,
    className: "md:col-span-1 md:row-span-1",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Real-time Collaboration",
    description: "Watch agents think and act in real-time with our WebSocket stream.",
    icon: MessageSquare,
    className: "md:col-span-1 md:row-span-1",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    title: "Lightning Fast",
    description: "Written in Rust for sub-millisecond overhead.",
    icon: Zap,
    className: "md:col-span-1 md:row-span-1",
    color: "from-yellow-500/20 to-amber-500/20"
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 relative bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Intelligence, Unlocked.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Everything you need to build the next generation of autonomous software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 hover:bg-zinc-900/80 transition-colors",
                feature.className
              )}
            >
              <div
                className={cn(
                  "absolute -right-10 -top-10 h-64 w-64 rounded-full bg-gradient-to-br blur-[100px] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  feature.color
                )}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>

                {/* Visual fill for the large card */}
                {feature.className.includes("col-span-2") && (
                  <div className="mt-auto pt-8">
                    <div className="w-full h-32 rounded-lg bg-black/50 border border-white/5 overflow-hidden p-4 font-mono text-xs text-zinc-500">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-purple-400">const</span> <span className="text-blue-400">agent</span> = <span className="text-yellow-400">new</span> <span className="text-green-400">Agent</span>();
                        <br />
                        <span className="text-blue-400">agent</span>.<span className="text-cyan-400">use</span>(tools.fileSystem);
                        <br />
                        <span className="text-purple-400">await</span> <span className="text-blue-400">agent</span>.<span className="text-cyan-400">run</span>(<span className="text-orange-300">"Deploy production"</span>);
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
