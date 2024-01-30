import {InferTrackType, RowData, RowDataWithHeight} from "@/core";
import {CereusTracks} from "@/tracks";

/**
 * The data shape for a single row in the sequence viewer.
 */
export type CereusRowData = RowData<CereusTracks>;

/**
 * The data shape returned by CereusPlot for a single row in the sequence viewer.
 */
export type CereusRowDataWithHeight = RowDataWithHeight<CereusRowData>;
/**
 * The data shape returned by CereusPlot for a single track for a row in the
 * sequence viewer.
 */
export type CereusTrackDataWithHeight = InferTrackType<CereusRowDataWithHeight>;
