import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {FC} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {GraphAreaStyleContextType, PlotAreaStyleContextType} from '@/context';
import {
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
  useGraphAreaStyle,
  usePlotAreaStyle,
} from '@/hooks';

import {AxisStyleProviderProps} from '../AxisStyleProvider';
import {
  GraphWithAxesProvider,
  GraphWithAxesProviderProps,
} from './GraphWithAxesProvider';

type TestInput = Omit<GraphWithAxesProviderProps, 'children'>;

describe('GraphWithAxesProvider', () => {
  let actual: {
    graphStyle: ReturnType<typeof useGraphAreaStyle>;
    axisLeftStyle: ReturnType<typeof useAxisLeftStyle>;
    axisRightStyle: ReturnType<typeof useAxisRightStyle>;
    axisTopStyle: ReturnType<typeof useAxisTopStyle>;
    axisBottomStyle: ReturnType<typeof useAxisBottomStyle>;
    plotStyle: ReturnType<typeof usePlotAreaStyle>;
  };
  /**
   * Grabs the values from the hooks and stores them in the `actual` variable
   */
  let TestChildComponent: FC;

  beforeEach(() => {
    TestChildComponent = function TestComponent() {
      const graphStyle = useGraphAreaStyle();

      const axisLeftStyle = useAxisLeftStyle();
      const axisRightStyle = useAxisRightStyle();

      const axisTopStyle = useAxisTopStyle();
      const axisBottomStyle = useAxisBottomStyle();

      const plotStyle = usePlotAreaStyle();

      actual = {
        graphStyle,
        axisLeftStyle,
        axisRightStyle,
        axisTopStyle,
        axisBottomStyle,
        plotStyle,
      };

      return null;
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <GraphWithAxesProvider parentWidth={500} parentHeight={500}>
        <></>
      </GraphWithAxesProvider>,
    );
  });

  it.each([
    [
      'no margin',
      {parentWidth: 500, parentHeight: 500},
      {
        width: 500,
        height: 500,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        top: 0,
        left: 0,
      },
    ],
    [
      'with margin',
      {
        parentHeight: 500,
        parentWidth: 500,
        margin: {
          marginTop: 5,
          marginRight: 10,
          marginBottom: 15,
          marginLeft: 20,
        },
      },
      {
        width: 500 - (10 + 20),
        height: 500 - (5 + 15),
        marginTop: 5,
        marginRight: 10,
        marginBottom: 15,
        marginLeft: 20,
        top: 5,
        left: 20,
      },
    ],
  ])(
    'Should set correct values for graph area %s',
    (
      _,
      {parentHeight, parentWidth, margin}: TestInput,
      expectedGraphStyle: GraphAreaStyleContextType,
    ) => {
      render(
        <GraphWithAxesProvider
          parentWidth={parentHeight}
          parentHeight={parentWidth}
          margin={margin}
        >
          <TestChildComponent />
        </GraphWithAxesProvider>,
      );

      expect(actual.graphStyle).toEqual(expectedGraphStyle);
    },
  );

  // test branch else
  it.each([
    [
      'undefined vals',
      {
        leftAxis: undefined,
        rightAxis: undefined,
        topAxis: undefined,
        bottomAxis: undefined,
      },
    ],
    [
      'empty object',
      {
        leftAxis: {},
        rightAxis: {},
        topAxis: {},
        bottomAxis: {},
      },
    ],
  ])(
    "Should handle axis styles that don't exist %s",
    (
      _,
      {
        leftAxis,
        rightAxis,
        bottomAxis,
        topAxis,
      }: Omit<AxisStyleProviderProps, 'children'>,
    ) => {
      const [WIDTH, HEIGHT] = [500, 500];
      render(
        <GraphWithAxesProvider
          parentWidth={WIDTH}
          parentHeight={HEIGHT}
          leftAxis={leftAxis}
          rightAxis={rightAxis}
          topAxis={topAxis}
          bottomAxis={bottomAxis}
        >
          <TestChildComponent />
        </GraphWithAxesProvider>,
      );

      expect(actual.graphStyle).toEqual({
        width: WIDTH,
        height: HEIGHT,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        top: 0,
        left: 0,
      });

      const ALL_PADDING_ZERO = {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      };

      expect(actual.axisLeftStyle).toEqual({
        width: 0,
        height: HEIGHT,
        top: 0,
        left: 0,
        ...ALL_PADDING_ZERO,
      });

      expect(actual.axisRightStyle).toEqual({
        width: 0,
        height: HEIGHT,
        top: 0,
        left: WIDTH,
        ...ALL_PADDING_ZERO,
      });

      expect(actual.axisTopStyle).toEqual({
        width: WIDTH,
        height: 0,
        top: 0,
        left: 0,
        ...ALL_PADDING_ZERO,
      });

      expect(actual.axisBottomStyle).toEqual({
        width: WIDTH,
        height: 0,
        top: HEIGHT,
        left: 0,
        ...ALL_PADDING_ZERO,
      });
    },
  );

  // test branch if
  it('Should set correct values with axis with values', () => {
    const axes = {
      leftAxis: {
        width: 50,
        paddingLeft: 5,
        paddingRight: 10,
      },
      rightAxis: {
        width: 50,
        paddingLeft: 5,
        paddingRight: 10,
      },
      topAxis: {
        height: 50,
        paddingTop: 5,
        paddingBottom: 10,
      },
      bottomAxis: {
        height: 50,
        paddingTop: 5,
        paddingBottom: 10,
      },
    };

    const margins = {
      marginTop: 5,
      marginRight: 10,
      marginBottom: 15,
      marginLeft: 20,
    };

    const [WIDTH, HEIGHT] = [1000, 1250];

    render(
      <GraphWithAxesProvider
        parentWidth={WIDTH}
        parentHeight={HEIGHT}
        leftAxis={axes.leftAxis}
        rightAxis={axes.rightAxis}
        topAxis={axes.topAxis}
        bottomAxis={axes.bottomAxis}
        margin={margins}
      >
        <TestChildComponent />
      </GraphWithAxesProvider>,
    );

    const expectGraphStyle: GraphAreaStyleContextType = {
      width: WIDTH - (margins.marginRight + margins.marginLeft),
      height: HEIGHT - (margins.marginTop + margins.marginBottom),
      marginTop: margins.marginTop,
      marginRight: margins.marginRight,
      marginBottom: margins.marginBottom,
      marginLeft: margins.marginLeft,
      top: margins.marginTop,
      left: margins.marginLeft,
    };

    expect(actual.graphStyle).toEqual(expectGraphStyle);

    const totalAxesWidth =
      axes.leftAxis.width +
      axes.leftAxis.paddingLeft +
      axes.leftAxis.paddingRight +
      axes.rightAxis.width +
      axes.rightAxis.paddingLeft +
      axes.rightAxis.paddingRight;
    const totalAxesHeight =
      axes.topAxis.height +
      axes.topAxis.paddingTop +
      axes.topAxis.paddingBottom +
      axes.bottomAxis.height +
      axes.bottomAxis.paddingTop +
      axes.bottomAxis.paddingBottom;

    const expectedPlotSize: PlotAreaStyleContextType = {
      width: expectGraphStyle.width - totalAxesWidth,
      height: expectGraphStyle.height - totalAxesHeight,
      top:
        axes.topAxis.height +
        axes.topAxis.paddingTop +
        axes.topAxis.paddingBottom,
      left:
        axes.leftAxis.width +
        axes.leftAxis.paddingLeft +
        axes.leftAxis.paddingRight,
    };

    expect(actual.plotStyle).toEqual(expectedPlotSize);
  });

  it('Should rerender only if all values changes - deep object equality', () => {
    const mockFn = vi.fn();
    const SomeChildFn = () => {
      mockFn();
      return null;
    };

    const [WIDTH, HEIGHT] = [1000, 1250];

    const {rerender} = render(
      <GraphWithAxesProvider
        parentWidth={WIDTH}
        parentHeight={HEIGHT}
        topAxis={{
          height: 5,
          paddingTop: 10,
          paddingBottom: 15,
        }}
        bottomAxis={{
          paddingTop: 10,
          height: 15,
          paddingBottom: 10,
        }}
        leftAxis={{
          width: 15,
          paddingLeft: 10,
          paddingRight: 5,
        }}
        rightAxis={{
          paddingRight: 20,
          width: 10,
          paddingLeft: 5,
        }}
        margin={{
          marginTop: 5,
          marginRight: 10,
          marginBottom: 15,
          marginLeft: 20,
        }}
      >
        <SomeChildFn />
      </GraphWithAxesProvider>,
    );

    expect(mockFn).toHaveBeenCalledTimes(1);

    // rerender new object, but same values
    rerender(
      <GraphWithAxesProvider
        parentWidth={WIDTH}
        parentHeight={HEIGHT}
        topAxis={{height: 5, paddingTop: 10, paddingBottom: 15}}
        bottomAxis={{
          paddingTop: 10,
          height: 15,
          paddingBottom: 10,
        }}
        leftAxis={{
          width: 15,
          paddingLeft: 10,
          paddingRight: 5,
        }}
        rightAxis={{
          paddingRight: 20,
          width: 10,
          paddingLeft: 5,
        }}
        margin={{
          marginTop: 5,
          marginRight: 10,
          marginBottom: 15,
          marginLeft: 20,
        }}
      >
        <SomeChildFn />
      </GraphWithAxesProvider>,
    );

    expect(mockFn).toHaveBeenCalledTimes(1);

    // rerender new object, but new values
    rerender(
      <GraphWithAxesProvider
        parentWidth={WIDTH}
        parentHeight={HEIGHT}
        topAxis={{
          height: 500,
        }}
        bottomAxis={undefined}
        leftAxis={{}}
        rightAxis={{
          paddingRight: 20,
          width: 10,
          paddingLeft: 5,
        }}
        margin={{
          marginTop: 2,
          marginRight: 4,
          marginBottom: 6,
          marginLeft: 8,
        }}
      >
        <SomeChildFn />
      </GraphWithAxesProvider>,
    );

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
