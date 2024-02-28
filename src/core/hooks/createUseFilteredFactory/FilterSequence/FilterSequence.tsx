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

  const startArrayIdx = Math.max(0, track.data.begin - domainMin);
  const startSequenceIdx = Math.max(0, domainMin - track.data.begin);

  for (
    let idxArray = startArrayIdx, idxSequence = startSequenceIdx;
    idxArray < sequenceArray.length && idxSequence < track.data.sequence.length;
    idxArray++, idxSequence++
  ) {
    sequenceArray[idxArray] = track.data.sequence[idxSequence];
  }

  return {
    ...track,
    data: {
      ...cloneDeep(track.data),
      sequenceArray,
    },
  };
};
