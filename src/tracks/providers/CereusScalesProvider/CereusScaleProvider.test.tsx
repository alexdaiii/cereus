import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {CereusScalesProvider} from "./CereusScalesProvider";
import * as exportXScale from "./CereusXScaleProvider";
import * as exportYScale from "./CereusYScaleProvider";

describe("CereusScaleProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call CereusXScaleProvider and CereusYScaleProvider", () => {
    const xSpy = vi.spyOn(exportXScale, "CereusXScaleProvider");
    const ySpy = vi.spyOn(exportYScale, "CereusYScaleProvider");
    const fn = vi.fn();

    render(
      <CereusScalesProvider
        xScaleConfig={{
          zero: true,
        }}
        y0ScalePaddingInner={0.1}
        y0ScalePaddingOuter={0.5}
        y1ScalePaddingInner={0.25}
      >
        {fn()}
      </CereusScalesProvider>,
    );

    expect(xSpy).toHaveBeenCalled();
    expect(ySpy).toHaveBeenCalled();

    const xSpyXScaleConfig = xSpy.mock.calls[0][0].xScaleConfig;

    expect(xSpyXScaleConfig).toEqual({
      zero: true,
    });

    const {y0ScalePaddingInner, y1ScalePaddingInner, y0ScalePaddingOuter} =
      ySpy.mock.calls[0][0];

    expect(y0ScalePaddingInner).toEqual(0.1);
    expect(y1ScalePaddingInner).toEqual(0.25);
    expect(y0ScalePaddingOuter).toEqual(0.5);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
