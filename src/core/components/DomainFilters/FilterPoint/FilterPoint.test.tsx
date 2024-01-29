import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {FilterPoint} from "./FilterPoint";

describe("FilterPoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <FilterPoint>
        <></>
      </FilterPoint>,
    );

    expect(true).toBeTruthy();
  });
});
