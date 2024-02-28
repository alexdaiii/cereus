import {createContext} from "react";

import {AnyRowData} from "@/core";

export type DomainContextType<RowDataT extends AnyRowData> = {
  /**
   * The minimum domain value for the x-axis.
   * @default 0
   */
  readonly domainMin: number;
  /**
   * The maximum domain value for the x-axis. Usually this is the length
   * of your sequence track (how many amino acids or nucleotides).
   */
  readonly domainMax: number;
  /**
   * Your data. The row's tracks will be sorted if it is a {@link DefaultTracks}
   * type.
   */
  readonly data: RowDataT[];
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
export const createDomainContext = <RowDataT extends AnyRowData>() => {
  return createContext<DomainContextType<RowDataT>>({
    domainMin: 0,
    domainMax: 0,
    data: [],
  });
};
