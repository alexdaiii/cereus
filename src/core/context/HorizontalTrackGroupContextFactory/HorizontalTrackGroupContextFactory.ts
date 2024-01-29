import {createContext} from "react";

import {
  AnyRowData,
  InferTrackType,
  RowIdentifiers,
  TrackDataHeightInformation,
} from "@/core";

export type HorizontalTrackGroupContextType<T extends AnyRowData> = {
  /**
   * The index of the row from the data array.
   */
  readonly rowIndex: number;
  /**
   * The track data
   */
  track: InferTrackType<T> & TrackDataHeightInformation;
} & RowIdentifiers;

/**
 * Create a context to surround each track rendered by a HorizontalPlotGroupsInner component
 * so that child components don't need row and track data to be directly passed to them.
 */
export const createHorizontalTrackGroupContext = <T extends AnyRowData>() => {
  return createContext<HorizontalTrackGroupContextType<T>>({
    rowIndex: 0,
    rowId: "",
    title: "",
    track: {
      index: 0,
      height: 0,
      width: 0,
      y: 0,
      trackId: "",
      trackType: "",
      data: [],
    },
  });
};
