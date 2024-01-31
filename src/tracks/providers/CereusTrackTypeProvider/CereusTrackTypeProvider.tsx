import {createTrackTypeProvider} from "@/core";
import {CereusRowData, CereusTrackTypeContext} from "@/tracks";

export const CereusTrackTypeProvider = createTrackTypeProvider<CereusRowData>(
  CereusTrackTypeContext,
);
