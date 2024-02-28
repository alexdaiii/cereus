import {render} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {HorizontalTrackGroupContextType, TrackData} from "@/core";
import {
  CereusAreaTrack,
  CereusAreaTrackContext,
  CereusBarTrack,
  CereusBarTrackContext,
  CereusBondTrack,
  CereusBondTrackContext,
  CereusHeatmapTrack,
  CereusHeatmapTrackContext,
  CereusLineTrack,
  CereusLineTrackContext,
  CereusPlotHorizontal,
  CereusPointTrack,
  CereusPointTrackContext,
  CereusSequenceTrack,
  CereusSequenceTrackContext,
  CereusTrackTypes,
  CereusTracks,
} from "@/tracks";

const getTrackData = (trackType: string) => {
  const otherTrackData: (TrackData & Record<string, unknown>)[] = [
    {
      trackType: "random",
      trackId: "r1-t1",
      data: {
        foo: "bar",
      },
    },
  ];

  switch (trackType as CereusTrackTypes) {
    case "sequence":
      return {
        goodTrackData: [
          {
            trackType: "sequence",
            trackId: "r1-t1",
            data: {
              sequence: "ATCG",
              begin: 0,
            },
          },
        ] as CereusSequenceTrack[],
        otherTrackData,
      };

    case "bar":
    case "bond":
      return {
        goodTrackData: [
          {
            trackId: "r1-t1",
            trackType: trackType,
            data: [
              {
                start: 0,
                end: 10,
              },
            ],
          },
        ] as CereusBarTrack[] | CereusBondTrack[],
        otherTrackData,
      };

    case "area":
    case "heatmap":
    case "line":
    case "point":
      return {
        goodTrackData: [
          {
            trackId: "r1-t1",
            trackType: trackType,
            data: [
              {
                position: 0,
                quantity: 10,
              },
            ],
          },
        ] as
          | CereusAreaTrack[]
          | CereusHeatmapTrack[]
          | CereusLineTrack[]
          | CereusPointTrack[],
        otherTrackData,
      };

    default:
      return {
        goodTrackData: [],
        otherTrackData,
      };
  }
};

describe.each([
  ["sequence", CereusSequenceTrackContext],
  ["bar", CereusBarTrackContext],
  ["bond", CereusBondTrackContext],
  ["heatmap", CereusHeatmapTrackContext],
  ["point", CereusPointTrackContext],
  ["area", CereusAreaTrackContext],
  ["line", CereusLineTrackContext],
])(
  "CereusPlotHorizontal",
  (
    trackType,
    Context:
      | typeof CereusSequenceTrackContext
      | typeof CereusBarTrackContext
      | typeof CereusBondTrackContext
      | typeof CereusHeatmapTrackContext
      | typeof CereusPointTrackContext
      | typeof CereusAreaTrackContext
      | typeof CereusLineTrackContext,
  ) => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    beforeEach(async () => {
      const exports = await import("@/tracks/hooks/useCereusDomain").then(
        exports => {
          return exports;
        },
      );

      const {goodTrackData, otherTrackData} = getTrackData(trackType);

      const mockGetDomain = vi.fn(
        (): ReturnType<(typeof exports)["useCereusDomain"]> => {
          return {
            domainMin: 0,
            domainMax: 100,
            data: [
              {
                rowId: "row-1",
                title: "row-1",
                visible: true,
                tracks: goodTrackData,
              },
              {
                rowId: "row-2",
                title: "row-2",
                visible: true,
                // @ts-expect-error - some random data
                tracks: otherTrackData,
              },
            ],
          };
        },
      );

      vi.spyOn(exports, "useCereusDomain").mockImplementation(mockGetDomain);
    });

    it(`should place children in correct provider for ${trackType}`, () => {
      let innerData: HorizontalTrackGroupContextType<CereusTracks> | undefined;

      render(
        <svg>
          <CereusPlotHorizontal>
            <Context.Consumer>
              {data => {
                innerData = data;
                return null;
              }}
            </Context.Consumer>
          </CereusPlotHorizontal>
        </svg>,
      );

      expect(innerData).toBeDefined();
      expect(innerData!.track.trackType).toBe(trackType);
    });

    it("should return null if it cannot determine the type of track", () => {
      const MockChild = vi.fn();

      render(
        <svg>
          <CereusPlotHorizontal>
            <Context.Consumer>{() => <MockChild />}</Context.Consumer>
          </CereusPlotHorizontal>
        </svg>,
      );

      expect(MockChild).toHaveBeenCalledTimes(1);
    });
  },
);
