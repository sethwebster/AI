import Link from "next/link"
import { Github, Terminal } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                <Terminal className="text-white h-3.5 w-3.5" />
              </div>
              <span className="font-semibold text-white text-sm">AI Dev Tools</span>
            </div>
            <p className="text-zinc-500 text-xs">
              Expert AI agents for Claude Code & Codex
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="https://github.com/sethwebster/AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://github.com/sethwebster/AI/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              MIT License
            </Link>
            <Link
              href="https://github.com/sethwebster/AI/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Releases
            </Link>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-zinc-600 text-xs">
            Open source. No telemetry. No tracking.
          </p>
        </div>
      </div>
    </footer>
  )
}
