import {createFilterBar} from "@/core";
import {useCereusBarTrack, useCereusBondTrack, useCereusDomain} from "@/tracks";
import {
  CereusBarTrackProvider,
  CereusBondTrackProvider,
} from "@/tracks/providers";

/**
 * Component to filters the CereusBarTrack to be within the domain.
 * Any children will be rendered inside the CereusBarTrackProvider and have
 * access to the filtered data using the useCereusBarTrack hook.
 */
export const CereusFilterBar = createFilterBar(
  CereusBarTrackProvider,
  useCereusBarTrack,
  useCereusDomain,
);

/**
 * Filters the CereusBondTrack to be within the domain.
 * Any children will be rendered inside the CereusBondTrackProvider and have
 * access to the filtered data using the useCereusBondTrack hook.
 */
export const CereusFilterBond = createFilterBar(
  CereusBondTrackProvider,
  useCereusBondTrack,
  useCereusDomain,
);
