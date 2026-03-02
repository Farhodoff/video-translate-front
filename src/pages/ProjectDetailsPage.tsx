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
        <div className="min-h-screen" style={{ background: 'var(--bg-dark)', color: 'white' }}>
            <header className="px-8 py-4 border-b flex justify-between items-center bg-dark/50" style={{ borderColor: 'var(--border-color)' }}>
                <div className="h-8 w-32 bg-slate-800 animate-pulse rounded" />
                <div className="h-10 w-24 bg-slate-800 animate-pulse rounded-xl" />
            </header>
            <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="aspect-video bg-slate-800 animate-pulse rounded-2xl border" style={{ borderColor: 'var(--border-color)' }} />
                    <div className="h-32 bg-slate-800 animate-pulse rounded-2xl border" style={{ borderColor: 'var(--border-color)' }} />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-slate-800 animate-pulse rounded-xl border" style={{ borderColor: 'var(--border-color)' }} />
                    ))}
                </div>
            </main>
        </div>
    )

    if (error || !project) return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-dark)' }}>
            <div className="text-center p-10 rounded-3xl border max-w-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <p className="text-5xl mb-6">⚠️</p>
                <h2 className="text-xl font-bold mb-2">Xatolik yuz berdi</h2>
                <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>{error || 'Loyiha topilmadi yoki yuklashda xatolik yuz berdi'}</p>
                <Link to="/dashboard" className="inline-block px-8 py-3 rounded-xl font-semibold transition-all hover:opacity-90" style={{ background: 'var(--primary)', color: 'white' }}>
                    Dashboardga qaytish
                </Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen pb-20" style={{ background: 'var(--bg-dark)', color: 'white' }}>
            <header className="px-8 py-4 border-b flex justify-between items-center bg-dark/50 sticky top-0 backdrop-blur-md z-10" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="text-sm border px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                        ← Orqaga
                    </Link>
                    <h1 className="font-bold">Loyiha: {id}</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ background: 'var(--primary)' }}
                >
                    {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Video Player */}
                <div className="sticky top-24 self-start">
                    <div className="rounded-2xl overflow-hidden border bg-black shadow-2xl" style={{ borderColor: 'var(--border-color)' }}>
                        <video
                            src={project.video_url}
                            controls
                            className="w-full h-auto max-h-[60vh]"
                        />
                    </div>
                    <div className="mt-6 p-6 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <h3 className="font-semibold mb-2">Loyiha Ma'lumotlari</h3>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>ID: {id}</p>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Segmentlar soni: {project.segments.length}</p>
                    </div>
                </div>

                {/* Editor */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold mb-2">Tahrirlash</h2>
                    {project.segments.map((s, i) => (
                        <div key={i} className="p-4 rounded-xl border flex flex-col gap-3 transition-colors hover:border-purple-500/30"
                            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            <div className="flex justify-between items-center text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                                <span>{s.start.toFixed(2)}s — {s.end.toFixed(2)}s</span>
                                <span>#{i + 1}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <div>
                                    <label className="text-[10px] uppercase font-bold mb-1 block" style={{ color: 'var(--text-muted)' }}>Asl matn</label>
                                    <textarea
                                        value={s.text}
                                        onChange={(e) => updateSegment(i, 'text', e.target.value)}
                                        rows={2}
                                        className="w-full bg-[#0f172a] border rounded-lg p-2.5 text-sm resize-none outline-none focus:border-purple-500"
                                        style={{ borderColor: 'var(--border-color)' }}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold mb-1 block" style={{ color: 'var(--primary)' }}>Tarjima</label>
                                    <textarea
                                        value={s.translated || ''}
                                        onChange={(e) => updateSegment(i, 'translated', e.target.value)}
                                        rows={2}
                                        placeholder="Tarjimani kiriting..."
                                        className="w-full bg-[#0f172a] border rounded-lg p-2.5 text-sm resize-none outline-none focus:border-purple-500"
                                        style={{ borderColor: 'var(--border-color)' }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
