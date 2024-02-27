import {createDomainProvider} from "@/core";
import {CereusDomainContext} from "@/tracks/context";

/**
 * Provides the domain and data for the CeresSequenceViewer.
 * All tracks are sorted.
 */
export const CereusDomainProvider = createDomainProvider(CereusDomainContext);
