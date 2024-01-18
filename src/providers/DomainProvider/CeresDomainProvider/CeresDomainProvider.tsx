import {createDomainProvider} from "src/providers/DomainProvider/DomainProviderFactories";

import {CeresDomainContext} from "@/context";

/**
 * Provider for the CeresSequenceViewer domain.
 *
 * Allows the use of useCeresDomain() and useVisibleDomain() hooks
 */
export const CeresDomainProvider = createDomainProvider(
  CeresDomainContext,
  "CeresDomainProvider",
);
