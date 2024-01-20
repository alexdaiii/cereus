import {Context, useContext} from "react";

import {DomainContextType} from "@/core/context";
import {RowData} from "@/core/types";

/**
 * Factory that creates a hook that returns the domain context
 */
export const createUseDomainHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => useContext(DomainContext);
};
