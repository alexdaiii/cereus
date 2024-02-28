import "@testing-library/jest-dom";
import {renderHook} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {
  DefaultTracks,
  IntervalTrack,
  PointTrack,
  RowData,
  SequenceTrack,
  useSortData,
} from "@/core";

describe("SortData", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should handle empty data", () => {
    const data: RowData<DefaultTracks>[] = [
      {
        title: "test",
        rowId: "test",
        visible: true,
        tracks: [],
      },
    ];

    const {
      result: {current: sortedData},
    } = renderHook(() => useSortData(data));

    expect(sortedData).toEqual(data);
  });

  it.each([
    [
      "sorted",
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [[7, 8, 10]],
      ],
      [
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [[7, 8, 10]],
      ],
    ],
    [
      "unsorted",
      [
        [
          [3, 2, 1],
          [-1, -2, -3],
        ],
        [
          [10, 8, 7],
          [0, -7, 100],
        ],
      ],
      [
        [
          [1, 2, 3],
          [-3, -2, -1],
        ],
        [
          [7, 8, 10],
          [-7, 0, 100],
        ],
      ],
    ],
  ])(
    "should sort point data when tracks are %s",
    (_, points, expectedPositions) => {
      const data: RowData<DefaultTracks<never, never, PointTrack<"test">>>[] =
        points.map(tracks => {
          return {
            title: "test",
            rowId: "test",
            visible: true,
            tracks: tracks.map(trackPoints => {
              const track: PointTrack<"test"> = {
                trackId: "test",
                trackType: "test",
                data: trackPoints.map(position => ({
                  position,
                })),
              };
              return track;
            }),
          };
        });

      const {
        result: {current: sortedData},
      } = renderHook(() => useSortData(data));

      const actualPositions = sortedData.map(row => {
        return row.tracks.map(track => {
          return track.data.map(point => point.position);
        });
      });

      expect(actualPositions).toEqual(expectedPositions);
    },
  );

  it.each([
    [
      [0, 10],
      [0, 1, 2],
      [0, 1, 2],
    ],
    [
      [1.7, 4.25],
      [1, 2],
      [0, 2],
    ],
    [[9, 36], [], [2]],
  ])(
    "should create an interval tree and return correct answer for query %s",
    (query, expected1, expected2) => {
      const intervals = [
        [
          [1, 1],
          [1, 5],
          [4, 7],
        ],
        [
          [-2, 5],
          [-7, 0],
          [0, 10],
        ],
      ];

      const data: RowData<
        DefaultTracks<never, IntervalTrack<"test">, never>
      >[] = [
        {
          rowId: "test",
          title: "test",
          visible: true,
          tracks: intervals.map(trackIntervals => {
            const track: IntervalTrack<"test"> = {
              trackId: "test",
              trackType: "test",
              data: trackIntervals.map(interval => ({
                start: interval[0],
                end: interval[1],
              })),
            };
            return track;
          }),
        },
      ];

      const {
        result: {current: sortedData},
      } = renderHook(() => useSortData(data));

      const tree1 = sortedData[0].tracks[0].intervalTree;
      const tree2 = sortedData[0].tracks[1].intervalTree;

      expect(tree1).toBeDefined();
      expect(tree2).toBeDefined();

      expect(tree1?.search(query[0], query[1]).sort()).toEqual(
        expected1.sort(),
      );
      expect(tree2?.search(query[0], query[1]).sort()).toEqual(
        expected2.sort(),
      );
    },
  );

  it("should not sort sequence data", () => {
    const data: RowData<DefaultTracks<SequenceTrack<"any">, never, never>>[] = [
      {
        title: "test",
        rowId: "test",
        visible: true,
        tracks: [
          {
            trackId: "test",
            trackType: "any",
            data: {
              begin: 0,
              sequence: "ABCD",
            },
          },
        ],
      },
    ];

    const {
      result: {current: sortedData},
    } = renderHook(() => useSortData(data));

    expect(sortedData).toEqual(data);
  });

  it("should not modify the original data", () => {
    const getData = (): RowData<DefaultTracks>[] => {
      return [
        {
          rowId: "1",
          title: "1",
          visible: true,
          tracks: [
            {
              trackId: "1",
              trackType: "1",
              data: [
                {
                  start: 0,
                  end: 1,
                },
                {
                  start: 1,
                  end: 2,
                },
              ],
            },
          ],
        },
        {
          rowId: "2",
          title: "2",
          visible: true,
          tracks: [
            {
              trackId: "2",
              trackType: "2",
              data: [
                {
                  position: 0,
                },
                {
                  position: -100,
                },
              ],
            },
            {
              trackId: "3",
              trackType: "3",
              data: {
                begin: 0,
                sequence: "ABCD",
              },
            },
          ],
        },
      ];
    };

    const data = getData();

    const {
      result: {current: sortedData},
    } = renderHook(() => useSortData(data));

    expect(data).toEqual(getData());
    expect(sortedData).not.toEqual(data);
  });
});
