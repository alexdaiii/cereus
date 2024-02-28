import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {scaleBand} from "@visx/scale";
import {afterEach, describe, expect, it, vi} from "vitest";

import {PlotAreaStyleContext, PlotHorizontal} from "@/core";
import {RowData, RowDataWithHeight, TrackData} from "@/core/types";

const getData = (): RowData<TrackData & Record<string, unknown>>[] => {
  return [
    {
      rowId: "row1",
      title: "Row 1",
      visible: true,
      tracks: [
        {
          trackId: "track1",
          data: "San Francisco",
          trackType: "City",
        },
      ],
    },
    {
      rowId: "row2",
      title: "Row 2",
      visible: true,
      tracks: [
        {
          trackId: "track2",
          data: "100 years",
          trackType: "date",
          otherStuff: "stuff",
        },
        {
          trackId: "track3",
          data: "200 years",
          trackType: "date",
          otherThing2: "thing",
        },
      ],
    },
  ];
};

const y0Scale = scaleBand({domain: ["row1", "row2"], range: [0, 100]});
const rowBandwidth = new Map(
  y0Scale.domain().map(rowId => [rowId, y0Scale.bandwidth()]),
);

describe("PlotHorizontal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call the children function with the rowsWithHeight[]", () => {
    const fn = vi.fn();

    render(
      <PlotHorizontal
        visibleRows={getData()}
        rowBandwidth={rowBandwidth}
        y0Scale={y0Scale}
        y1ScalePaddingInner={0}
      >
        {fn}
      </PlotHorizontal>,
    );

    expect(fn).toHaveBeenCalled();
  });

  it("should pass children rowsWithHeight[] with the correct values", () => {
    const fn = vi.fn();

    const expWidth = 500;

    render(
      <PlotAreaStyleContext.Provider
        value={{
          width: expWidth,
          height: 0,
          left: 0,
          top: 0,
        }}
      >
        <PlotHorizontal
          visibleRows={getData()}
          rowBandwidth={rowBandwidth}
          y0Scale={y0Scale}
          y1ScalePaddingInner={0}
        >
          {fn}
        </PlotHorizontal>
      </PlotAreaStyleContext.Provider>,
    );

    const [row1, row2] = getData();
    const expectedArg: RowDataWithHeight<RowData<TrackData>>[] = [
      {
        rowId: "row1",
        title: "Row 1",
        y0: 0,
        index: 0,
        tracks: [
          {
            index: 0,
            width: expWidth,
            height: y0Scale.bandwidth(),
            y: 0,
            ...row1.tracks[0],
          },
        ],
      },
      {
        rowId: "row2",
        title: "Row 2",
        y0: 50,
        index: 1,
        tracks: [
          {
            index: 0,
            width: expWidth,
            height: y0Scale.bandwidth() / 2,
            y: 0,
            ...row2.tracks[0],
          },
          {
            index: 1,
            width: expWidth,
            height: y0Scale.bandwidth() / 2,
            // since there are 2 tracks, it will split the height in half
            y: 25,
            ...row2.tracks[1],
          },
        ],
      },
    ];

    expect(fn).toHaveBeenCalledWith(expectedArg);
  });
});
