import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {PointTrack} from "./PointTrack";

describe("PointTrack", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(<PointTrack></PointTrack>);

    expect(true).toBeTruthy();
  });
});
