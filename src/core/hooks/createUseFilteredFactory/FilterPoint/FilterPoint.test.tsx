import "@testing-library/jest-dom";
import {renderHook} from "@testing-library/react";
import {cloneDeep} from "lodash";
import {afterEach, describe, expect, it, vi} from "vitest";

import {
  HorizontalTrackGroupContextType,
  PointTrack,
  createUseFilteredFactory,
  filterPointData,
} from "@/core";

describe("FilterPoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    [-50, -45, []],
    [-10, 1.5, [-3, -1, 0]],
    [-3, 10, [-3, -1, 0, 5, 10]],
    [0, 5, [0, 5]],
    [12.5, 100, [15]],
    [50, 75, []],
    [-1, -1, [-1]],
    [11.9, 12.1, [12]],
  ])(
    "should return points that are between %s and %s",
    (domainMin, domainMax, expected) => {
      const positions = [-3, -1, 0, 5, 10, 12, 15];

      const track: HorizontalTrackGroupContextType<PointTrack<string>> = {
        rowId: "rowId",
        title: "title",
        rowIndex: 0,
        initialized: true,
        track: {
          trackType: "any",
          trackId: "trackId",
          width: 100,
          height: 100,
          index: 0,
          y: 0,
          data: positions.map(position => ({
            position,
          })),
        },
      };
      // should NEVER modify the original data
      const trackCopy = cloneDeep(track);

      const useFilteredPosition = createUseFilteredFactory(
        () => ({
          domainMin: domainMin,
          domainMax: domainMax,
          data: [],
        }),
        () => track,
        filterPointData,
      );

      const result = renderHook(() => useFilteredPosition()).result.current;

      const expectedTrack: HorizontalTrackGroupContextType<PointTrack<string>> =
        {
          ...trackCopy,
          track: {
            ...trackCopy.track,
            data: expected.map(position => ({position})),
          },
        };

      expect(result).toEqual(expectedTrack);
    },
  );
});
