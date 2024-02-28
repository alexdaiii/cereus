import "@testing-library/jest-dom";
import {renderHook} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import * as useRangeExports from "@/core/hooks/useRange";
import {CereusDomainContext} from "@/tracks/context";
import {useCereusScale} from "@/tracks/hooks";

import {CereusXScaleProvider} from "./CereusXScaleProvider";

const [domainMin, domainMax] = [12, 36];
const SurroundingProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <CereusDomainContext.Provider
      value={{
        domainMin: domainMin,
        domainMax: domainMax,
        data: [],
        visibleRowIds: [],
        visibleRows: [],
        visibleTracks: [],
        visibleTracksCountPerRow: new Map(),
        visibleTrackIds: [],
      }}
    >
      {children}
    </CereusDomainContext.Provider>
  );
};

describe("CereusXScaleProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a scaleLinear with a domain of [domainMin, domainMax] from a CereusDomainProvider and a range equal to the plot's width", () => {
    const [rangeMin, rangeMax] = [-100, 100];

    // mock useRange
    const spy = vi.spyOn(useRangeExports, "useRange").mockReturnValue({
      minX: rangeMin,
      maxX: rangeMax,
      minY: -1,
      maxY: 1,
    });

    const {result} = renderHook(() => useCereusScale(), {
      wrapper: ({children}) => {
        return (
          <SurroundingProvider>
            <CereusXScaleProvider>{children}</CereusXScaleProvider>
          </SurroundingProvider>
        );
      },
    });

    expect(spy).toBeCalled();
    expect(result.current.xScale.domain()).toEqual([domainMin, domainMax]);
    expect(result.current.xScale.range()).toEqual([rangeMin, rangeMax]);
  });
});
