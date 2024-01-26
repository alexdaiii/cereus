import {createDomainContext} from "@/core/context";
import {CereusRowData} from "@/tracks/types";

/**
 * A context that provides the domain and data for the CeresSequenceViewer.
 */
export const CereusDomainContext = createDomainContext<CereusRowData>();
