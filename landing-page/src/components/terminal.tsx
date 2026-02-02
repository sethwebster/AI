"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy } from "lucide-react"

const INSTALL_COMMAND = "curl -fsSL https://raw.githubusercontent.com/sethwebster/AI/main/install.sh | bash"

const TERMINAL_OUTPUT = [
  { text: "", delay: 0 },
  { text: "Fetching AI Dev Tools...", delay: 100, color: "text-zinc-500" },
  { text: "Installing agents to ~/.ai-agents/", delay: 800, color: "text-zinc-500" },
  { text: "", delay: 1200 },
  { text: "Installed agents:", delay: 1400, color: "text-green-400" },
  { text: "  - Sentinel (Morgan)       Code review & security", delay: 1600, color: "text-cyan-400" },
  { text: "  - Conversion Architect    UX & growth design", delay: 1800, color: "text-cyan-400" },
  { text: "  - Docs Engineer (Sam)     Clear documentation", delay: 2000, color: "text-cyan-400" },
  { text: "  - Docs Architect          Narrative docs", delay: 2200, color: "text-cyan-400" },
  { text: "  - Systems Thinker (Jan)   Architecture", delay: 2400, color: "text-cyan-400" },
  { text: "", delay: 2600 },
  { text: "Run 'ai help' to get started", delay: 2800, color: "text-green-400" },
]

function useTypingAnimation(text: string, speed: number = 30, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState("")
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted) return
    if (displayedText.length >= text.length) return

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedText, text, speed, hasStarted])

  const isComplete = hasStarted && displayedText.length >= text.length

  return { displayedText, isComplete, hasStarted }
}

function useTerminalOutput(startAfter: boolean) {
  const [visibleLines, setVisibleLines] = useState<number>(0)

  useEffect(() => {
    if (!startAfter) return

    const timers: NodeJS.Timeout[] = []

    TERMINAL_OUTPUT.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1)
      }, line.delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [startAfter])

  return visibleLines
}

export function Terminal() {
  const [copied, setCopied] = useState(false)
  const { displayedText, isComplete } = useTypingAnimation(INSTALL_COMMAND, 25, 500)
  const visibleLines = useTerminalOutput(isComplete)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = INSTALL_COMMAND
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl shadow-cyan-500/5">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500 font-mono">Terminal</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Copy command"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 text-green-400"
                >
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Terminal Content */}
        <div className="p-4 font-mono text-sm leading-relaxed min-h-[280px]">
          {/* Command Line */}
          <div className="flex items-start gap-2">
            <span className="text-green-400 select-none shrink-0">$</span>
            <span className="text-white break-all">
              {displayedText}
              {!isComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block w-2 h-4 bg-white ml-0.5 align-middle"
                />
              )}
            </span>
          </div>

          {/* Output Lines */}
          {isComplete && (
            <div className="mt-4 space-y-1">
              {TERMINAL_OUTPUT.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={line.color || "text-zinc-300"}
                >
                  {line.text || "\u00A0"}
                </motion.div>
              ))}
              {visibleLines >= TERMINAL_OUTPUT.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-2 mt-4"
                >
                  <span className="text-green-400 select-none">$</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-2 h-4 bg-white"
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Command hint below terminal */}
      <p className="mt-4 text-center text-sm text-zinc-500">
        Works with{" "}
        <span className="text-zinc-300">Claude Code</span>
        {" "}&{" "}
        <span className="text-zinc-300">Codex</span>
      </p>
    </div>
  )
}
