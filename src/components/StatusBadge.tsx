import React from 'react';

export type JobStatus = 'queued' | 'transcribing' | 'translating' | 'synthesizing' | 'completed' | 'failed';

interface StatusBadgeProps {
  status: JobStatus;
  progress?: number;
}

const statusConfig: Record<JobStatus, { label: string; color: string; dotColor: string }> = {
  queued: { label: 'Navbatda', color: 'bg-zinc-800 text-zinc-300 border-zinc-700', dotColor: 'bg-zinc-400' },
  transcribing: { label: 'Transkripsiya...', color: 'bg-blue-950/40 text-blue-300 border-blue-800/50', dotColor: 'bg-blue-400 animate-pulse' },
  translating: { label: 'Tarjima...', color: 'bg-indigo-950/40 text-indigo-300 border-indigo-800/50', dotColor: 'bg-indigo-400 animate-pulse' },
  synthesizing: { label: 'Dublyaj (TTS)...', color: 'bg-purple-950/40 text-purple-300 border-purple-800/50', dotColor: 'bg-purple-400 animate-pulse' },
  completed: { label: 'Tayyor', color: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50', dotColor: 'bg-emerald-400' },
  failed: { label: 'Xatolik', color: 'bg-rose-950/40 text-rose-300 border-rose-800/50', dotColor: 'bg-rose-400' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, progress }) => {
  const config = statusConfig[status] || statusConfig.queued;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      <span>{config.label}</span>
      {typeof progress === 'number' && progress >= 0 && progress <= 100 && (
        <span className="font-mono text-[10px] opacity-80">({progress}%)</span>
      )}
    </span>
  );
};
