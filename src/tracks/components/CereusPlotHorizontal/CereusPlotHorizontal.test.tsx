import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {scaleBand} from "@visx/scale";
import {afterEach, describe, expect, it, vi} from "vitest";

import {PlotAreaStyleContext} from "../../../core";
import {CereusDomainContext, CereusScalesContext} from "../../context";
import {CereusRowData, CereusTracks} from "../../types";
import {CereusPlotHorizontal} from "./CereusPlotHorizontal";

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
    data: {
      positions: [1, 2, 3, 4],
    },
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
    trackType: "block",
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
      // @ts-expect-error - We don't need to provide all the values.
      value={{
        visibleRows: data,
      }}
    >
      <CereusScalesContext.Provider
        value={{
          // @ts-expect-error - Use band scale because its easier
          y0ScaleStart: y0Scale,
          y0Bandwidth: rowBandwidth,
          y1ScalePaddingInner: 0,
        }}
      >
        {children}
      </CereusScalesContext.Provider>
    </CereusDomainContext.Provider>
  );
};

describe("CereusPlotHorizontal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call the children function for how many tracks there are", () => {
    const fn = vi.fn();

    render(
      <svg>
        <SurroundingCtx>
          <CereusPlotHorizontal>{fn}</CereusPlotHorizontal>
        </SurroundingCtx>
      </svg>,
    );

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("should pass children tracks[] with the correct values", () => {
    const fn = vi.fn();

    render(
      <svg>
        <SurroundingCtx>
          <CereusPlotHorizontal>{fn}</CereusPlotHorizontal>
        </SurroundingCtx>
      </svg>,
    );

    // get what the first call to fn() was
    const firstCall = fn.mock.calls[0];
    expect(firstCall).toEqual([
      {
        index: 0,
        width: 0,
        height: y0Scale.bandwidth(),
        y: 0,
        ...tracks[0],
      },
      "row1",
      "Row 1",
    ]);

    const secondCall = fn.mock.calls[1];
    expect(secondCall).toEqual([
      {
        index: 0,
        width: 0,
        height: y0Scale.bandwidth() / 2,
        y: 0,
        ...tracks[1],
      },
      "row2",
      "Row 2",
    ]);

    const thirdCall = fn.mock.calls[2];
    expect(thirdCall).toEqual([
      {
        index: 1,
        width: 0,
        height: y0Scale.bandwidth() / 2,
        y: y0Scale.bandwidth() / 2,
        ...tracks[2],
      },
      "row2",
      "Row 2",
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
            <CereusPlotHorizontal>{fn}</CereusPlotHorizontal>
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
