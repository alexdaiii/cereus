import {createContext} from "react";

import {AnyRowData, InferTrackType} from "@/core";

/**
 * The track type
 */
export type TrackTypeContextType<T extends AnyRowData> =
  InferTrackType<T>["trackType"];

export const createTrackTypeContext = <T extends AnyRowData>() => {
  return createContext<TrackTypeContextType<T>>("");
};
