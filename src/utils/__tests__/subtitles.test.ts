import { describe, it, expect } from 'vitest';

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

describe('Subtitle Time Formatting', () => {
  it('formats SRT timestamp with comma separator', () => {
    expect(formatTimeSRT(0)).toBe('00:00:00,000');
    expect(formatTimeSRT(65.45)).toBe('00:01:05,450');
    expect(formatTimeSRT(3661.123)).toBe('01:01:01,123');
  });

  it('formats VTT timestamp with dot separator', () => {
    expect(formatTimeVTT(0)).toBe('00:00:00.000');
    expect(formatTimeVTT(65.45)).toBe('00:01:05.450');
    expect(formatTimeVTT(3661.123)).toBe('01:01:01.123');
  });
});
