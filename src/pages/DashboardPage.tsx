import { useEffect, useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/client'

interface Project {
    id: number
    project_id?: string
    title: string
    video_url: string
    status: string
}

export default function DashboardPage() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [user, setUser] = useState<{ full_name: string } | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [uploadType, setUploadType] = useState<'url' | 'file'>('url')

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) setUser(JSON.parse(userData))
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects')
            setProjects(res.data.data)
        } catch {
            console.error('Loyihalarni yuklashda xatolik')
        } finally {
            setLoading(false)
        }
    }

    const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (uploadType === 'url' && !youtubeUrl) {
            alert('Iltimos, YouTube havolasini kiriting')
            return
        }

        setIsCreating(true)
        const formData = new FormData(e.currentTarget)
        if (uploadType === 'url') {
            formData.set('youtube_url', youtubeUrl)
            formData.delete('file')
        } else {
            formData.delete('youtube_url')
        }

        try {
            const res = await api.post('/projects', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            if (res.data?.status === 'success') {
                const projectId = res.data.data.id
                navigate(`/project/${projectId}`)
            }
        } catch (err: any) {
            alert(err.response?.data?.message || 'Loyiha yaratishda xatolik')
        } finally {
            setIsCreating(false)
        }
    }

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const filteredProjects = projects.filter(p =>
        p.id?.toString().includes(search) ||
        p.title?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-[#070809] text-white selection:bg-primary/30">
            {/* Premium Glass Pill Navbar */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
                <nav className="bg-[#070809]/40 backdrop-blur-2xl border-t border-t-white/10 border-x border-x-white/5 border-b border-b-white/5 rounded-full px-8 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
                    <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
                        <span className="text-primary text-2xl">🎙️</span>
                        <span className="hidden sm:inline text-white text-lg">AI Dub</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-10 text-[13px] font-bold text-white/50">
                        <Link to="/" className="text-white hover:text-primary transition-colors">Asosiy</Link>
                        <a href="/#features" className="hover:text-white transition-colors">Imkoniyatlar</a>
                        <a href="/#pricing" className="hover:text-white transition-colors">Tariflar</a>
                        <a href="/#faq" className="hover:text-white transition-colors">FAQ</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#525459]">Foydalanuvchi</p>
                            <p className="text-xs font-bold text-white/80">{user?.full_name || 'Mehmon'}</p>
                        </div>
                        <button onClick={logout} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 transition-all text-[#525459] hover:text-red-500 shadow-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        </button>
                    </div>
                </nav>
            </div>

            <main className="max-w-7xl mx-auto px-10 pt-48 pb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 animate-fade-in">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tight leading-tight">Mening <span className="text-primary">Loyihalarim</span></h1>
                        <p className="text-text-muted font-medium text-lg max-w-xl">Barcha videolaringiz va dublyajlaringiz uchun markaziy boshqaruv.</p>
                    </div>

                    <div className="relative group max-w-sm w-full">
                        <div className="relative flex items-center bg-[#111214] border border-white/10 rounded-2xl overflow-hidden p-1.5 focus-within:border-primary/50 transition-all">
                            <div className="pl-4 pr-3 text-text-dim">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Loyiha ID yoki nomi bo'yicha qidirish..."
                                className="flex-grow bg-transparent border-none outline-none py-4 text-sm font-medium placeholder:text-text-dim"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Create Project Section */}
                    <div className="lg:col-span-4 space-y-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="bg-[#121417] border border-white/5 rounded-[2.5rem] p-10 space-y-10 shadow-2xl">
                            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 text-white/90">
                                <span className="text-primary">＋</span> Yangi Loyiha
                            </h2>

                            <div className="flex p-1 bg-black/20 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setUploadType('url')}
                                    className={`flex-1 py-2 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadType === 'url' ? 'bg-primary text-black' : 'text-text-dim hover:text-white'}`}
                                >
                                    Link orqali
                                </button>
                                <button
                                    onClick={() => setUploadType('file')}
                                    className={`flex-1 py-2 text-[11px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadType === 'file' ? 'bg-primary text-black' : 'text-text-dim hover:text-white'}`}
                                >
                                    Fayl yuklash
                                </button>
                            </div>

                            <form onSubmit={handleCreateProject} className="space-y-8">
                                {uploadType === 'url' ? (
                                    <div className="space-y-4">
                                        <label className="block text-[11px] uppercase font-black tracking-widest text-text-dim ml-1">YouTube Havolasi</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={youtubeUrl}
                                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                                placeholder="https://youtube.com/watch?v=..."
                                                className="w-full bg-black/20 border border-white/10 rounded-2xl p-5 text-sm font-bold text-white outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <label className="block text-[11px] uppercase font-black tracking-widest text-text-dim ml-1">Video Fayl</label>
                                        <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-10 cursor-pointer hover:border-primary/30 hover:bg-primary/[0.02] transition-all group">
                                            <input
                                                name="file"
                                                type="file"
                                                accept="video/*"
                                                required={uploadType === 'file'}
                                                className="hidden"
                                            />
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                                                <svg className="w-8 h-8 text-text-dim group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                            </div>
                                            <p className="text-sm font-bold text-text-muted group-hover:text-white transition-colors">Video yuklash</p>
                                            <p className="text-[10px] text-text-dim mt-2 uppercase tracking-widest">MP4, MOV (MAX 50MB)</p>
                                        </label>
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="w-full bg-primary hover:bg-primary-dark py-5 rounded-2xl font-black text-black tracking-tight transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isCreating ? 'Yaratilmoqda...' : 'Loyihani Boshlash'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="lg:col-span-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-80 rounded-[2.5rem] bg-white/[0.03] animate-pulse border border-white/5" />
                                ))}
                            </div>
                        ) : filteredProjects.length === 0 ? (
                            <div className="py-40 text-center bg-[#121417] border border-white/5 rounded-[4rem] shadow-2xl">
                                <p className="text-6xl mb-8">📂</p>
                                <h3 className="text-2xl font-bold mb-2 text-white/90">Loyihalar topilmadi</h3>
                                <p className="text-white/40 font-medium">Hali birorta loyiha yaratmagansiz.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredProjects.map((p) => (
                                    <div key={p.id} className="bg-[#121417] border border-white/5 rounded-[3rem] overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                                        <div className="aspect-video relative overflow-hidden bg-black/40">
                                            <video src={p.video_url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                                            <div className="absolute top-6 left-6">
                                                <div className="px-5 py-2 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-[10px] font-black uppercase tracking-widest text-primary">
                                                    {p.status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 space-y-8">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-dim mb-1">Project ID</p>
                                                    <h3 className="text-2xl font-black tracking-tight">#{p.id}</h3>
                                                </div>
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-dim">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                                                </div>
                                            </div>

                                            <Link to={`/project/${p.id}`} className="flex items-center justify-between w-full p-5 bg-white/5 rounded-2xl border border-white/5 group/link hover:border-primary/40 hover:bg-primary/5 transition-all">
                                                <span className="text-[13px] font-black uppercase tracking-widest text-primary">Tahrirlash</span>
                                                <span className="text-xl text-primary group-hover/link:translate-x-2 transition-transform duration-300">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
