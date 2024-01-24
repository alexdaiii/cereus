import {scaleBand} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {usePlotAreaStyle} from "@/core";
import {CereusTracks, useCereusDomain, useCereusScale} from "@/tracks";

export type CereusRowGroupType = {
  /**
   * The index of the row in the data array.
   */
  index: number;
  /**
   * The start position (top) of the row `<Group>` element.
   */
  y0: number;
  /**
   * The row id.
   */
  rowId: string;
  /**
   * The row title to be displayed.
   */
  rowTitle: string;
  /**
   * The track group data.
   */
  tracks: CereusTrackGroupType[];
};

export type CereusTrackGroupType = {
  /**
   * The index of the track group in the row.
   */
  index: number;
  /**
   * The height of the track group. It is the bandwidth of the track scale.
   */
  height: number;
  /**
   * The width of the track group. Value is the same as:
   *
   * ```ts
   * const {width} = usePlotAreaStyle();
   * ```
   */
  width: number;
  /**
   * The y start position of a track
   */
  y: number;
  /**
   * The track data.
   */
  data: CereusTracks;
};

export type CereusPlotProps = {
  children: (rowGroup: CereusRowGroupType[]) => ReactNode;
};

/**
 * Similar to a `<BarGroup>` or `<BarGroupHorizontal>` from @visx/shape.
 * @constructor
 */
export const CereusPlot = ({children}: CereusPlotProps) => {
  const {visibleRows} = useCereusDomain();
  const {y0ScaleStart, y0Bandwidth, y1ScalePaddingInner} = useCereusScale();
  const {width} = usePlotAreaStyle();

  /**
   * Similar to https://github.com/airbnb/visx/blob/master/packages/visx-shape/src/shapes/BarGroupHorizontal.tsx
   */
  const rowGroup = useMemo(() => {
    return visibleRows.map((row, i) => {
      const rowBandwidth = y0Bandwidth.get(row.rowId) ?? 0;
      const trackScale = scaleBand({
        domain: row.tracks.map(track => track.trackId),
        range: [0, rowBandwidth],
        paddingInner: y1ScalePaddingInner,
      });

      return {
        index: i,
        y0: y0ScaleStart(row.rowId) ?? 0,
        rowId: row.rowId,
        rowTitle: row.title,
        tracks: row.tracks.map((track, j) => {
          return {
            index: j,
            height: trackScale.bandwidth(),
            width,
            y: trackScale(track.trackId) ?? 0,
            data: track,
          };
        }),
      };
    });
  }, [visibleRows, width, y1ScalePaddingInner, y0Bandwidth, y0ScaleStart]);

  return children ? <>{children(rowGroup)}</> : null;
};
