import {ReactNode, useContext, useMemo} from "react";

import {
  AnyRowData,
  DomainContextType,
  HorizontalTrackGroupContextType,
  TrackData,
  TrackDataWithHeight,
} from "@/core";

type FilterComponentProps = {
  children: ReactNode;
};

/**
 * Creates a function that returns a react component that filters the
 * track data to be within the domain.
 *
 * @param filterData - Takes in a track, domainMin, and domainMax and returns a new track that is
 *   filtered to be within the domain.
 */
export const createFilteredHookFactory = <
  TrackDataT extends TrackData,
  RowTypeT extends AnyRowData,
>(
  filterData: (
    track: TrackDataWithHeight<TrackDataT>,
    domainMin: number,
    domainMax: number,
  ) => TrackDataWithHeight<TrackDataT>,
) => {
  /**
   * The function that creates a new React hook. The hook returns the
   * filtered data by default.
   */
  return (
    useDomainHook: () => DomainContextType<RowTypeT>,
    useTrackHookOriginal: () => ReturnType<
      typeof useContext<HorizontalTrackGroupContextType<TrackDataT>>
    >,
  ) => {
    return function useFilteredTrack(
      filter: boolean = true,
    ): ReturnType<
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
        track: filter ? newTrack : track,
      };
    };
  };
};
