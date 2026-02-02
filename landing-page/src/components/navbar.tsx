
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white hidden sm:block">
            Sethwebster AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#agents" className="hover:text-white transition-colors">Agents</Link>
          <Link href="#docs" className="hover:text-white transition-colors">Documentation</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://github.com/sethwebster/AI" target="_blank" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">
            GitHub
          </Link>
          <Button variant="glow" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}
