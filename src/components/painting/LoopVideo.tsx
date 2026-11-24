"use client";

import { useEffect, useRef, useState } from "react";
import type { PaintingVideo } from "@/data/videos";
import { asset } from "@/lib/paths";

/**
 * A silent, looping video that only plays while it is on screen (saves data
 * and battery). It has a visible pause button, and stays on its poster frame
 * for people who prefer reduced motion until they press play.
 */
export function LoopVideo({ video, className = "" }: { video: PaintingVideo; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  // Set when someone presses play, which overrides the reduced-motion default.
  const [userPlayed, setUserPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !userPlayed;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused && !reduce) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [userPaused, userPlayed]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      setUserPaused(false);
      setUserPlayed(true);
      el.play().catch(() => {});
    } else {
      setUserPaused(true);
      el.pause();
    }
  };

  return (
    <div className={`relative overflow-hidden bg-lapis-deep ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={asset(`/videos/${video.id}.mp4`)}
        poster={asset(`/videos/${video.id}.webp`)}
        width={video.width}
        height={video.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`${video.title}: ${video.caption}`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause video: ${video.title}` : `Play video: ${video.title}`}
        className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-[#13254a]/70 text-[#f4ecdc] backdrop-blur transition-colors hover:bg-[#13254a]"
      >
        {playing ? (
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden><rect x="4" y="3" width="4" height="14" rx="1" fill="currentColor" /><rect x="12" y="3" width="4" height="14" rx="1" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 20 20" className="ml-0.5 h-4 w-4" aria-hidden><path d="M5 3l12 7-12 7z" fill="currentColor" /></svg>
        )}
      </button>
    </div>
  );
}
