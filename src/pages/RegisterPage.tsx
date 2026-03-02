import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')
        setLoading(true)
        const form = new FormData(e.currentTarget)

        if (form.get('password') !== form.get('confirm_password')) {
            setError('Parollar mos kelmadi')
            setLoading(false)
            return
        }

        try {
            const res = await fetch('/api/register', { method: 'POST', body: form })
            const data = await res.json()
            if (!res.ok || data.status === 'error') {
                setError(data.message || 'Xatolik yuz berdi')
            } else {
                navigate('/login?registered=1')
            }
        } catch {
            setError('Server bilan bog\'lanishda xatolik')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-[-15%] right-[-5%] w-[55%] h-[55%] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight mb-3">
                        <span className="bg-primary/20 p-1.5 rounded-lg">🎙️</span>
                        <span className="text-gradient">AI Dubbing</span>
                    </Link>
                    <h2 className="text-xl font-bold text-white">Ro'yxatdan o'ting</h2>
                    <p className="mt-1.5 text-sm text-text-muted">Platformamizga qo'shiling ва ijodni boshlang</p>
                </div>

                <div className="p-10 rounded-[2.5rem] glass border-white/10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted ml-1">To'liq ism</label>
                            <input
                                name="full_name"
                                type="text"
                                placeholder="Ismingizni kiriting"
                                className="w-full px-5 py-3.5 rounded-2xl text-sm glass border-white/5 outline-none focus:border-primary/50 transition-all placeholder:text-text-dim"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted ml-1">Email manzili</label>
                            <input
                                name="username"
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="w-full px-5 py-3.5 rounded-2xl text-sm glass border-white/5 outline-none focus:border-primary/50 transition-all placeholder:text-text-dim"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted ml-1">Parol</label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 rounded-2xl text-sm glass border-white/5 outline-none focus:border-primary/50 transition-all placeholder:text-text-dim"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted ml-1">Parolni tasdiqlang</label>
                            <input
                                name="confirm_password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-5 py-3.5 rounded-2xl text-sm glass border-white/5 outline-none focus:border-primary/50 transition-all placeholder:text-text-dim"
                            />
                        </div>

                        {error && (
                            <div className="px-5 py-4 rounded-2xl text-xs font-medium bg-red-400/10 text-red-400 border border-red-400/20 animate-in fade-in zoom-in-95 duration-200">
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 py-4 rounded-2xl font-bold text-white bg-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Saqlanmoqda...' : "Ro'yxatdan o'tish"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-sm text-text-muted">
                    Hisobingiz bormi?{' '}
                    <Link to="/login" className="text-primary-light font-bold hover:underline underline-offset-4">
                        Kirish
                    </Link>
                </p>
            </div>
        </div>
    )
}

