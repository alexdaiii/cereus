import {createContext} from "react";

import {RowData} from "@/core/types";

export type DomainContextType<T extends RowData> = {
  /**
   * The minimum domain value for the x-axis.
   * @default 0
   */
  domainMin: number;
  /**
   * The maximum domain value for the x-axis. Usually this is the length
   * of your sequence track (how many amino acids or nucleotides).
   */
  domainMax: number;
  /**
   * Your data
   */
  data: T[];
  // Computed values
  /**
   * Visible rows (computed)
   */
  visibleRows: T[];
  /**
   * Visible row IDs (computed)
   */
  visibleRowIds: string[];
  /**
   * The number of visible rows (computed)
   */
  visibleRowsCount: number;
  /**
   * Visible tracks (computed)
   */
  visibleTracks: T["tracks"][number][];
  /**
   * Visible track IDs (computed)
   */
  visibleTrackIds: string[];
  /**
   * The number of visible tracks (computed)
   */
  visibleTracksCount: number;
  /**
   * The number of visible tracks in each row. The index of the array
   * corresponds to the index of the row in the `data` array.
   */
  visibleTracksCountPerRow: number[];
};

/**
 * Generic function that create a new context with a
 * generic {@link DomainContextType}.
 * Use this to create a new custom and typed context for your data.
 *
 * The `RowDataT `type must extend {@link RowData}, which is a generic row
 * data type that takes in a `TracksT` type.
 *
 * `TrackT` type must extend
 * {@link TrackData}, which is a generic track data type that takes in
 * a `TrackTypeT` type and `TrackDataT` type.
 *
 * The `TrackT` type can be anything that extends string.
 *
 * The `TrackDataT` type can be any type.
 *
 * @example
 * ```ts
 * type TrackType1 = TrackData<"foo", {bar: number}>
 * type TrackType2 = TrackData<"baz", {qux: string}>
 * type TrackType3 = TrackData<"quux", {quuz: boolean}[]>
 *
 * type MyRowData = RowData<TrackType1 | TrackType2 | TrackType3>
 *
 * const MyDomainContext = createDomainContext<MyRowData>()
 *
 * ```
 */
export const createDomainContext = <T extends RowData>() => {
  return createContext<DomainContextType<T>>({
    domainMin: 0,
    domainMax: 0,
    data: [],
    // Computed values
    visibleRows: [],
    visibleRowIds: [],
    visibleRowsCount: 0,
    visibleTracks: [],
    visibleTrackIds: [],
    visibleTracksCount: 0,
    visibleTracksCountPerRow: [],
  });
};
