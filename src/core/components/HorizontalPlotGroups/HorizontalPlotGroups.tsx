import {Group} from "@visx/group";
import {ReactNode} from "react";

import {RowData, RowDataWithHeight} from "@/core";

type HorizontalRowGroupProps<RowDataT extends RowData> = {
  children: (
    /**
     * The tracks for this row.
     */
    tracks: RowDataWithHeight<RowDataT>["tracks"][number][],
    /**
     * The rowId for this row.
     */
    rowId: string,
    /**
     * The title for this row.
     */
    title: string,
  ) => ReactNode;
  rows: RowDataWithHeight<RowDataT>[];
};

export const HorizontalRowGroup = <RowDataT extends RowData>({
  children,
  rows,
}: HorizontalRowGroupProps<RowDataT>) => {
  return rows.map(row => {
    return (
      <Group
        top={row.y0}
        key={`row-group-${row.index}-${row.rowId}-${row.y0}`}
        data-rowgroup={row.rowId}
      >
        {children(row.tracks, row.rowId, row.title)}
      </Group>
    );
  });
};

type HorizontalTrackGroupProps<RowDataT extends RowData> = {
  children: (
    /**
     * The track for this group.
     */
    track: RowDataWithHeight<RowDataT>["tracks"][number],
    /**
     * The rowId for this track belongs to.
     */
    rowId: string,
    /**
     * The title for the row this track belongs to.
     */
    title: string,
  ) => ReactNode;
  tracks: RowDataWithHeight<RowDataT>["tracks"];
  /**
   * The rowId for this track belongs to.
   */
  rowId: string;
  /**
   * The title for the row this track belongs to.
   */
  title: string;
};

export const HorizontalTrackGroup = <RowDataT extends RowData>({
  children,
  tracks,
  rowId,
  title,
}: HorizontalTrackGroupProps<RowDataT>) => {
  return tracks.map(track => {
    return (
      <Group
        key={`track-group-${track.index}-${track.trackId}-${track.y}`}
        top={track.y}
        data-trackgroup={track.trackId}
      >
        {children(track, rowId, title)}
      </Group>
    );
  });
};

type HorizontalPlotGroupsProps<RowDataT extends RowData> = {
  children: (
    /**
     * The track for this group.
     */
    track: RowDataWithHeight<RowDataT>["tracks"][number],
    /**
     * The rowId for this track belongs to.
     */
    rowId: string,
    /**
     * The title for the row this track belongs to.
     */
    title: string,
  ) => ReactNode;
  /**
   * The rows to render.
   */
  rows: RowDataWithHeight<RowDataT>[];
};

export const HorizontalPlotGroups = <RowDataT extends RowData>({
  children,
  rows,
}: HorizontalPlotGroupsProps<RowDataT>) => {
  return (
    <HorizontalRowGroup rows={rows}>
      {(tracks, rowId, title) => (
        <HorizontalTrackGroup tracks={tracks} rowId={rowId} title={title}>
          {track => children(track, rowId, title)}
        </HorizontalTrackGroup>
      )}
    </HorizontalRowGroup>
  );
};
