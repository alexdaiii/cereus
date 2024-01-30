import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {FilterBar} from "./FilterBar";

describe("FilterBar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(<FilterBar></FilterBar>);

    expect(true).toBeTruthy();
  });
});
