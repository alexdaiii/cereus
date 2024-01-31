import {scaleBand, scaleOrdinal} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {RowData, RowDataWithHeight, TrackData, usePlotAreaStyle} from "@/core";

export type PlotHorizontalProps<RowDataT extends RowData<TrackData>> = {
  children: (rows: RowDataWithHeight<RowDataT>[]) => ReactNode;
  /**
   * The visible rows to be rendered.
   */
  visibleRows: RowDataT[];
  /**
   * A map of rowId to the bandwidth of the row.
   */
  rowBandwidth: Map<string, number>;
  /**
   * The amount of padding between each track
   */
  y1ScalePaddingInner: number;
  /**
   * The row scales that takes in a rowId and returns the starting position
   * (the y or top) of the row.
   */
  y0Scale:
    | ReturnType<typeof scaleBand<string>>
    | ReturnType<typeof scaleOrdinal<string, number>>;
};

/**
 * Returns an element similar to `@visx/shape`'s `BarGroup` or `BarGroupHorizontal`.
 * {@link https://airbnb.io/visx/bargrouphorizontal}
 * Constructs a new array using the data and scales provided.
 *
 * The original `visibleRows` array has a shape like: `{rowId: string, tracks: [], ...}[]`.
 * The new array will contain the original data along with the a (y) offset
 * max height for each track in each row, and the width of the plot.
 *
 * Each row has a custom height determined by the `rowBandwidth` map, which mapes
 * the rowId to the height of the row. A new `y1Scale` is constructed for each row
 * that equally divides the row height between the tracks.
 *
 * To use the data returned from this component, you can use the `PlotHorizontal` component
 * like so:
 *
 * ```js
 * import {Group} from "@visx/group";
 *
 * // row Ids should be unique in the data array
 * const data: AnyRowData[] = [
 *   {
 *     rowId: "row1",
 *     title: "Row 1",
 *     visible: true,
 *     tracks: [
 *       // trackIds should be unique within a row
 *       {
 *         trackId: "track1",
 *         data: 1,
 *         trackType: "myTrackTypeR1T1",
 *       },
 *       {
 *         trackId: "track2",
 *         data: 2,
 *         trackType: "myTrackTypeR1T2",
 *       },
 *     ],
 *   },
 *   {
 *     rowId: "row2",
 *     title: "Row 2",
 *     visible: true,
 *     tracks: [
 *       {
 *         trackId: "track1",
 *         data: 3,
 *         trackType: "myTrackTypeR2T1",
 *       },
 *       {
 *         trackId: "track2",
 *         data: 4,
 *         trackType: "myTrackTypeR2T2",
 *       },
 *     ],
 *   },
 * ];
 *
 * const y0Scale = scaleBand({
 *   domain: data.map(d => d.rowId),
 *   range: [0, 100],
 *   padding: 0.2,
 * });
 * const rowBandwidth = new Map(data.map(d => [d.rowId, y0Scale.bandwidth()]));
 * const y1ScalePaddingInner = 0.2;
 *
 * <PlotHorizontal
 *   visibleRows={data}
 *   rowBandwidth={rowBandwidth}
 *   y0Scale={y0Scale}
 *   y1ScalePaddingInner={y1ScalePaddingInner}
 * >
 *   {rows => {
 *     return rows.map(row => {
 *       return (
 *         // Group is a visx component
 *         <Group key={row.rowId} top={row.y0}>
 *           {row.tracks.map(track => {
 *             return (
 *               <Group key={track.trackId} top={track.y}>
 *                 <MyCustomTrackComponent track={track} />
 *               </Group>
 *             );
 *           })}
 *         </Group>
 *       );
 *     });
 *   }}
 * </PlotHorizontal>;
 * ```
 */
export const PlotHorizontal = <RowDataT extends RowData<TrackData>>({
  children,
  visibleRows,
  rowBandwidth,
  y0Scale,
  y1ScalePaddingInner,
}: PlotHorizontalProps<RowDataT>) => {
  const {width} = usePlotAreaStyle();

  const rowsWithHeight: RowDataWithHeight<RowDataT>[] = useMemo(() => {
    return visibleRows.map((row, i) => {
      const bandwidth = rowBandwidth.get(row.rowId) ?? 0;

      // construct a new BandScale for each row
      const y1Scale = scaleBand({
        domain: row.tracks.map(track => track.trackId),
        range: [0, bandwidth],
        paddingInner: y1ScalePaddingInner,
      });

      return {
        index: i,
        rowId: row.rowId,
        title: row.title,
        y0: y0Scale(row.rowId) ?? 0,
        tracks: row.tracks.map((track, j) => {
          return {
            index: j,
            width,
            height: y1Scale.bandwidth(),
            y: y1Scale(track.trackId) ?? 0,
            trackId: track.trackId,
            trackType: track.trackType,
            data: track.data,
          };
        }),
      };
    });
  }, [rowBandwidth, visibleRows, width, y0Scale, y1ScalePaddingInner]);

  return <>{children(rowsWithHeight)}</>;
};
