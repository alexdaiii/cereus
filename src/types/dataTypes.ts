import {Enumify} from '@/types/utilTypes';

export const oTrackTypes = {
  sequence: 'sequence',
} as const;

export type TrackType = Enumify<typeof oTrackTypes> | string;

/**
 * Data for a single row in the sequence viewer.
 */
export interface RowData {
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
   * Background color for the row.
   */
  color?: string;
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
  tracks: (TrackDataBase & {
    [key: string]: unknown;
  })[];
}

/**
 * Data for a single track in the sequence viewer.
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

// const tracks = [new SequenceTrackData('ABCD')];
//
// const rows = [
//   {
//     id: 'row1',
//     tracks: tracks,
//   },
// ];
//
// const foo = (rows: RowData[]) => {
//   for (let i = 0; i < rows.length; i++) {
//     const row = rows[i];
//
//     for (let j = 0; j < row.tracks.length; j++) {
//       const track = row.tracks[j];
//
//       if (track instanceof SequenceTrackData) {
//         console.log(track.sequence);
//       }
//     }
//   }
// };
