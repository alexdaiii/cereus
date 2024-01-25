/**
 * Information used to identify a row.
 */
export type RowIdentifiers = {
  /**
   * Id used to identify the row. Should be unique within the data array.
   */
  readonly rowId: string;
  /**
   * Row title to display.
   */
  readonly title: string;
};

/**
 * Base data shape for a single row in the sequence viewer.
 */
export type RowData<TracksT extends TrackData = TrackData> = {
  /**
   * Is the row shown
   */
  readonly visible: boolean;
  /**
   * Data for each track in the row.
   */
  readonly tracks: TracksT[];
} & RowIdentifiers;

/**
 * This has most of the same properties as `RowData` but with the addition of
 * the start position on the y axis for a `<Group>` element and the height
 * of each track.
 */
export type RowDataWithHeight<RowDataT extends RowData> = {
  /**
   * The index of the row in the data array.
   */
  readonly index: number;
  /**
   * The start position (top) of the row `<Group>` element.
   */
  readonly y0: number;
  /**
   * Track data with the height of each track.
   */
  readonly tracks: (RowDataT["tracks"][number] & TrackDataHeightInformation)[];
} & RowIdentifiers;

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
 * This is height, width, and positioning information for a track to
 * append to the TrackData type.
 */
export type TrackDataHeightInformation = {
  /**
   * The index of the track in the array of tracks.
   */
  readonly index: number;
  /**
   * The height of the track group. It is the bandwidth of the track scale.
   */
  readonly height: number;
  /**
   * The width of the track group. Value is the same as:
   *
   * ```ts
   * const {width} = usePlotAreaStyle();
   * ```
   */
  readonly width: number;
  /**
   * The y start position of a track
   */
  readonly y: number;
};
