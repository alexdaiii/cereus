import "@testing-library/jest-dom";
import {render, renderHook} from "@testing-library/react";
import {Context, FC, createContext, useContext} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {
  AnyRowData,
  DefaultTracks,
  DomainContextType,
  DomainProviderProps,
  RowData,
  createDomainProvider,
  createUnsortedDomainProvider,
} from "@/core";
import * as exports from "@/core/hooks/useSortData";

import {createData} from "@test/createData";

describe("UnsortedDomainProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let context: Context<DomainContextType<AnyRowData>>;
  let TestProvider: FC<DomainProviderProps<AnyRowData>>;

  beforeEach(() => {
    context = createContext<DomainContextType<AnyRowData>>({
      domainMin: 0,
      domainMax: 0,
      data: [],
    });

    TestProvider = createUnsortedDomainProvider(context);
  });

  it.each([
    ["no row data", []],
    ["1 row", [true]],
    ["1 row, not visible", [false]],
    ["multiple rows", [true, true, false, true, false, true]],
  ])("Should provide the correct data %s", (_, visible) => {
    const {data: dataOrg} = createData(visible);

    const useDomain = () => useContext(context);

    const {
      result: {
        current: {data, domainMax, domainMin},
      },
    } = renderHook(() => useDomain(), {
      wrapper: ({children}) => (
        <TestProvider data={dataOrg} domainMax={100} domainMin={-500}>
          {children}
        </TestProvider>
      ),
    });

    expect(data, "data").toEqual(dataOrg);
    expect(domainMax, "domain max").toEqual(100);
    expect(domainMin, "min domain").toEqual(-500);
  });

  it("Always makes domain min less than domain max", () => {
    const {data} = createData([]);

    const useDomain = () => useContext(context);

    const {
      result: {
        current: {domainMax, domainMin},
      },
    } = renderHook(() => useDomain(), {
      wrapper: ({children}) => (
        <TestProvider data={data} domainMax={-100} domainMin={500}>
          {children}
        </TestProvider>
      ),
    });

    expect(domainMax, "domain max").toBeGreaterThan(domainMin);
    expect(domainMin, "min domain").toBeLessThan(domainMax);

    // should swap the values
    expect(domainMin).toEqual(-100);
    expect(domainMax).toEqual(500);
  });
});

describe("SortedDomainProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let context: Context<DomainContextType<RowData<DefaultTracks>>>;
  let SortedProvider: FC<DomainProviderProps<RowData<DefaultTracks>>>;

  beforeEach(() => {
    context = createContext<DomainContextType<RowData<DefaultTracks>>>({
      domainMin: 0,
      domainMax: 0,
      data: [],
    });
    SortedProvider = createDomainProvider(context);
  });

  it("should call useSortData", () => {
    const {data} = createData<RowData<DefaultTracks>>([]);

    const mockSortData = vi.fn(() => data);

    vi.spyOn(exports, "useSortData").mockImplementation(mockSortData);

    render(
      <SortedProvider data={data} domainMin={0} domainMax={50}>
        {null}
      </SortedProvider>,
    );

    expect(mockSortData).toBeCalled();
  });

  it("should provide the correct data", () => {
    const {data: dataOrg} = createData<RowData<DefaultTracks>>([]);

    const useDomain = () => useContext(context);

    const {
      result: {
        current: {data, domainMax, domainMin},
      },
    } = renderHook(() => useDomain(), {
      wrapper: ({children}) => (
        <SortedProvider data={dataOrg} domainMax={100} domainMin={-500}>
          {children}
        </SortedProvider>
      ),
    });

    expect(data, "data").toEqual(dataOrg);
    expect(domainMax, "domain max").toEqual(100);
    expect(domainMin, "min domain").toEqual(-500);
  });
});
