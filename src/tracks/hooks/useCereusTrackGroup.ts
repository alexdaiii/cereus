import {createUseHorizontalTrackGroup} from "@/core";
import {CereusTrackGroupContext} from "@/tracks/context/CereusTrackGroupContext/CereusTrackGroupContext";

/**
 * Returns the current track group that is being rendered.
 */
export const useCereusTrackGroup = createUseHorizontalTrackGroup(
  CereusTrackGroupContext,
);
