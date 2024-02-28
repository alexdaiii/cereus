import IntervalTree from "node-interval-tree";

/**
 * Base data shape for a single track in the sequence viewer.
 */
export type TrackData<
  TrackTypeT extends string = string,
  TrackDataT = unknown,
> = {
  /**
   * Id used to identify the track. Should be unique within a row.
   */
  readonly trackId: string;
  /**
   * Type of track to display.
   */
  readonly trackType: TrackTypeT;
  /**
   * Data to display in the track.
   */
  readonly data: TrackDataT;
};

/**
 * -------------------------
 * DEFAULT TRACK TYPES
 * -------------------------
 */

/**
 * Generic data shape for a track with a string type.
 * Inherit from this type to create a new track type that has a string type.
 */
export type SequenceData = {
  /**
   * Where in the domain to begin plotting the sequence.
   */
  readonly begin: number;
  /**
   * The sequence to plot. If begin + sequence.length > domainMax
   * (from a DomainProvider), the sequence will be cut off.
   */
  readonly sequence: string;
  /**
   * The sequence array to ploy. Null values means that there is nothing to plot
   */
  readonly sequenceArray?: (string | null)[];
};

export type SequenceTrack<
  TrackName extends string,
  SeqDataT extends SequenceData = SequenceData,
> = TrackData<TrackName, SeqDataT>;

/**
 * Generic data shape for a track that has a begin and end.
 * Inherit from this type to create a new track type that has a begin and end.
 */
export type IntervalData = {
  /**
   * The beginning of the bar. Should be less than end (not checked during
   * runtime).
   */
  readonly start: number;
  /**
   * The end of the bar. Should be greater or equal to begin (not checked during
   * runtime).
   */
  readonly end: number;
};

export type IntervalTrack<
  TrackName extends string,
  IntervalDataT extends IntervalData = IntervalData,
> = TrackData<TrackName, IntervalDataT[]> & {
  /**
   * An interval search tree (binary tree) for the bar data. Should be left
   * blank when initializing the data. The tree will be created when using
   * the DomainProvider.
   */
  intervalTree?: IntervalTree<number>;
};

/**
 * Generic data shape for a track that has a position.
 * Inherit from this type to create a new track type that has a position.
 */
export type PointData = {
  /**
   * The position of a points.
   */
  readonly position: number;
};

export type PointTrack<
  TrackName extends string,
  PointDataT extends PointData = PointData,
> = TrackData<TrackName, PointDataT[]>;

/**
 * The default types of tracks RowData will default to if no type is specified.
 * Use never to indicate that a track type is not supported.
 */
export type DefaultTracks<
  SequenceTrackT extends
    | SequenceTrack<string>
    | undefined = SequenceTrack<string>,
  IntervalTrackT extends
    | IntervalTrack<string>
    | undefined = IntervalTrack<string>,
  PointTrackT extends PointTrack<string> | undefined = PointTrack<string>,
> = SequenceTrackT | IntervalTrackT | PointTrackT;
