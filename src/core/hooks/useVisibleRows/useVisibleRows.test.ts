import {renderHook} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {useVisibleRows} from "@/core/hooks/useVisibleRows/useVisibleRows";

import {createData} from "@test/createData";

describe("useVisibleRows", () => {
  it.each([
    [
      "no row data",
      [],
      {
        numVisibleRows: 0,
        numVisibleTracks: 0,
        visibleTracksPerRow: new Map(),
      },
    ],
    [
      "1 row",
      [true],
      {
        numVisibleRows: 1,
        numVisibleTracks: 0,
        visibleTracksPerRow: new Map([["row-0", 0]]),
      },
    ],
    [
      "1 row, not visible",
      [false],
      {
        numVisibleRows: 0,
        numVisibleTracks: 0,
        visibleTracksPerRow: new Map([["row-0", 0]]),
      },
    ],
    [
      "multiple rows",
      [true, true, false, true, false, true],
      {
        numVisibleRows: 4,
        numVisibleTracks: 1 + 3 + 5,
        // visibleTracksPerRow: [0, 1, 0, 3, 0, 5],
        visibleTracksPerRow: new Map([
          ["row-0", 0],
          ["row-1", 1],
          ["row-2", 0],
          ["row-3", 3],
          ["row-4", 0],
          ["row-5", 5],
        ]),
      },
    ],
  ])(
    "should return the visible rows and tracks with %s",
    (_, visible, expected) => {
      const {
        data,
        visibleTracks: expectedVisibleTracks,
        visibleRows: expectedVisibleRows,
      } = createData(visible);

      const {
        result: {
          current: {
            visibleTracks,
            visibleTrackIds,
            visibleTracksCountPerRow,
            visibleRows,
            visibleRowIds,
          },
        },
      } = renderHook(() => useVisibleRows(data));

      expect(visibleTracks, "visibleTracks").toEqual(expectedVisibleTracks);
      expect(visibleRows, "visibleRows").toEqual(expectedVisibleRows);
      expect(visibleTrackIds, "trackIds").toEqual(
        expectedVisibleTracks.map(track => track.trackId),
      );

      expect(visibleTracksCountPerRow, "visible tracks per row").toEqual(
        expected.visibleTracksPerRow,
      );

      expect(visibleRowIds, "visible row ids").toEqual(
        expectedVisibleRows.map(row => row.rowId),
      );
    },
  );
});
