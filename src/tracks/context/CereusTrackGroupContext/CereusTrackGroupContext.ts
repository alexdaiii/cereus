import {createHorizontalTrackGroupContext} from "@/core";
import {
  CereusAreaTrack,
  CereusBarTrack,
  CereusBondTrack,
  CereusHeatmapTrack,
  CereusLineTrack,
  CereusPointTrack,
  CereusSequenceTrack,
} from "@/tracks";

export const CereusSequenceTrackContext =
  createHorizontalTrackGroupContext<CereusSequenceTrack>({
    trackId: "",
    trackType: "sequence",
    data: {
      sequence: "",
      begin: 0,
      minOverlapDistance: 0,
    },
  });

// -------------------
// Bar tracks
// -------------------

export const CereusBarTrackContext =
  createHorizontalTrackGroupContext<CereusBarTrack>({
    trackId: "",
    trackType: "bar",
    data: [],
  });

export const CereusBondTrackContext =
  createHorizontalTrackGroupContext<CereusBondTrack>({
    trackId: "",
    trackType: "bond",
    data: [],
  });

// -------------------
// Point tracks
// -------------------

export const CereusPointTrackContext =
  createHorizontalTrackGroupContext<CereusPointTrack>({
    trackId: "",
    trackType: "point",
    data: [],
  });

export const CereusHeatmapTrackContext =
  createHorizontalTrackGroupContext<CereusHeatmapTrack>({
    trackId: "",
    trackType: "heatmap",
    data: [],
  });

export const CereusLineTrackContext =
  createHorizontalTrackGroupContext<CereusLineTrack>({
    trackId: "",
    trackType: "line",
    data: [],
  });

export const CereusAreaTrackContext =
  createHorizontalTrackGroupContext<CereusAreaTrack>({
    trackId: "",
    trackType: "area",
    data: [],
  });
