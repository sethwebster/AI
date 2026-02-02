
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-500 text-sm">
          © 2026 Sethwebster AI. All rights reserved.
        </div>
        <div className="flex bg-zinc-900/50 rounded-full px-1 p-1 border border-white/5">
          {['Twitter', 'GitHub', 'Discord', 'Status'].map((item) => (
            <Link key={item} href="#" className="px-4 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
