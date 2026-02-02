import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./src/components/docs/code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 text-white mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-12 mb-4 text-white border-b border-zinc-800 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-3 text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-6 mb-2 text-cyan-400">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-zinc-300 leading-7 mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 hover:decoration-cyan-300/50 transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 text-zinc-300 space-y-2 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 text-zinc-300 space-y-2 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-2">{children}</li>,
    code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-400 text-sm font-mono">
            {children}
          </code>
        );
      }
      // Block code with syntax highlighting
      return <CodeBlock className={className}>{String(children)}</CodeBlock>;
    },
    pre: ({ children }: { children?: React.ReactNode }) => {
      // Pre is handled by CodeBlock, just return children
      return <>{children}</>;
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-6 bg-cyan-500/5 text-zinc-300 italic">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-lg border border-zinc-800">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-900 border-b-2 border-cyan-500">{children}</thead>
    ),
    tbody: ({ children }) => <tbody className="divide-y divide-zinc-800">{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-cyan-400">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-zinc-300">{children}</td>
    ),
    hr: () => <hr className="my-8 border-zinc-800" />,
    ...components,
  };
}
