/**
 * -------------------------
 * UTILITY TYPES
 * -------------------------
 */

/**
 * Infer the track type from a RowData type
 */
export type InferTrackType<TrackDataT extends {tracks: unknown[]}> =
  TrackDataT["tracks"][number];
