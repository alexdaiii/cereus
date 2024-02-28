import {
  DefaultTracks,
  IntervalData,
  IntervalTrack,
  PointData,
  PointTrack,
  SequenceData,
  SequenceTrack,
} from "@/core/types";

/**
 * Declares that a track has discrete data. Adds the minOverlapDistance
 * property to the track data.
 */
export type DiscreteData<T> = T & {
  /**
   * The minimum distance between two discrete points in px before
   * they are considered to be overlapping.
   * @default 0
   */
  readonly minOverlapDistance?: number;
};

// -------------------
// Sequence tracks
// -------------------

/**
 * Sequence track - display a string of characters.
 */
export type CereusSequenceTrack = SequenceTrack<
  "sequence",
  DiscreteData<SequenceData>
>;

// -------------------
// Bar tracks
// -------------------

// TODO: add config for border and fill color
export type CereusBarData = IntervalData;

/**
 * Display a bar from start to end
 */
export type CereusBarTrack = IntervalTrack<"bar", DiscreteData<CereusBarData>>;

// TODO: add config for polygon or circle type, line type, and color
export type CereusBondData = IntervalData;

/**
 * Display a polygon or circle connected by a line from start to end
 */
export type CereusBondTrack = IntervalTrack<
  "bond",
  DiscreteData<CereusBondData>
>;

// -------------------
// Point tracks
// -------------------

/**
 * A point with a quantity.
 */
export type PointWithQuantity = PointData & {
  readonly quantity: number;
};

/**
 * Display a point (a polygon or circle usually) at a specific position.
 */
export type CereusPointTrack = PointTrack<"point", DiscreteData<PointData>>;

/**
 * Display a heatmap.
 */
export type CereusHeatmapTrack = PointTrack<
  "heatmap",
  DiscreteData<PointWithQuantity>
>;

/**
 * Display a line chart.
 */
export type CereusLineTrack = PointTrack<"line", PointWithQuantity>;

/**
 * Display an area chart.
 */
export type CereusAreaTrack = PointTrack<"area", PointWithQuantity>;

/**
 * The types of tracks that Cereus supports out of the box.
 */
export type CereusTracks = DefaultTracks<
  CereusSequenceTrack,
  CereusBarTrack | CereusBondTrack,
  CereusPointTrack | CereusHeatmapTrack | CereusLineTrack | CereusAreaTrack
>;

export type CereusTrackTypes = CereusTracks["trackType"];
