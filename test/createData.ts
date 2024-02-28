import {AnyRowData, InferTrackType, RowData, TrackData} from "../src";

/**
 * Creates the data for the test. The data array returned will be the same
 * length as the visible array.
 *
 * The tracks will have the number of tracks equal to the index of the row.
 * @param visible
 */
export const createData = <RowDataT extends RowData<TrackData> = AnyRowData>(
  visible: boolean[],
) => {
  const data: RowDataT[] = [];
  const visibleTracks: InferTrackType<RowDataT>[] = [];
  const visibleRows: RowDataT[] = [];

  for (let i = 0; i < visible.length; i++) {
    const tracks = Array.from({length: i}, (_, trackIdx) => {
      return {
        trackId: `row-${i}-track-${trackIdx}`,
        trackType: `row-${i}`,
        data: [],
      };
    });

    data.push({
      rowId: `row-${i}`,
      title: `Row ${i}`,
      visible: visible[i],
      tracks: tracks,
    } as RowDataT);

    if (visible[i]) {
      visibleRows.push(data[i]);
      visibleTracks.push(...tracks);
    }
  }

  return {data, visibleTracks, visibleRows};
};
