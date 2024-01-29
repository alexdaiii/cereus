import {Context, useContext} from "react";

import {DomainContextType} from "@/core/context";
import {AnyRowData} from "@/core/types";

/**
 * Factory that creates a hook that returns the domain context
 */
export const createUseDomainHook = <T extends AnyRowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => useContext(DomainContext);
};
