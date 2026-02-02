import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Agents } from "@/components/agents"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { getLatestRelease } from "@/lib/github"

export default async function Home() {
  const { version, url } = await getLatestRelease()

  return (
    <main className="min-h-screen bg-black selection:bg-cyan-500/30">
      <Navbar />
      <Hero version={version} releaseUrl={url} />
      <Agents />
      <Features />
      <Footer />
    </main>
  )
}
