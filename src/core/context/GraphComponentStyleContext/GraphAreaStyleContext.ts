import {createContext} from "react";

import {GraphItemMargin, GraphItemSize, GroupOffset} from "@/core/context";

export type GraphAreaStyleContextType = GraphItemSize &
  GraphItemMargin &
  GroupOffset;

/**
 * Context for styling the Graph Area. The graph area is the outermost area
 * of the graph that contains the graph area, axes around the plotting area,
 * and the plotting area.
 */
export const GraphAreaStyleContext = createContext<GraphAreaStyleContextType>({
  width: 0,
  height: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  top: 0,
  left: 0,
});
