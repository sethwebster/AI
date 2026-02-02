
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"

export default function Home() {
  // This page is a composition of high-impact sections.
  // Each section handles its own animations and layout.
  // The global layout provides the dark mode backdrop.

  return (
    <main className="min-h-screen bg-black selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <Features />

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-900 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Ready to build the future?
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using our tools to build the next generation of intelligent software.
          </p>
          <div className="flex justify-center">
            <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
              <span className="mr-2">Get Started Now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
