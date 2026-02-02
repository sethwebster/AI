"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function DocsSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="search"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
        />
      </div>
      {query && (
        <div className="mt-2 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-400">
          Search coming soon...
        </div>
      )}
    </div>
  );
}
