import {createDomainProvider} from "@/core/providers";
import {CereusDomainContext} from "@/tracks/context";

/**
 * Provides the domain and data for the CeresSequenceViewer.
 * Does not manage any state.
 */
export const CereusDomainProvider = createDomainProvider(
  CereusDomainContext,
  "CereusDomainProvider",
);
