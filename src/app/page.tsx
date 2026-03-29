import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007bff] to-[#4facfe] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <h1 className="text-2xl font-bold tracking-tight">⚡ PortfolioForge</h1>
        <Link
          href="/builder"
          className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-[#007bff] shadow-lg transition hover:shadow-xl hover:scale-105"
        >
          Get Started
        </Link>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center md:pt-32">
        <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm">
          No coding required ✨
        </div>
        <h2 className="mb-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Build a Stunning Portfolio
          <br />
          <span className="text-white/90">in Minutes, Not Hours</span>
        </h2>
        <p className="mb-10 max-w-xl text-lg text-white/80 md:text-xl">
          Fill in your details, preview it live, and publish to your own unique
          URL. Perfect for developers, students, and professionals.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/builder"
            className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#007bff] shadow-xl transition hover:shadow-2xl hover:scale-105"
          >
            Create Your Portfolio →
          </Link>
          <Link
            href="/p/demo"
            className="rounded-xl border-2 border-white/40 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            See Example
          </Link>
        </div>

        {/* Features */}
        <div className="mt-24 grid max-w-4xl gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-3 text-3xl">📝</div>
            <h3 className="mb-2 text-lg font-bold">Simple Form</h3>
            <p className="text-sm text-white/70">
              Step-by-step form. Just fill in your name, skills, projects, and
              you&apos;re done.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-3 text-3xl">👁️</div>
            <h3 className="mb-2 text-lg font-bold">Live Preview</h3>
            <p className="text-sm text-white/70">
              See your portfolio update in real-time as you type. No surprises.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-3 text-3xl">🚀</div>
            <h3 className="mb-2 text-lg font-bold">Instant Publish</h3>
            <p className="text-sm text-white/70">
              Get a unique URL for your portfolio. Share it with anyone,
              anywhere.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-white/50">
        Built with ❤️ by PortfolioForge
      </footer>
    </div>
  );
}
