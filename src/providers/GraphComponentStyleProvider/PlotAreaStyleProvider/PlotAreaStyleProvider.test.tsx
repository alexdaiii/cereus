import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {
  AxisStyleContextType,
  GraphAreaStyleContextType,
  GraphItemMargin,
  GraphItemSize,
  GroupOffset,
  PlotAreaStyleContext,
  PlotAreaStyleContextType,
} from '@/context';
import {usePlotAreaStyle} from '@/hooks';
import * as exports from '@/hooks/useGraphItemStyleContext';
import {PlotAreaStyleProvider} from '@/providers';

import {
  TestConsumerComponentMaker,
  TestHookComponentMaker,
} from '@test/TestProviderHelpers';

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

const TestHookComponent = TestHookComponentMaker(usePlotAreaStyle);
const TestComsumerComponent = TestConsumerComponentMaker(PlotAreaStyleContext);

describe('PlotAreaStyleProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render', () => {
    render(
      <PlotAreaStyleProvider>
        <></>
      </PlotAreaStyleProvider>,
    );
  });

  describe.each([
    ['Consumer', TestComsumerComponent],
    ['Hook', TestHookComponent],
  ])('with a %s child component consumer', (_, Child) => {
    it('does not crash when not in GraphArea or AxisStyleProviders', () => {
      let actual!: PlotAreaStyleContextType;

      render(
        <PlotAreaStyleProvider>
          <Child>
            {value => {
              actual = value;
              return null;
            }}
          </Child>
        </PlotAreaStyleProvider>,
      );

      const expected: PlotAreaStyleContextType = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      };

      expect(actual).toEqual(expected);
    });

    it.each([
      [
        'no margin',
        {
          width: 1000,
          height: 500,
        },
      ],
      [
        'x margins',
        {
          width: 250,
          height: 750,
          marginLeft: 5,
          marginRight: 10,
        },
      ],
      [
        'y margins',
        {
          width: 400,
          height: 800,
          marginTop: 5,
          marginBottom: 10,
        },
      ],
    ])(
      'gets graph area dimensions from useGraphAreaStyle from provider with %s',
      (
        _,
        graphArea: GraphItemSize & Partial<GraphItemMargin & GroupOffset>,
      ) => {
        const useGraphAreaVal: GraphAreaStyleContextType = {
          ...{
            top: 0,
            left: 0,
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0,
          },
          ...graphArea,
        };

        vi.spyOn(exports, 'useGraphAreaStyle').mockImplementation(() => {
          return useGraphAreaVal;
        });

        let actual!: PlotAreaStyleContextType;

        render(
          <PlotAreaStyleProvider>
            <Child>
              {value => {
                actual = value;
                return null;
              }}
            </Child>
          </PlotAreaStyleProvider>,
        );

        const expected: PlotAreaStyleContextType = {
          top: 0,
          left: 0,
          width: graphArea.width,
          height: graphArea.height,
        };

        expect(actual).toEqual(expected);
      },
    );

    describe('inside a GraphAreaStyleProvider', () => {
      const [GRAPH_WIDTH, GRAPH_HEIGHT] = [1000, 500];

      beforeEach(() => {
        vi.spyOn(exports, 'useGraphAreaStyle').mockImplementation(() => {
          return {
            width: GRAPH_WIDTH,
            height: GRAPH_HEIGHT,
            left: 0,
            top: 0,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
          };
        });
      });

      it.each([
        ['no axes', {}],
        ['Top', {includeTopAxis: true}],
        ['Bottom', {includeBottomAxis: true}],
        ['Left', {includeLeftAxis: true}],
        ['Right', {includeRightAxis: true}],
        [
          'Any',
          {
            includeTopAxis: true,
            includeBottomAxis: true,
            includeLeftAxis: true,
            includeRightAxis: true,
          },
        ],
      ])(
        'requires being in an Axis%sProvider to subtract axes height or width from the graph area',
        (_, includedAxes: IncludedAxes) => {
          let actual!: PlotAreaStyleContextType;

          render(
            <PlotAreaStyleProvider
              includeTopAxis={includedAxes.includeTopAxis}
              includeBottomAxis={includedAxes.includeBottomAxis}
              includeLeftAxis={includedAxes.includeLeftAxis}
              includeRightAxis={includedAxes.includeRightAxis}
            >
              <Child>
                {value => {
                  actual = value;
                  return null;
                }}
              </Child>
            </PlotAreaStyleProvider>,
          );

          const expected: PlotAreaStyleContextType = {
            top: 0,
            left: 0,
            width: GRAPH_WIDTH,
            height: GRAPH_HEIGHT,
          };

          expect(actual).toEqual(expected);
        },
      );

      describe('inside all AxisStyleProviders', () => {
        const baseAxisStyle = {
          width: 2,
          height: 3,
          left: 5,
          top: 7,
          paddingTop: 11,
          paddingBottom: 13,
          paddingLeft: 17,
          paddingRight: 19,
        } as const;

        const multiplyStyle = (multiplier: number): AxisStyleContextType => {
          return {
            width: baseAxisStyle.width * multiplier,
            height: baseAxisStyle.height * multiplier,
            left: baseAxisStyle.left * multiplier,
            top: baseAxisStyle.top * multiplier,
            paddingTop: baseAxisStyle.paddingTop * multiplier,
            paddingBottom: baseAxisStyle.paddingBottom * multiplier,
            paddingLeft: baseAxisStyle.paddingLeft * multiplier,
            paddingRight: baseAxisStyle.paddingRight * multiplier,
          };
        };

        const leftAxisStyle = multiplyStyle(1);
        const leftAxisTotalWidth =
          leftAxisStyle.width +
          leftAxisStyle.paddingLeft +
          leftAxisStyle.paddingRight;
        const topAxisStyle = multiplyStyle(2);
        const topAxisTotalHeight =
          topAxisStyle.height +
          topAxisStyle.paddingTop +
          topAxisStyle.paddingBottom;
        const rightAxisStyle = multiplyStyle(3);
        const rightAxisTotalWidth =
          rightAxisStyle.width +
          rightAxisStyle.paddingLeft +
          rightAxisStyle.paddingRight;
        const bottomAxisStyle = multiplyStyle(5);
        const bottomAxisTotalHeight =
          bottomAxisStyle.height +
          bottomAxisStyle.paddingTop +
          bottomAxisStyle.paddingBottom;

        beforeEach(() => {
          vi.spyOn(exports, 'useAxisLeftStyle').mockImplementation(() => {
            return leftAxisStyle;
          });
          vi.spyOn(exports, 'useAxisTopStyle').mockImplementation(() => {
            return topAxisStyle;
          });
          vi.spyOn(exports, 'useAxisRightStyle').mockImplementation(() => {
            return rightAxisStyle;
          });
          vi.spyOn(exports, 'useAxisBottomStyle').mockImplementation(() => {
            return bottomAxisStyle;
          });
        });

        it.each([
          [
            'none',
            {},
            {
              width: GRAPH_WIDTH,
              height: GRAPH_HEIGHT,
              left: 0,
              top: 0,
            },
          ],
          [
            'top',
            {includeTopAxis: true},
            {
              width: GRAPH_WIDTH,
              height: GRAPH_HEIGHT - topAxisTotalHeight,
              left: 0,
              top: topAxisTotalHeight,
            },
          ],
          [
            'bottom',
            {includeBottomAxis: true},
            {
              width: GRAPH_WIDTH,
              height: GRAPH_HEIGHT - bottomAxisTotalHeight,
              left: 0,
              top: 0,
            },
          ],
          [
            'left',
            {includeLeftAxis: true},
            {
              width: GRAPH_WIDTH - leftAxisTotalWidth,
              height: GRAPH_HEIGHT,
              left: leftAxisTotalWidth,
              top: 0,
            },
          ],
          [
            'right',
            {includeRightAxis: true},
            {
              width: GRAPH_WIDTH - rightAxisTotalWidth,
              height: GRAPH_HEIGHT,
              left: 0,
              top: 0,
            },
          ],
          [
            'all',
            {
              includeBottomAxis: true,
              includeLeftAxis: true,
              includeRightAxis: true,
              includeTopAxis: true,
            },
            {
              width: GRAPH_WIDTH - leftAxisTotalWidth - rightAxisTotalWidth,
              height: GRAPH_HEIGHT - topAxisTotalHeight - bottomAxisTotalHeight,
              left: leftAxisTotalWidth,
              top: topAxisTotalHeight,
            },
          ],
        ])(
          'correctly subtracts %s axis height from graph area',
          (
            _,
            includedAxes: IncludedAxes,
            expected: PlotAreaStyleContextType,
          ) => {
            let actual!: PlotAreaStyleContextType;

            render(
              <PlotAreaStyleProvider {...includedAxes}>
                <Child>
                  {value => {
                    actual = value;
                    return null;
                  }}
                </Child>
              </PlotAreaStyleProvider>,
            );

            expect(actual).toEqual(expected);
          },
        );
      });
    });
  });
});
