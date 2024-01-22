import "@testing-library/jest-dom";
import {renderHook} from "@testing-library/react";
import {Context, FC, createContext} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {DomainContextType} from "../../context";
import {createUseDomainHook} from "../../hooks";
import {RowData, TrackData} from "../../types";
import {
  DomainProviderProps,
  createDomainProvider,
} from "./DomainProviderFactories";

const sortByTrackId = (a: TrackData, b: TrackData) => {
  if (a.trackId > b.trackId) {
    return 1;
  }
  if (a.trackId < b.trackId) {
    return -1;
  }
  return 0;
};

const sortByRowId = (a: RowData, b: RowData) => {
  if (a.rowId < b.rowId) {
    return -1;
  } else if (a.rowId > b.rowId) {
    return 1;
  }

  return 0;
};

const createData = (visible: boolean[]) => {
  const data: RowData[] = [];
  const visibleTracks: TrackData[] = [];
  const visibleRows: RowData[] = [];

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
    });

    if (visible[i]) {
      visibleRows.push(data[i]);
      visibleTracks.push(...tracks);
    }
  }
  visibleTracks.sort(sortByTrackId);
  visibleRows.sort(sortByRowId);

  return {data, visibleTracks, visibleRows};
};

describe("DomainProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let context: Context<DomainContextType<RowData>>;
  let TestProvider: FC<DomainProviderProps<RowData>>;

  beforeEach(() => {
    context = createContext<DomainContextType<RowData>>({
      domainMin: 0,
      domainMax: 0,
      data: [],
      visibleRows: [],
      visibleRowIds: [],
      visibleRowsCount: 0,
      visibleTrackIds: [],
      visibleTracks: [],
      visibleTracksCount: 0,
      visibleTracksCountPerRow: new Map(),
    });

    TestProvider = createDomainProvider(context, "TestDomainProvider");
  });

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
    "Should calculate the correct visible rows and tracks when %s",
    (_, visible, expected) => {
      const {
        data: dataOrg,
        visibleTracks: expectedVisibleTracks,
        visibleRows: expectedVisibleRows,
      } = createData(visible);

      const useDomain = createUseDomainHook(context);

      const {
        result: {
          current: {
            data,
            visibleTracks,
            visibleRows,
            visibleTrackIds,
            visibleTracksCount,
            visibleTracksCountPerRow,
            domainMax,
            visibleRowsCount,
            visibleRowIds,
            domainMin,
          },
        },
      } = renderHook(() => useDomain(), {
        wrapper: ({children}) => (
          <TestProvider data={dataOrg} domainMax={100} domainMin={-500}>
            {children}
          </TestProvider>
        ),
      });

      expect(data, "data").toEqual(dataOrg);
      expect(visibleTracks, "visibleTracks").toEqual(expectedVisibleTracks);
      expect(visibleRows, "visibleRows").toEqual(expectedVisibleRows);
      expect(visibleTrackIds, "trackIds").toEqual(
        expectedVisibleTracks.map(track => track.trackId),
      );
      expect(visibleTracksCount, "num visible tracks").toEqual(
        expected.numVisibleTracks,
      );
      expect(visibleTracksCountPerRow, "visible tracks per row").toEqual(
        expected.visibleTracksPerRow,
      );
      expect(domainMax, "domain max").toEqual(100);
      expect(visibleRowsCount, "num  visible rows").toEqual(
        expected.numVisibleRows,
      );
      expect(visibleRowIds, "visible row ids").toEqual(
        expectedVisibleRows.map(row => row.rowId),
      );
      expect(domainMin, "min domain").toEqual(-500);
    },
  );
});
