import {LinearScaleConfig, scaleLinear} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {useRange} from "@/core";
import {CereusXScaleContext, useCereusDomain} from "@/tracks";

export type CereusXScaleProviderProps = {
  children: ReactNode;
  /**
   * Configuration for the xScale.
   */
  xScaleConfig?: Omit<
    Omit<LinearScaleConfig<number>, "type">,
    "type" | "domain" | "range"
  >;
};

export const CereusXScaleProvider = ({
  children,
  xScaleConfig,
}: CereusXScaleProviderProps) => {
  const {domainMin, domainMax} = useCereusDomain();

  const {minX, maxX} = useRange();

  // calculate the xScale - use a scaleBand for now
  // SEE: https://observablehq.com/@d3/scale-ticks#responsive for how to do reactive ticks
  const xScale = useMemo(() => {
    return scaleLinear({
      domain: [domainMin, domainMax],
      range: [minX, maxX],
      ...xScaleConfig,
    });
  }, [domainMin, domainMax, minX, maxX, xScaleConfig]);

  return (
    <CereusXScaleContext.Provider value={xScale}>
      {children}
    </CereusXScaleContext.Provider>
  );
};
