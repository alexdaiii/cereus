import {createTrackWithHeightProvider} from "@/core";
import {
  CereusAreaTrackContext,
  CereusBarTrackContext,
  CereusBondTrackContext,
  CereusHeatmapTrackContext,
  CereusLineTrackContext,
  CereusPointTrackContext,
  CereusSequenceTrackContext,
  CereusTrackTypeContext,
} from "@/tracks";

export const CereusSequenceTrackProvider = createTrackWithHeightProvider(
  CereusSequenceTrackContext,
  CereusTrackTypeContext,
);

export const CereusBarTrackProvider = createTrackWithHeightProvider(
  CereusBarTrackContext,
  CereusTrackTypeContext,
);

export const CereusBondTrackProvider = createTrackWithHeightProvider(
  CereusBondTrackContext,
  CereusTrackTypeContext,
);

export const CereusPointTrackProvider = createTrackWithHeightProvider(
  CereusPointTrackContext,
  CereusTrackTypeContext,
);

export const CereusHeatmapTrackProvider = createTrackWithHeightProvider(
  CereusHeatmapTrackContext,
  CereusTrackTypeContext,
);

export const CereusLineTrackProvider = createTrackWithHeightProvider(
  CereusLineTrackContext,
  CereusTrackTypeContext,
);

export const CereusAreaTrackProvider = createTrackWithHeightProvider(
  CereusAreaTrackContext,
  CereusTrackTypeContext,
);
