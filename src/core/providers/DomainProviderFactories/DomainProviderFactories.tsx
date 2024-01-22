import {Context, ReactNode, useMemo} from "react";

import {DomainContextType} from "@/core/context";
import {RowData} from "@/core/types";

export type DomainProviderProps<T extends RowData> = {
  children: ReactNode;
  /**
   * The minimum value of the domain.
   * @default 0
   */
  domainMin?: number;
} & Pick<DomainContextType<T>, "domainMax" | "data">;

/**
 * Creates a typed DomainProvider component.
 */
export const createDomainProvider = <RowDataT extends RowData>(
  DomainContext: Context<DomainContextType<RowDataT>>,
  displayName: string,
) => {
  const DomainProvider = ({
    children,
    domainMax,
    domainMin = 0,
    data,
  }: DomainProviderProps<RowDataT>) => {
    // only compute these values when the data changes
    const {
      visibleRows,
      visibleRowIds,
      visibleTracks,
      visibleTrackIds,
      visibleTracksCountPerRow,
    } = useMemo(() => {
      return calculateVisibleRows(data);
    }, [data]);

    return (
      <DomainContext.Provider
        value={{
          data,
          domainMax,
          domainMin,
          visibleRows,
          visibleRowIds,
          visibleRowsCount: visibleRows.length,
          visibleTracks,
          visibleTrackIds,
          visibleTracksCount: visibleTracks.length,
          visibleTracksCountPerRow,
        }}
      >
        {children}
      </DomainContext.Provider>
    );
  };
  DomainProvider.displayName = displayName;
  return DomainProvider;
};

/**
 * Calculates the visible rows and tracks from the data.
 * @param data
 */
const calculateVisibleRows = <T extends RowData>(data: T[]) => {
  const visibleRows: T[] = [];
  const visibleRowIds: string[] = [];

  const visibleTracks: T["tracks"][number][] = [];
  const visibleTrackIds: string[] = [];
  const visibleTracksCountPerRow = new Map<string, number>();

  for (let i = 0; i < data.length; i++) {
    visibleTracksCountPerRow.set(
      data[i].rowId,
      +data[i].visible * data[i].tracks.length,
    );

    if (!data[i].visible) {
      continue;
    }

    visibleRows.push(data[i]);
    visibleRowIds.push(data[i].rowId);

    for (let j = 0; j < data[i].tracks.length; j++) {
      visibleTracks.push(data[i].tracks[j]);
      visibleTrackIds.push(data[i].tracks[j].trackId);
    }
  }

  return {
    visibleRows,
    visibleRowIds,
    visibleTracks,
    visibleTrackIds,
    visibleTracksCountPerRow,
  };
};
