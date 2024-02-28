import {cloneDeep} from "lodash";

import {PointTrack, TrackDataWithHeight} from "@/core";

/**
 * Takes in a track, domainMin, and domainMax and returns a new track that is
 * similar to {@link PointTrack} that is filtered to be within the domain.
 */
export const filterPointData = <PointTrackT extends PointTrack<string>>(
  track: TrackDataWithHeight<PointTrackT>,
  domainMin: number,
  domainMax: number,
) => {
  const newTrackData: PointTrackT["data"] = [];

  for (let i = 0; i < track.data.length; i++) {
    const data = track.data[i];
    if (data.position >= domainMin && data.position <= domainMax) {
      newTrackData.push(cloneDeep(data));
    }
  }

  return {
    ...track,
    data: newTrackData,
  };
};
