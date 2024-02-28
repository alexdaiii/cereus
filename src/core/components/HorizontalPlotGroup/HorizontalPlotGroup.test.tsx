import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {HorizontalPlotGroup, RowData, TrackData} from "@/core";
import {RowDataWithHeight} from "@/core/types";

const tracks = [
  {
    index: 0,
    width: 500,
    height: 50,
    y: 0,
    trackId: "track1",
    trackType: "City",
    data: "San Francisco",
  },
  {
    index: 0,
    width: 500,
    height: 25,
    y: 0,
    trackId: "track2",
    trackType: "date",
    data: "100 years",
  },
  {
    index: 1,
    width: 500,
    height: 25,
    y: 25,
    trackId: "track3",
    trackType: "date",
    data: "200 years",
  },
];

const rowsWithHeight: RowDataWithHeight<RowData<TrackData>>[] = [
  {
    rowId: "row1",
    title: "Row 1",
    y0: 0,
    index: 0,
    tracks: [tracks[0]],
  },
  {
    rowId: "row2",
    title: "Row 2",
    y0: 50,
    index: 1,
    tracks: [tracks[1], tracks[2]],
  },
];

describe("HorizontalPlotGroup", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should flatten the rows array and call children with the tracks", () => {
    const fn = vi.fn();

    render(
      <svg>
        <HorizontalPlotGroup rows={rowsWithHeight}>{fn}</HorizontalPlotGroup>,
      </svg>,
    );

    expect(fn).toHaveBeenCalledTimes(tracks.length);

    const firstCall = fn.mock.calls[0];
    expect(firstCall).toEqual([
      tracks[0],
      rowsWithHeight[0].index,
      rowsWithHeight[0].rowId,
      rowsWithHeight[0].title,
    ]);

    const secondCall = fn.mock.calls[1];
    expect(secondCall).toEqual([
      tracks[1],
      rowsWithHeight[1].index,
      rowsWithHeight[1].rowId,
      rowsWithHeight[1].title,
    ]);

    const thirdCall = fn.mock.calls[2];
    expect(thirdCall).toEqual([
      tracks[2],
      rowsWithHeight[1].index,
      rowsWithHeight[1].rowId,
      rowsWithHeight[1].title,
    ]);
  });

  it("should render a <g> for each row with a transform equal to the y0 value", () => {
    const fn = vi.fn();

    const {container} = render(
      <svg>
        <HorizontalPlotGroup rows={rowsWithHeight}>{fn}</HorizontalPlotGroup>,
      </svg>,
    );

    const rowGroups = container.querySelectorAll("g[data-rowgroup]");

    expect(rowGroups).toHaveLength(2);

    const firstRowGroup = rowGroups[0];
    expect(firstRowGroup).toHaveAttribute("data-rowgroup", "row1");
    expect(firstRowGroup).toHaveAttribute("transform", "translate(0, 0)");

    const secondRowGroup = rowGroups[1];
    expect(secondRowGroup).toHaveAttribute("data-rowgroup", "row2");
    expect(secondRowGroup).toHaveAttribute("transform", "translate(0, 50)");
  });

  it("should render a <g> for each track with a transform equal to the y value", () => {
    const fn = vi.fn();

    const {container} = render(
      <svg>
        <HorizontalPlotGroup rows={rowsWithHeight}>{fn}</HorizontalPlotGroup>,
      </svg>,
    );

    const trackGroups = container.querySelectorAll("g[data-trackgroup]");

    expect(trackGroups).toHaveLength(3);

    const firstTrackGroup = trackGroups[0];
    expect(firstTrackGroup).toHaveAttribute("data-trackgroup", "track1");
    expect(firstTrackGroup).toHaveAttribute("transform", "translate(0, 0)");

    const secondTrackGroup = trackGroups[1];
    expect(secondTrackGroup).toHaveAttribute("data-trackgroup", "track2");
    expect(secondTrackGroup).toHaveAttribute("transform", "translate(0, 0)");

    const thirdTrackGroup = trackGroups[2];
    expect(thirdTrackGroup).toHaveAttribute("data-trackgroup", "track3");
    expect(thirdTrackGroup).toHaveAttribute("transform", "translate(0, 25)");
  });
});
