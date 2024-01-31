import {Context, ReactNode} from "react";

import {AnyRowData, InferTrackType, TrackTypeContextType} from "@/core";

export type TrackTypeProviderProps<RowDataT extends AnyRowData> = {
  children: ReactNode;
  /**
   * The type of the track.
   */
  trackType: InferTrackType<RowDataT>["trackType"];
};

/**
 * Creates a typed TrackTypeProvider component.
 *
 * Add a type argument or TrackTypeContext will default to any string.
 */
export const createTrackTypeProvider = <T extends AnyRowData>(
  TrackTypeContext: Context<TrackTypeContextType<T>>,
) => {
  return function TrackTypeProvider({
    children,
    trackType,
  }: TrackTypeProviderProps<T>) {
    return (
      <TrackTypeContext.Provider value={trackType}>
        {children}
      </TrackTypeContext.Provider>
    );
  };
};
