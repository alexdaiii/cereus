import {ReactNode, useContext, useMemo} from "react";

import {
  AnyRowData,
  BarTrack,
  DomainContextType,
  HorizontalTrackGroupContextType,
  TrackDataWithHeight,
  createTrackProvider,
} from "@/core";

type FilterBarProps = {
  children: ReactNode;
};

/**
 * Creates a new track (data) that is filtered to be withing the min and max
 * domain. Places the new filtered data inside the provided provider.
 */
export const createFilterBar = <T extends BarTrack<string>>(
  NewProvider: ReturnType<typeof createTrackProvider<T>>,
  useTrackHook: () => ReturnType<
    typeof useContext<HorizontalTrackGroupContextType<T>>
  >,
  useDomainHook: () => DomainContextType<AnyRowData>,
) => {
  return function FilterBar({children}: FilterBarProps) {
    const {rowId, title, rowIndex, track} = useTrackHook();
    const {domainMin, domainMax} = useDomainHook();

    const newTrack = useMemo(
      () => filterBarData(track, domainMin, domainMax),
      [domainMax, domainMin, track],
    );

    return (
      <NewProvider
        track={newTrack}
        rowIndex={rowIndex}
        rowId={rowId}
        title={title}
      >
        {children}
      </NewProvider>
    );
  };
};

/**
 * Takes in a track, domainMin, and domainMax and returns a new track that is
 * filtered to be within the domain.
 */
export const filterBarData = <T extends BarTrack<string>>(
  track: TrackDataWithHeight<T>,
  domainMin: number,
  domainMax: number,
) => {
  console.log("filterBarData", track, domainMin, domainMax);
  return track;
};
