import {ReactNode} from "react";

import {AnyCereusTrackDataWithHeight} from "@/tracks";
import {
  CereusAreaTrackProvider,
  CereusBarTrackProvider,
  CereusBondTrackProvider,
  CereusHeatmapTrackProvider,
  CereusLineTrackProvider,
  CereusPointTrackProvider,
  CereusSequenceTrackProvider,
} from "@/tracks/providers/CereusTrackProviders/CereusTrackProviders";

export type TrackProviderHandlerProps = {
  children: ReactNode;
  /**
   * The track to place in the plot.
   */
  track: AnyCereusTrackDataWithHeight;
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
};

/**
 * Surrounds a track with the correct context provider based on the track type.
 */
export const TrackProviderHandler = ({
  track,
  rowIndex,
  rowId,
  title,
  children,
}: TrackProviderHandlerProps) => {
  switch (track.trackType) {
    case "sequence":
      return (
        <CereusSequenceTrackProvider
          title={title}
          rowId={rowId}
          track={track}
          rowIndex={rowIndex}
        >
          {children}
        </CereusSequenceTrackProvider>
      );

    case "bar":
      return (
        <CereusBarTrackProvider
          title={title}
          rowId={rowId}
          track={track}
          rowIndex={rowIndex}
        >
          {children}
        </CereusBarTrackProvider>
      );

    case "bond":
      return (
        <CereusBondTrackProvider
          title={title}
          rowId={rowId}
          track={track}
          rowIndex={rowIndex}
        >
          {children}
        </CereusBondTrackProvider>
      );
    case "point":
      return (
        <CereusPointTrackProvider
          title={title}
          rowId={rowId}
          track={track}
          rowIndex={rowIndex}
        >
          {children}
        </CereusPointTrackProvider>
      );
    case "heatmap":
      return (
        <CereusHeatmapTrackProvider
          title={title}
          rowId={rowId}
          track={track}
          rowIndex={rowIndex}
        >
          {children}
        </CereusHeatmapTrackProvider>
      );
    case "line":
      return (
        <CereusLineTrackProvider
          title={title}
          rowId={rowId}
          track={track}
          rowIndex={rowIndex}
        >
          {children}
        </CereusLineTrackProvider>
      );
    case "area":
      return (
        <CereusAreaTrackProvider
          title={title}
          rowId={rowId}
          track={track}
          rowIndex={rowIndex}
        >
          {children}
        </CereusAreaTrackProvider>
      );
  }

  // @ts-expect-error - Just in case we forget to handle a track type.
  return <>{children}</>;
};
