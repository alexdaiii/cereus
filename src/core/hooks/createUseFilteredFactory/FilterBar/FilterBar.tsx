import {cloneDeep} from "lodash";

import {BarTrack, TrackDataWithHeight} from "@/core";

/**
 * Takes in a track, domainMin, and domainMax and returns a new track that
 * contains data shaped similar to {@link BarTrack} that is filtered to be
 * within the domain.
 */
export const filterBarData = <BarTrackT extends BarTrack<string>>(
  track: TrackDataWithHeight<BarTrackT>,
  domainMin: number,
  domainMax: number,
) => {
  const indices = track.intervalTree?.search(domainMin, domainMax) || [];

  const newTrackData: BarTrackT["data"] = [];

  for (let i = 0; i < indices.length; i++) {
    newTrackData.push(cloneDeep(track.data[indices[i]]));
  }

  return {
    ...track,
    data: newTrackData,
  };
};
