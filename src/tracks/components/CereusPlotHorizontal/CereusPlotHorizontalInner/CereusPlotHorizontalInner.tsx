import {ReactNode} from "react";

import {
  HorizontalPlotGroup,
  PlotAreaPositioner,
  PlotHorizontal,
  useVisibleRows,
} from "@/core";
import {useCereusDomain, useCereusScale} from "@/tracks";
import {
  AnyCereusTrackDataWithHeight,
  CereusRowData,
} from "@/tracks/types/data/rowTypes";

export type CereusPlotHorizontalInnerProps = {
  children: (
    track: AnyCereusTrackDataWithHeight,
    rowIndex: number,
    rowId: string,
    title: string,
  ) => ReactNode;
};

/**
 * Wraps the `PlotHorizontal` component and a `HorizontalPlotGroup` component
 *
 * Place a component to handle rendering a track as a child. This component
 * will be rendered as many times as there are visible tracks.
 */
export const CereusPlotHorizontalInner = ({
  children,
}: CereusPlotHorizontalInnerProps) => {
  const {data} = useCereusDomain();
  const {visibleRows} = useVisibleRows(data);

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
