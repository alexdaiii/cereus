import {renderHook} from "@testing-library/react";
import {Context, createContext} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {DomainContextType} from "../../context";
import {RowData} from "../../types";
import {
  createGetVisibleRowCountHook,
  createGetVisibleRowsHook,
  createUseDomainHook,
} from "./useDomainFactories";

describe("createUseDomainHook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the domain context default values when not in provider", () => {
    const expected = {
      domainMin: -256,
      domainMax: 256,
      data: [
        {
          rowId: "row-1",
          title: "Row 1",
          visible: true,
          tracks: [
            {
              trackId: "track-1",
              trackType: "track-type-1",
              data: undefined,
            },
          ],
        },
      ],
    };

    const testContext = createContext<DomainContextType<RowData>>(expected);

    const useDomain = createUseDomainHook(testContext);

    const {result} = renderHook(() => useDomain());

    expect(result.current).toEqual(expected);
  });

  it("should return the domain context values when in provider", () => {
    const original = {
      domainMin: -512,
      domainMax: 512,
      data: [
        {
          rowId: "row-1",
          title: "Row 1",
          visible: false,
          tracks: [
            {
              trackId: "track-1",
              trackType: "track-type-1",
              data: "test",
            },
          ],
        },
      ],
    };

    const testContext = createContext<DomainContextType<RowData>>(original);

    const useDomain = createUseDomainHook(testContext);

    const expected = {
      domainMin: -256,
      domainMax: 256,
      data: [
        {
          rowId: "row-0",
          title: "Row 0",
          visible: true,
          tracks: [
            {
              trackId: "track-0",
              trackType: "track-type-0",
              data: undefined,
            },
          ],
        },
      ],
    };

    const {result} = renderHook(() => useDomain(), {
      wrapper: ({children}) => (
        <testContext.Provider value={expected}>{children}</testContext.Provider>
      ),
    });

    expect(result.current).toEqual(expected);
    expect(result.current).not.toEqual(original);
  });
});

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
    "Should return num visible rows when there are %s",
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

  it("should return empty array if not in provider", () => {
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
