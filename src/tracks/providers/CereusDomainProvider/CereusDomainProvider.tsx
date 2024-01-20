import {createDomainProvider} from "@/core/providers";
import {CereusDomainContext} from "@/tracks/context";

/**
 * Provider for the CeresSequenceViewer domain.
 *
 * Allows the use of useCeresDomain() and useVisibleDomain() hooks
 */
export const CereusDomainProvider = createDomainProvider(
  CereusDomainContext,
  "CereusDomainProvider",
);
