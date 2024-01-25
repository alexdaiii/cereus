import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {CereusPlotHorizontal} from "./CereusPlotHorizontal";

describe("CereusPlot", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(<CereusPlotHorizontal />);

    expect(true).toBeTruthy();
  });
});
