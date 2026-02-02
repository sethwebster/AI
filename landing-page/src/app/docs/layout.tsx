import { DocsNav } from "@/components/docs/docs-nav";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsSearch } from "@/components/docs/docs-search";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <DocsNav />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 pt-20">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-10">
              <DocsSearch />
              <DocsSidebar />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <article className="prose prose-invert prose-cyan max-w-none pb-20">
              {children}
            </article>
          </main>

          {/* Table of contents (right sidebar) */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-20 h-[calc(100vh-5rem)]">
              <div className="text-sm">
                <p className="font-semibold text-white mb-4">On this page</p>
                <div id="toc" className="space-y-2 text-zinc-400">
                  {/* TOC will be populated by client component */}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
