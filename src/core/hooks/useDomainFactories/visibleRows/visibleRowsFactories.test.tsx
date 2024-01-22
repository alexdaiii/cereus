import {renderHook} from "@testing-library/react";
import {Context, createContext} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {
  DomainContextType,
  RowData,
  createGetVisibleRowCountHook,
  createGetVisibleRowIdsHook,
  createGetVisibleRowsHook,
} from "@/core";

describe("createGetVisibleRowsHook", () => {
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
    const useGetVisibleRows = createGetVisibleRowsHook(context);

    const {result} = renderHook(() => useGetVisibleRows());

    expect(result.current).toEqual([]);
  });

  it.each([
    ["no row data", [], 0, []],
    ["1 row", [true], 1, [0]],
    ["1 row, not visible", [false], 0, []],
    ["multiple rows", [true, true, false, true, false, true], 4, [5, 3, 1, 0]],
  ])(
    "Should return only the rows that have visible set to true when %s",
    (_, visible, expected, idx) => {
      const useGetVisibleRows = createGetVisibleRowsHook(context);

      const data = visible.map((row, index) => ({
        rowId: `row-${index}`,
        title: `Row ${index}`,
        visible: row,
        tracks: [],
      }));

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

      const sortByRowId = (a: RowData, b: RowData) => {
        if (a.rowId < b.rowId) {
          return -1;
        } else if (a.rowId > b.rowId) {
          return 1;
        }

        return 0;
      };

      // sort all the expected rows
      const expectedRows = data.filter((_, index) => idx.includes(index));
      expectedRows.sort(sortByRowId);

      // sort all the actual rows
      result.current.sort(sortByRowId);

      expect(result.current).toEqual(expectedRows);
    },
  );
});

describe("createGetVisibleRowCountHook", () => {
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

  it("should return 0 if not in provider", () => {
    const useGetVisibleRows = createGetVisibleRowCountHook(context);

    const {result} = renderHook(() => useGetVisibleRows());

    expect(result.current).toEqual(0);
  });

  it.each([
    ["no row data", [], 0],
    ["1 row", [true], 1],
    ["1 row, not visible", [false], 0],
    ["multiple rows", [true, true, false, true, false, true], 4],
  ])(
    "Should return num visible rows when there are %s",
    (_, visible, expected) => {
      const useGetVisibleRows = createGetVisibleRowCountHook(context);

      const data = visible.map((row, index) => ({
        rowId: `row-${index}`,
        title: `Row ${index}`,
        visible: row,
        tracks: [],
      }));

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
    ["no row data", [], []],
    ["1 row", [true], [0]],
    ["1 row, not visible", [false], []],
    ["multiple rows", [true, true, false, true, false, true], [5, 3, 1, 0]],
  ])(
    "Should return num visible rows when there are %s",
    (_, visible, expected) => {
      const useGetVisibleRows = createGetVisibleRowIdsHook(context);

      const data = visible.map((row, index) => ({
        rowId: `row-${index}`,
        title: `Row ${index}`,
        visible: row,
        tracks: [],
      }));

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

      expect(result.current).toHaveLength(expected.length);

      // actually ids can be in any order so sort them
      const expectedIds = expected.map(idx => data[idx].rowId);
      expectedIds.sort();

      result.current.sort();
      expect(result.current).toEqual(expectedIds);
    },
  );
});
