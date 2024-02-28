import {useContext, useMemo} from "react";

import {
  AnyRowData,
  DomainContextType,
  HorizontalTrackGroupContextType,
  TrackData,
  TrackDataWithHeight,
} from "@/core";

/**
 * The function that creates a new React hook. The hook returns the
 * filtered data by default.
 */
export const createUseFilteredFactory = <
  TrackDataT extends TrackData,
  RowTypeT extends AnyRowData,
>(
  useDomainHook: () => DomainContextType<RowTypeT>,
  useTrackHookOriginal: () => HorizontalTrackGroupContextType<TrackDataT>,
  filterData: (
    track: TrackDataWithHeight<TrackDataT>,
    domainMin: number,
    domainMax: number,
  ) => TrackDataWithHeight<TrackDataT>,
) => {
  return function useFilteredTrack(): ReturnType<
    typeof useContext<HorizontalTrackGroupContextType<TrackDataT>>
  > {
    const {track, ...rest} = useTrackHookOriginal();
    const {domainMin, domainMax} = useDomainHook();

    const newTrack = useMemo(
      () => filterData(track, domainMin, domainMax),
      [domainMax, domainMin, track],
    );

    return {
      ...rest,
      track: newTrack,
    };
  };
};
