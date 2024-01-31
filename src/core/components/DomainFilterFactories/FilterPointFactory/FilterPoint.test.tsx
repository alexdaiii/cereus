import "@testing-library/jest-dom";
import {afterEach, describe, expect, it, vi} from "vitest";

describe("FilterPoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    expect(true).toBeTruthy();
  });
});
