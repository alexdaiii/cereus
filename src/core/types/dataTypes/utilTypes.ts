/**
 * -------------------------
 * UTILITY TYPES
 * -------------------------
 */
import {RowData} from "./rowTypes";
import {TrackData} from "./trackTypes";

/**
 * Infer the track type from a RowData type
 */
export type InferTrackType<T extends RowData<TrackData>> = T["tracks"][number];
