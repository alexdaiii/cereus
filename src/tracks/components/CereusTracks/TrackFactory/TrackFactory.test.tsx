import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {TrackFactory} from "./TrackFactory";

describe("TrackFactory", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(<TrackFactory></TrackFactory>);

    expect(true).toBeTruthy();
  });
});
