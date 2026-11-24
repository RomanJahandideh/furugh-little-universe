/**
 * Videos on the Decorative Painting page. Files are made by
 *   python scripts/process_videos.py "<folder with .MOV files>"
 * which writes public/videos/<id>.mp4 and <id>.webp (poster).
 */
export interface PaintingVideo {
  id: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  kind: "process" | "space";
  withForough?: boolean;
}

export const paintingVideos: PaintingVideo[] = [
  { id: "process-wall", title: "A wall, start to finish", caption: "Forough working across a large decorative wall.", width: 452, height: 796, kind: "process", withForough: true },
  { id: "process-cornice", title: "Up at the cornice", caption: "On the step stool, finishing ornament along the ceiling line.", width: 720, height: 1280, kind: "process", withForough: true },
  { id: "process-panel", title: "Close to the panel", caption: "Working the surface of a framed panel by hand.", width: 720, height: 1280, kind: "process", withForough: true },
  { id: "dome-hall", title: "The dome hall", caption: "Teal relief, painted fruit and a gold-leaf dome of birds and blossoms.", width: 1280, height: 720, kind: "space" },
  { id: "grand-hall", title: "Walking the hall", caption: "From the gilded column up into the painted dome.", width: 1280, height: 720, kind: "space" },
  { id: "blossom-oval", title: "Silver-leaf blossom", caption: "A raised blossom branch on a silver-leaf oval, framed in carved ornament.", width: 1280, height: 720, kind: "space" },
];
