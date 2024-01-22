import {scaleBand} from "@visx/scale";
import {createContext} from "react";

export type CereusScalesContextType = {
  xScale: ReturnType<typeof scaleBand<number>>;
  yScale: ReturnType<typeof scaleBand<string>>;
};

export const CereusScalesContext = createContext<CereusScalesContextType>({
  xScale: scaleBand({
    domain: [0, 0],
    range: [0, 0],
  }),
  yScale: scaleBand({
    domain: [""],
    range: [0, 0],
  }),
});
