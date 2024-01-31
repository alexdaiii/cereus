import {cloneDeep} from "lodash";

import {SequenceTrack, TrackDataWithHeight} from "@/core";
import {createFilterComponentFactory} from "@/core/components/DomainFilterFactories/FilterDataFactory";

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
) => {
  const startPos = track.data.begin;
  const newTrackSequence = track.data.sequence.slice(
    domainMin - startPos,
    domainMax - startPos,
  );

  return {
    ...track,
    data: {
      ...cloneDeep(track.data),
      sequence: newTrackSequence,
    },
  };
};

/**
 * Creates a component that takes in a new track that is shaped similar to
 * {@link SequenceTrack} and returns a new track that is filtered to be within the
 * min and max domain. Places the new filtered data inside the provided provider.
 */
export const createFilterSequence =
  createFilterComponentFactory(filterSequenceData);
