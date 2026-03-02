import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')
        setLoading(true)
        const form = new FormData(e.currentTarget)

        try {
            const res = await fetch('/api/login', { method: 'POST', body: form })
            const data = await res.json()
            if (!res.ok || data.status === 'error') {
                setError(data.message || 'Email yoki parol noto\'g\'ri')
            } else {
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('user', JSON.stringify(data.user))
                navigate('/dashboard')
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
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold tracking-tight mb-4">
                        <span className="bg-primary/20 p-2 rounded-xl">🎙️</span>
                        <span className="text-gradient">AI Dubbing</span>
                    </Link>
                    <h2 className="text-xl font-bold text-white">Xush kelibsiz!</h2>
                    <p className="mt-2 text-sm text-text-muted">Davom etish uchun hisobingizga kiring</p>
                </div>

                <div className="p-10 rounded-[2.5rem] glass border-white/10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted ml-1">Email manzili</label>
                            <input
                                name="username"
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="w-full px-5 py-4 rounded-2xl text-sm glass border-white/5 outline-none focus:border-primary/50 transition-all placeholder:text-text-dim"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted ml-1">Parol</label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-5 py-4 rounded-2xl text-sm glass border-white/5 outline-none focus:border-primary/50 transition-all placeholder:text-text-dim"
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
                            className="mt-4 py-4 rounded-2xl font-bold text-white bg-primary hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Kirilmoqda...' : 'Kirish'}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-sm text-text-muted">
                    Hisobingiz yo'qmi?{' '}
                    <Link to="/register" className="text-primary-light font-bold hover:underline underline-offset-4">
                        Ro'yxatdan o'ting
                    </Link>
                </p>
            </div>
        </div>
    )
}

