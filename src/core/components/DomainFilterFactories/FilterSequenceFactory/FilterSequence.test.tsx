import "@testing-library/jest-dom";
import {afterEach, describe, expect, it, vi} from "vitest";

describe("FilterSequence", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    expect(false).toBeTruthy();
  });
});
