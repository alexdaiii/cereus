import {createContext} from "react";

import {RowIdentifiers, TrackData, TrackDataWithHeight} from "@/core";

export type HorizontalTrackGroupContextType<T extends TrackData> = {
  /**
   * This value is set to true if the provider has been initialized.
   */
  initialized: boolean;
  /**
   * The index of the row from the data array.
   */
  readonly rowIndex: number;
  /**
   * The track data
   */
  track: TrackDataWithHeight<T>;
} & RowIdentifiers;

/**
 * Create a context to surround each track rendered by a HorizontalPlotGroupsInner component
 * so that child components don't need row and track data to be directly passed to them.
 */
export const createHorizontalTrackGroupContext = <T extends TrackData>(
  defaultTrackData: T,
) => {
  return createContext<HorizontalTrackGroupContextType<T>>({
    initialized: false,
    rowIndex: 0,
    rowId: "",
    title: "",
    track: {
      index: 0,
      height: 0,
      width: 0,
      y: 0,
      ...defaultTrackData,
    },
  });
};
