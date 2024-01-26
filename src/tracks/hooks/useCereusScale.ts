import {useContext} from "react";

import {CereusXScaleContext, CereusYScaleContext} from "@/tracks/context";

/**
 * A hook that returns the x and y scales for the graph
 */
export const useCereusScale = () => {
  const xScale = useContext(CereusXScaleContext);
  const yScale = useContext(CereusYScaleContext);

  return {xScale, ...yScale};
};
