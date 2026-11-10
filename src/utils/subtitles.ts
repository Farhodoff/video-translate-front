export interface SubtitleSegment {
  id?: string | number;
  start: number;
  end: number;
  text: string;
}

export function formatTimeSRT(seconds: number): string {
  const pad = (num: number, size: number) => num.toString().padStart(size, '0');
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)},${pad(ms, 3)}`;
}

export function formatTimeVTT(seconds: number): string {
  const pad = (num: number, size: number) => num.toString().padStart(size, '0');
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}.${pad(ms, 3)}`;
}

export function generateSRT(segments: SubtitleSegment[]): string {
  return segments
    .map((seg, idx) => `${idx + 1}\n${formatTimeSRT(seg.start)} --> ${formatTimeSRT(seg.end)}\n${seg.text}\n`)
    .join('\n');
}

export function generateVTT(segments: SubtitleSegment[]): string {
  const body = segments
    .map((seg, idx) => `${idx + 1}\n${formatTimeVTT(seg.start)} --> ${formatTimeVTT(seg.end)}\n${seg.text}\n`)
    .join('\n');
  return `WEBVTT\n\n${body}`;
}
