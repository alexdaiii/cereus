import {Context, ReactNode} from "react";

import {
  HorizontalTrackGroupContextType,
  TrackDataHeightInformation,
} from "@/core";
import {
  CereusAreaTrackContext,
  CereusBarTrackContext,
  CereusBondTrackContext,
  CereusHeatmapTrackContext,
  CereusLineTrackContext,
  CereusPointTrackContext,
  CereusSequenceTrackContext,
  CereusTracks,
} from "@/tracks";

type TrackProviderProps<T extends CereusTracks> = {
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

const createTrackProvider = <T extends CereusTracks>(
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

export const CereusSequenceTrackProvider = createTrackProvider(
  CereusSequenceTrackContext,
);

export const CereusBarTrackProvider = createTrackProvider(
  CereusBarTrackContext,
);

export const CereusBondTrackProvider = createTrackProvider(
  CereusBondTrackContext,
);

export const CereusPointTrackProvider = createTrackProvider(
  CereusPointTrackContext,
);

export const CereusHeatmapTrackProvider = createTrackProvider(
  CereusHeatmapTrackContext,
);

export const CereusLineTrackProvider = createTrackProvider(
  CereusLineTrackContext,
);

export const CereusAreaTrackProvider = createTrackProvider(
  CereusAreaTrackContext,
);
