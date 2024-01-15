import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import React from 'react';
import {describe, expect, it} from 'vitest';

import {
  AxisBottomStyleContext,
  AxisLeftStyleContext,
  AxisRightStyleContext,
  AxisTopStyleContext,
  ChartItemPadding,
  ChartItemSize,
  GraphAreaStyleContext,
  GraphComponentStyleContextType,
} from '@/context';
import {
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
  useGraphAreaStyle,
} from '@/hooks';

import {
  AxisBottomStyleProvider,
  AxisLeftStyleProvider,
  AxisRightStyleProvider,
  AxisTopStyleProvider,
  GraphAreaStyleProvider,
} from './GraphComponentStyleProvider';

/**
 * Test component that renders the values from the context
 */
const TestComponent = ({val}: {val: GraphComponentStyleContextType}) => (
  <>
    <p data-testid="height">{val.height}</p>
    <p data-testid="width">{val.width}</p>
    <p data-testid="pT">{val.paddingTop}</p>
    <p data-testid="pR">{val.paddingRight}</p>
    <p data-testid="pB">{val.paddingBottom}</p>
    <p data-testid="pL">{val.paddingLeft}</p>
  </>
);

/**
 * Check the values in the context are as expected
 */
const checkExpVals = (
  expVals: GraphComponentStyleContextType,
  getByTestId: ReturnType<typeof render>['getByTestId'],
) => {
  expect(getByTestId('height')).toHaveTextContent(expVals.height.toString());
  expect(getByTestId('width')).toHaveTextContent(expVals.width.toString());
  expect(getByTestId('pT')).toHaveTextContent(expVals.paddingTop.toString());
  expect(getByTestId('pR')).toHaveTextContent(expVals.paddingRight.toString());
  expect(getByTestId('pB')).toHaveTextContent(expVals.paddingBottom.toString());
  expect(getByTestId('pL')).toHaveTextContent(expVals.paddingLeft.toString());
};

/**
 * Test each of the GraphComponentStyleProviders
 */
describe.each([
  [
    GraphAreaStyleProvider.displayName,
    GraphAreaStyleProvider,
    GraphAreaStyleContext,
  ],
  [AxisTopStyleProvider.displayName, AxisTopStyleProvider, AxisTopStyleContext],
  [
    AxisBottomStyleProvider.displayName,
    AxisBottomStyleProvider,
    AxisBottomStyleContext,
  ],
  [
    AxisLeftStyleProvider.displayName,
    AxisLeftStyleProvider,
    AxisLeftStyleContext,
  ],
  [
    AxisRightStyleProvider.displayName,
    AxisRightStyleProvider,
    AxisRightStyleContext,
  ],
])(
  `Provider: %s`,
  (_n, Provider, Context: React.Context<GraphComponentStyleContextType>) => {
    it('renders without crashing', () => {
      render(
        <Provider width={0} height={0}>
          <div>Test</div>
        </Provider>,
      );
    });

    it.each([
      ['provides default values for padding', {width: 100, height: 100}],
      ['override pT', {width: 250, height: 500, paddingTop: 10}],
      ['override pR', {width: 500, height: 1000, paddingRight: 20}],
      ['override pB', {width: 750, height: 1500, paddingBottom: 30}],
      ['override pL', {width: 1000, height: 2000, paddingLeft: 40}],
      [
        'override all padding',
        {
          width: 1250,
          height: 2500,
          paddingTop: 50,
          paddingRight: 60,
          paddingBottom: 70,
          paddingLeft: 80,
        },
      ],
    ])(
      '%s',
      (_: string, initVal: ChartItemSize & Partial<ChartItemPadding>) => {
        const {getByTestId} = render(
          <Provider {...initVal}>
            <Context.Consumer>
              {val => <TestComponent val={val} />}
            </Context.Consumer>
          </Provider>,
        );

        const expVals = {
          ...{
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
          },
          ...initVal,
        };

        checkExpVals(expVals, getByTestId);
      },
    );
  },
);

type GraphComponentStyleHook = () => GraphComponentStyleContextType;

const HookTestComponent = ({hook}: {hook: GraphComponentStyleHook}) => {
  return (
    <>
      <TestComponent val={{...hook()}} />
    </>
  );
};

/**
 * Test each of the Hooks
 */
describe.each([
  ['AxisLeft', AxisLeftStyleProvider, useAxisLeftStyle],
  ['AxisRight', AxisRightStyleProvider, useAxisRightStyle],
  ['AxisTop', AxisTopStyleProvider, useAxisTopStyle],
  ['AxisBottom', AxisBottomStyleProvider, useAxisBottomStyle],
  ['GraphArea', GraphAreaStyleProvider, useGraphAreaStyle],
])(`Hook: %s`, (_n: string, Provider, hook: GraphComponentStyleHook) => {
  it('Initializes with default values', () => {
    const defaultVals = {
      width: 0,
      height: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    };

    const {getByTestId} = render(
      <>
        <HookTestComponent hook={hook} />
      </>,
    );

    checkExpVals(defaultVals, getByTestId);
  });

  it.each([
    ['provides default values for padding', {width: 100, height: 100}],
    ['override pT', {width: 250, height: 500, paddingTop: 10}],
    ['override pR', {width: 500, height: 1000, paddingRight: 20}],
    ['override pB', {width: 750, height: 1500, paddingBottom: 30}],
    ['override pL', {width: 1000, height: 2000, paddingLeft: 40}],
    [
      'override all padding',
      {
        width: 1250,
        height: 2500,
        paddingTop: 50,
        paddingRight: 60,
        paddingBottom: 70,
        paddingLeft: 80,
      },
    ],
  ])('%s', (_: string, initVal: ChartItemSize & Partial<ChartItemPadding>) => {
    const {getByTestId} = render(
      <Provider {...initVal}>
        <HookTestComponent hook={hook} />
      </Provider>,
    );

    const expVals = {
      ...{
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
      },
      ...initVal,
    };

    checkExpVals(expVals, getByTestId);
  });
});
