import {useContext} from "react";

import {
  createUseFilteredFactory,
  filterIntervalData,
  filterPointData,
  filterSequenceData,
} from "@/core";
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

/**
 * Oddly in vitest it will fail unless it is called like this
 */
const _useCereusDomain = () => useCereusDomain();

const _useCereusSequenceTrackOriginal = () =>
  useContext(CereusSequenceTrackContext);

/**
 * Returns the sequence track data if the track is a sequence track.
 * Otherwise it will return default values.
 */
export const useCereusSequenceTrack = createUseFilteredFactory(
  _useCereusDomain,
  _useCereusSequenceTrackOriginal,
  filterSequenceData,
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
export const useCereusBarTrack = createUseFilteredFactory(
  _useCereusDomain,
  _useCereusBarTrackOriginal,
  filterIntervalData,
);

/**
 * Returns the bond track data if the track is a bond track.
 * Otherwise it will return default values.
 */
export const useCereusBondTrack = createUseFilteredFactory(
  _useCereusDomain,
  _useCereusBondTrackOriginal,
  filterIntervalData,
);

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
export const useCereusPointTrack = createUseFilteredFactory(
  _useCereusDomain,
  _useCereusPointTrackOriginal,
  filterPointData,
);

/**
 * Returns the heatmap track data if the track is a heatmap track.
 * Otherwise it will return default values.
 */
export const useCereusHeatmapTrack = createUseFilteredFactory(
  _useCereusDomain,
  _useCereusHeatmapTrackOriginal,
  filterPointData,
);

/**
 * Returns the line track data if the track is a line track.
 * Otherwise it will return default values.
 */
export const useCereusLineTrack = createUseFilteredFactory(
  _useCereusDomain,
  _useCereusLineTrackOriginal,
  filterPointData,
);

/**
 * Returns the area track data if the track is an area track.
 * Otherwise it will return default values.
 */
export const useCereusAreaTrack = createUseFilteredFactory(
  _useCereusDomain,
  _useCereusAreaTrackOriginal,
  filterPointData,
);
