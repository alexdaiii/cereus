import {describe, expect, it} from "vitest";

import {RowData} from "@/core";
import {DomainContextType, createDomainContext} from "@/core/context";

describe("createDomainContext", () => {
  it("should create context with expected properties", () => {
    const context = createDomainContext();

    // Check if the context has the expected properties
    expect(context).toHaveProperty("Provider");
    expect(context).toHaveProperty("Consumer");

    const expected: DomainContextType<RowData> = {
      domainMin: 0,
      domainMax: 0,
      data: [],
      visibleRowIds: [],
      visibleRowsCount: 0,
      visibleTracksCountPerRow: new Map(),
      visibleTracksCount: 0,
      visibleTrackIds: [],
      visibleRows: [],
      visibleTracks: [],
      rowIdToTitle: new Map(),
    };

    // @ts-expect-error - accessing _currentValue to get current value of ctx
    const defaultValue = context._currentValue;
    expect(defaultValue).toEqual(expected);
  });
});
