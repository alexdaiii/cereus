import {useContext} from "react";

import {
  CereusAreaTrackContext,
  CereusBarTrackContext,
  CereusBondTrackContext,
  CereusHeatmapTrackContext,
  CereusLineTrackContext,
  CereusPointTrackContext,
  CereusSequenceTrackContext,
} from "@/tracks";

/**
 * Returns the sequence track data if the track is a sequence track.
 * Otherwise it will return default values.
 */
export const useCereusSequenceTrack = () =>
  useContext(CereusSequenceTrackContext);

// -------------------
// Bar tracks
// -------------------

/**
 * Returns the bar track data if the track is a bar track.
 * Otherwise it will return default values.
 */
export const useCereusBarTrack = () => useContext(CereusBarTrackContext);

/**
 * Returns the bond track data if the track is a bond track.
 * Otherwise it will return default values.
 */
export const useCereusBondTrack = () => useContext(CereusBondTrackContext);

// -------------------
// Point tracks
// -------------------

/**
 * Returns the point track data if the track is a point track.
 * Otherwise it will return default values.
 */
export const useCereusPointTrack = () => useContext(CereusPointTrackContext);

/**
 * Returns the heatmap track data if the track is a heatmap track.
 * Otherwise it will return default values.
 */
export const useCereusHeatmapTrack = () =>
  useContext(CereusHeatmapTrackContext);

/**
 * Returns the line track data if the track is a line track.
 * Otherwise it will return default values.
 */
export const useCereusLineTrack = () => useContext(CereusLineTrackContext);

/**
 * Returns the area track data if the track is an area track.
 * Otherwise it will return default values.
 */
export const useCereusAreaTrack = () => useContext(CereusAreaTrackContext);
