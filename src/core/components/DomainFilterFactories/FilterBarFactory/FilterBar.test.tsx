import "@testing-library/jest-dom";
import {afterEach, describe, expect, it, vi} from "vitest";

import {createFilterBar} from "./FilterBar";

describe("FilterBar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const fn3 = vi.fn();

    const FilterBar = createFilterBar(fn1, fn2, fn3);

    // render(<FilterBar></FilterBar>);

    expect(false).toBeTruthy();
  });
});
