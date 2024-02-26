import {TrackData} from "./trackTypes";

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
export type RowData<TracksT extends TrackData> = {
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
 * A row with any data shape for the tracks.
 */
export type AnyRowData = RowData<TrackData>;
