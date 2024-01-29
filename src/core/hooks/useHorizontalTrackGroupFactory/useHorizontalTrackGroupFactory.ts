import {Context, useContext} from "react";

import {HorizontalTrackGroupContextType, RowData, TrackData} from "@/core";

export const createUseHorizontalTrackGroup = <T extends RowData<TrackData>>(
  HorizontalTrackGroupContext: Context<HorizontalTrackGroupContextType<T>>,
) => {
  return () => {
    return useContext(HorizontalTrackGroupContext);
  };
};
