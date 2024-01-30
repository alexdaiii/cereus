import {ReactNode} from "react";

import {TrackProviderHandler} from "@/tracks";
import {CereusPlotHorizontalInner} from "@/tracks/components/CereusPlotHorizontal/CereusPlotHorizontalInner";

type CereusPlotHorizontalProps = {
  children: ReactNode;
};

/**
 * Wraps the `CereusPlotHorizontalInner`
 *
 * Place a component to handle rendering a track as a child. This child component
 * will be rendered as many times as there are visible tracks.
 *
 * Each child is wrapped in a Provider that provides the track data to the child
 * based on the track type. For example a CereusSequenceTrack will be wrapped in a
 * CereusSequenceTrackContext.Provider. Use the `useCereusSequenceTrack` hook to access
 * the track data inside your component. (Note if your component is not a sequence
 * track, it will return no data).
 */
export const CereusPlotHorizontal = ({children}: CereusPlotHorizontalProps) => {
  return (
    <CereusPlotHorizontalInner>
      {(track, rowIndex, rowId, title) => (
        <TrackProviderHandler
          track={track}
          rowIndex={rowIndex}
          rowId={rowId}
          title={title}
        >
          {children}
        </TrackProviderHandler>
      )}
    </CereusPlotHorizontalInner>
  );
};
