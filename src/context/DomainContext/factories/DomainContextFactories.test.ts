import {describe, expect, it} from "vitest";

import {createDomainContext} from "@/context";

describe("DomainContext factories", () => {
  it("should be tested", () => {
    const domainContext = createDomainContext();

    expect(domainContext).toBeTruthy();
  });
});
