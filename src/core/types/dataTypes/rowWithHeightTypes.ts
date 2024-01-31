import {InferTrackType} from "@/core/types/dataTypes/utilTypes";

import {RowData, RowIdentifiers} from "./rowTypes";
import {TrackData} from "./trackTypes";

/**
 * This has most of the same properties as `RowData` but with the addition of
 * the start position on the y axis for a `<Group>` element and the height
 * of each track.
 */
export type RowDataWithHeight<RowDataT extends RowData<TrackData>> = {
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
  readonly tracks: (InferTrackType<RowDataT> & TrackDataHeightInformation)[];
} & RowIdentifiers;

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

export type TrackDataWithHeight<TrackT extends TrackData> = TrackT &
  TrackDataHeightInformation;
