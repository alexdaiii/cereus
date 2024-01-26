import "@testing-library/jest-dom";
import {renderHook} from "@testing-library/react";
import {
  MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import * as useRangeExports from "@/core/hooks/useRange";

import {useCereusScale} from "../../../hooks";
import {CereusRowData} from "../../../types";
import {CereusDomainProvider} from "../../CereusDomainProvider";
import {CereusYScaleProvider} from "./CereusYScaleProvider";

const dataMultiTracks: CereusRowData[] = [
  {
    rowId: "row1",
    title: "row1",
    visible: true,
    tracks: [
      {
        trackId: "track1",
        trackType: "block",
        data: [],
      },
      {
        trackId: "track2",
        trackType: "sequence",
        data: {
          sequence: "ATCG",
          begin: 0,
        },
      },
    ],
  },
  {
    rowId: "row2",
    title: "row2",
    visible: false,
    tracks: [
      {
        trackId: "track3",
        trackType: "point",
        data: {
          positions: [],
        },
      },
      {
        trackId: "track4",
        trackType: "heatmap",
        data: [],
      },
    ],
  },
  {
    rowId: "row3",
    title: "row3",
    visible: true,
    tracks: [
      {
        trackId: "track5",
        trackType: "heatmap",
        data: [],
      },
      {
        trackId: "track6",
        trackType: "sequence",
        data: {
          begin: 70,
          sequence: "ATCG",
        },
      },
      {
        trackId: "track7",
        trackType: "block",
        data: [],
      },
    ],
  },
];
const [rangeMin, rangeMax] = [-500, 499];

describe("CereusYScaleProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let spy: MockInstance;

  beforeEach(() => {
    // 1000 height units since the end and beginning px are included
    spy = vi.spyOn(useRangeExports, "useRange").mockReturnValue({
      minX: 0,
      maxX: 0,
      minY: rangeMin,
      maxY: rangeMax,
    });
  });

  it.each([
    [
      "no tracks",
      [],
      {
        domain: [],
        range: [],
        bandwidth: new Map(),
      },
    ],
    [
      "no visible tracks",
      [
        {
          rowId: "row1",
          title: "row1",
          visible: false,
          tracks: [],
        },
      ],
      {
        domain: [],
        range: [],
        bandwidth: new Map(),
      },
    ],
    [
      "with visible tracks",
      dataMultiTracks,
      {
        domain: ["row1", "row3"],
        range: [-500, -500 + (1000 / 5) * 2],
        bandwidth: new Map([
          ["row1", (1000 / 5) * 2],
          ["row3", (1000 / 5) * 3],
        ]),
      },
    ],
  ])(
    "with %s - should create scales dependant on the amount of visible tracks",
    (_, data: CereusRowData[], expected) => {
      const {
        result: {
          current: {y0Scale, y0Bandwidth},
        },
      } = renderHook(() => useCereusScale(), {
        wrapper: ({children}) => {
          return (
            <CereusDomainProvider domainMin={0} domainMax={0} data={data}>
              <CereusYScaleProvider>{children}</CereusYScaleProvider>
            </CereusDomainProvider>
          );
        },
      });

      expect(spy).toBeCalled();
      expect(y0Scale.domain()).toEqual(expected.domain);
      expect(y0Scale.range()).toEqual(expected.range);
      expect(y0Bandwidth).toEqual(expected.bandwidth);
    },
  );

  it("should handle when there is padding", () => {
    const paddingOuter = 0.5;
    const paddingInner = 2;

    const {
      result: {
        current: {y0Scale, y0Bandwidth},
      },
    } = renderHook(() => useCereusScale(), {
      wrapper: ({children}) => {
        return (
          <CereusDomainProvider
            domainMin={0}
            domainMax={0}
            data={dataMultiTracks}
          >
            <CereusYScaleProvider
              y0ScalePaddingInner={paddingInner}
              y0ScalePaddingOuter={paddingOuter}
            >
              {children}
            </CereusYScaleProvider>
          </CereusDomainProvider>
        );
      },
    });

    // 2 outer padding units
    // 1 inner padding unit
    const numEqTracks = paddingOuter * 2 + paddingInner * 1;
    const eachBandwidth = 1000 / (5 + numEqTracks);

    expect(y0Scale.domain()).toEqual(["row1", "row3"]);
    expect(y0Scale.range()).toEqual([
      -500 + eachBandwidth * paddingOuter,
      -500 +
        eachBandwidth * 2 +
        paddingOuter * eachBandwidth +
        eachBandwidth * paddingInner,
    ]);
    expect(y0Bandwidth).toEqual(
      new Map([
        ["row1", eachBandwidth * 2],
        ["row3", eachBandwidth * 3],
      ]),
    );
  });
});
