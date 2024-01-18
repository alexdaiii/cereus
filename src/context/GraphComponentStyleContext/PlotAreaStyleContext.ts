import {createContext} from "react";

import {
  GraphItemSize,
  GroupOffset,
} from "@/context/GraphComponentStyleContext/types";

export type PlotAreaStyleContextType = GraphItemSize & GroupOffset;

const DEFAULT_SIZE = {
  width: 0,
  height: 0,
} as const;

const DEFAULT_OFFSET = {
  top: 0,
  left: 0,
} as const;

/**
 * Context for the area to plot the graph
 */
export const PlotAreaStyleContext = createContext<PlotAreaStyleContextType>({
  ...DEFAULT_SIZE,
  ...DEFAULT_OFFSET,
});
