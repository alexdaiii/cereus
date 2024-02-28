import {PointTrack, TrackDataWithHeight} from "@/core";

/**
 * Takes in a track, domainMin, and domainMax and returns a new track that is
 * similar to {@link PointTrack} that is filtered to be within the domain.
 *
 * The track that is filtered MUST be sorted
 */
export const filterPointData = <PointTrackT extends PointTrack<string>>(
  track: TrackDataWithHeight<PointTrackT>,
  domainMin: number,
  domainMax: number,
) => {
  if (
    domainMax < track.data[0].position ||
    domainMin > track.data[track.data.length - 1].position
  ) {
    return {
      ...track,
      data: [],
    };
  }

  const startIdx = binarySearch(track.data, domainMin);
  let endIdx = binarySearch(track.data, domainMax);

  if (endIdx < track.data.length && track.data[endIdx].position <= domainMax)
    endIdx++;

  const newTrackData = track.data.slice(startIdx, endIdx);

  return {
    ...track,
    data: newTrackData,
  };
};

const binarySearch = <T extends {position: number}>(
  arr: T[],
  target: number,
): number => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const current = arr[mid].position;

    if (current === target) return mid;
    if (current < target) left = mid + 1;
    else right = mid - 1;
  }

  return left;
};
