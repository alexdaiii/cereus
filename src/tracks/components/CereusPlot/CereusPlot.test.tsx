import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {CereusPlot} from "./CereusPlot";

describe("CereusPlot", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <CereusPlot>
        <></>
      </CereusPlot>,
    );

    expect(true).toBeTruthy();
  });
});
