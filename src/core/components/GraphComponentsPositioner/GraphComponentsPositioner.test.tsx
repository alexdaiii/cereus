import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {
  AxisBottomStyleContext,
  AxisLeftStyleContext,
  AxisRightStyleContext,
  AxisTopStyleContext,
  GraphAreaStyleContext,
  PlotAreaStyleContext,
} from "../../context";
import {
  AxisBottomPositioner,
  AxisLeftPositioner,
  AxisRightPositioner,
  AxisTopPositioner,
  GraphAreaPositioner,
  PlotAreaPositioner,
} from "./GraphComponentsPositioner";

describe.each([
  ["GraphAreaPositioner", GraphAreaStyleContext, GraphAreaPositioner],
  ["AxisTopPositioner", AxisTopStyleContext, AxisTopPositioner],
  ["AxisRightPositioner", AxisRightStyleContext, AxisRightPositioner],
  ["AxisBottomPositioner", AxisBottomStyleContext, AxisBottomPositioner],
  ["AxisLeftPositioner", AxisLeftStyleContext, AxisLeftPositioner],
  ["PlotAreaPositioner", PlotAreaStyleContext, PlotAreaPositioner],
])("%s", (_, Context, Positioner) => {
  it.each([
    [0, 0],
    [50, 150],
    [-200, 100],
  ])("should create a g transform object with offsets %s, %s", (top, left) => {
    const {getByTestId} = render(
      <svg>
        <Context.Provider
          value={{
            width: 0,
            height: 0,
            top,
            left,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <Positioner
            groupProps={{
              // @ts-expect-error - test prop
              "data-testid": "test",
            }}
          >
            <div></div>
          </Positioner>
        </Context.Provider>
      </svg>,
    );

    const element = getByTestId("test");

    expect(element).toHaveAttribute("transform", `translate(${left}, ${top})`);
  });
});
