"use client";

import Link from "next/link";
import { LiftText, PullUp } from "@/components/mechanics/PullUp";
import { paintingVideos } from "@/data/videos";
import { Stage } from "@/components/stage/Stage";
import { LoopVideo } from "./LoopVideo";

/** The process clips in rounded-top frames, on a dark band. Used on home and the painting page. */
export function ProcessVideos({ linkToPainting = false }: { linkToPainting?: boolean }) {
  const process = paintingVideos.filter((x) => x.kind === "process");
  return (
    <Stage tone="char" aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="label text-gold">Process</p>
            <h2 id="process-title" className="font-black mt-3 text-[clamp(2.6rem,7vw,5rem)] text-gold">
              <LiftText>Watch the work take shape</LiftText>
            </h2>
          </div>
          {linkToPainting && (
            <Link href="/decorative-painting/" className="btn self-start bg-gold text-char hover:brightness-105 md:self-auto">
              All painting work <span aria-hidden>&rarr;</span>
            </Link>
          )}
        </div>
        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
          {process.map((x) => (
            <li key={x.id} className="w-[72vw] shrink-0 snap-center sm:w-auto">
              <PullUp steps={5} className="rounded-t-[999px]">
                <LoopVideo video={x} className="aspect-[9/16] rounded-t-[999px]" />
              </PullUp>
              <p className="font-display mt-4 text-2xl">{x.title}</p>
              <p className="mt-1 text-[0.95rem] text-paper/60">{x.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}
