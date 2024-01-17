import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {
  GraphAreaStyleContext,
  GraphAreaStyleContextType,
  GraphItemMargin,
} from '@/context';
import {useGraphAreaStyle} from '@/hooks';
import {GraphAreaStyleProvider} from '@/providers';

import {
  TestConsumerComponentMaker,
  TestHookComponentMaker,
} from '@test/TestProviderHelpers';

const TestConsumerComponent = TestConsumerComponentMaker(GraphAreaStyleContext);

const TestHookComponent = TestHookComponentMaker(useGraphAreaStyle);

describe('GraphAreaStyleProvider', () => {
  it('should render without crashing', () => {
    render(
      <GraphAreaStyleProvider parentWidth={500} parentHeight={500}>
        <></>
      </GraphAreaStyleProvider>,
    );
  });

  describe.each([
    ['consumer', TestConsumerComponent],
    ['hook', TestHookComponent],
  ])('when used as a %s', (_, Component) => {
    it.each([
      ['none', {}],
      ['top', {marginTop: 5}],
      ['right', {marginRight: 5}],
      ['bottom', {marginBottom: 5}],
      ['left', {marginLeft: 5}],
      ['all', {marginTop: 5, marginRight: 5, marginBottom: 5, marginLeft: 5}],
    ])('with margin %s', (_, margin: Partial<GraphItemMargin>) => {
      let actual: GraphAreaStyleContextType | undefined = undefined;

      const [WIDTH, HEIGHT] = [250, 300];

      render(
        <GraphAreaStyleProvider
          parentWidth={WIDTH}
          parentHeight={HEIGHT}
          marginTop={margin.marginTop}
          marginRight={margin.marginRight}
          marginBottom={margin.marginBottom}
          marginLeft={margin.marginLeft}
        >
          <Component>
            {value => {
              actual = value;
              return <></>;
            }}
          </Component>
        </GraphAreaStyleProvider>,
      );

      expect(actual!.width).toBe(
        WIDTH - (margin.marginLeft ?? 0) - (margin.marginRight ?? 0),
      );
      expect(actual!.height).toBe(
        HEIGHT - (margin.marginTop ?? 0) - (margin.marginBottom ?? 0),
      );

      expect(actual!.marginLeft).toBe(margin.marginLeft ?? 0);
      expect(actual!.marginRight).toBe(margin.marginRight ?? 0);
      expect(actual!.marginTop).toBe(margin.marginTop ?? 0);
      expect(actual!.marginBottom).toBe(margin.marginBottom ?? 0);

      expect(actual!.left).toBe(margin.marginLeft ?? 0);
      expect(actual!.top).toBe(margin.marginTop ?? 0);
    });
  });

  it('Hook should provide default values when not in provider', () => {
    let actual: GraphAreaStyleContextType | undefined = undefined;
    render(
      <TestHookComponent>
        {value => {
          actual = value;
          return <></>;
        }}
      </TestHookComponent>,
    );

    expect(actual!.height).toBe(0);
    expect(actual!.width).toBe(0);
    expect(actual!.marginLeft).toBe(0);
    expect(actual!.marginRight).toBe(0);
    expect(actual!.marginTop).toBe(0);
    expect(actual!.marginBottom).toBe(0);
    expect(actual!.left).toBe(0);
    expect(actual!.top).toBe(0);
  });
});
