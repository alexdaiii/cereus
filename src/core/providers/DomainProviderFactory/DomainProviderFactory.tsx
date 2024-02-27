import {Context, ReactNode} from "react";

import {useSortData} from "@/core";
import {DomainContextType} from "@/core/context";
import {AnyRowData, DefaultTracks, RowData} from "@/core/types";

export type DomainProviderProps<T extends AnyRowData> = {
  children: ReactNode;
  /**
   * The minimum value of the domain.
   * @default 0
   */
  domainMin?: number;
} & Pick<DomainContextType<T>, "domainMax" | "data">;

/**
 * Creates an UNSORTED typed DomainProvider component.
 */
export const createUnsortedDomainProvider = <RowDataT extends AnyRowData>(
  DomainContext: Context<DomainContextType<RowDataT>>,
) => {
  return function UnsortedDomainProvider({
    children,
    domainMax,
    domainMin = 0,
    data,
  }: DomainProviderProps<RowDataT>) {
    return (
      <DomainContext.Provider
        value={{
          data,
          domainMax,
          domainMin,
        }}
      >
        {children}
      </DomainContext.Provider>
    );
  };
};

/**
 * Creates a typed and sorted DomainProvider component.
 */
export const createDomainProvider = <TrackDataT extends DefaultTracks>(
  DomainContext: Context<DomainContextType<RowData<TrackDataT>>>,
) => {
  const UnsortedDomainProvider = createUnsortedDomainProvider(DomainContext);

  return function DomainProvider({
    children,
    domainMax,
    domainMin = 0,
    data,
  }: DomainProviderProps<RowData<TrackDataT>>) {
    const sortedData = useSortData(data);

    return (
      <UnsortedDomainProvider
        domainMax={domainMax}
        domainMin={domainMin}
        data={sortedData}
      >
        {children}
      </UnsortedDomainProvider>
    );
  };
};
