import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {BlockTrack} from "./BlockTrack";

describe("BlockTrack", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(<BlockTrack></BlockTrack>);

    expect(true).toBeTruthy();
  });
});
