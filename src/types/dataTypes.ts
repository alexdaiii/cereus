/**
 * Base data shape for a single row in the sequence viewer.
 */
export type RowData<TracksT extends TrackData = TrackData> = {
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
   * Is the row shown
   */
  visible: boolean;
  /**
   * Data for each track in the row.
   */
  tracks: TracksT[];
};

/**
 * Base data shape for a single track in the sequence viewer.
 */
export type TrackData<
  TrackTypeT extends string = string,
  TrackDataT = unknown,
> = {
  /**
   * Globally unique id for the track.
   */
  trackId: string;
  /**
   * Type of track to display.
   */
  trackType: TrackTypeT;
  /**
   * Data to display in the track.
   */
  data: TrackDataT;
};
