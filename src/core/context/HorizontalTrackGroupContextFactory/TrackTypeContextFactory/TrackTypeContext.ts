import {createContext} from "react";

import {AnyRowData, InferTrackType} from "@/core";

/**
 * The track type
 */
export type TrackTypeContextType<RowDataT extends AnyRowData> =
  | InferTrackType<RowDataT>["trackType"]
  | undefined;

export const createTrackTypeContext = <RowDataT extends AnyRowData>() => {
  return createContext<TrackTypeContextType<RowDataT>>(undefined);
};
