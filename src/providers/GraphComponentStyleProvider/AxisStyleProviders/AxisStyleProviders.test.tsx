import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {beforeEach, describe, expect, it} from 'vitest';

import {
  AxisBottomStyleContext,
  AxisLeftStyleContext,
  AxisRightStyleContext,
  AxisStyleContextType,
  AxisTopStyleContext,
} from '@/context';
import {
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
} from '@/hooks';
import {
  AxisBottomStyleProvider,
  AxisLeftStyleProvider,
  AxisRightStyleProvider,
  AxisStyleProvidersProps,
  AxisTopStyleProvider,
} from '@/providers';

import {
  TestChildElement,
  TestConsumerComponentMaker,
  TestHookComponentMaker,
} from '@test/TestProviderHelpers';

describe.each([
  [
    'AxisTopStyleProvider',
    AxisTopStyleProvider,
    TestConsumerComponentMaker(AxisTopStyleContext),
    TestHookComponentMaker(useAxisTopStyle),
  ],
  [
    'AxisRightStyleProvider',
    AxisRightStyleProvider,
    TestConsumerComponentMaker(AxisRightStyleContext),
    TestHookComponentMaker(useAxisRightStyle),
  ],
  [
    'AxisBottomStyleProvider',
    AxisBottomStyleProvider,
    TestConsumerComponentMaker(AxisBottomStyleContext),
    TestHookComponentMaker(useAxisBottomStyle),
  ],
  [
    'AxisLeftStyleProvider',
    AxisLeftStyleProvider,
    TestConsumerComponentMaker(AxisLeftStyleContext),
    TestHookComponentMaker(useAxisLeftStyle),
  ],
])('Provider: %s', (_: string, Provider, Consumer, hook) => {
  let Children: {
    [key: string]: TestChildElement<AxisStyleContextType>;
  };

  beforeEach(() => {
    Children = {
      consumer: Consumer,
      hook,
    };
  });

  it('should render', () => {
    render(
      <Provider width={5} height={10}>
        <></>
      </Provider>,
    );
  });

  describe.each(['consumer', 'hook'])('%s', property => {
    let Child: TestChildElement<AxisStyleContextType>;

    beforeEach(() => {
      Child = Children[property];
    });

    it.each([
      [
        'just width and height',
        {
          width: 50,
          height: 100,
        },
      ],
      [
        'with top padding',
        {
          width: 100,
          height: 200,
          paddingTop: 10,
        },
      ],
      [
        'with right padding',
        {
          width: 200,
          height: 100,
          paddingRight: 10,
        },
      ],
      [
        'with bottom padding',
        {
          width: 100,
          height: 200,
          paddingBottom: 10,
        },
      ],
      [
        'with left padding',
        {
          width: 200,
          height: 100,
          paddingLeft: 10,
        },
      ],
      [
        'with all padding',
        {
          width: 200,
          height: 100,
          paddingTop: 10,
          paddingRight: 20,
          paddingBottom: 30,
          paddingLeft: 40,
        },
      ],
    ])('%s', (_: string, style: Omit<AxisStyleProvidersProps, 'children'>) => {
      const DEFAULT_VALUES = {
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        top: 0,
        left: 0,
      };

      const expected = {...DEFAULT_VALUES, ...style};
      let actual: AxisStyleContextType | undefined;

      render(
        <Provider
          width={style.width}
          height={style.height}
          paddingTop={style.paddingTop}
          paddingRight={style.paddingRight}
          paddingBottom={style.paddingBottom}
          paddingLeft={style.paddingLeft}
        >
          <Child>
            {val => {
              actual = val;
              return null;
            }}
          </Child>
        </Provider>,
      );

      expect(actual).toEqual(expected);
    });

    it('Context provides default values', () => {
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

      let actual: AxisStyleContextType | undefined;

      render(
        <Child>
          {val => {
            actual = val;
            return null;
          }}
        </Child>,
      );

      expect(actual).toEqual(expected);
    });
  });
});
