/**
 * -------------------------
 * UTILITY TYPES
 * -------------------------
 */

/**
 * Infer the track type from a RowData type
 */
export type InferTrackType<T extends {tracks: unknown[]}> = T["tracks"][number];
