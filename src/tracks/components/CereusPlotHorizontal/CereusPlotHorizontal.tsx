import {ReactNode} from "react";

import {CereusTrackTypeProvider, TrackProviderHandler} from "@/tracks";
import {CereusPlotHorizontalInner} from "@/tracks/components/CereusPlotHorizontal/CereusPlotHorizontalInner";

type CereusPlotHorizontalProps = {
  children: ReactNode;
};

/**
 * Main component for rendering the tracks. Positions the elements inside
 * the plotting area of the graph.
 *
 * Uses the data provided by a parent
 * {@link CereusDomainProvider} to render all the visible tracks in the rows.
 * {@link CereusRowData} for more information on the data structure of the rows
 * and tracks.
 *
 * Children passed into this component will be rendered as many times as there
 * are visible tracks. Children will also be wrapped inside a provider that
 * is specific to the track being rendered.
 *
 * Example:
 *
 * ```ts
 * import {Text} from "@visx/text";
 *
 * const MyPlot = () => (
 *   <CereusDomainProvider {...args}>
 *     ... other components ...
 *     <CereusPlotHorizontal>
 *       <>
 *         <MySequenceComponent />
 *         <MyHeatmapComponent />
 *         ... etc ...
 *       </>
 *     </CereusPlotHorizontal>
 *     ... other components ...
 *   </CereusDomainProvider>
 * );
 *
 * const MySequenceComponent = () => {
 *   const sequenceTrackData = useCereusSequenceTrack();
 *
 *   if (!(sequenceTrackData.track.trackType === "sequence")) return null;
 *
 *   // should use Text (or just regular SVG <text>) for text inside a svg
 *   return <Text>{JSON.stringify(sequenceTrackData, null, 2)}</Text>;
 * };
 *
 * const MyHeatmapComponent = () => {
 *   const heatmapTrackData = useCereusHeatmapTrack();
 *
 *   if (!(heatmapTrackData.track.trackType === "heatmap")) return null;
 *
 *   return <Text>{JSON.stringify(heatmapTrackData, null, 2)}</Text>;
 * };
 *
 * ```
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
          <CereusTrackTypeProvider trackType={track.trackType}>
            {children}
          </CereusTrackTypeProvider>
        </TrackProviderHandler>
      )}
    </CereusPlotHorizontalInner>
  );
};
