import {renderHook} from "@testing-library/react";
import {Context, createContext} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {DomainContextType} from "@/core/context";
import {RowData, TrackData} from "@/core/types";

import {createGetVisibleRowIdsHook} from "../visibleRows";
import {
  createGetVisibleTrackCountHook,
  createGetVisibleTrackIDsHook,
  createGetVisibleTracksHook,
} from "./visibleTracksFactories";

const sortByTrackId = (a: TrackData, b: TrackData) => {
  if (a.trackId > b.trackId) {
    return 1;
  }
  if (a.trackId < b.trackId) {
    return -1;
  }
  return 0;
};

const createData = (visible: boolean[]) => {
  const data: RowData[] = [];
  const visibleTracks: TrackData[] = [];

  for (let i = 0; i < visible.length; i++) {
    const tracks = Array.from({length: i + 1}, (_, trackIdx) => {
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
      visibleTracks.push(...tracks);
    }
  }
  visibleTracks.sort(sortByTrackId);

  return {data, visibleTracks};
};

describe("createGetVisibleTracksHook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let context: Context<DomainContextType<RowData>>;

  beforeEach(() => {
    context = createContext<DomainContextType<RowData>>({
      domainMin: 0,
      domainMax: 0,
      data: [],
    });
  });

  it("should return empty array if not in provider", () => {
    const useGetVisibleRows = createGetVisibleTracksHook(context);

    const {result} = renderHook(() => useGetVisibleRows());

    expect(result.current).toEqual([]);
  });

  it.each([
    ["no rows with data", [], 0],
    ["1 row", [true], 1],
    ["1 row, not visible", [false], 0],
    ["multiple rows", [true, true, false, true, false, true], 1 + 2 + 4 + 6],
  ])(
    "Should return tracks on the visible rows when there are %s",
    (_, visible, expected) => {
      const useGetVisibleRows = createGetVisibleTracksHook(context);

      const {data, visibleTracks} = createData(visible);

      const {result} = renderHook(() => useGetVisibleRows(), {
        wrapper: ({children}) => (
          <context.Provider
            value={{
              domainMin: 0,
              domainMax: 0,
              data,
            }}
          >
            {children}
          </context.Provider>
        ),
      });

      expect(result.current).toHaveLength(expected);

      result.current.sort(sortByTrackId);

      expect(result.current).toEqual(visibleTracks);
    },
  );
});

describe("createGetVisibleRowIdsHook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let context: Context<DomainContextType<RowData>>;

  beforeEach(() => {
    context = createContext<DomainContextType<RowData>>({
      domainMin: 0,
      domainMax: 0,
      data: [],
    });
  });

  it("should return empty array if not in provider", () => {
    const useGetVisibleRows = createGetVisibleRowIdsHook(context);

    const {result} = renderHook(() => useGetVisibleRows());

    expect(result.current).toEqual([]);
  });

  it.each([
    ["no rows with data", [], 0],
    ["1 row", [true], 1],
    ["1 row, not visible", [false], 0],
    ["multiple rows", [true, true, false, true, false, true], 1 + 2 + 4 + 6],
  ])(
    "Should return ids on the visible tracks when there are %s",
    (_, visible, expected) => {
      const useGetVisibleRows = createGetVisibleTrackIDsHook(context);

      const {data, visibleTracks} = createData(visible);

      const {result} = renderHook(() => useGetVisibleRows(), {
        wrapper: ({children}) => (
          <context.Provider
            value={{
              domainMin: 0,
              domainMax: 0,
              data,
            }}
          >
            {children}
          </context.Provider>
        ),
      });

      expect(result.current).toHaveLength(expected);

      result.current.sort();

      expect(result.current).toEqual(visibleTracks.map(({trackId}) => trackId));
    },
  );
});

describe("createGetVisibleTrackCountHook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let context: Context<DomainContextType<RowData>>;

  beforeEach(() => {
    context = createContext<DomainContextType<RowData>>({
      domainMin: 0,
      domainMax: 0,
      data: [],
    });
  });

  it("should return 0 array if not in provider", () => {
    const useGetVisibleRows = createGetVisibleTrackCountHook(context);

    const {result} = renderHook(() => useGetVisibleRows());

    expect(result.current).toEqual(0);
  });

  it.each([
    ["no rows with data", [], 0],
    ["1 row", [true], 1],
    ["1 row, not visible", [false], 0],
    ["multiple rows", [true, true, false, true, false, true], 1 + 2 + 4 + 6],
  ])(
    "Should return num visible tracks when there are %s",
    (_, visible, expected) => {
      const useGetVisibleRows = createGetVisibleTrackCountHook(context);

      const {data} = createData(visible);

      const {result} = renderHook(() => useGetVisibleRows(), {
        wrapper: ({children}) => (
          <context.Provider
            value={{
              domainMin: 0,
              domainMax: 0,
              data,
            }}
          >
            {children}
          </context.Provider>
        ),
      });

      expect(result.current).toEqual(expected);
    },
  );
});
