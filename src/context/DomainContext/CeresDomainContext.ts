import {DomainContextType, createDomainContext} from '@/context';
import {Enumify, RowData} from '@/types';

export const CeresTrackTypes = {
  sequence: 'sequence',
  block: 'block',
  heatmap: 'heatmap',
} as const;
export type CeresTrackType = Enumify<typeof CeresTrackTypes>;
export type CeresRowData = RowData<CeresTrackType>;
export type CeresDomainContextType = DomainContextType<CeresRowData>;

/**
 * A context that provides the domain and data for the CeresSequenceViewer.
 */
export const CeresDomainContext = createDomainContext<CeresRowData>();
