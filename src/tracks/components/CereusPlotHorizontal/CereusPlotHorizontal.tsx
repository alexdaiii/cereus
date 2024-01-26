import {ReactNode} from "react";

import {HorizontalPlotGroups, PlotAreaPositioner, PlotHorizontal} from "@/core";
import {
  CereusTrackDataWithHeight,
  useCereusDomain,
  useCereusScale,
} from "@/tracks";

export type CereusPlotProps = {
  children: (
    track: CereusTrackDataWithHeight,
    rowId: string,
    title: string,
  ) => ReactNode;
};

/**
 * Wraps the `PlotHorizontal` component - with the default scales and visible rows
 * from the `CereusDomainProvider` and `CereusScaleProvider` - and the
 * HorizontalPlotGroups component.
 *
 * Positioned in the graph with PlotAreaPositioner.
 *
 * @example
 *
 * ```tsx
 * <CereusPlotHorizontal>
 *   {track => <MyTrackComponent track={track} />}
 * </CereusPlotHorizontal>
 * ```
 *
 * @param children - A function that takes a track and returns a ReactNode.
 */
export const CereusPlotHorizontal = ({children}: CereusPlotProps) => {
  const {visibleRows} = useCereusDomain();
  const {y0Scale, y0Bandwidth, y1ScalePaddingInner} = useCereusScale();
  return (
    <PlotAreaPositioner>
      <PlotHorizontal
        visibleRows={visibleRows}
        rowBandwidth={y0Bandwidth}
        y1ScalePaddingInner={y1ScalePaddingInner}
        y0Scale={y0Scale}
      >
        {rows => (
          <HorizontalPlotGroups rows={rows}>
            {(track, rowId, title) => children(track, rowId, title)}
          </HorizontalPlotGroups>
        )}
      </PlotHorizontal>
    </PlotAreaPositioner>
  );
};
