import {useContext} from "react";

import {
  AxisBottomStyleContext,
  AxisLeftStyleContext,
  AxisRightStyleContext,
  AxisTopStyleContext,
  GraphAreaStyleContext,
  PlotAreaStyleContext,
} from "@/context";

/**
 * Hook for accessing the style context for a graphing area
 */
export const useGraphAreaStyle = () => useContext(GraphAreaStyleContext);

/**
 * Hook for accessing the style context an axis on top of a chart
 */
export const useAxisTopStyle = () => useContext(AxisTopStyleContext);
/**
 * Hook for accessing the style context an axis on the bottom of a plotting area
 */
export const useAxisBottomStyle = () => useContext(AxisBottomStyleContext);
/**
 * Hook for accessing the style context an axis on the left of a plotting area
 */
export const useAxisLeftStyle = () => useContext(AxisLeftStyleContext);
/**
 * Hook for accessing the style context an axis on the right of the plotting area
 */
export const useAxisRightStyle = () => useContext(AxisRightStyleContext);
/**
 * Hook for accessing the style context for the area to plot the graph
 */
export const usePlotAreaStyle = () => useContext(PlotAreaStyleContext);
