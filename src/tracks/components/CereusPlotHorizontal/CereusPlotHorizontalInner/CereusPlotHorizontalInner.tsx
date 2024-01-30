import {ReactNode} from "react";

import {HorizontalPlotGroup, PlotAreaPositioner, PlotHorizontal} from "@/core";
import {useCereusDomain, useCereusScale} from "@/tracks";
import {
  CereusRowData,
  CereusTrackDataWithHeight,
} from "@/tracks/types/data/rowTypes";

export type CereusPlotHorizontalInnerProps = {
  children: (
    track: CereusTrackDataWithHeight,
    rowIndex: number,
    rowId: string,
    title: string,
  ) => ReactNode;
};

/**
 * Wraps the `PlotHorizontal` component and a `CereusPlotHorizontalInner` component
 *
 * Place a component to handle rendering a track as a child. This component
 * will be rendered as many times as there are visible tracks. Use the
 * `useCereusTrackGroup` hook to access the track data inside your component.
 *
 * @param children - A function that renders the tracks
 */
export const CereusPlotHorizontalInner = ({
  children,
}: CereusPlotHorizontalInnerProps) => {
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
          <HorizontalPlotGroup<CereusRowData> rows={rows}>
            {children}
          </HorizontalPlotGroup>
        )}
      </PlotHorizontal>
    </PlotAreaPositioner>
  );
};
