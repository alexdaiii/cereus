import {ReactNode} from "react";

import {
  CereusAreaTrackProvider,
  CereusBarTrackProvider,
  CereusBondTrackProvider,
  CereusHeatmapTrackProvider,
  CereusLineTrackProvider,
  CereusPointTrackProvider,
  CereusSequenceTrackProvider,
} from "@/tracks";
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
 *       <MyTrackComponent/>
 *     </CereusPlotHorizontal>
 *     ... other components ...
 *   </CereusDomainProvider>
 * );
 *
 * const MyTrackComponent = () => {
 *   const trackType = useCereusTrackType();
 *
 *   switch (trackType) {
 *     case "sequence":
 *       return <MySequenceComponent />;
 *     case "heatmap":
 *       return <MyHeatmapComponent />;
 *     default:
 *       return null;
 *   }
 * };
 *
 * const MySequenceComponent = () => {
 *   const sequenceTrackData = useCereusSequenceTrack();
 *
 *   return <Text>{JSON.stringify(sequenceTrackData, null, 2)}</Text>;
 * };
 *
 * const MyHeatmapComponent = () => {
 *   const heatmapTrackData = useCereusHeatmapTrack();
 *
 *   return <Text>{JSON.stringify(heatmapTrackData, null, 2)}</Text>;
 * };
 *
 * ```
 */
export const CereusPlotHorizontal = ({children}: CereusPlotHorizontalProps) => {
  return (
    <CereusPlotHorizontalInner>
      {(track, rowIndex, rowId, title) => {
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
        return null;
      }}
    </CereusPlotHorizontalInner>
  );
};
