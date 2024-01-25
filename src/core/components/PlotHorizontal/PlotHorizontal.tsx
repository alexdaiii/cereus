import {scaleBand, scaleOrdinal} from "@visx/scale";
import {ReactNode, useMemo} from "react";

import {RowData, RowDataWithHeight, usePlotAreaStyle} from "@/core";

export type PlotHorizontalProps<RowDataT extends RowData> = {
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

export const createPlotHorizontal = <RowDataT extends RowData>() => {
  return function PlotHorizontal({
    children,
    visibleRows,
    rowBandwidth,
    y0Scale,
    y1ScalePaddingInner,
  }: PlotHorizontalProps<RowDataT>) {
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

    return children ? <>{children(rowsWithHeight)}</> : null;
  };
};
