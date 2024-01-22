import {BandScaleConfig, scaleBand} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {useRange} from "@/core";
import {
  CereusScalesContext,
  useCereusDomain,
  useCereusVisibleRowCount,
  useCereusVisibleTrackCount,
  useCereusVisibleTracksPerRow,
} from "@/tracks";

type CereusScalesProviderProps = {
  children: ReactNode;
  /**
   * Configuration for the xScale.
   */
  xScaleConfig?: Omit<BandScaleConfig<number>, "type" | "domain" | "range">;
};

/**
 * Generates a range of numbers from min to max. [min, max)
 * @param min The number to start at, including.
 * @param max The number to stop at, not including.
 */
const range = function* (min: number, max: number) {
  for (let i = min; i < max; i++) {
    yield i;
  }
};

export const CereusScalesProvider = ({
  children,
  xScaleConfig,
}: CereusScalesProviderProps) => {
  const {domainMin, domainMax} = useCereusDomain();
  const numVisibleTracks = useCereusVisibleTrackCount();
  const visibleTracksPerRow = useCereusVisibleTracksPerRow();
  const visibleRows = useCereusVisibleRowCount();
  const {minX, maxX, maxY, minY} = useRange();

  const xScale = useMemo(() => {
    return scaleBand({
      domain: Array.from(range(domainMin, domainMax + 1)),
      range: [minX, maxX],
      ...xScaleConfig,
    });
  }, [domainMin, domainMax, minX, maxX, xScaleConfig]);

  const y0Scale = useMemo(() => {
    const numPadding = Math.max(0, visibleRows - 1);

    return scaleBand({
      domain: [""],
      range: [minY, maxY],
    });
  }, [visibleRows, minY, maxY]);

  const y1Scale = useMemo(() => {
    return scaleBand({
      domain: [""],
      range: [minY, maxY],
    });
  }, [minY, maxY]);

  return (
    <CereusScalesContext.Provider
      value={{
        xScale,
        y0Scale,
        y1Scale,
      }}
    >
      {children}
    </CereusScalesContext.Provider>
  );
};
