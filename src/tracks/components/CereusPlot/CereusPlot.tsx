import {scaleBand} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {usePlotAreaStyle} from "@/core";
import {CereusTracks, useCereusDomain, useCereusScale} from "@/tracks";

export type CereusRowGroupType = {
  index: number;
  y0: number;
  rowId: string;
  rowTitle: string;
  tracks: CereusTrackGroupType[];
};

export type CereusTrackGroupType = {
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
  data: CereusTracks;
};

export type CereusPlotProps = {
  children: (rowGroup: CereusRowGroupType[]) => ReactNode;
  /**
   * Padding between each track. Expressed as a percentage of the track height.
   * @default 0
   */
  paddingInnerTrack?: number;
};

/**
 * Similar to a `<BarGroup>` or `<BarGroupHorizontal>` from @visx/shape.
 * @constructor
 */
export const CereusPlot = ({
  children,
  paddingInnerTrack = 0,
}: CereusPlotProps) => {
  const {visibleRows} = useCereusDomain();
  const {yScaleStart, yBandwidth} = useCereusScale();
  const {width} = usePlotAreaStyle();

  /**
   * Similar to https://github.com/airbnb/visx/blob/master/packages/visx-shape/src/shapes/BarGroupHorizontal.tsx
   */
  const rowGroup = useMemo(() => {
    return visibleRows.map((row, i) => {
      const rowBandwidth = yBandwidth.get(row.rowId) ?? 0;
      const trackScale = scaleBand({
        domain: row.tracks.map(track => track.trackId),
        range: [0, rowBandwidth],
        paddingInner: paddingInnerTrack,
      });

      return {
        index: i,
        /**
         * The start position of the row group.
         */
        y0: yScaleStart(row.rowId) ?? 0,
        rowId: row.rowId,
        rowTitle: row.title,
        tracks: row.tracks.map((track, j) => {
          return {
            index: j,
            height: trackScale.bandwidth(),
            width,
            /**
             * The start position of the track group.
             */
            y: trackScale(track.trackId) ?? 0,
            data: track,
          };
        }),
      };
    });
  }, [paddingInnerTrack, visibleRows, width, yBandwidth, yScaleStart]);

  return children ? <>{children(rowGroup)}</> : null;
};
