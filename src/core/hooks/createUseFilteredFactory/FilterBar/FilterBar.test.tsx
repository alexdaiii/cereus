import "@testing-library/jest-dom";
import {afterEach, describe, expect, it, vi} from "vitest";

describe("FilterBar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    expect(false).toBeTruthy();
  });
});
