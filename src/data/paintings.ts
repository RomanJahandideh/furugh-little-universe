/**
 * Details for each decorative-painting photo. The image files are made by
 *   python scripts/process_images.py "<folder>" --set paintings
 * and matched here by `id` (the original file name, lower-cased:
 * IMG_1234.JPG -> "img-1234").
 *
 * Fewer, better photos: only add the strongest shots. `featured` photos
 * appear on the landing page; `withForough` marks photos where she is in
 * the frame, which get the large spots.
 */
export interface PaintingWork {
  id: string;
  title: string;
  alt: string;
  /** Short line under the title, e.g. "Hand-painted lotus frieze". */
  caption?: string;
  featured: boolean;
  withForough?: boolean;
  order: number;
}

export const paintingDetails: PaintingWork[] = [];
