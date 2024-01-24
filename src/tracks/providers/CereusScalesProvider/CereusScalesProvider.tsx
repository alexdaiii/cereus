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
  y0ScalePaddingInner?: number;
  /**
   * y scale padding outer expressed as a percent of 1 track. So a value of
   * 1 would mean that the padding is the same size as 1 track.
   * @default 0
   */
  y0ScalePaddingOuter?: number;
  /**
   * The padding between each track. This will be passed to the y1 scale
   * that gets created for each row
   * @default 0
   */
  y1ScalePaddingInner?: number;
};

export const CereusScalesProvider = ({
  children,
  xScaleConfig,
  y0ScalePaddingInner = 0,
  y0ScalePaddingOuter = 0,
  y1ScalePaddingInner = 0,
}: CereusScalesProviderProps) => {
  const {
    domainMin,
    domainMax,
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
  const {yScaleStart, yBandwidth, yScaleMiddle} = useMemo(() => {
    const {yScaleStart, yBandwidth} = scaleBandProportional(
      maxY,
      minY,
      visibleRowIds,
      visibleTracksCount,
      visibleTracksCountPerRow,
      y0ScalePaddingInner,
      y0ScalePaddingOuter,
    );
    const yScaleMiddle = middleBandScale(yScaleStart, yBandwidth);
    return {
      yScaleStart,
      yBandwidth,
      yScaleMiddle,
    };
  }, [
    maxY,
    minY,
    visibleRowIds,
    visibleTracksCount,
    visibleTracksCountPerRow,
    y0ScalePaddingInner,
    y0ScalePaddingOuter,
  ]);

  return (
    <CereusScalesContext.Provider
      value={{
        xScale,
        y0ScaleStart: yScaleStart,
        y0Bandwidth: yBandwidth,
        y0ScaleMiddle: yScaleMiddle,
        y1ScalePaddingInner,
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
  const paddingInnerSize = (yScalePaddingInner / denominator) * height;
  const paddingOuterSize = (yScalePaddingOuter / denominator) * height;

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
    yScaleStart: scaleOrdinal({
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

/**
 * Creates an ordinal scale that returns the position in the middle
 * of each band.
 */
const middleBandScale = (
  scale: ReturnType<typeof scaleOrdinal<string, number>>,
  bandwidth: Map<string, number>,
) => {
  return scaleOrdinal({
    domain: scale.domain(),
    range: scale.domain().map(val => {
      const bandSize = bandwidth.get(val) ?? 0;

      return scale(val) + bandSize / 2;
    }),
  });
};
