import { useEffect, RefObject } from 'react';

interface HotkeyOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  seekStep?: number;
}

export function useVideoHotkeys({ videoRef, seekStep = 3 }: HotkeyOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA' || (activeEl as HTMLElement)?.isContentEditable;
      if (isInput) return;

      const video = videoRef.current;
      if (!video) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      } else if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - seekStep);
      } else if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        video.currentTime = Math.min(video.duration || 0, video.currentTime + seekStep);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoRef, seekStep]);
}
