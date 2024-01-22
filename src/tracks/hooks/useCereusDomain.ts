import {createUseDomainHook} from "@/core/hooks";
import {CereusDomainContext} from "@/tracks/context";

/**
 * Returns the domain of the cereus tracks and data
 */
export const useCereusDomain = createUseDomainHook(CereusDomainContext);
