"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Terminal,
  Users,
  RefreshCw,
  Lightbulb,
  FileCode,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: BookOpen },
      { title: "Installation", href: "/docs/installation", icon: Terminal },
      { title: "Quick Start", href: "/docs/quick-start", icon: Lightbulb },
    ],
  },
  {
    title: "CLI Reference",
    items: [
      { title: "Commands", href: "/docs/commands", icon: Terminal },
      { title: "Configuration", href: "/docs/configuration", icon: FileCode },
    ],
  },
  {
    title: "Agents",
    items: [
      { title: "Overview", href: "/docs/agents", icon: Users },
      { title: "Sentinel (Morgan)", href: "/docs/agents/sentinel" },
      { title: "Product/UX Designer (Avery)", href: "/docs/agents/product-ux-designer" },
      { title: "Docs Engineer (Sam)", href: "/docs/agents/docs-engineer" },
      { title: "Docs Architect (Emerson)", href: "/docs/agents/docs-architect" },
      { title: "Systems Thinker (Jan)", href: "/docs/agents/systems-thinker" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "Migration System", href: "/docs/migrations", icon: RefreshCw },
      { title: "Best Practices", href: "/docs/best-practices", icon: Lightbulb },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-8 py-6">
      {navigation.map((section) => (
        <div key={section.title}>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400 font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
