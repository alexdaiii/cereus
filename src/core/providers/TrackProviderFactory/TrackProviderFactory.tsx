import {Context, ReactNode} from "react";

import {
  HorizontalTrackGroupContextType,
  TrackData,
  TrackDataHeightInformation,
} from "@/core";

type TrackProviderProps<T extends TrackData> = {
  /**
   * The track to place in the plot.
   */
  track: T & TrackDataHeightInformation;
  /**
   * The index of the row this track belongs to.
   */
  rowIndex: number;
  /**
   * The rowId for this track belongs to.
   */
  rowId: string;
  /**
   * The title for the row this track belongs to.
   */
  title: string;
  children: ReactNode;
};

export const createTrackProvider = <T extends TrackData>(
  TrackContext: Context<HorizontalTrackGroupContextType<T>>,
) => {
  return function TrackProvider({
    children,
    track,
    rowIndex,
    rowId,
    title,
  }: TrackProviderProps<T>) {
    return (
      <TrackContext.Provider
        value={{
          initialized: true,
          title,
          rowId,
          track,
          rowIndex,
        }}
      >
        {children}
      </TrackContext.Provider>
    );
  };
};
