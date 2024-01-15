import React, {ReactNode} from 'react';

import '@/context';
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

type ChartItemStyleProviderProps = {children: ReactNode} & ChartItemSize &
  Partial<ChartItemPadding>;

/**
 * Creates a basic provider for a graph component.
 * Initializes the context with a padding of {0, 0, 0, 0} if not provided.
 */
const createGraphComponentProvider = (
  GraphComponentContext: React.Context<GraphComponentStyleContextType>,
  displayName: string,
) => {
  const ele = ({
    children,
    width,
    height,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
  }: ChartItemStyleProviderProps) => {
    return (
      <GraphComponentContext.Provider
        value={{
          width,
          height,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        }}
      >
        {children}
      </GraphComponentContext.Provider>
    );
  };

  ele.displayName = displayName;
  return ele;
};

export const GraphAreaStyleProvider = createGraphComponentProvider(
  GraphAreaStyleContext,
  'GraphAreaStyleProvider',
);
export const AxisTopStyleProvider = createGraphComponentProvider(
  AxisTopStyleContext,
  'AxisTopStyleProvider',
);
export const AxisBottomStyleProvider = createGraphComponentProvider(
  AxisBottomStyleContext,
  'AxisBottomStyleProvider',
);
export const AxisLeftStyleProvider = createGraphComponentProvider(
  AxisLeftStyleContext,
  'AxisLeftStyleProvider',
);
export const AxisRightStyleProvider = createGraphComponentProvider(
  AxisRightStyleContext,
  'AxisRightStyleProvider',
);
