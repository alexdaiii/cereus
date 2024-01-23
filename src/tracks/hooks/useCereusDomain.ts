import {useContext} from "react";

import {createUseDomainHook} from "@/core/hooks";
import {CereusDomainContext, CereusDomainSetterContext} from "@/tracks/context";

/**
 * Returns the domain of the cereus tracks and data
 */
export const useCereusDomain = createUseDomainHook(CereusDomainContext);

/**
 * Returns the domain setter of the cereus tracks and data
 */
export const useCereusDomainSetter = () =>
  useContext(CereusDomainSetterContext);
