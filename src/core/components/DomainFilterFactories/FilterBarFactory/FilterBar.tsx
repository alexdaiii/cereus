import {ReactNode, useContext} from "react";

import {
  BarTrack,
  DomainContextType,
  HorizontalTrackGroupContextType,
  RowData,
  createTrackProvider,
} from "@/core";
import {useCereusBarTrack, useCereusDomain} from "@/tracks";
import {CereusBarTrackProvider} from "@/tracks/providers/CereusTrackProviders/CereusTrackProviders";

type FilterBarProps = {
  children: ReactNode;
};

/**
 * Creates a new track (data) that is filtered to be withing the min and max
 * domain
 */
export const createFilterBar = <T extends BarTrack<string>>(
  NewProvider: ReturnType<typeof createTrackProvider<T>>,
  useTrackHook: () => ReturnType<
    typeof useContext<HorizontalTrackGroupContextType<T>>
  >,
  useDomainHook: () => DomainContextType<RowData<T>>,
) => {
  return function FilterBar({children}: FilterBarProps) {
    const {rowId, title, rowIndex, track} = useTrackHook();
    const {domainMin, domainMax} = useDomainHook();

    return (
      <NewProvider
        track={track}
        rowIndex={rowIndex}
        rowId={rowId}
        title={title}
      >
        {children}
      </NewProvider>
    );
  };
};

const CereusFilterBar = createFilterBar(
  CereusBarTrackProvider,
  useCereusBarTrack,
  useCereusDomain,
);
