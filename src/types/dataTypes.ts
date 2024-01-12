import {Enumify} from '@/types/utilTypes';

export const oTrackTypes = {
  sequence: 'sequence',
} as const;

export type TrackType = Enumify<typeof oTrackTypes> | string;

/**
 * Base data shape for a single row in the sequence viewer.
 */
export interface RowDataBase {
  /**
   * Id used to identify the row. Should be unique.
   */
  rowId: string;
  /**
   * Row title. If left blank, will be set to the row id.
   * @default RowData.id
   */
  title?: string;
  /**
   * Display all the tracks in this row in a single track
   * @default false
   */
  composite?: boolean;
  /**
   * Is the row shown
   */
  visible?: boolean;
  /**
   * Data for each track in the row.
   */
  tracks: (TrackDataBase & Record<string, unknown>)[];
}

/**
 * Base data shape for a single track in the sequence viewer.
 */
export interface TrackDataBase {
  /**
   * Globally unique id for the track.
   */
  trackId: string;
  /**
   * Type of track.
   */
  trackType?: TrackType;
}

export type RowData = RowDataBase & Record<string, unknown>;
