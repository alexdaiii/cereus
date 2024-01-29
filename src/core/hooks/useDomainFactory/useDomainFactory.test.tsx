import {renderHook} from "@testing-library/react";
import {createContext} from "react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {
  AnyRowData,
  DomainContextType,
  RowData,
  TrackData,
  createUseDomainHook,
} from "@/core";

describe("createUseDomainHook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return the domain context default values when not in provider", () => {
    const expected: DomainContextType<RowData<TrackData>> = {
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
      visibleRows: [],
      visibleRowIds: [],
      visibleTrackIds: [],
      visibleTracks: [],
      visibleTracksCountPerRow: new Map(),
    };

    const testContext = createContext<DomainContextType<AnyRowData>>(expected);

    const useDomain = createUseDomainHook(testContext);

    const {result} = renderHook(() => useDomain());

    expect(result.current).toEqual(expected);
  });

  it("should return the domain context values when in provider", () => {
    const original: DomainContextType<AnyRowData> = {
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
      visibleRows: [],
      visibleRowIds: [],
      visibleTrackIds: [],
      visibleTracks: [],
      visibleTracksCountPerRow: new Map(),
    };

    const testContext = createContext(original);

    const useDomain = createUseDomainHook(testContext);

    const expected: DomainContextType<AnyRowData> = {
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
      visibleRows: [
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
      visibleRowIds: ["row-0"],
      visibleTrackIds: ["track-0"],
      visibleTracks: [
        {
          trackId: "track-0",
          trackType: "track-type-0",
          data: undefined,
        },
      ],
      visibleTracksCountPerRow: new Map([["row-0", 1]]),
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
