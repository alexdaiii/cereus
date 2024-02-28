import {scaleLinear, scaleOrdinal} from "@visx/scale";
import {createContext} from "react";

export const CereusXScaleContext = createContext<
  ReturnType<typeof scaleLinear<number>>
>(
  scaleLinear({
    domain: [0, 0],
    range: [0, 0],
  }),
);

export type CereusYScaleContextType = {
  /**
   * The y-axis scale. This is an ordinal scale that acts like a
   * band scale. The return value of this scale is the start position
   * of the band (just like a band scale).
   */
  y0Scale: ReturnType<typeof scaleOrdinal<string, number>>;
  /**
   * The bandwidth of each y-axis band. This is a map of row IDs to
   * the bandwidth of that row.
   */
  y0Bandwidth: Map<string, number>;
  /**
   * The padding between each track. This will be passed to the y1 scale
   * that gets created for each row
   */
  y1ScalePaddingInner: number;
};

export const CereusYScaleContext = createContext<CereusYScaleContextType>({
  y0Scale: scaleOrdinal({
    domain: [""],
    range: [0, 0],
  }),
  y0Bandwidth: new Map(),
  y1ScalePaddingInner: 0,
});
