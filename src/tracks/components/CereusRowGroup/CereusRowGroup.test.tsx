import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {CereusRowGroup} from "./CereusRowGroup";

describe("CereusRowGroup", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <CereusRowGroup>
        <></>
      </CereusRowGroup>,
    );

    expect(true).toBeTruthy();
  });
});
