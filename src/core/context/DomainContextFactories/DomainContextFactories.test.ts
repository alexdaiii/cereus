import {describe, expect, it} from "vitest";

import {createDomainContext} from "@/core/context";

describe("createDomainContext", () => {
  it("should create context with expected properties", () => {
    const context = createDomainContext();

    // Check if the context has the expected properties
    expect(context).toHaveProperty("Provider");
    expect(context).toHaveProperty("Consumer");

    // @ts-expect-error - accessing _currentValue to get current value of ctx
    const defaultValue = context._currentValue;
    expect(defaultValue).toEqual({
      domainMin: 0,
      domainMax: 0,
      data: [],
    });
  });
});
