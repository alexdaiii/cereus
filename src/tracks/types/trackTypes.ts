import {RowData, TrackData} from "@/core/types";

export type CereusSequenceData = {
  /**
   * Where in the domain to begin plotting the sequence.
   */
  begin: number;
  /**
   * The sequence to plot. If begin + sequence.length > domainMax
   * (from a DomainProvider), the sequence will be cut off.
   */
  sequence: string;
};

export type CereusSequenceTrack = TrackData<"sequence", CereusSequenceData>;

export type CereusBlockData = {
  /**
   * The beginning of the block.
   */
  begin: number;
  /**
   * The end of the block.
   */
  end: number;
  /**
   * Gaps in the block.
   */
  gaps?: CereusBlockGap[];
};

export type CereusBlockGap = {
  /**
   * The beginning of the gap.
   */
  begin: number;
  /**
   * The end of the gap.
   */
  end: number;
  /**
   * Whether to connect the previous block to the next block.
   */
  isConnected?: boolean;
};

export type CereusBlockTrack = TrackData<"block", CereusBlockData>;

export type CereusPointData = {
  /**
   * The positions of the points.
   */
  positions: number[];
};

export type CereusPointTrack = TrackData<"point", CereusPointData>;

/**
 * A heatmap data point. Cereus will automatically format the data to be in the
 * the format that @visx/heatmap expects.
 */
export type CereusHeatmapData = {
  /**
   * The x position
   */
  bin: number;
  /**
   * The count of the bin
   */
  count: number;
};

export type CereusHeatmapTrack = TrackData<"heatmap", CereusHeatmapData[]>;

/**
 * The types of tracks that Cereus supports out of the box.
 */
export type CereusTracks =
  | CereusSequenceTrack
  | CereusBlockTrack
  | CereusPointTrack
  | CereusHeatmapTrack;

export type CereusRowData = RowData<CereusTracks>;
