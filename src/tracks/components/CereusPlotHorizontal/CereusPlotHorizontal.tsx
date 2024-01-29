import {ReactNode} from "react";

import {PlotAreaPositioner, PlotHorizontal} from "@/core";
import {createHorizontalPlotGroup} from "@/core/components/HorizontalPlotGroups/HorizontalPlotGroupFactory";
import {useCereusDomain, useCereusScale} from "@/tracks";
import {CereusTrackGroupContext} from "@/tracks/context/CereusTrackGroupContext/CereusTrackGroupContext";

export type CereusPlotProps = {
  children: ReactNode;
};

export const CereusPlotHorizontalInner = createHorizontalPlotGroup(
  CereusTrackGroupContext,
);

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
          <CereusPlotHorizontalInner rows={rows}>
            {children}
          </CereusPlotHorizontalInner>
        )}
      </PlotHorizontal>
    </PlotAreaPositioner>
  );
};
