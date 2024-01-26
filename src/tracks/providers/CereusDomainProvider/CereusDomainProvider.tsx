import {createDomainProvider} from "@/core/providers";
import {CereusDomainContext} from "@/tracks/context";

/**
 * Provides the domain and data for the CeresSequenceViewer.
 * By default, this does not filter the data to only include
 * values inside the domain.
 */
export const CereusDomainProvider = createDomainProvider(
  CereusDomainContext,
  "CereusDomainProvider",
);
