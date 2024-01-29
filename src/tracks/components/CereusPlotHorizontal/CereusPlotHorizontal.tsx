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
 * Wraps the `PlotHorizontal` component and a `CereusPlotHorizontalInner` component
 *
 * Place a component to handle rendering a track as a child. This component
 * will be rendered as many times as there are visible tracks. Use the
 * `useCereusTrackGroup` hook to access the track data inside your component.
 *
 * @param children - A function that renders the tracks
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
