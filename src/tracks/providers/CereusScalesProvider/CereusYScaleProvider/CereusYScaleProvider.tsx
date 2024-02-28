import {scaleOrdinal} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {useRange, useVisibleRows} from "@/core";
import {CereusYScaleContext, useCereusDomain} from "@/tracks";

type CereusYScaleProviderProps = {
  /**
   * Inner padding between each track group. Each row gets an amount of space
   * proportional to the number of tracks in that row. This padding scale
   * represents how many tracks the padding in between rows it is equivalent to.
   * @default 0
   */
  y0ScalePaddingInner?: number;
  /**
   * Outer padding between each track group. Each row gets an amount of space
   * proportional to the number of tracks in that row. This padding scale
   * represents how many tracks the padding between the top of the plot
   * and the first row it is equivalent to (same for the bottom and last row).
   * @default 0
   */
  y0ScalePaddingOuter?: number;
  /**
   * The padding between each track. This will be passed to the y1 scale
   * that gets created for each row
   * @default 0
   */
  y1ScalePaddingInner?: number;
  children: ReactNode;
};

export const CereusYScaleProvider = ({
  children,
  y0ScalePaddingInner = 0,
  y0ScalePaddingOuter = 0,
  y1ScalePaddingInner = 0,
}: CereusYScaleProviderProps) => {
  const {data} = useCereusDomain();
  const {visibleTracksCountPerRow, visibleRowIds, visibleTrackIds} =
    useVisibleRows(data);
  const {maxY, minY} = useRange();

  const {y0Scale, y0Bandwidth} = useMemo(() => {
    return scaleBandProportional(
      maxY,
      minY,
      visibleRowIds,
      visibleTrackIds.length,
      visibleTracksCountPerRow,
      y0ScalePaddingInner,
      y0ScalePaddingOuter,
    );
  }, [
    maxY,
    minY,
    visibleRowIds,
    visibleTrackIds.length,
    visibleTracksCountPerRow,
    y0ScalePaddingInner,
    y0ScalePaddingOuter,
  ]);

  return (
    <CereusYScaleContext.Provider
      value={{
        y0Scale,
        y0Bandwidth,
        y1ScalePaddingInner,
      }}
    >
      {children}
    </CereusYScaleContext.Provider>
  );
};

/**
 * Calculates how many tracks + padding * paddingScale there are in total.
 */
const totalTracksWithScaledPadding = (
  visibleTracksCount: number,
  visibleRowsCount: number,
  y0ScalePaddingInner: number,
  y0ScalePaddingOuter: number,
) => {
  // Calculate how many lines of padding are needed for between all the rows
  const numPaddingInner = Math.max(0, visibleRowsCount - 1);
  const numPaddingOuter = Math.min(2, visibleRowsCount + 1);

  return (
    visibleTracksCount +
    numPaddingInner * y0ScalePaddingInner +
    numPaddingOuter * y0ScalePaddingOuter
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
  y0ScalePaddingInner: number,
  y0ScalePaddingOuter: number,
) => {
  const denominator = totalTracksWithScaledPadding(
    visibleTracksCount,
    visibleRowIds.length,
    y0ScalePaddingInner,
    y0ScalePaddingOuter,
  );

  const height = maxY - minY + 1;
  // calculate the size of the padding
  const paddingInnerSize = (y0ScalePaddingInner / denominator) * height;
  const paddingOuterSize = (y0ScalePaddingOuter / denominator) * height;

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
    y0Scale: scaleOrdinal({
      domain: visibleRowIds,
      range: range,
    }),
    y0Bandwidth: bandwidth,
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

  let bandStart = minY + paddingOuterSize;
  const range = [];
  for (let i = 0; i < visibleRowIds.length; ++i) {
    const rowId = visibleRowIds[i];

    // v8 ignore else
    const tracksInRow = visibleTracksCountPerRow.get(rowId) ?? 0;

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
