import {cloneDeep} from "lodash";

import {SequenceTrack, TrackDataWithHeight} from "@/core";

/**
 * Takes in a track, domainMin, and domainMax and returns a new track that is
 * similar to {@link SequenceTrack} that is filtered to be within the domain.
 */
export const filterSequenceData = <
  SequenceTrackT extends SequenceTrack<string>,
>(
  track: TrackDataWithHeight<SequenceTrackT>,
  domainMin: number,
  domainMax: number,
): TrackDataWithHeight<SequenceTrackT> => {
  const arrayLength = domainMax - domainMin + 1;
  const sequenceArray: (string | null)[] = Array(arrayLength).fill(null);

  const maxLoop = Math.min(sequenceArray.length, track.data.sequence.length);
  const startIdx = Math.max(0, track.data.begin - domainMin);

  for (let i = startIdx, j = 0; i < maxLoop; i++, j++) {
    sequenceArray[i] = track.data.sequence[j];
  }

  return {
    ...track,
    data: {
      ...cloneDeep(track.data),
      sequenceArray,
    },
  };
};
