import "@testing-library/jest-dom";
import {renderHook} from "@testing-library/react";
import {cloneDeep} from "lodash";
import IntervalTree from "node-interval-tree";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {
  HorizontalTrackGroupContextType,
  IntervalTrack,
  createUseFilteredFactory,
  filterIntervalData,
} from "@/core";

describe("FilterInterval", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let intervals: number[][];
  let trackBase: HorizontalTrackGroupContextType<IntervalTrack<string>>;

  beforeEach(() => {
    intervals = [
      [-5, -1.5],
      [-2, 0],
      [0, 3],
      [1, 1],
      [2, 7],
      [7.25, 10],
    ];
    trackBase = {
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
        data: intervals.map(([start, end]) => ({
          start,
          end,
        })),
      },
    };
  });

  it("should handle if intervalTree is undefined", () => {
    const useFilterInterval = createUseFilteredFactory(
      () => ({
        domainMin: 0,
        domainMax: 100,
        data: [],
      }),
      () => trackBase,
      filterIntervalData,
    );

    const result = renderHook(() => useFilterInterval()).result.current;

    expect(result.track.data).toEqual([]);
  });

  it.each([
    [-100, -50, []],
    [-50, -5, [0]],
    [-4, -1.333, [0, 1]],
    [0, 0, [1, 2]],
    [-3, 6, [0, 1, 2, 3, 4]],
    [1, 25, [2, 3, 4, 5]],
    [10, 15.7, [5]],
    [100, 125, []],
  ])(
    "should return intervals that are between %s and %s",
    (domainMin: number, domainMax: number, expected: number[]) => {
      const intervalCopy = cloneDeep(intervals);

      const intervalTree = new IntervalTree<number>();
      for (let i = 0; i < intervals.length; i++) {
        intervalTree.insert(intervals[i][0], intervals[i][1], i);
      }
      const track: HorizontalTrackGroupContextType<IntervalTrack<string>> = {
        ...trackBase,
        track: {
          ...trackBase.track,
          intervalTree,
        },
      };

      // should NEVER modify the original data
      const trackCopy = cloneDeep(track);

      const useFilterInterval = createUseFilteredFactory(
        () => ({
          domainMin: domainMin,
          domainMax: domainMax,
          data: [],
        }),
        () => track,
        filterIntervalData,
      );

      const result = renderHook(() => useFilterInterval()).result.current;

      const expectedTrack: HorizontalTrackGroupContextType<
        IntervalTrack<string>
      > = {
        ...trackCopy,
        track: {
          ...trackCopy.track,
          data: expected.map(idx => ({
            start: intervalCopy[idx][0],
            end: intervalCopy[idx][1],
          })),
        },
      };

      expect(result).toEqual(expectedTrack);
    },
  );
});
