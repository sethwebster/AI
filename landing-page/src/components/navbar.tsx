"use client"

import Link from "next/link"
import { Github, Terminal } from "lucide-react"
import { useState, useCallback } from "react"

const INSTALL_COMMAND = "curl -fsSL https://raw.githubusercontent.com/sethwebster/AI/main/install.sh | bash"

export function Navbar() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
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
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-7 w-7 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-md flex items-center justify-center group-hover:scale-105 transition-transform">
            <Terminal className="text-white h-4 w-4" />
          </div>
          <span className="font-semibold text-white hidden sm:block">
            AI Dev Tools
          </span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="#agents" className="hover:text-white transition-colors">
            Agents
          </Link>
          <Link href="#features" className="hover:text-white transition-colors">
            How It Works
          </Link>
          <Link
            href="https://github.com/sethwebster/AI"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Docs
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/sethwebster/AI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500 text-black text-sm font-medium hover:bg-cyan-400 transition-colors"
          >
            {copied ? (
              <span>Copied!</span>
            ) : (
              <>
                <span className="hidden sm:inline">Install</span>
                <span className="sm:hidden">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
