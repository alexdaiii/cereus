import {Group} from "@visx/group";
import {ReactNode} from "react";

import {InferTrackType, RowData, RowDataWithHeight, TrackData} from "@/core";

type HorizontalRowGroupProps<RowDataT extends RowData<TrackData>> = {
  children: (
    /**
     * The tracks for this row.
     */
    tracks: InferTrackType<RowDataWithHeight<RowDataT>>[],
    /**
     * Thw index of the row.
     */
    rowIndex: number,
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

/**
 * Renders all the rows of the given rows array. For each row, it passes
 * the rows data into the children function (a React component). Places the children
 * inside a @visx/group element that is positioned at the y0 of the row by
 * using the top prop.
 * Adds a data-rowgroup attribute to the group element with the rowId of the row.
 * (mostly for testing purposes)
 */
export const HorizontalRowGroup = <RowDataT extends RowData<TrackData>>({
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
        {children(row.tracks, row.index, row.rowId, row.title)}
      </Group>
    );
  });
};

type HorizontalTrackGroupProps<RowDataT extends RowData<TrackData>> = {
  children: (
    /**
     * The track for this group.
     */
    track: InferTrackType<RowDataWithHeight<RowDataT>>,
    /**
     * The index of the row this track belongs to.
     */
    rowIndex: number,
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
  /**
   * The index of the row this track belongs to.
   */
  rowIndex: number;
};

/**
 * Renders all the tracks given a track array. For each track, passes the tracks data into the
 * children function (a React component) rendered inside a @visx/group
 * element. Group element is positioned at the y of the track by using the top prop.
 * Adds a data-trackgroup attribute to the group element with the trackId of the
 * track. (mostly for testing purposes)
 */
export const HorizontalTrackGroup = <RowDataT extends RowData<TrackData>>({
  children,
  tracks,
  rowId,
  title,
  rowIndex,
}: HorizontalTrackGroupProps<RowDataT>) => {
  return tracks.map(track => {
    return (
      <Group
        key={`track-group-${track.index}-${track.trackId}-${track.y}`}
        top={track.y}
        data-trackgroup={track.trackId}
      >
        {children(track, rowIndex, rowId, title)}
      </Group>
    );
  });
};

type HorizontalPlotGroupsProps<RowDataT extends RowData<TrackData>> = {
  children: (
    /**
     * The track for this group.
     */
    track: RowDataWithHeight<RowDataT>["tracks"][number],
    /**
     * The index of the row this track belongs to.
     */
    rowIndex: number,
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

/**
 * Renders all tracks in a HorizontalTrackGroup that is
 * a child of a HorizontalRowGroup.
 * Does not place any elements inside the provider created by
 * createHorizontalTrackGroupProvider.
 */
export const HorizontalPlotGroupsInner = <RowDataT extends RowData<TrackData>>({
  children,
  rows,
}: HorizontalPlotGroupsProps<RowDataT>) => {
  return (
    <HorizontalRowGroup rows={rows}>
      {(tracks, rowIndex, rowId, title) => (
        <HorizontalTrackGroup
          tracks={tracks}
          rowId={rowId}
          title={title}
          rowIndex={rowIndex}
        >
          {track => children(track, rowIndex, rowId, title)}
        </HorizontalTrackGroup>
      )}
    </HorizontalRowGroup>
  );
};
