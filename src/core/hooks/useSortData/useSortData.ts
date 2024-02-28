import {cloneDeep} from "lodash";
import IntervalTree from "node-interval-tree";
import {useMemo} from "react";

import {
  BarTrack,
  DefaultTracks,
  PointTrack,
  RowData,
  SequenceTrack,
} from "@/core";

/**
 * Given a list of {@link RowData}, sorts the data and returns a new list of:
 *
 * Sorted {@link PointTrack} using the default array sort function in O(n * log(n))
 * average time for most browsers that implement quicksort or mergesort.
 * Allows for binary search of a specific position in O(log(n)) time.
 *
 * Creates a new {@link IntervalTree} for the {@link BarTrack} to retrieve the index
 *  in O(n * log(n)) time. Allow for retrieval of indices of the bar data
 *  between an interval in O(min(n, k * log(n))) time, where n is the size of the
 *  data, and k is the number of indices returned
 * @param data The data to sort
 */
export const useSortData = <TrackDataT extends DefaultTracks>(
  data: RowData<TrackDataT>[],
) => {
  return useMemo(
    () =>
      data.map(row => ({
        ...row,
        tracks: row.tracks.map(track => {
          return {
            ...track,
            ...sortTrackData(track.data),
          };
        }),
      })),
    [data],
  );
};

/**
 * Sorts the tracks
 */
const sortTrackData = <
  SequenceTrackT extends SequenceTrack<string>,
  BarTrackT extends BarTrack<string>,
  PointTrackT extends PointTrack<string>,
>(
  data: SequenceTrackT["data"] | BarTrackT["data"] | PointTrackT["data"],
):
  | {
      data: SequenceTrackT["data"] | BarTrackT["data"] | PointTrackT["data"];
    }
  | {
      data: BarTrackT["data"];
      intervalTree: IntervalTree<number>;
    } => {
  // check that the data is an object and is not null
  if (typeof data !== "object" || data === null) {
    return {
      data,
    };
  }

  if ("sequence" in data || !Array.isArray(data) || data.length === 0) {
    return {
      data,
    };
  }

  if ("position" in data[0]) {
    const pointData = sortPointData(data as PointTrackT["data"]);

    return {
      data: pointData,
    };
  }

  if ("begin" in data[0] && "end" in data[0]) {
    const barDataWithTree = sortBarData(data as BarTrackT["data"]);

    return barDataWithTree;
  }

  return {
    data,
  };
};

/**
 * Creates an interval tree of the bar data. The (start, end) forms an
 * interval that is used to get the index of the bar data
 * @param data
 */
const sortBarData = <BarTrackT extends BarTrack<string>>(
  data: BarTrackT["data"],
): Required<Pick<BarTrackT, "data" | "intervalTree">> => {
  const intervalTree = new IntervalTree<number>();

  for (let i = 0; i < data.length; i++) {
    intervalTree.insert(data[i].begin, data[i].end, i);
  }

  return {
    data: cloneDeep(data),
    intervalTree,
  };
};

const sortPointData = <PointTrackT extends PointTrack<string>>(
  data: PointTrackT["data"],
) => {
  const newData = cloneDeep(data);

  return newData.sort((a, b) => a.position - b.position);
};
