import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const navigate = useNavigate()
    const [url, setUrl] = useState('')
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')

    return (
        <div className="min-h-screen bg-[#070809] text-white selection:bg-primary/30 font-sans overflow-x-hidden">
            {/* Strict Figma Navbar */}
            {/* Premium Glass Pill Navbar */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
                <nav className="bg-[#070809]/40 backdrop-blur-2xl border-t border-t-white/10 border-x border-x-white/5 border-b border-b-white/5 rounded-full px-8 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
                    <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
                        <span className="text-primary text-2xl">🎙️</span>
                        <span className="hidden sm:inline text-white">AI Dubbing</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold text-white/50">
                        <Link to="/" className="text-white hover:text-primary transition-colors">Asosiy</Link>
                        <a href="#features" className="hover:text-white transition-colors">Imkoniyatlar</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Tariflar</a>
                        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/login" className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[12px] font-bold hover:bg-white/10 transition-all">
                            Kirish
                        </Link>
                        <Link to="/register" className="px-6 py-2.5 rounded-full bg-primary text-black text-[12px] font-black hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                            Ro'yxatdan o'tish
                        </Link>
                    </div>
                </nav>
            </div>

            <main>
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-10 pt-52 pb-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10 animate-fade-in text-left">
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary mb-8">
                                    YANGI: WHISPER V3 PRO
                                </span>
                                <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8">
                                    Global Videolarni <br />
                                    <span className="text-primary">O'zbek Tiliga</span> O'giring
                                </h1>
                                <p className="text-white/70 text-lg font-medium leading-loose max-w-lg">
                                    Whisper AI orqali 99% aniqlikdagi transkripsiya va eng so'nggi sun'iy intellekt modellar yordamida tabiiy ovozli dublyaj xizmati.
                                </p>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <div className="relative group max-w-xl">
                                        <div className="absolute -inset-1.5 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition duration-700 rounded-3xl"></div>
                                        <div className="relative flex items-center bg-[#111214] border border-white/10 rounded-2xl overflow-hidden p-2 focus-within:border-primary/50 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                                            <div className="pl-5 pr-3 text-primary/40">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                            </div>
                                            <input
                                                type="text"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                placeholder="YouTube video manzilini kiriting..."
                                                className="flex-grow bg-transparent border-none outline-none py-4 text-base font-bold placeholder:text-white/20"
                                            />
                                            <button
                                                onClick={() => navigate('/dashboard')}
                                                className="bg-primary hover:bg-primary-dark px-12 py-4 rounded-xl font-black text-sm transition-all text-black shadow-[0_10px_30px_rgba(0,209,255,0.3)] hover:scale-[1.02] active:scale-95"
                                            >
                                                Dublyaj
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-8 pl-2">
                                        <Link to="/dashboard" className="flex items-center gap-3 text-white/30 hover:text-white/80 transition-all group text-left">
                                            <span className="text-lg bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-all">📁</span>
                                            <span className="text-[11px] font-black uppercase tracking-widest">Video yuklash</span>
                                        </Link>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                                        <Link to="/dashboard" className="flex items-center gap-3 text-white/30 hover:text-white/80 transition-all group text-left">
                                            <span className="text-lg bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-all">🎤</span>
                                            <span className="text-[11px] font-black uppercase tracking-widest">Ovoz yozish</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative group animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] aspect-[1.3/1] bg-[#111214] group-hover:border-primary/20 transition-all duration-500">
                                <img
                                    src="/studio_image.jpg"
                                    alt="Professional Dubbing Studio"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#070809]/80 via-transparent to-transparent"></div>

                                {/* Floating Badges / UI Elements */}
                                <div className="absolute top-6 right-6 bg-primary/20 backdrop-blur-xl border border-primary/30 px-4 py-2 rounded-full flex items-center gap-2 animate-float">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">Live Processing</span>
                                </div>

                                <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between pointer-events-none">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111214] bg-[#070809]/40 backdrop-blur-lg flex items-center justify-center text-[10px]">
                                                {i === 4 ? '+' : '👤'}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-white/60">
                                        50+ Tillarda Mavjud
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section - Platforma Imkoniyatlari */}
                <section id="features" className="py-40 px-10 text-center bg-gradient-to-b from-transparent via-[#121417]/30 to-transparent">
                    <div className="max-w-7xl mx-auto space-y-24">
                        <div className="space-y-6 animate-fade-in">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary">TEKNOLOGIK LABORATORIYAMIZ</span>
                            <h2 className="text-5xl font-extrabold tracking-tight">Platforma <span className="text-primary">Imkoniyatlari</span></h2>
                            <p className="text-white/60 font-medium leading-loose max-w-xl mx-auto">Videolaringizni professional darajada mahalliylashtirish uchun eng ilg'or AI algoritmlari va bulutli infratuzilma.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon="🎙️"
                                title="AI Transkripsiya"
                                desc="OpenAI Whisper texnologiyasi asosida videolarni 99% aniqlikda va 50 dan ortiq tillarda matnga aylantiring."
                            />
                            <FeatureCard
                                icon="🌍"
                                title="Avtomatik Tarjima"
                                desc="DeepL va Google Translate algoritmlari yordamida kontekstni saqlagan holda professional darajadagi lahzal tarjima."
                            />
                            <FeatureCard
                                icon="🎤"
                                title="Ovozni klonlash"
                                desc="ElevenLabs texnologiyasi asosida asl ovoz tembri, emotsiyasi va intonatsiyasini saqlab qolgan holda dublyaj qilish."
                            />
                            <FeatureCard
                                icon="😊"
                                title="Lip-Sync Texnologiyasi"
                                desc="Sun'iy intellekt yordamida personaj lab harakatlarini tarjima qilingan audio bilan soniya ulushlarigacha moslashtirish."
                            />
                            <FeatureCard
                                icon="📝"
                                title="Subtitrlar Muharriri"
                                desc="Tayyor subtitrlarni tahrirlash, vaqtni to'g'irlash va brendingiz ranglariga moslashtirish uchun qulay interfeys."
                            />
                            <FeatureCard
                                icon="🛡️"
                                title="Sifat Nazorati"
                                desc="Avtomatlashtirilgan tekshiruv va inson nazorati uyg'unligi orqali xatolarsiz natijani kafolatlaymiz."
                            />
                        </div>
                    </div>
                </section>

                {/* Why Us Section - Nega bizni tanlashadi? */}
                <section className="py-40 px-10 bg-[#0a0a0b]">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            <h2 className="text-5xl font-extrabold tracking-tight">Nega bizni <br /> tanlashadi?</h2>
                            <div className="space-y-6">
                                <WhyItem text="An'anaviy studiyalardan 10 baravar tezroq" />
                                <WhyItem text="Xarajatlarni 85% gacha qisqartirish" />
                                <WhyItem text="7/24 mavjud bulutli platforma" />
                            </div>
                        </div>

                        <div className="bg-[#111214] border border-white/5 p-12 rounded-[3.5rem] space-y-10 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px]"></div>
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-white/40">Hozir boshlang</p>
                                <div className="flex items-end justify-center gap-2">
                                    <span className="text-7xl font-extrabold tracking-tighter">$0</span>
                                    <span className="text-white/40 text-lg mb-2">/ sinov</span>
                                </div>
                            </div>
                            <button className="w-full bg-primary hover:bg-primary-dark text-black py-5 rounded-2xl font-black transition-all shadow-[0_20px_40px_rgba(0,209,255,0.2)]">
                                Bepul sinab ko'ring
                            </button>
                        </div>
                    </div>
                </section>

                {/* Pricing Section - Strict Figma Match */}
                <section id="pricing" className="py-40 px-10 text-center space-y-20">
                    <div className="space-y-6 animate-fade-in">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A855F7] opacity-80">NARXLAR REJASI</p>
                        <h2 className="text-5xl font-extrabold tracking-tight leading-tight">O'zingizga mos tarifni <br /> tanlang</h2>
                        <p className="text-white/60 font-medium leading-loose max-w-xl mx-auto">
                            AI yordamida videolaringizni dunyo bo'ylab tarqating. <br />
                            Biznesingiz hajmi uchun mos paketni tanlang.
                        </p>
                    </div>

                    {/* Toggle */}
                    <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-[#111214] p-1.5 rounded-full border border-white/5 flex items-center gap-2">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white/10 text-white shadow-xl' : 'text-text-dim hover:text-white'}`}
                            >
                                Oylik
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white/10 text-white shadow-xl' : 'text-text-dim hover:text-white'}`}
                            >
                                Yillik
                                <span className="bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-md text-[9px] font-black border border-[#10B981]/20">-20%</span>
                            </button>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        {/* Free Tier */}
                        <div className="bg-[#121417] border border-white/5 p-10 rounded-[2.5rem] flex flex-col text-left hover:border-white/20 transition-all hover:-translate-y-2 duration-500 group shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] hover:bg-[#15171a]">
                            <div className="space-y-6 mb-12">
                                <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">Bepul</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-extrabold tracking-tighter text-white">$0</span>
                                    <span className="text-white/30 text-sm font-medium mb-1">/oy</span>
                                </div>
                                <p className="text-xs font-medium text-white/40">Sinov uchun eng yaxshi tanlov.</p>
                            </div>
                            <div className="space-y-5 flex-grow mb-12">
                                <FeatureItem text="5 daqiqa video/oy" />
                                <FeatureItem text="Standart ovozlar (10+)" />
                                <FeatureItem text="720p HD sifat" />
                                <FeatureItem text="Suv belgisi bilan" inactive />
                            </div>
                            <Link to="/register" className="w-full py-4 rounded-xl border border-white/10 font-bold text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all active:scale-95 text-center">
                                Hozir boshlash
                            </Link>
                        </div>

                        {/* Professional Tier - Highlighted */}
                        <div className="relative group">
                            <div className="absolute -inset-[1px] bg-gradient-to-b from-[#A855F7] to-[#00D1FF] rounded-[2.5rem] p-[1px] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-all">
                                <div className="bg-[#121417] w-full h-full rounded-[2.5rem] p-10 flex flex-col text-left relative overflow-hidden group/card transition-all duration-500 hover:shadow-[0_30px_60px_rgba(168,85,247,0.15)]">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#A855F7] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-b-xl shadow-lg shadow-[#A855F7]/20 z-10">
                                        ENG MASHHUR
                                    </div>
                                    <div className="space-y-6 mb-12">
                                        <h3 className="text-xl font-bold text-[#A855F7]">Professional</h3>
                                        <div className="flex items-end gap-2">
                                            <span className="text-5xl font-extrabold tracking-tighter text-white">${billingCycle === 'monthly' ? '29' : '278'}</span>
                                            <span className="text-white/30 text-sm font-medium mb-1">{billingCycle === 'monthly' ? '/oy' : '/yil'}</span>
                                        </div>
                                        <p className="text-xs font-medium text-white/40">Tartibli kontent yaratuvchilar uchun.</p>
                                    </div>
                                    <div className="space-y-5 flex-grow mb-12">
                                        <FeatureItem text="60 daqiqa video/oy" active />
                                        <FeatureItem text="Voice Cloning (Ovoz kloni)" active />
                                        <FeatureItem text="4K Ultra HD Eksport" active />
                                        <FeatureItem text="Priority support (24/7)" active />
                                        <FeatureItem text="Suv belgisiz" active />
                                    </div>
                                    <Link to="/register" className="w-full py-4 rounded-xl bg-[#A855F7] font-black text-sm text-white hover:shadow-[0_20px_40px_rgba(168,85,247,0.4)] transition-all active:scale-95 text-center">
                                        Hozir boshlash
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Studio Tier */}
                        <div className="bg-[#121417] border border-white/5 p-10 rounded-[2.5rem] flex flex-col text-left hover:border-white/20 transition-all hover:-translate-y-2 duration-500 group shadow-2xl hover:shadow-[0_20px_50px_rgba(0,209,255,0.05)] hover:bg-[#15171a]">
                            <div className="space-y-6 mb-12">
                                <h3 className="text-xl font-bold text-white/90 group-hover:text-primary transition-colors">Studio</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-extrabold tracking-tighter text-white group-hover:text-white transition-colors">${billingCycle === 'monthly' ? '99' : '950'}</span>
                                    <span className="text-white/30 text-sm font-medium mb-1">{billingCycle === 'monthly' ? '/oy' : '/yil'}</span>
                                </div>
                                <p className="text-xs font-medium text-white/40">Professional agentliklar va jamoalar uchun.</p>
                            </div>
                            <div className="space-y-5 flex-grow mb-12">
                                <FeatureItem text="300 daqiqa video/oy" />
                                <FeatureItem text="Jamoaviy boshqaruv (5 kishi)" />
                                <FeatureItem text="To'liq API kirish" />
                                <FeatureItem text="Maxsus menejer" />
                            </div>
                            <Link to="/register" className="w-full py-4 rounded-xl border border-white/10 font-bold text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all active:scale-95 text-center">
                                Hozir boshlash
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ Section - Ko'p so'raladigan savollar */}
                <section id="faq" className="py-40 px-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-24">
                        <h2 className="text-5xl font-extrabold tracking-tight">Ko'p so'raladigan savollar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <FAQItem
                                q="Qachon tarifni o'zgartira olaman?"
                                a="Siz istalgan vaqtda tarifingizni oshirishingiz yoki bekor qilishingiz mumkin. O'zgarish darhol kuchga kiradi."
                            />
                            <FAQItem
                                q="Voice Cloning qanday ishlaydi?"
                                a="Shunchaki 30 soniyalik audio namunani yuklaysiz va AI sizning ovozingizni aniq nusxasini yaratadi."
                            />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-24 px-10 border-t border-white/5 bg-[#0a0a0b]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
                            <span className="text-primary text-2xl">🎙️</span>
                            <span>AI Dublyaj Studiyasi</span>
                        </Link>
                        <p className="text-white/40 text-[13px] font-medium leading-loose max-w-xs">
                            Biz video kontent yaratuvchilarga o'z g'oyalarini dunyo bo'ylab tarqatishda yordam beramiz. Sun'iy intellekt orqali til to'siqlarini parchalaymiz.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">PLATFORMA</h4>
                        <ul className="space-y-4 text-text-dim text-[13px] font-bold">
                            <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Xavfsizlik</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Hujjatlar</a></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">KOMPANIYA</h4>
                        <ul className="space-y-4 text-text-dim text-[13px] font-bold">
                            <li><a href="#" className="hover:text-primary transition-colors">Biz haqimizda</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Vakansiyalar</a></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">IJTIMOIY</h4>
                        <div className="flex items-center gap-6">
                            <SocialIcon icon="🌐" />
                            <SocialIcon icon="📷" />
                            <SocialIcon icon="✈️" />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold text-text-dim/50 uppercase tracking-widest">
                    <p>© 2026 AI Dublyaj Studiyasi. Barcha huquqlar himoyalangan.</p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
                        <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
    return (
        <div className="bg-[#121417] border border-white/5 p-10 rounded-[2.5rem] text-left hover:border-primary/30 transition-all group hover:-translate-y-2 duration-500 shadow-xl hover:shadow-primary/5">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-xl mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">{icon}</div>
            <h3 className="text-xl font-bold mb-4 text-white/90">{title}</h3>
            <p className="text-white/40 text-[13px] font-medium leading-loose mb-6">{desc}</p>
            <a href="#features" className="text-primary text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                Batafsil <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>
        </div>
    )
}

function WhyItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4 group/item">
            <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover/item:scale-110 group-hover/item:bg-primary/20 transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-sm font-bold text-white/50 group-hover/item:text-white/80 transition-colors">{text}</span>
        </div>
    )
}

function FAQItem({ q, a }: { q: string, a: string }) {
    return (
        <div className="bg-[#121417] border border-white/5 p-10 rounded-[2.5rem] space-y-4 hover:border-white/10 transition-all group shadow-xl">
            <h4 className="text-lg font-bold text-white/90 group-hover:text-primary transition-colors">{q}</h4>
            <p className="text-white/40 text-[13px] font-medium leading-loose">{a}</p>
        </div>
    )
}

function SocialIcon({ icon }: { icon: string }) {
    return (
        <a href="https://t.me/fsoyilov" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-white/10 hover:border-white/20 transition-all">
            {icon}
        </a>
    )
}

function FeatureItem({ text, active, inactive }: { text: string, active?: boolean, inactive?: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${inactive ? 'border-white/5 text-text-dim/30' : active ? 'border-[#A855F7]/30 text-[#A855F7]' : 'border-white/10 text-[#A855F7]'}`}>
                {inactive ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                )}
            </div>
            <span className={`text-xs font-medium ${inactive ? 'text-text-dim/50' : 'text-text-muted'}`}>{text}</span>
        </div>
    )
}
