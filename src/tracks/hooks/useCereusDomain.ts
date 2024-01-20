import {
  createGetVisibleRowCountHook,
  createGetVisibleRowsHook,
  createGetVisibleTrackCountHook,
  createUseDomainHook,
} from "@/core/hooks";
import {CereusDomainContext} from "@/tracks/context";

export const useCereusDomain = createUseDomainHook(CereusDomainContext);

export const useCereusVisibleRows =
  createGetVisibleRowsHook(CereusDomainContext);

export const useCereusVisibleRowCount =
  createGetVisibleRowCountHook(CereusDomainContext);

export const useCereusVisibleTrackCount =
  createGetVisibleTrackCountHook(CereusDomainContext);
