import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/client'

interface Segment {
    start: number
    end: number
    text: string
    translated: string | null
}

interface Project {
    project_id: string
    video_url: string
    segments: Segment[]
}

export default function ProjectDetailsPage() {
    const { id } = useParams()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const fetchProject = useCallback(async () => {
        try {
            const res = await api.get(`/project/${id}`)
            setProject(res.data.data)
        } catch {
            setError('Loyiha topilmadi yoki yuklashda xatolik')
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchProject()
    }, [id, fetchProject])

    async function handleSave() {
        if (!project) return
        setSaving(true)
        try {
            await api.put(`/project/${id}`, { segments: project.segments })
            alert('Muvaffaqiyatli saqlandi')
        } catch {
            alert('Saqlashda xatolik')
        } finally {
            setSaving(false)
        }
    }

    function updateSegment(index: number, field: keyof Segment, value: string) {
        if (!project) return
        const newSegments = [...project.segments]
        // @ts-expect-error - dynamic field update
        newSegments[index][field] = value
        setProject({ ...project, segments: newSegments })
    }

    if (loading) return (
        <div className="min-h-screen bg-[#070809] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
    )

    if (error || !project) return (
        <div className="min-h-screen bg-[#070809] flex items-center justify-center p-10">
            <div className="max-w-md w-full bg-[#111214] border border-white/10 rounded-[2.5rem] p-12 text-center space-y-8">
                <span className="text-6xl">⚠️</span>
                <h2 className="text-3xl font-bold">Xatolik yuz berdi</h2>
                <p className="text-text-muted">{error || 'Loyiha topilmadi'}</p>
                <Link to="/dashboard" className="block w-full bg-primary text-black py-4 rounded-2xl font-bold transition-all hover:bg-primary-dark">
                    Dashboardga qaytish
                </Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#070809] text-white selection:bg-primary/30 font-sans">
            {/* Strict Figma Header */}
            <header className="pt-10 px-6 fixed top-0 left-0 right-0 z-50 pointer-events-none">
                <nav className="max-w-7xl mx-auto glass rounded-[2rem] px-10 py-5 flex items-center justify-between border-white/[0.03] shadow-2xl pointer-events-auto">
                    <div className="flex items-center gap-6">
                        <Link to="/dashboard" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-text-dim hover:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </Link>
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">DUB EDITOR</p>
                            <h1 className="text-lg font-bold">Loyiha #{id?.slice(-8)}</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Auto-Save active</span>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-primary hover:bg-primary-dark text-black px-10 py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                        >
                            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                        </button>
                    </div>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-10 pt-48 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Media Section */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-10 order-2 xl:order-1">
                        <div className="sticky top-48 space-y-10">
                            <div className="bg-[#111214] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video bg-black/40 relative group">
                                <video
                                    src={project.video_url}
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="bg-[#111214] border border-white/10 p-10 rounded-[2.5rem] space-y-8">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <span className="w-1 h-6 bg-primary rounded-full" />
                                    Loyiha ma'lumotlari
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-4 border-b border-white/5">
                                        <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Segmentlar</span>
                                        <span className="text-xs font-bold text-primary">{project.segments.length} ta</span>
                                    </div>
                                    <div className="flex justify-between py-4 border-b border-white/5 text-xs font-bold">
                                        <span className="text-text-muted uppercase tracking-widest">Model</span>
                                        <span>Elite Whisper v3.1</span>
                                    </div>
                                    <div className="flex justify-between py-4 text-xs font-bold">
                                        <span className="text-text-muted uppercase tracking-widest">Sifat</span>
                                        <span className="text-emerald-500">4K Ultra HD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor Section */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-8 order-1 xl:order-2 animate-fade-in">
                        <div className="flex items-center justify-between border-b border-white/5 pb-8">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black tracking-tight">Dublyaj Muharriri</h2>
                                <p className="text-text-muted font-medium">Segmentlarni tahrirlang va tarjimani tasdiqlang.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {project.segments.map((s, i) => (
                                <div key={i} className="bg-[#111214] border border-white/5 p-8 rounded-[2.5rem] hover:border-primary/20 transition-all group">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black">
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em]">Vaqt diapazoni</p>
                                                <p className="text-xs font-bold text-primary-light">{s.start.toFixed(2)}s — {s.end.toFixed(2)}s</p>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/20 transition-all text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-primary">
                                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            Preview
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-text-dim ml-1">Original Matn</label>
                                            <textarea
                                                value={s.text}
                                                onChange={(e) => updateSegment(i, 'text', e.target.value)}
                                                className="w-full bg-black/20 border border-white/5 rounded-2xl p-5 text-sm font-medium text-text-muted min-h-[100px] resize-none focus:border-white/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-primary-light ml-1">AI Tarjimasi</label>
                                            <textarea
                                                value={s.translated || ''}
                                                onChange={(e) => updateSegment(i, 'translated', e.target.value)}
                                                className="w-full bg-primary/[0.02] border border-primary/10 rounded-2xl p-5 text-sm font-bold text-white min-h-[100px] resize-none focus:border-primary/30 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
