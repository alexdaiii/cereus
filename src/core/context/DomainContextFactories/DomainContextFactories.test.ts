import {describe, expect, it} from "vitest";

import {AnyRowData} from "@/core";
import {DomainContextType, createDomainContext} from "@/core/context";

describe("createDomainContext", () => {
  it("should create context with expected properties", () => {
    const context = createDomainContext();

    // Check if the context has the expected properties
    expect(context).toHaveProperty("Provider");
    expect(context).toHaveProperty("Consumer");

    const expected: DomainContextType<AnyRowData> = {
      domainMin: 0,
      domainMax: 0,
      data: [],
      visibleRowIds: [],
      visibleTracksCountPerRow: new Map(),
      visibleTrackIds: [],
      visibleRows: [],
      visibleTracks: [],
    };

    // @ts-expect-error - accessing _currentValue to get current value of ctx
    const defaultValue = context._currentValue;
    expect(defaultValue).toEqual(expected);
  });
});
