import {IntervalTrack, TrackDataWithHeight} from "@/core";

/**
 * Takes in a track, domainMin, and domainMax and returns a new track that
 * contains data shaped similar to {@link IntervalTrack} that is filtered to be
 * within the domain.
 */
export const filterIntervalData = <
  IntervalTrackT extends IntervalTrack<string>,
>(
  track: TrackDataWithHeight<IntervalTrackT>,
  domainMin: number,
  domainMax: number,
) => {
  const indices = track.intervalTree?.search(domainMin, domainMax) || [];

  const newTrackData: IntervalTrackT["data"] = [];

  for (let i = 0; i < indices.length; i++) {
    newTrackData.push(track.data[indices[i]]);
  }

  return {
    ...track,
    data: newTrackData,
  };
};
