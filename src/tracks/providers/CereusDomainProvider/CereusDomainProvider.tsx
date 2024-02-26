import {createSortedDataProvider} from "@/core/components/SortData";
import {createDomainProvider} from "@/core/providers";
import {CereusTracks} from "@/tracks";
import {CereusDomainContext} from "@/tracks/context";

const CereusDomainProviderUnsorted = createDomainProvider(
  CereusDomainContext,
  "CereusDomainProvider",
);

/**
 * Provides the domain and data for the CeresSequenceViewer.
 * All tracks are sorted.
 */
export const CereusDomainProvider = createSortedDataProvider<CereusTracks>(
  CereusDomainProviderUnsorted,
);
