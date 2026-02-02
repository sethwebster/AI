
"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Terminal, Cpu, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-cyan-400 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          v2.0 is now available
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-6"
        >
          Build with <br className="md:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Superintelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed"
        >
          The enterprise-grade agent framework designed for orchestrating complex AI workflows.
          Secure, scalable, and built for the future of software development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="glow" size="lg" className="h-12 text-base px-8 dark">
            Start Building <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="h-12 text-base px-8 border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white">
            <Terminal className="mr-2 h-4 w-4" />
            Copy Install Command
          </Button>
        </motion.div>

        {/* Stats / Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: "Agents Active", value: "10k+", icon: Bot },
            { label: "Latency", value: "<50ms", icon: Zap },
            { label: "Uptime", value: "99.9%", icon: Cpu },
            { label: "Security", value: "Enterprise", icon: Terminal },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <stat.icon className="h-6 w-6 text-zinc-500" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Grid Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-[linear-gradient(to_bottom,transparent_0%,black_100%)] z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[500px] perspective-[1000px] opacity-20 -z-5">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [transform:rotateX(60deg)_translateZ(-200px)] origin-bottom" />
      </div>
    </section>
  )
}

function Bot(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
