"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  // Extract language from className (format: "language-{lang}")
  const language = className?.replace(/language-/, "") || "text";

  useEffect(() => {
    async function highlight() {
      try {
        const highlighted = await codeToHtml(children.trim(), {
          lang: language,
          theme: "github-dark",
        });
        setHtml(highlighted);
      } catch (error) {
        // Fallback to plain text if language not supported
        setHtml(`<pre><code>${children}</code></pre>`);
      }
    }
    highlight();
  }, [children, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1 text-xs rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
      <div
        className="overflow-x-auto [&>pre]:!bg-zinc-900 [&>pre]:!border [&>pre]:!border-zinc-800 [&>pre]:!rounded-lg [&>pre]:!p-4 [&>pre]:!my-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
