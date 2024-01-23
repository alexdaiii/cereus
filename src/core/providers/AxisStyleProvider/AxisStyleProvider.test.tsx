import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {AxisStyleContextType} from "@/core/context";
import {
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
} from "@/core/hooks";
import {GraphAreaStyleProvider} from "@/core/providers";

import {AxisStyleProvider, AxisStyleProviderProps} from "./AxisStyleProvider";

describe("AxisStyleProvider", () => {
  it("should render without crashing", () => {
    render(
      <AxisStyleProvider
        topAxis={{
          height: 5,
        }}
        bottomAxis={{
          height: 5,
        }}
        leftAxis={{
          width: 5,
        }}
        rightAxis={{
          width: 5,
        }}
      >
        <></>
      </AxisStyleProvider>,
    );
  });

  it.each([
    ["undefined", {}],
    [
      "empty object",
      {
        topAxis: {},
        bottomAxis: {},
        leftAxis: {},
        rightAxis: {},
      },
    ],
  ])(
    "should provide height and width values with %s args",
    (_, args: Partial<AxisStyleProviderProps>) => {
      let topAxisStyle!: AxisStyleContextType;
      let bottomAxisStyle!: AxisStyleContextType;
      let leftAxisStyle!: AxisStyleContextType;
      let rightAxisStyle!: AxisStyleContextType;
      const TestComponent = () => {
        topAxisStyle = useAxisTopStyle();
        bottomAxisStyle = useAxisBottomStyle();
        leftAxisStyle = useAxisLeftStyle();
        rightAxisStyle = useAxisRightStyle();

        return null;
      };

      render(
        <AxisStyleProvider
          topAxis={args.topAxis}
          rightAxis={args.rightAxis}
          bottomAxis={args.bottomAxis}
          leftAxis={args.leftAxis}
        >
          <TestComponent />
        </AxisStyleProvider>,
      );

      const expected = {
        width: 0,
        height: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        top: 0,
        left: 0,
      };

      expect(topAxisStyle, "topAxisStyle").toEqual(expected);

      expect(bottomAxisStyle, "bottomAxisStyle").toEqual(expected);

      expect(leftAxisStyle, "leftAxisStyle").toEqual(expected);

      expect(rightAxisStyle, "rightAxisStyle").toEqual(expected);
    },
  );

  it("should calculate axes height and width correctly", () => {
    const topAxis = {
      height: 2,
      paddingTop: 1,
    };

    const bottomAxis = {
      height: 3,
      paddingBottom: 5,
    };

    const leftAxis = {
      width: 7,
      paddingLeft: 11,
    };

    const rightAxis = {
      width: 13,
      paddingRight: 17,
    };

    let topAxisStyle!: AxisStyleContextType;
    let bottomAxisStyle!: AxisStyleContextType;
    let leftAxisStyle!: AxisStyleContextType;
    let rightAxisStyle!: AxisStyleContextType;

    const TestComponent = () => {
      topAxisStyle = useAxisTopStyle();
      bottomAxisStyle = useAxisBottomStyle();
      leftAxisStyle = useAxisLeftStyle();
      rightAxisStyle = useAxisRightStyle();

      return null;
    };

    const [graphHeight, graphWidth] = [500, 1000];
    const chartWidth =
      graphWidth -
      (leftAxis.width + leftAxis.paddingLeft) -
      (rightAxis.width + rightAxis.paddingRight);
    const chartHeight =
      graphHeight -
      (topAxis.height + topAxis.paddingTop) -
      (bottomAxis.height + bottomAxis.paddingBottom);

    render(
      <GraphAreaStyleProvider
        parentWidth={graphWidth}
        parentHeight={graphHeight}
      >
        <AxisStyleProvider
          topAxis={topAxis}
          rightAxis={rightAxis}
          bottomAxis={bottomAxis}
          leftAxis={leftAxis}
        >
          <TestComponent />
        </AxisStyleProvider>
      </GraphAreaStyleProvider>,
    );

    expect(topAxisStyle, "topAxisStyle").toEqual({
      width: chartWidth,
      height: topAxis.height,
      paddingTop: topAxis.paddingTop,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      top: 0,
      left: leftAxis.width + leftAxis.paddingLeft,
    });

    expect(bottomAxisStyle, "bottomAxisStyle").toEqual({
      width: chartWidth,
      height: bottomAxis.height,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: bottomAxis.paddingBottom,
      paddingLeft: 0,
      top: graphHeight - bottomAxis.height - bottomAxis.paddingBottom,
      left: leftAxis.width + leftAxis.paddingLeft,
    });

    expect(leftAxisStyle, "leftAxisStyle").toEqual({
      width: leftAxis.width,
      height: chartHeight,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: leftAxis.paddingLeft,
      top: topAxis.height + topAxis.paddingTop,
      left: 0,
    });

    expect(rightAxisStyle, "rightAxisStyle").toEqual({
      width: rightAxis.width,
      height: chartHeight,
      paddingTop: 0,
      paddingRight: rightAxis.paddingRight,
      paddingBottom: 0,
      paddingLeft: 0,
      top: topAxis.height + topAxis.paddingTop,
      left: graphWidth - rightAxis.width - rightAxis.paddingRight,
    });
  });
});
