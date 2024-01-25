import {RowData, RowDataWithHeight, TrackData} from "@/core/types";

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
   * Connect the previous block to this block. If there is no previous block,
   * this will be ignored.
   */
  connectPrevious?: boolean;
  /**
   * Connect the next block to this block. If there is no next block,
   * this will be ignored.
   */
  connectNext?: boolean;
};

export type CereusBlockTrack = TrackData<"block", CereusBlockData[]>;

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
