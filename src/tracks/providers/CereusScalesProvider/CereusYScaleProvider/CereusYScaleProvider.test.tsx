import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {CereusYScaleProvider} from "./CereusYScaleProvider";

describe("CereusYScaleProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <CereusYScaleProvider>
        <></>
      </CereusYScaleProvider>,
    );

    expect(true).toBeTruthy();
  });
});
