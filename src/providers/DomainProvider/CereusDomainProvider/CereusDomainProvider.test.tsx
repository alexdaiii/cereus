import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {CereusDomainProvider} from "./CereusDomainProvider";

describe("CereusDomainProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <CereusDomainProvider domainMax={4} data={[]}>
        <></>
      </CereusDomainProvider>,
    );

    expect(true).toBeTruthy();
  });
});
