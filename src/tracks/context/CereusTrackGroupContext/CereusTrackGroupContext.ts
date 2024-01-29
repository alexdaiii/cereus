import {createHorizontalTrackGroupContext} from "@/core";
import {CereusRowData} from "@/tracks";

/**
 * Context to surround each track rendered by a HorizontalPlotGroupsInner component
 */
export const CereusTrackGroupContext =
  createHorizontalTrackGroupContext<CereusRowData>();
