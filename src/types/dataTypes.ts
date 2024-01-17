/**
 * Base data shape for a single row in the sequence viewer.
 */
export type RowData<TrackTypeT extends string = string> = {
  /**
   * Id used to identify the row. Should be unique.
   */
  rowId: string;
  /**
   * Row title. If left blank, will be set to the row id.
   * @default RowData.id
   */
  title: string;
  /**
   * Display all the tracks in this row in a single track
   * @default false
   */
  composite: boolean;
  /**
   * Is the row shown
   */
  visible: boolean;
  /**
   * Data for each track in the row.
   */
  tracks: TrackData<TrackTypeT>[];
};

/**
 * Base data shape for a single track in the sequence viewer.
 */
export type TrackData<TrackTypeT extends string = string> = {
  /**
   * Globally unique id for the track.
   */
  trackId: string;
  /**
   * Type of track to display.
   */
  trackType: TrackTypeT;
};
