import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-bg-dark text-white">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-5 border-b border-border-color">
                <div className="flex items-center gap-2 text-xl font-bold">
                    <span className="text-primary">🎙️</span> AI Dubbing
                </div>
                <nav className="hidden md:flex gap-8 text-sm text-text-muted">
                    <a href="#features" className="hover:text-white transition-colors">Imkoniyatlar</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Tariflar</a>
                </nav>
                <div className="flex gap-3">
                    <Link to="/login" className="px-4 py-2 text-sm rounded-lg border border-border-color transition-all hover:bg-white/5">
                        Kirish
                    </Link>
                    <Link to="/register" className="px-4 py-2 text-sm rounded-lg font-medium transition-all hover:opacity-90 bg-primary">
                        Ro'yxatdan o'tish
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-4xl mx-auto text-center px-6 py-28">
                <div className="inline-block mb-6 px-4 py-1.5 text-xs font-semibold rounded-full border border-primary text-primary bg-primary/10">
                    Yangi: Whisper v3 Pro
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                    Global Videolarni<br />
                    <span className="text-primary">O'zbek Tiliga</span> O'giring
                </h1>
                <p className="text-lg mb-10 max-w-2xl mx-auto text-text-muted">
                    Whisper AI orqali 99% aniqlikdagi transkripsiya va eng so'nggi sun'iy intellekt
                    modellar yordamida tabiiy ovozli dublyaj xizmati.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Link to="/register" className="px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg bg-primary"
                        style={{ boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}>
                        Bepul sinab ko'ring
                    </Link>
                    <Link to="/login" className="px-8 py-3.5 rounded-xl font-semibold border border-border-color transition-all hover:bg-white/5">
                        Kirish →
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: '🎤', title: 'AI Transkripsiya', desc: 'OpenAI Whisper bilan 99% aniqlikda nutqni matnga aylantiring.' },
                    { icon: '🌐', title: 'Avtomatik Tarjima', desc: 'Google Translate orqali professional darajadagi tarjima.' },
                    { icon: '🔊', title: 'TTS Dublyaj', desc: "O'zbek tilida tabiiy ovozli dublyaj yaratin." },
                ].map((f) => (
                    <div key={f.title} className="p-6 rounded-2xl border border-border-color bg-bg-card transition-all hover:border-purple-500/40">
                        <div className="text-3xl mb-4">{f.icon}</div>
                        <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                        <p className="text-sm text-text-muted">{f.desc}</p>
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer className="text-center py-8 text-sm border-t border-border-color mt-10 text-text-muted">
                © 2025 AI Dubbing — <a href="https://github.com/Farhodoff" className="hover:text-white underline decoration-dotted">Farhodoff</a>
            </footer>
        </div>
    )
}
