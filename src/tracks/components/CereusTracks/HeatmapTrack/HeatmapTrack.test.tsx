import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {HeatmapTrack} from "./HeatmapTrack";

describe("HeatmapTrack", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(<HeatmapTrack></HeatmapTrack>);

    expect(true).toBeTruthy();
  });
});
