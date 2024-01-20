import {useContext} from "react";

import {PlotAreaStyleContext} from "@/core/context";

export type PlotRange = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

/**
 * Hook for getting the range of a plotting area.
 * The range is defined as the minimum and maximum values for positioning
 * elements within the plotting area.
 */
export const useRange = (): PlotRange => {
  const {width, height} = useContext(PlotAreaStyleContext);

  return {
    minX: 0,
    maxX: width,
    minY: 0,
    maxY: height,
  };
};
