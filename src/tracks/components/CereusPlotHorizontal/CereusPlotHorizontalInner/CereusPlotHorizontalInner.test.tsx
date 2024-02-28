import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {scaleBand} from "@visx/scale";
import {afterEach, describe, expect, it, vi} from "vitest";

import {PlotAreaStyleContext} from "@/core";
import {
  CereusDomainContext,
  CereusRowData,
  CereusYScaleContext,
} from "@/tracks";
import {CereusTracks} from "@/tracks";

import {CereusPlotHorizontalInner} from "./CereusPlotHorizontalInner";

const tracks: CereusTracks[] = [
  {
    trackId: "track1",
    data: {
      begin: 0,
      sequence: "ATCG",
    },
    trackType: "sequence",
  },
  {
    trackId: "track2",
    data: [
      {
        position: 0,
      },
      {
        position: 1,
      },
      {
        position: 2,
      },
      {
        position: 3,
      },
    ],
    trackType: "point",
  },
  {
    trackId: "track3",
    data: [
      {
        begin: 0,
        end: 1,
      },
    ],
    trackType: "bar",
  },
];

const data: CereusRowData[] = [
  {
    rowId: "row1",
    title: "Row 1",
    visible: true,
    tracks: [tracks[0]],
  },
  {
    rowId: "row2",
    title: "Row 2",
    visible: true,
    tracks: [tracks[1], tracks[2]],
  },
];
const y0Scale = scaleBand({domain: ["row1", "row2"], range: [0, 100]});
const rowBandwidth = new Map(
  y0Scale.domain().map(rowId => [rowId, y0Scale.bandwidth()]),
);

const SurroundingCtx = ({children}: {children: React.ReactNode}) => {
  return (
    <CereusDomainContext.Provider
      value={{
        data,
        domainMin: -1000,
        domainMax: 1000,
      }}
    >
      <CereusYScaleContext.Provider
        value={{
          // @ts-expect-error - using scaleband instead of scaleordinal
          y0Scale,
          y0Bandwidth: rowBandwidth,
          y1ScalePaddingInner: 0,
        }}
      >
        {children}
      </CereusYScaleContext.Provider>
    </CereusDomainContext.Provider>
  );
};

describe("CereusPlotHorizontalInner", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render as many children for how many tracks there are", () => {
    const fn = vi.fn();

    render(
      <svg>
        <SurroundingCtx>
          <CereusPlotHorizontalInner>{fn}</CereusPlotHorizontalInner>
        </SurroundingCtx>
      </svg>,
    );

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("should pass into children (tracks[], rowIndex, rowId, rowTitle)", () => {
    const fn = vi.fn();

    render(
      <svg>
        <SurroundingCtx>
          <CereusPlotHorizontalInner>{fn}</CereusPlotHorizontalInner>
        </SurroundingCtx>
      </svg>,
    );

    const firstCall = fn.mock.calls[0];
    const secondCall = fn.mock.calls[1];
    const thirdCall = fn.mock.calls[2];

    expect(firstCall).toEqual([
      {
        ...tracks[0],
        // first row, first track
        index: 0,
        // full height of the row
        height: y0Scale.bandwidth(),
        // no width (not provided in ctx)
        width: 0,
        // no offset
        y: 0,
      },
      0,
      data[0].rowId,
      data[0].title,
    ]);
    expect(secondCall).toEqual([
      {
        ...tracks[1],
        index: 0,
        height: y0Scale.bandwidth() / 2,
        width: 0,
        y: 0,
      },
      1,
      data[1].rowId,
      data[1].title,
    ]);
    expect(thirdCall).toEqual([
      {
        ...tracks[2],
        index: 1,
        height: y0Scale.bandwidth() / 2,
        width: 0,
        y: y0Scale.bandwidth() / 2,
      },
      1,
      data[1].rowId,
      data[1].title,
    ]);
  });

  it("should place the all the rows and tracks inside a <g> element positioned where the plot area is located", () => {
    const fn = vi.fn();

    const [left, top] = [50, 25];

    render(
      <svg>
        <SurroundingCtx>
          <PlotAreaStyleContext.Provider
            value={{
              width: 500,
              height: 750,
              left: left,
              top: top,
            }}
          >
            <CereusPlotHorizontalInner>{fn}</CereusPlotHorizontalInner>
          </PlotAreaStyleContext.Provider>
        </SurroundingCtx>
      </svg>,
    );

    // get the surrounding g
    const surroundingG = document.querySelector("g");
    expect(surroundingG).toHaveAttribute(
      "transform",
      `translate(${left}, ${top})`,
    );
  });
});
