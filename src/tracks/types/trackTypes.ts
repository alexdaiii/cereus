import {
  BarData,
  BarTrack,
  DefaultTracks,
  PointData,
  PointTrack,
  RowData,
  RowDataWithHeight,
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

export type CereusSequenceTracks = SequenceTrack<DiscreteData<SequenceData>>;

export type CereusBarData = BarData;
export type CereusTrackData = BarData;

export type CereusBarTracks =
  | BarTrack<"bar", DiscreteData<CereusBarData>>
  | BarTrack<"bond", DiscreteData<CereusTrackData>>;

export type PointWithQuantity = PointData & {
  readonly quantity: number;
};

export type CereusPointTracks =
  | PointTrack<"point", DiscreteData<PointData>>
  | PointTrack<"heatmap", DiscreteData<PointWithQuantity>>
  | PointTrack<"line", PointWithQuantity>
  | PointTrack<"area", PointWithQuantity>;

/**
 * The types of tracks that Cereus supports out of the box.
 */
export type CereusTracks = DefaultTracks<
  CereusSequenceTracks,
  CereusBarTracks,
  CereusPointTracks
>;

/**
 * The data shape for a single row in the sequence viewer.
 */
export type CereusRowData = RowData<CereusTracks>;

/**
 * The data shape returned by CereusPlot for a single row in the sequence viewer.
 */
export type CereusRowDataWithHeight = RowDataWithHeight<CereusRowData>;
/**
 * The data shape returned by CereusPlot for a single track for a row in the
 * sequence viewer.
 */
export type CereusTrackDataWithHeight =
  CereusRowDataWithHeight["tracks"][number];
