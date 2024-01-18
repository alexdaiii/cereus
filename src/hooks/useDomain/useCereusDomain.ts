import {CereusDomainContext} from "@/context";
import {
  createGetVisibleRowCountHook,
  createGetVisibleRowsHook,
  createGetVisibleTrackCountHook,
  createUseDomainHook,
} from "@/hooks/useDomain/factories";

export const useCereusDomain = createUseDomainHook(CereusDomainContext);

export const useCereusVisibleRows =
  createGetVisibleRowsHook(CereusDomainContext);

export const useCereusVisibleRowCount =
  createGetVisibleRowCountHook(CereusDomainContext);

export const useCereusVisibleTrackCount =
  createGetVisibleTrackCountHook(CereusDomainContext);
