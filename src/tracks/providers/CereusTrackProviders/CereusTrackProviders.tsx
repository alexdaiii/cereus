import {createTrackProvider} from "@/core";
import {
  CereusAreaTrackContext,
  CereusBarTrackContext,
  CereusBondTrackContext,
  CereusHeatmapTrackContext,
  CereusLineTrackContext,
  CereusPointTrackContext,
  CereusSequenceTrackContext,
} from "@/tracks";

export const CereusSequenceTrackProvider = createTrackProvider(
  CereusSequenceTrackContext,
);

export const CereusBarTrackProvider = createTrackProvider(
  CereusBarTrackContext,
);

export const CereusBondTrackProvider = createTrackProvider(
  CereusBondTrackContext,
);

export const CereusPointTrackProvider = createTrackProvider(
  CereusPointTrackContext,
);

export const CereusHeatmapTrackProvider = createTrackProvider(
  CereusHeatmapTrackContext,
);

export const CereusLineTrackProvider = createTrackProvider(
  CereusLineTrackContext,
);

export const CereusAreaTrackProvider = createTrackProvider(
  CereusAreaTrackContext,
);
