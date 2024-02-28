import {createContext} from "react";

import {RowIdentifiers, TrackData, TrackDataWithHeight} from "@/core";

/**
 * Row information and track with height data
 */
export type HorizontalTrackGroupContextType<TrackDataT extends TrackData> = {
  /**
   * This value is set to true if the provider has been initialized.
   */
  readonly initialized: boolean;
  /**
   * The index of the row from the data array.
   */
  readonly rowIndex: number;
  /**
   * The track data
   */
  readonly track: TrackDataWithHeight<TrackDataT>;
} & RowIdentifiers;

/**
 * Create a context to surround each track rendered by a HorizontalPlotGroupsInner component
 * so that child components don't need row and track data to be directly passed to them.
 */
export const createHorizontalTrackGroupContext = <TrackDataT extends TrackData>(
  defaultTrackData: TrackDataT,
) => {
  return createContext<HorizontalTrackGroupContextType<TrackDataT>>({
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
