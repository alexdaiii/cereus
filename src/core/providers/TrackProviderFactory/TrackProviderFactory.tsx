import {Context, ReactNode} from "react";

import {
  AnyRowData,
  HorizontalTrackGroupContextType,
  TrackData,
  TrackDataHeightInformation,
  TrackTypeContextType,
} from "@/core";

type TrackProviderProps<SpecificTrackTypeT extends TrackData> = {
  /**
   * The track to place in the plot.
   */
  track: SpecificTrackTypeT & TrackDataHeightInformation;
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

/**
 * Creates a new (typed) track provider. Sets the initialized flag to true.
 * Restricts this track provider to only accept tracks of the same type.
 * (if using TypeScript)
 */
export const createTrackWithHeightProvider = <
  SpecificTrackTypeT extends TrackData,
  RowTypeT extends AnyRowData,
>(
  TrackWithHeightContext: Context<
    HorizontalTrackGroupContextType<SpecificTrackTypeT>
  >,
  TrackTypeContext: Context<TrackTypeContextType<RowTypeT>>,
) => {
  return function TrackProvider({
    children,
    track,
    rowIndex,
    rowId,
    title,
  }: TrackProviderProps<SpecificTrackTypeT>) {
    return (
      <TrackWithHeightContext.Provider
        value={{
          initialized: true,
          title,
          rowId,
          track,
          rowIndex,
        }}
      >
        <TrackTypeContext.Provider value={track.trackType}>
          {children}
        </TrackTypeContext.Provider>
      </TrackWithHeightContext.Provider>
    );
  };
};
