import {ReactNode, useContext, useMemo} from "react";

import {
  AnyRowData,
  DomainContextType,
  HorizontalTrackGroupContextType,
  TrackData,
  TrackDataWithHeight,
  createTrackWithHeightProvider,
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
export const createFilterComponentFactory = <
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
   * The function that creates a new React component
   */
  return (
    NewTrackWithHeightProvider: ReturnType<
      typeof createTrackWithHeightProvider<TrackDataT, RowTypeT>
    >,
    useTrackHook: () => ReturnType<
      typeof useContext<HorizontalTrackGroupContextType<TrackDataT>>
    >,
    useDomainHook: () => DomainContextType<RowTypeT>,
  ) => {
    return function FilterComponent({children}: FilterComponentProps) {
      const {rowId, title, rowIndex, track} = useTrackHook();
      const {domainMin, domainMax} = useDomainHook();

      const newTrack = useMemo(
        () => filterData(track, domainMin, domainMax),
        [domainMax, domainMin, track],
      );

      return (
        <NewTrackWithHeightProvider
          track={newTrack}
          rowIndex={rowIndex}
          rowId={rowId}
          title={title}
        >
          {children}
        </NewTrackWithHeightProvider>
      );
    };
  };
};
