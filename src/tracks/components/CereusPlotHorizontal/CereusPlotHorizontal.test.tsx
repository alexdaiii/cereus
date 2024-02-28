import {render} from "@testing-library/react";
import {ReactNode} from "react";
import {beforeEach, describe, expect, it} from "vitest";

import {
  AnyRowData,
  HorizontalTrackGroupContextType,
  PlotAreaStyleContext,
  TrackData,
} from "@/core";
import {
  CereusDomainProvider,
  CereusPlotHorizontal,
  useCereusAreaTrack,
  useCereusBarTrack,
  useCereusBondTrack,
  useCereusHeatmapTrack,
  useCereusLineTrack,
  useCereusPointTrack,
  useCereusSequenceTrack,
  useCereusTrackType,
} from "@/tracks";

describe.each([
  ["sequence", useCereusSequenceTrack],
  ["bar", useCereusBarTrack],
  ["bond", useCereusBondTrack],
  ["heatmap", useCereusHeatmapTrack],
  ["point", useCereusPointTrack],
  ["area", useCereusAreaTrack],
  ["line", useCereusLineTrack],
])("CereusPlotHorizontal", (trackType, hook) => {
  let TestChild: () => ReactNode;
  let actualTrackData: HorizontalTrackGroupContextType<TrackData>[];
  let actualTrackType: (string | undefined)[];
  let goodTrack: TrackData;
  let randomTrack: TrackData;

  beforeEach(() => {
    actualTrackData = [];
    actualTrackType = [];

    goodTrack = {
      trackId: "track1",
      trackType,
      data: "set data",
    };

    randomTrack = {
      trackId: "track2",
      trackType: "RANDOM_TYPE",
      data: "will be overwritten by default context value",
    };

    TestChild = function TestChild() {
      const innerTrackData = hook();
      actualTrackData.push(innerTrackData);
      const innerTrackType = useCereusTrackType();
      actualTrackType.push(innerTrackType);
      return null;
    };
  });

  it(`should place children in correct provider for ${trackType}`, () => {
    const data: AnyRowData = {
      rowId: "row1",
      visible: true,
      title: "Row 1",
      tracks: [goodTrack],
    };

    render(
      <CereusDomainProvider
        // @ts-expect-error - data only has the necessary fields
        data={[data]}
        domainMax={0}
      >
        <svg>
          <PlotAreaStyleContext.Provider
            // @ts-expect-error - only include the fields that are necessary
            value={{width: 500}}
          >
            <CereusPlotHorizontal>
              <TestChild />
            </CereusPlotHorizontal>
          </PlotAreaStyleContext.Provider>
        </svg>
      </CereusDomainProvider>,
    );

    expect(actualTrackData.length).toBe(1);

    const expectedTrackData: HorizontalTrackGroupContextType<TrackData> = {
      rowId: data.rowId,
      rowIndex: 0,
      title: data.title,
      initialized: true,
      track: {
        index: 0,
        height: 0,
        width: 500,
        y: 0,
        ...goodTrack,
      },
    };

    expect(actualTrackData[0]).toEqual(expectedTrackData);
    expect(actualTrackType[0]).toBe(trackType);
  });

  it("should handle unknown track types", () => {
    const data: AnyRowData = {
      rowId: "row1",
      visible: true,
      title: "Row 1",
      tracks: [randomTrack],
    };

    render(
      <CereusDomainProvider
        // @ts-expect-error - data only has the necessary fields
        data={[data]}
      >
        <svg>
          <PlotAreaStyleContext.Provider
            // @ts-expect-error - only include the fields that are necessary
            value={{width: 500}}
          >
            <CereusPlotHorizontal>
              <TestChild />
            </CereusPlotHorizontal>
          </PlotAreaStyleContext.Provider>
        </svg>
      </CereusDomainProvider>,
    );

    expect(actualTrackData.length).toBe(1);
    expect(actualTrackType.length).toBe(1);
  });

  it("should not initialize the context if the track type is not the correct type", () => {
    const data: AnyRowData = {
      rowId: "row1",
      visible: true,
      title: "Row 1",
      tracks: [goodTrack, randomTrack],
    };

    render(
      <CereusDomainProvider
        // @ts-expect-error - data only has the necessary fields
        data={[data]}
        domainMax={0}
      >
        <svg>
          <PlotAreaStyleContext.Provider
            // @ts-expect-error - only include the fields that are necessary
            value={{width: 500}}
          >
            <CereusPlotHorizontal>
              <TestChild />
            </CereusPlotHorizontal>
          </PlotAreaStyleContext.Provider>
        </svg>
      </CereusDomainProvider>,
    );

    expect(actualTrackData.length).toBe(2);

    // should not have initialized the surrounding context if its not the correct track type
    expect(actualTrackData[1].initialized).toBe(false);
    expect(actualTrackData[1].rowIndex).toBe(0);
    expect(actualTrackData[1].rowId).toBe("");
    expect(actualTrackData[1].title).toBe("");

    // this should take on the default values
    const randomTrackData = actualTrackData[1].track;
    expect(randomTrackData.index).toBe(0);
    expect(randomTrackData.height).toBe(0);
    expect(randomTrackData.width).toBe(0);
    expect(randomTrackData.y).toBe(0);
    expect(randomTrackData.trackId).toBe("");
    expect(randomTrackData.trackType).toBe(trackType);
    expect(randomTrackData.data).not.toEqual(randomTrack.data);

    expect(actualTrackType[1]).toBe(undefined);
  });
});
