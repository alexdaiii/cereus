import {scaleLinear, scaleOrdinal} from "@visx/scale";
import {createContext} from "react";

export type CereusScalesContextType = {
  /**
   * The x-axis scale. Usually this is a linear scale.
   */
  xScale: ReturnType<typeof scaleLinear<number>>;
  /**
   * The y-axis scale. This is an ordinal scale that acts like a
   * band scale. The return value of this scale is the start position
   * of the band (just like a band scale).
   */
  yScale: ReturnType<typeof scaleOrdinal<string, number>>;
  /**
   * The bandwidth of each y-axis band. This is a map of row IDs to
   * the bandwidth of that row.
   */
  yBandwidth: Map<string, number>;
};

export const CereusScalesContext = createContext<CereusScalesContextType>({
  xScale: scaleLinear({
    domain: [0, 0],
    range: [0, 0],
  }),
  yScale: scaleOrdinal({
    domain: [""],
    range: [0, 0],
  }),
  yBandwidth: new Map(),
});
