import {createDomainProvider} from "src/providers/DomainProvider/DomainProviderFactories";

import {CereusDomainContext} from "@/context";

/**
 * Provider for the CeresSequenceViewer domain.
 *
 * Allows the use of useCeresDomain() and useVisibleDomain() hooks
 */
export const CereusDomainProvider = createDomainProvider(
  CereusDomainContext,
  "CereusDomainProvider",
);
