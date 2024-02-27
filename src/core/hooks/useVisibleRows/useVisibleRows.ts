import {useMemo} from "react";

import {AnyRowData} from "@/core";

/**
 * Returns the visible rows and tracks from the data. Uses the `visible` property.
 *
 * Usually used in conjunction with some useDomain hook
 *
 * @param data
 */
export const useVisibleRows = <T extends AnyRowData>(data: T[]) => {
  return useMemo(() => {
    return calculateVisibleRows(data);
  }, [data]);
};

/**
 * Calculates the visible rows and tracks from the data.
 * @param data
 */
const calculateVisibleRows = <T extends AnyRowData>(data: T[]) => {
  const visibleRows: T[] = [];
  const visibleRowIds: string[] = [];

  const visibleTracks: T["tracks"][number][] = [];
  const visibleTrackIds: string[] = [];
  const visibleTracksCountPerRow = new Map<string, number>();

  for (let i = 0; i < data.length; i++) {
    visibleTracksCountPerRow.set(
      data[i].rowId,
      +data[i].visible * data[i].tracks.length,
    );

    if (!data[i].visible) {
      continue;
    }

    visibleRows.push(data[i]);
    visibleRowIds.push(data[i].rowId);

    for (let j = 0; j < data[i].tracks.length; j++) {
      visibleTracks.push(data[i].tracks[j]);
      visibleTrackIds.push(data[i].tracks[j].trackId);
    }
  }

  return {
    visibleRows,
    visibleRowIds,
    visibleTracks,
    visibleTrackIds,
    visibleTracksCountPerRow,
  };
};
