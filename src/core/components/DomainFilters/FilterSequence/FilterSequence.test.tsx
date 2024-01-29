import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {FilterSequence} from "./FilterSequence";

describe("FilterSequence", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <FilterSequence>
        <></>
      </FilterSequence>,
    );

    expect(true).toBeTruthy();
  });
});
