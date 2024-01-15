import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {ReactNode} from 'react';
import {afterEach, describe, expect, it, vi} from 'vitest';

import {
  ChartAreaStyleContext,
  ChartItemPadding,
  ChartItemStyleContextType,
} from '@/context';
import {useChartAreaStyle} from '@/hooks';

import {
  AxisBottomStyleProvider,
  AxisLeftStyleProvider,
  AxisRightStyleProvider,
  AxisTopStyleProvider,
  GraphAreaStyleProvider,
} from '../GraphComponentStyleProvider';
import {ChartAreaStyleProvider} from './ChartAreaStyleProvider';

type IncludedAxes = {
  /**
   * Include the top X axis in calculating the height of the chart.
   */
  includeTopAxis?: boolean;
  /**
   * Include the bottom X axis in calculating the height of the chart.
   */
  includeBottomAxis?: boolean;
  /**
   * Include the left Y axis in calculating the width of the chart.
   */
  includeLeftAxis?: boolean;
  /**
   * Include the right Y axis in calculating the width of the chart.
   */
  includeRightAxis?: boolean;
};

/**
 * Check the values in the context are as expected
 */
const checkExpVals = (
  expVals: ChartItemStyleContextType,
  actualVals: ChartItemStyleContextType,
) => {
  expect(actualVals.height, 'height value incorrect').toBe(expVals.height);
  expect(actualVals.width, 'width value incorrect').toBe(expVals.width);
  expect(actualVals.top, 'top value incorrect').toBe(expVals.top);
  expect(actualVals.left, 'left value incorrect').toBe(expVals.left);
};

const TestHookComponent = ({
  children,
}: {
  children: (val: ChartItemStyleContextType) => ReactNode;
}) => {
  const val = useChartAreaStyle();
  return <>{children(val)}</>;
};

const TestComsumerComponent = ({
  children,
}: {
  children: (val: ChartItemStyleContextType) => ReactNode;
}) => (
  <ChartAreaStyleContext.Consumer>
    {val => {
      return <>{children(val)}</>;
    }}
  </ChartAreaStyleContext.Consumer>
);

describe('ChartAreaStyleProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render', () => {
    render(
      <ChartAreaStyleProvider>
        <></>
      </ChartAreaStyleProvider>,
    );
  });

  it.each([
    ['none', {}, {height: 500, width: 5000, top: 0, left: 0}],
    [
      'pTop',
      {
        paddingTop: 25,
      },
      {
        height: 475,
        width: 5000,
        top: 0,
        left: 0,
      },
    ],
    [
      'pRight',
      {
        paddingRight: 50,
      },
      {
        height: 500,
        width: 4950,
        top: 0,
        left: 0,
      },
    ],
    [
      'pBottom',
      {
        paddingBottom: 75,
      },
      {
        height: 425,
        width: 5000,
        top: 0,
        left: 0,
      },
    ],
    [
      'pLeft',
      {
        paddingLeft: 100,
      },
      {
        height: 500,
        width: 4900,
        top: 0,
        left: 0,
      },
    ],
    [
      'pY',
      {
        paddingTop: 80,
        paddingBottom: 20,
      },
      {
        height: 400,
        width: 5000,
        top: 0,
        left: 0,
      },
    ],
    [
      'pX',
      {
        paddingLeft: 80,
        paddingRight: 20,
      },
      {
        height: 500,
        width: 4900,
        top: 0,
        left: 0,
      },
    ],
    [
      'all',
      {
        paddingTop: 25,
        paddingRight: 50,
        paddingBottom: 75,
        paddingLeft: 100,
      },
      {
        height: 400,
        width: 4850,
        top: 0,
        left: 0,
      },
    ],
  ])(
    'Calculates with GraphAreaPadding %s',
    (
      _n: string,
      padding: Partial<ChartItemPadding>,
      expectedVal: {
        height: number;
        width: number;
        top: number;
        left: number;
      },
    ) => {
      let actual;

      render(
        <GraphAreaStyleProvider height={500} width={5000} {...padding}>
          <ChartAreaStyleProvider>
            <ChartAreaStyleContext.Consumer>
              {val => {
                actual = val;
                return <></>;
              }}
            </ChartAreaStyleContext.Consumer>
          </ChartAreaStyleProvider>
        </GraphAreaStyleProvider>,
      );

      checkExpVals(expectedVal, actual!);
    },
  );

  type TestEleProp = {
    children?: ReactNode;
  };
  type AxisTotalSize = {
    totalTopHeight: number;
    totalBottomHeight: number;
    totalLeftWidth: number;
    totalRightWidth: number;
  };

  describe.each([
    ['consumer user', TestComsumerComponent],
    ['hook user', TestHookComponent],
  ])('Inner component: %s', (_o: string, InnerEle) => {
    describe.each([
      [
        'no axes providers',
        ({children}: TestEleProp) => {
          return <>{children}</>;
        },
        {
          totalTopHeight: 0,
          totalBottomHeight: 0,
          totalLeftWidth: 0,
          totalRightWidth: 0,
        },
      ],
      [
        'top axes provider',
        ({children}: TestEleProp) => {
          return (
            <AxisTopStyleProvider
              height={50}
              width={10}
              paddingTop={5}
              paddingRight={10}
              paddingBottom={15}
              paddingLeft={20}
            >
              {children}
            </AxisTopStyleProvider>
          );
        },
        {
          totalTopHeight: 50 + 5 + 15,
          totalBottomHeight: 0,
          totalLeftWidth: 0,
          totalRightWidth: 0,
        },
      ],
      [
        'bottom axes provider',
        ({children}: TestEleProp) => {
          return (
            <AxisBottomStyleProvider
              width={50}
              height={25}
              paddingTop={10}
              paddingRight={20}
              paddingBottom={30}
              paddingLeft={40}
            >
              {children}
            </AxisBottomStyleProvider>
          );
        },
        {
          totalTopHeight: 0,
          totalBottomHeight: 25 + 10 + 30,
          totalLeftWidth: 0,
          totalRightWidth: 0,
        },
      ],
      [
        'left axes provider',
        ({children}: TestEleProp) => {
          return (
            <AxisLeftStyleProvider
              width={1}
              height={2}
              paddingTop={3}
              paddingRight={4}
              paddingBottom={5}
              paddingLeft={6}
            >
              {children}
            </AxisLeftStyleProvider>
          );
        },
        {
          totalTopHeight: 0,
          totalBottomHeight: 0,
          totalLeftWidth: 1 + 4 + 6,
          totalRightWidth: 0,
        },
      ],
      [
        'right axes provider',
        ({children}: TestEleProp) => (
          <AxisRightStyleProvider
            width={64}
            height={32}
            paddingTop={16}
            paddingRight={8}
            paddingBottom={4}
            paddingLeft={2}
          >
            {children}
          </AxisRightStyleProvider>
        ),
        {
          totalTopHeight: 0,
          totalBottomHeight: 0,
          totalLeftWidth: 0,
          totalRightWidth: 64 + 8 + 2,
        },
      ],
      [
        't & b axes provider',
        ({children}: TestEleProp) => (
          <AxisTopStyleProvider
            width={3}
            height={9}
            paddingTop={27}
            paddingRight={81}
            paddingBottom={243}
            paddingLeft={729}
          >
            <AxisBottomStyleProvider
              width={12}
              height={24}
              paddingTop={36}
              paddingRight={48}
              paddingLeft={60}
              paddingBottom={72}
            >
              {children}
            </AxisBottomStyleProvider>
          </AxisTopStyleProvider>
        ),
        {
          totalTopHeight: 9 + 27 + 243,
          totalBottomHeight: 24 + 36 + 72,
          totalLeftWidth: 0,
          totalRightWidth: 0,
        },
      ],
      [
        'l & r axes provider',
        ({children}: TestEleProp) => (
          <AxisLeftStyleProvider
            width={4}
            height={8}
            paddingTop={12}
            paddingRight={16}
            paddingBottom={20}
            paddingLeft={24}
          >
            <AxisRightStyleProvider
              width={32}
              height={64}
              paddingTop={128}
              paddingRight={256}
              paddingBottom={512}
              paddingLeft={1024}
            >
              {children}
            </AxisRightStyleProvider>
          </AxisLeftStyleProvider>
        ),
        {
          totalTopHeight: 0,
          totalBottomHeight: 0,
          totalLeftWidth: 4 + 16 + 24,
          totalRightWidth: 32 + 256 + 1024,
        },
      ],
      [
        'all axes provider',
        ({children}: TestEleProp) => {
          return (
            <AxisTopStyleProvider
              width={2}
              height={10}
              paddingTop={18}
              paddingRight={26}
              paddingBottom={34}
              paddingLeft={42}
            >
              <AxisRightStyleProvider
                width={4}
                height={12}
                paddingTop={20}
                paddingRight={28}
                paddingBottom={36}
                paddingLeft={44}
              >
                <AxisBottomStyleProvider
                  width={6}
                  height={14}
                  paddingTop={22}
                  paddingRight={30}
                  paddingBottom={38}
                  paddingLeft={46}
                >
                  <AxisLeftStyleProvider
                    width={8}
                    height={16}
                    paddingTop={24}
                    paddingRight={32}
                    paddingBottom={40}
                    paddingLeft={48}
                  >
                    {children}
                  </AxisLeftStyleProvider>
                </AxisBottomStyleProvider>
              </AxisRightStyleProvider>
            </AxisTopStyleProvider>
          );
        },
        {
          totalTopHeight: 10 + 18 + 34,
          totalBottomHeight: 14 + 22 + 38,
          totalLeftWidth: 8 + 32 + 48,
          totalRightWidth: 4 + 28 + 44,
        },
      ],
    ])(
      'With axis providers: %s',
      (_n: string, TestEle, info: AxisTotalSize) => {
        it.each([
          ['no included axes', {}],
          ['top axis included', {includeTopAxis: true}],
          ['bottom axis included', {includeBottomAxis: true}],
          ['left axis included', {includeLeftAxis: true}],
          ['right axis included', {includeRightAxis: true}],
          [
            't & b axes included',
            {
              includeTopAxis: true,
              includeBottomAxis: true,
            },
          ],
          [
            'l & r axes included',
            {
              includeLeftAxis: true,
              includeRightAxis: true,
            },
          ],
          [
            'all axes included',
            {
              includeTopAxis: true,
              includeBottomAxis: true,
              includeLeftAxis: true,
              includeRightAxis: true,
            },
          ],
        ])(
          `With included axes: %s`,
          (_m: string, includedAxes: IncludedAxes) => {
            const axesSize = {
              top: includedAxes.includeTopAxis ? info.totalTopHeight : 0,
              bottom: includedAxes.includeBottomAxis
                ? info.totalBottomHeight
                : 0,
              left: includedAxes.includeLeftAxis ? info.totalLeftWidth : 0,
              right: includedAxes.includeRightAxis ? info.totalRightWidth : 0,
            };

            const [WIDTH, HEIGHT] = [25000, 10000];

            const expectedVals = {
              height: HEIGHT - axesSize.top - axesSize.bottom,
              width: WIDTH - axesSize.left - axesSize.right,
              top: axesSize.top,
              left: axesSize.left,
            };

            let actual;

            render(
              <GraphAreaStyleProvider height={HEIGHT} width={WIDTH}>
                <TestEle>
                  <ChartAreaStyleProvider {...includedAxes}>
                    <InnerEle>
                      {val => {
                        actual = val;
                        return <></>;
                      }}
                    </InnerEle>
                  </ChartAreaStyleProvider>
                </TestEle>
              </GraphAreaStyleProvider>,
            );

            checkExpVals(expectedVals, actual!);
          },
        );
      },
    );
  });
});
