import {renderHook} from "@testing-library/react";
import {createContext} from "react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {DomainContextType} from "../../context";
import {RowData} from "../../types";
import {createUseDomainHook} from "./useDomainFactory";

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
