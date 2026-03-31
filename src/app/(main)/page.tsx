import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight">
          ⚡ <span className="text-blue-400">PortfolioForge</span>
        </h1>
        <Link
          href="/builder"
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Get Started
        </Link>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center md:pt-36">
        <div className="mb-5 inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-400">
          No coding required ✨
        </div>
        <h2 className="mb-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl lg:text-7xl tracking-tight">
          Build a Stunning
          <br />
          <span className="text-blue-400">Portfolio</span> in Minutes
        </h2>
        <p className="mb-10 max-w-xl text-lg text-gray-400 md:text-xl">
          Fill in your details, preview it live, and publish to your own unique
          URL. Dark theme. Modern design. Premium quality.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/builder"
            className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30"
          >
            Create Your Portfolio →
          </Link>
          <Link
            href="/p/demo"
            className="rounded-xl border border-white/10 px-8 py-4 text-lg font-semibold text-gray-300 transition hover:bg-white/5 hover:border-white/20"
          >
            See Example
          </Link>
        </div>

        {/* Features */}
        <div className="mt-28 grid max-w-4xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-left">
            <div className="mb-3 text-3xl">📝</div>
            <h3 className="mb-2 text-lg font-bold text-white">Step-by-Step Builder</h3>
            <p className="text-sm text-gray-500">
              Guided form: name, skills, career history, projects. Fill it in,
              see it come alive.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-left">
            <div className="mb-3 text-3xl">👁️</div>
            <h3 className="mb-2 text-lg font-bold text-white">Live Dark Preview</h3>
            <p className="text-sm text-gray-500">
              Real-time preview with a premium dark theme. What you see is what
              you get.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-left">
            <div className="mb-3 text-3xl">🚀</div>
            <h3 className="mb-2 text-lg font-bold text-white">Instant Publish</h3>
            <p className="text-sm text-gray-500">
              Get a unique URL for your portfolio. Share it with recruiters,
              clients, anyone.
            </p>
          </div>
        </div>

        {/* Mock Preview */}
        <div className="mt-20 w-full max-w-4xl">
          <div className="rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-blue-500/5">
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-3 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs text-gray-500">portfolioforge.com/p/yourname</span>
            </div>
            <div className="bg-[#0a0a0a] p-8 md:p-12">
              <p className="text-blue-400 text-sm mb-2">Hello! I&apos;m</p>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                YOUR<br />
                <span className="text-blue-400">NAME</span>
              </h3>
              <p className="text-gray-500 mt-3 text-sm">Full Stack Developer | Cloud Architect</p>
              <div className="mt-6 flex gap-3">
                <div className="rounded-full border border-white/10 px-4 py-1 text-xs text-gray-400">React</div>
                <div className="rounded-full border border-white/10 px-4 py-1 text-xs text-gray-400">TypeScript</div>
                <div className="rounded-full border border-white/10 px-4 py-1 text-xs text-gray-400">Node.js</div>
                <div className="rounded-full border border-white/10 px-4 py-1 text-xs text-gray-400">AWS</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-600 border-t border-white/5">
        Built with ❤️ by PortfolioForge
      </footer>
    </div>
  );
}
