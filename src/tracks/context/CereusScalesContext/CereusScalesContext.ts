import {scaleBand} from "@visx/scale";
import {createContext} from "react";

export type CereusScalesContextType = {
  xScale: ReturnType<typeof scaleBand<number>>;
  y0Scale: ReturnType<typeof scaleBand<string>>;
  y1Scale: ReturnType<typeof scaleBand<string>>;
};

export const CereusScalesContext = createContext<CereusScalesContextType>({
  xScale: scaleBand({
    domain: [0, 0],
    range: [0, 0],
  }),
  y0Scale: scaleBand({
    domain: [""],
    range: [0, 0],
  }),
  y1Scale: scaleBand({
    domain: [""],
    range: [0, 0],
  }),
});
