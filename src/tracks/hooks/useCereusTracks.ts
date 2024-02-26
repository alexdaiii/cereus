import {useContext} from "react";

import {createFilterSequence} from "@/core/hooks/DomainFilterFactories";
import {
  CereusAreaTrackContext,
  CereusBarTrackContext,
  CereusBondTrackContext,
  CereusHeatmapTrackContext,
  CereusLineTrackContext,
  CereusPointTrackContext,
  CereusSequenceTrackContext,
  useCereusDomain,
} from "@/tracks";

const _useCereusSequenceTrackOriginal = () =>
  useContext(CereusSequenceTrackContext);

/**
 * Returns the sequence track data if the track is a sequence track.
 * Otherwise it will return default values.
 */
export const useCereusSequenceTrack = createFilterSequence(
  useCereusDomain,
  _useCereusSequenceTrackOriginal,
);

// -------------------
// Bar tracks
// -------------------

const _useCereusBarTrackOriginal = () => useContext(CereusBarTrackContext);
const _useCereusBondTrackOriginal = () => useContext(CereusBondTrackContext);

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

const _useCereusPointTrackOriginal = () => useContext(CereusPointTrackContext);
const _useCereusHeatmapTrackOriginal = () =>
  useContext(CereusHeatmapTrackContext);
const _useCereusLineTrackOriginal = () => useContext(CereusLineTrackContext);
const _useCereusAreaTrackOriginal = () => useContext(CereusAreaTrackContext);

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
