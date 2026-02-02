"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function DocsNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Dev
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/docs"
              className={`text-sm ${
                pathname?.startsWith("/docs")
                  ? "text-cyan-400"
                  : "text-zinc-400 hover:text-white"
              } transition-colors`}
            >
              Documentation
            </Link>
            <Link
              href="/#agents"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Agents
            </Link>
            <a
              href="https://github.com/sethwebster/AI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-black">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/docs"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/#agents"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Agents
            </Link>
            <a
              href="https://github.com/sethwebster/AI"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
