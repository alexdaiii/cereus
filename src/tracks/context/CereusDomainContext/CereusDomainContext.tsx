import {Dispatch, SetStateAction, createContext} from "react";

import {createDomainContext} from "@/core/context";
import {CereusRowData} from "@/tracks/types";

/**
 * A context that provides the domain and data for the CeresSequenceViewer.
 */
export const CereusDomainContext = createDomainContext<CereusRowData>();

type CereusDomainSetterContextType = {
  setDomainMin: Dispatch<SetStateAction<number>>;
  setDomainMax: Dispatch<SetStateAction<number>>;
};

/**
 * A context that allow the domain for the CereusDomainContext to be set
 */
export const CereusDomainSetterContext =
  createContext<CereusDomainSetterContextType>({
    setDomainMin: () => {},
    setDomainMax: () => {},
  });
