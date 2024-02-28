import {cloneDeep} from "lodash";
import IntervalTree from "node-interval-tree";
import {useMemo} from "react";

import {
  DefaultTracks,
  IntervalTrack,
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
 * Creates a new {@link IntervalTree} for the {@link IntervalTrack} to retrieve the index
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
  IntervalTrackT extends IntervalTrack<string>,
  PointTrackT extends PointTrack<string>,
>(
  data: SequenceTrackT["data"] | IntervalTrackT["data"] | PointTrackT["data"],
):
  | {
      data:
        | SequenceTrackT["data"]
        | IntervalTrackT["data"]
        | PointTrackT["data"];
    }
  | {
      data: IntervalTrackT["data"];
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

  if ("start" in data[0] && "end" in data[0]) {
    const barDataWithTree = sortBarData(data as IntervalTrackT["data"]);

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
const sortBarData = <IntervalTrackT extends IntervalTrack<string>>(
  data: IntervalTrackT["data"],
): Required<Pick<IntervalTrackT, "data" | "intervalTree">> => {
  const intervalTree = new IntervalTree<number>();

  for (let i = 0; i < data.length; i++) {
    intervalTree.insert(data[i].start, data[i].end, i);
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
