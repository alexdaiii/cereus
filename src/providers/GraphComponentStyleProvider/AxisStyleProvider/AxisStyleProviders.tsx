import React from 'react';

import {
  AxisBottomStyleContext,
  AxisLeftStyleContext,
  AxisRightStyleContext,
  AxisStyleContextType,
  AxisTopStyleContext,
  GraphItemPadding,
  GraphItemSize,
  GroupOffset,
} from '@/context';

export type AxisStyleProviderProps = {
  children: React.ReactNode;
} & GraphItemSize &
  Partial<GraphItemPadding> &
  Partial<GroupOffset>;

/**
 * Creates a function that returns an axis style context provider
 * @param AxisStyleContext An axis style context
 * @param displayName Optional display name for the provider
 */
const createAxisStyleProvider = (
  AxisStyleContext: React.Context<AxisStyleContextType>,
  displayName: string,
) => {
  const AxisStyleProvider = ({
    children,
    width,
    height,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    top = 0,
    left = 0,
  }: AxisStyleProviderProps) => {
    return (
      <AxisStyleContext.Provider
        value={{
          width,
          height,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          top,
          left,
        }}
      >
        {children}
      </AxisStyleContext.Provider>
    );
  };
  AxisStyleProvider.displayName = displayName;
  return AxisStyleProvider;
};

export const AxisTopStyleProvider = createAxisStyleProvider(
  AxisTopStyleContext,
  'AxisTopStyleProvider',
);

export const AxisBottomStyleProvider = createAxisStyleProvider(
  AxisBottomStyleContext,
  'AxisBottomStyleProvider',
);

export const AxisLeftStyleProvider = createAxisStyleProvider(
  AxisLeftStyleContext,
  'AxisLeftStyleProvider',
);

export const AxisRightStyleProvider = createAxisStyleProvider(
  AxisRightStyleContext,
  'AxisRightStyleProvider',
);
