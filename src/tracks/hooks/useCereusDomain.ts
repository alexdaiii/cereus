import {
  createGetVisibleRowCountHook,
  createGetVisibleRowIdsHook,
  createGetVisibleRowsHook,
  createGetVisibleTrackCountHook,
  createGetVisibleTrackCountPerRowHook,
  createGetVisibleTrackIdsHook,
  createGetVisibleTracksHook,
  createUseDomainHook,
} from "@/core/hooks";
import {CereusDomainContext} from "@/tracks/context";

/**
 * Returns the domain of the cereus tracks and data
 */
export const useCereusDomain = createUseDomainHook(CereusDomainContext);

// Visible Rows
/**
 * Returns a list of rows that are visible.
 */
export const useCereusVisibleRows =
  createGetVisibleRowsHook(CereusDomainContext);

/**
 * Returns the ids of the rows that are visible.
 */
export const useCereusVisibleRowIds =
  createGetVisibleRowIdsHook(CereusDomainContext);

/**
 * Returns the number of rows that are visible.
 */
export const useCereusVisibleRowCount =
  createGetVisibleRowCountHook(CereusDomainContext);

// Visible Tracks

/**
 * Returns a list of tracks that are visible.
 */
export const useCereusVisibleTracks =
  createGetVisibleTracksHook(CereusDomainContext);

/**
 * Returns the number of tracks that are visible.
 */
export const useCereusVisibleTrackCount =
  createGetVisibleTrackCountHook(CereusDomainContext);

/**
 * Returns the ids of the tracks that are visible.
 */
export const useCereusVisibleTrackIds =
  createGetVisibleTrackIdsHook(CereusDomainContext);

/**
 * Returns the number of tracks that are visible per row.
 */
export const useCereusVisibleTracksPerRow =
  createGetVisibleTrackCountPerRowHook(CereusDomainContext);
