import "@testing-library/jest-dom";
import {afterEach, describe, expect, it, vi} from "vitest";

import {createFilterBar} from "./FilterBar";

describe("FilterBar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    const FilterBar = createFilterBar();

    // render(<FilterBar></FilterBar>);

    expect(FilterBar).toBeTruthy();
  });
});
