import {CeresDomainContext} from '@/context';
import {createUseDomainHook} from '@/hooks';

export const useCeresDomain = createUseDomainHook(CeresDomainContext);
