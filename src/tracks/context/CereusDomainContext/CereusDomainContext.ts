// Oddly vitest fails if this is not imported using the full path.
import {createDomainContext} from "@/core/context";
import {RowData, TrackData} from "@/core/types";

/**
 * TODO: actually define the data types for the CeresSequenceViewer.
 */
type CereusSequenceData = TrackData<
  "sequence",
  {
    foo: string;
  }
>;
type CereusHeatmapData = TrackData<
  "heatmap",
  {
    bar: number;
  }
>;
type CereusBlockData = TrackData<
  "block",
  {
    baz: boolean;
  }
>;

type CereusArrayData = TrackData<"array", {myData: string}[]>;

type CereusTrackData =
  | CereusSequenceData
  | CereusHeatmapData
  | CereusBlockData
  | CereusArrayData;

type CereusRowData = RowData<CereusTrackData>;

/**
 * A context that provides the domain and data for the CeresSequenceViewer.
 */
export const CereusDomainContext = createDomainContext<CereusRowData>();

export const fooBar = (dataPoint: CereusTrackData) => {
  switch (dataPoint.trackType) {
    case "sequence":
      return dataPoint.data.foo;
    case "heatmap":
      return dataPoint.data.bar;
    case "block":
      return dataPoint.data.baz;
    case "array":
      return dataPoint.data;
    default:
      return "";
  }
};
