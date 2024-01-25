import {ReactNode} from "react";

import {createPlotHorizontal} from "@/core";
import {
  CereusRowData,
  CereusRowDataWithHeight,
  useCereusDomain,
  useCereusScale,
} from "@/tracks";

export type CereusPlotProps = {
  children: (rows: CereusRowDataWithHeight[]) => ReactNode;
};

/**
 * The inner plot component that renders the rows and tracks.
 * Does not call any hooks.
 */
const CereusPlotInner = createPlotHorizontal<CereusRowData>();

/**
 * Returns an array of row data with height.
 */
export const CereusPlot = ({children}: CereusPlotProps) => {
  const {visibleRows} = useCereusDomain();
  const {y0ScaleStart, y0Bandwidth, y1ScalePaddingInner} = useCereusScale();

  return (
    <CereusPlotInner
      visibleRows={visibleRows}
      rowBandwidth={y0Bandwidth}
      y1ScalePaddingInner={y1ScalePaddingInner}
      y0Scale={y0ScaleStart}
    >
      {children}
    </CereusPlotInner>
  );
};
