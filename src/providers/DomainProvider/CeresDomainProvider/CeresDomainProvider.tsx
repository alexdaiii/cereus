import {CeresDomainContext} from '@/context';
import {createDomainProvider} from '@/providers';

/**
 * Provider for the CeresSequenceViewer domain.
 *
 * Allows the use of useCeresDomain() and useVisibleDomain() hooks
 */
export const CeresDomainProvider = createDomainProvider(
  CeresDomainContext,
  'CeresDomainProvider',
);
