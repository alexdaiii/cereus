import "@testing-library/jest-dom";
import {renderHook} from "@testing-library/react";
import {Context, FC, createContext, useContext} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {
  AnyRowData,
  DomainContextType,
  DomainProviderProps,
  createUnsortedDomainProvider,
} from "@/core";

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
});
