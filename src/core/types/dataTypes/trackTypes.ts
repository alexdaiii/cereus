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
};

export type SequenceTrack<SeqDataT extends SequenceData = SequenceData> =
  TrackData<"sequence", SeqDataT>;

/**
 * Generic data shape for a track that has a begin and end.
 * Inherit from this type to create a new track type that has a begin and end.
 */
export type BarData = {
  /**
   * The beginning of the bar.
   */
  readonly begin: number;
  /**
   * The end of the bar.
   */
  readonly end: number;
};

export type BarTrack<
  TrackName extends string = "bar",
  BarDataT extends BarData = BarData,
> = TrackData<TrackName, BarDataT[]>;

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
  TrackName extends string = "point",
  PointDataT extends PointData = PointData,
> = TrackData<TrackName, PointDataT[]>;

/**
 * The default types of tracks RowData will default to if no type is specified.
 * Use undefined to indicate that a track type is not supported.
 */
export type DefaultTracks<
  SequenceTrackT extends SequenceTrack | undefined = SequenceTrack,
  BarTrackT extends BarTrack<string> | undefined = BarTrack,
  PointTrackT extends PointTrack<string> | undefined = PointTrack,
> = SequenceTrackT | BarTrackT | PointTrackT;
