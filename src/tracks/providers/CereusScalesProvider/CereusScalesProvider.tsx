import {LinearScaleConfig, scaleLinear, scaleOrdinal} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {useRange} from "@/core";
import {CereusScalesContext, useCereusDomain} from "@/tracks";

type CereusScalesProviderProps = {
  children: ReactNode;
  /**
   * Configuration for the xScale.
   */
  xScaleConfig?: Omit<
    Omit<LinearScaleConfig<number>, "type">,
    "type" | "domain" | "range"
  >;
  /**
   * y scale padding inner expressed as a percent of 1 track. So a value of
   * 1 would mean that the padding is the same size as 1 track.
   * @default 0
   */
  yScalePaddingInner?: number;
  /**
   * y scale padding outer expressed as a percent of 1 track. So a value of
   * 1 would mean that the padding is the same size as 1 track.
   * @default 0
   */
  yScalePaddingOuter?: number;
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
    return scaleLinear({
      domain: [domainMin, domainMax],
      range: [minX, maxX],
      ...xScaleConfig,
    });
  }, [domainMin, domainMax, minX, maxX, xScaleConfig]);

  // yScale is proportional to how many visible tracks there are per row
  const {yScale, yBandwidth} = useMemo(() => {
    return scaleBandProportional(
      maxY,
      minY,
      visibleRowIds,
      visibleTracksCount,
      visibleTracksCountPerRow,
      yScalePaddingInner,
      yScalePaddingOuter,
    );
  }, [
    maxY,
    minY,
    visibleRowIds,
    visibleRowsCount,
    visibleTracksCount,
    visibleTracksCountPerRow,
    yScalePaddingInner,
    yScalePaddingOuter,
  ]);

  return (
    <CereusScalesContext.Provider
      value={{
        xScale,
        yScale,
        yBandwidth,
      }}
    >
      {children}
    </CereusScalesContext.Provider>
  );
};

/**
 * Creates a "band scale" that is proportional to the number of tracks per row.
 */
const scaleBandProportional = (
  maxY: number,
  minY: number,
  visibleRowIds: string[],
  visibleTracksCount: number,
  visibleTracksCountPerRow: Map<string, number>,
  yScalePaddingInner: number,
  yScalePaddingOuter: number,
) => {
  const visibleRowsCount = visibleRowIds.length;

  // calculate how much padding between each row and the outer edges
  const numPaddingInner = Math.max(0, visibleRowsCount - 1);
  const numPaddingOuter = Math.min(2, visibleRowsCount + 1);

  // scale the size of each row based on the number of visible tracks
  // if there is padding (expressed as a pct of a track), then need to
  // also include that in the calculation
  const denominator =
    visibleTracksCount +
    numPaddingInner * yScalePaddingInner +
    numPaddingOuter * yScalePaddingOuter;

  const height = maxY - minY + 1;

  // calculate the size of the padding
  const paddingInnerSize = yScalePaddingInner * height;
  const paddingOuterSize = yScalePaddingOuter * height;

  const {range, bandwidth} = createProportionalRange(
    minY,
    paddingOuterSize,
    paddingInnerSize,
    visibleRowIds,
    visibleTracksCountPerRow,
    denominator,
    height,
  );

  // manually create a "band" scale that is proportional to the number of tracks
  // per row
  return {
    yScale: scaleOrdinal({
      domain: visibleRowIds,
      range: range,
    }),
    yBandwidth: bandwidth,
  };
};

/**
 * Creates the ordinal range array and the bandwidth for each row.
 */
const createProportionalRange = (
  minY: number,
  paddingOuterSize: number,
  paddingInnerSize: number,
  visibleRowIds: string[],
  visibleTracksCountPerRow: Map<string, number>,
  denominator: number,
  height: number,
) => {
  const bandwidth = new Map<string, number>();

  // manually make the range
  let bandStart = minY + paddingOuterSize;
  const range = [];
  for (let i = 0; i < visibleRowIds.length; ++i) {
    const rowId = visibleRowIds[i];

    const tracksInRow = visibleTracksCountPerRow.get(rowId);

    if (tracksInRow === undefined) {
      // eslint-disable-next-line no-console
      console.warn(`Could not find number of tracks for ${rowId}`);
      continue;
    }

    const proportion = tracksInRow / denominator;
    const bandSize = height * proportion;
    bandwidth.set(rowId, bandSize);

    range.push(bandStart);

    bandStart += bandSize + paddingInnerSize;
  }

  return {
    range,
    bandwidth,
  };
};
