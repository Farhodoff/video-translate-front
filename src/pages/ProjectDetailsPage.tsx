import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/client'

interface Segment {
    start: number
    end: number
    text: string
    translated: string | null
    speaker?: string
}

interface Project {
    project_id: number
    title: string
    video_url?: string
    final_video_url?: string
    status: string
    progress?: number
    segments: Segment[]
}

export default function ProjectDetailsPage() {
    const { id } = useParams()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [selectedVoice, setSelectedVoice] = useState('uz_male_dilmurod')
    const [voiceSpeed, setVoiceSpeed] = useState('1.0')
    const [exportNotice, setExportNotice] = useState<string | null>(null)

    const videoRef = useRef<HTMLVideoElement>(null)

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

    // WebSocket auto-reconnect with heartbeat
    useEffect(() => {
        if (!id) return;
        let ws: WebSocket | null = null;
        let pingInterval: ReturnType<typeof setInterval> | null = null;
        let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
        let retryDelay = 1000;
        let isUnmounted = false;

        function connect() {
            if (isUnmounted) return;
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const token = localStorage.getItem('token');
            const wsBaseUrl = import.meta.env.VITE_WS_URL || `${protocol}//${window.location.host}/api/ws/project/${id}`;
            const wsUrl = token ? `${wsBaseUrl}${wsBaseUrl.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}` : wsBaseUrl;

            ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                retryDelay = 1000;
                pingInterval = setInterval(() => {
                    if (ws?.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'ping' }));
                    }
                }, 15000);
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.status) {
                        setProject(prev => prev ? { ...prev, status: data.status, progress: data.progress } : prev);
                    }
                } catch (e) {
                    console.error("WS parse xatosi:", e);
                }
            };

            ws.onclose = () => {
                if (pingInterval) clearInterval(pingInterval);
                if (!isUnmounted) {
                    reconnectTimeout = setTimeout(connect, retryDelay);
                    retryDelay = Math.min(retryDelay * 2, 30000);
                }
            };

            ws.onerror = () => {
                ws?.close();
            };
        }

        connect();

        return () => {
            isUnmounted = true;
            if (pingInterval) clearInterval(pingInterval);
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
            ws?.close();
        };
    }, [id]);

    // Pro Hotkeys: Space (Play/Pause), J (Rewind 3s), L (Forward 3s)
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
            if (e.code === 'Space') {
                e.preventDefault();
                if (videoRef.current) {
                    if (videoRef.current.paused) videoRef.current.play();
                    else videoRef.current.pause();
                }
            } else if (e.code === 'KeyJ') {
                if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 3);
            } else if (e.code === 'KeyL') {
                if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.duration || 9999, videoRef.current.currentTime + 3);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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

    function previewSegment(start: number, end: number) {
        if (!videoRef.current) return
        videoRef.current.currentTime = start
        videoRef.current.play().catch(() => {})
        const checkEnd = () => {
            if (videoRef.current && videoRef.current.currentTime >= end) {
                videoRef.current.pause()
                videoRef.current.removeEventListener('timeupdate', checkEnd)
            }
        }
        videoRef.current.addEventListener('timeupdate', checkEnd)
    }

    function exportSubtitles(format: 'srt' | 'vtt') {
        if (!project?.segments) return
        const formatTime = (seconds: number, isVtt: boolean) => {
            const date = new Date(0)
            date.setMilliseconds(seconds * 1000)
            const iso = date.toISOString().substring(11, 23)
            return isVtt ? iso : iso.replace('.', ',')
        }

        let content = ''
        if (format === 'vtt') {
            content = 'WEBVTT\n\n' + project.segments.map((seg, idx) => {
                const text = seg.translated || seg.text
                return `${idx + 1}\n${formatTime(seg.start, true)} --> ${formatTime(seg.end, true)}\n${text}\n`
            }).join('\n')
        } else {
            content = project.segments.map((seg, idx) => {
                const text = seg.translated || seg.text
                return `${idx + 1}\n${formatTime(seg.start, false)} --> ${formatTime(seg.end, false)}\n${text}\n`
            }).join('\n')
        }

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `project_${id}_subtitles.${format}`
        a.click()
        URL.revokeObjectURL(url)
        setExportNotice(`${format.toUpperCase()} fayli yuklab olindi!`)
        setTimeout(() => setExportNotice(null), 3000)
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
            {/* Header */}
            <header className="pt-10 px-6 fixed top-0 left-0 right-0 z-50 pointer-events-none">
                <nav className="max-w-7xl mx-auto glass rounded-[2rem] px-10 py-5 flex items-center justify-between border-white/[0.03] shadow-2xl pointer-events-auto">
                    <div className="flex items-center gap-6">
                        <Link to="/dashboard" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-text-dim hover:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </Link>
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">DUB STUDIO EDITOR</p>
                            <h1 className="text-lg font-bold">Loyiha #{id}</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {exportNotice && (
                            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                                {exportNotice}
                            </span>
                        )}
                        <button
                            onClick={() => exportSubtitles('srt')}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-300 transition"
                            title="Subtitrlarni SRT formatida yuklab olish"
                        >
                            📥 SRT
                        </button>
                        <button
                            onClick={() => exportSubtitles('vtt')}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-300 transition"
                            title="Subtitrlarni VTT formatida yuklab olish"
                        >
                            📥 VTT
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-primary hover:bg-primary-dark text-black px-8 py-2.5 rounded-xl font-bold text-xs transition-all disabled:opacity-50"
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
                                    ref={videoRef}
                                    src={project.final_video_url || project.video_url}
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="bg-[#111214] border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-3">
                                    <span className="w-1 h-5 bg-primary rounded-full" />
                                    AI Dublyaj Ovozini Sozlash
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold text-text-dim uppercase tracking-wider mb-2">
                                            Diktor Ovozi (Voice Profile)
                                        </label>
                                        <select
                                            value={selectedVoice}
                                            onChange={(e) => setSelectedVoice(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-medium text-white outline-none focus:border-primary/50"
                                        >
                                            <option value="uz_male_dilmurod">O'zbekcha Erkak (Dilmurod - Tabiiy)</option>
                                            <option value="uz_female_malika">O'zbekcha Ayol (Malika - Rasmiy)</option>
                                            <option value="en_male_alex">English Male (Alex - Deep)</option>
                                            <option value="en_female_emma">English Female (Emma - Studio)</option>
                                            <option value="ru_male_dmitry">Русский Мужской (Дмитрий)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-text-dim uppercase tracking-wider mb-2">
                                            Ovoz Tezligi: {voiceSpeed}x
                                        </label>
                                        <input
                                            type="range"
                                            min="0.75"
                                            max="1.5"
                                            step="0.05"
                                            value={voiceSpeed}
                                            onChange={(e) => setVoiceSpeed(e.target.value)}
                                            className="w-full accent-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#111214] border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-3">
                                    <span className="w-1 h-5 bg-primary rounded-full" />
                                    Loyiha Holati & Hotkeys
                                </h3>
                                <div className="space-y-3 text-xs font-bold">
                                    <div className="flex justify-between py-2 border-b border-white/5">
                                        <span className="text-text-muted uppercase">Segmentlar</span>
                                        <span className="text-primary">{project.segments.length} ta</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-white/5">
                                        <span className="text-text-muted uppercase">Hotkeys</span>
                                        <span className="font-mono text-zinc-400">Space (Play/Pause), J/L (±3s)</span>
                                    </div>
                                    <div className="flex justify-between py-2 text-xs items-center">
                                        <span className="text-text-muted uppercase">Holat</span>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <span className={project.status === 'Ready' || project.status === 'Completed' ? 'text-emerald-400 font-bold' : 'text-primary font-bold animate-pulse'}>
                                                {project.status === 'Processing' ? 'Kutuvda...' :
                                                    project.status === 'Transcribing' ? 'Transkripsiya...' :
                                                        project.status === 'Translating' ? 'Tarjima qilinmoqda...' :
                                                            project.status === 'Dubbing' ? 'Ovoz berilmoqda...' :
                                                                project.status}
                                                {project.progress !== undefined && project.progress > 0 && ` (${project.progress}%)`}
                                            </span>
                                            {project.progress !== undefined && project.progress > 0 && project.status !== 'Ready' && project.status !== 'Completed' && (
                                                <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary transition-all duration-300 ease-out"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor Section */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-8 order-1 xl:order-2 animate-fade-in">
                        <div className="flex items-center justify-between border-b border-white/5 pb-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black tracking-tight">Dublyaj Muharriri</h2>
                                <p className="text-text-muted text-sm font-medium">Segmentlarni tahrirlang va tarjimani tasdiqlang.</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {project.segments.map((s, i) => (
                                <div key={i} className="bg-[#111214] border border-white/5 p-6 rounded-[2rem] hover:border-primary/20 transition-all group">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black text-xs">
                                                {String(i + 1).padStart(2, '0')}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-text-dim uppercase tracking-wider">Vaqt belgisi</p>
                                                <p className="text-xs font-bold text-primary-light">{s.start.toFixed(2)}s — {s.end.toFixed(2)}s</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => previewSegment(s.start, s.end)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition text-[11px] font-bold text-text-dim hover:text-primary"
                                        >
                                            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            <span>Tinglash</span>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-black uppercase tracking-wider text-text-dim ml-1">Original Matn</label>
                                            <textarea
                                                value={s.text}
                                                onChange={(e) => updateSegment(i, 'text', e.target.value)}
                                                className="w-full bg-black/30 border border-white/5 rounded-xl p-3.5 text-xs font-medium text-text-muted min-h-[80px] resize-none focus:border-white/20 outline-none transition"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-black uppercase tracking-wider text-primary-light ml-1">AI Tarjimasi</label>
                                            <textarea
                                                value={s.translated || ''}
                                                onChange={(e) => updateSegment(i, 'translated', e.target.value)}
                                                className="w-full bg-primary/[0.03] border border-primary/10 rounded-xl p-3.5 text-xs font-bold text-white min-h-[80px] resize-none focus:border-primary/30 outline-none transition"
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
