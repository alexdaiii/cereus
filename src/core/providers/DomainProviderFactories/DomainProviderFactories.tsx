import {Context, ReactNode} from "react";

import {DomainContextType} from "@/core/context";
import {RowData} from "@/core/types";

type DomainProviderProps<T extends RowData> = {
  children: ReactNode;
  /**
   * The minimum value of the domain.
   * @default 0
   */
  domainMin?: number;
} & Omit<DomainContextType<T>, "domainMin">;

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
  DomainProvider.displayName = displayName;
  return DomainProvider;
};
