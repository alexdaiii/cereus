import {BandScaleConfig, scaleBand} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {useRange} from "@/core";
import {CereusScalesContext, useCereusDomain} from "@/tracks";

type CereusScalesProviderProps = {
  children: ReactNode;
  /**
   * Configuration for the xScale.
   */
  xScaleConfig?: Omit<BandScaleConfig<number>, "type" | "domain" | "range">;
  /**
   * y scale padding inner
   * @default 0
   */
  yScalePaddingInner?: number;
  /**
   * y scale padding outer
   * @default 0
   */
  yScalePaddingOuter?: number;
};

/**
 * Generates a range of numbers from min to max. [min, max]
 * @param min The number to start at, including.
 * @param max The number to stop at, inclusive
 */
const range = function* (min: number, max: number) {
  for (let i = min; i <= max; i++) {
    yield i;
  }
};

export const CereusScalesProvider = ({
  children,
  xScaleConfig,
  yScalePaddingInner = 0,
  yScalePaddingOuter = 0,
}: CereusScalesProviderProps) => {
  const {
    domainMin,
    domainMax,
    visibleRowsCount,
    visibleTracksCountPerRow,
    visibleTracksCount,
    visibleRowIds,
  } = useCereusDomain();
  const {minX, maxX, maxY, minY} = useRange();

  // calculate the xScale - use a scaleBand for now
  // SEE: https://observablehq.com/@d3/scale-ticks#responsive for how to do reactive ticks
  const xScale = useMemo(() => {
    return scaleBand({
      domain: Array.from(range(domainMin, domainMax)),
      range: [minX, maxX],
      ...xScaleConfig,
    });
  }, [domainMin, domainMax, minX, maxX, xScaleConfig]);

  // yScale is proportional to how many visible tracks there are per row
  const yScale = useMemo(() => {
    const numPaddingInner = Math.max(0, visibleRowsCount - 1);
    const numPaddingOuter = Math.min(2, visibleRowsCount + 1);

    const denominator =
      visibleTracksCount +
      numPaddingInner * yScalePaddingInner +
      numPaddingOuter * yScalePaddingOuter;

    const proportion = visibleTracksCountPerRow.map(
      count => count / denominator,
    );

    const height = maxY - minY + 1;

    const size = proportion.map(val => {
      return height * val;
    });

    // TODO: manually map the range with scaleOrdinal

    return scaleBand({
      domain: visibleRowIds,
      range: [minY, maxY],
    });
  }, [
    visibleRowsCount,
    visibleTracksCount,
    yScalePaddingInner,
    yScalePaddingOuter,
    visibleTracksCountPerRow,
    visibleRowIds,
    minY,
    maxY,
  ]);

  return (
    <CereusScalesContext.Provider
      value={{
        xScale,
        yScale,
      }}
    >
      {children}
    </CereusScalesContext.Provider>
  );
};

/**
 *
 * From github copilot: check if it works
 *
 * type ScaleBandInput = string | number;
 * type ScaleBandOutput = number;
 * type ScaleBand = (input: ScaleBandInput) => ScaleBandOutput | undefined;
 *
 * interface Band {
 *   id: ScaleBandInput;
 *   trackCount: number;
 * }
 *
 * const createProportionalScaleBand = (
 *   bands: Band[],
 *   range: [number, number]
 * ): ScaleBand => {
 *   const totalTrackCount = bands.reduce((sum, band) => sum + band.trackCount, 0);
 *   const proportions = bands.map(band => band.trackCount / totalTrackCount);
 *   const cumulativeProportions = proportions.reduce(
 *     (cumulative, proportion) => {
 *       const lastCumulative = cumulative[cumulative.length - 1];
 *       cumulative.push(lastCumulative + proportion);
 *       return cumulative;
 *     },
 *     [0]
 *   );
 *
 *   const scale: ScaleBand = (input) => {
 *     const index = bands.findIndex(band => band.id === input);
 *     if (index === -1) {
 *       return undefined;
 *     }
 *
 *     const proportion = cumulativeProportions[index];
 *     return range[0] + proportion * (range[1] - range[0]);
 *   };
 *
 *   return scale;
 * };
 */
