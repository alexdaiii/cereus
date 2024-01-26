import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {CereusXScaleProvider} from "./CereusXScaleProvider";

describe("CereusXScaleProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <CereusXScaleProvider>
        <></>
      </CereusXScaleProvider>,
    );

    expect(true).toBeTruthy();
  });
});
