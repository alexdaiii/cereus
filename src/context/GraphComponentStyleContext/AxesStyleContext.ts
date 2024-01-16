import {createContext} from 'react';

import {
  GraphItemPadding,
  GraphItemSize,
  GroupOffset,
} from '@/context/GraphComponentStyleContext/types';

export type AxisStyleContextType = GraphItemSize &
  GraphItemPadding &
  GroupOffset;

const DEFAULT_PADDING = {
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
} as const;

const DEFAULT_SIZE = {
  width: 0,
  height: 0,
} as const;

const DEFAULT_OFFSET = {
  top: 0,
  left: 0,
};

const DEFAULT_VAL = {
  ...DEFAULT_SIZE,
  ...DEFAULT_PADDING,
  ...DEFAULT_OFFSET,
};

/**
 * Context for styling an axis on top of a chart
 */
export const AxisTopStyleContext = createContext<AxisStyleContextType>({
  ...DEFAULT_VAL,
});
/**
 * Context for styling an axis on the bottom of a chart
 */
export const AxisBottomStyleContext = createContext<AxisStyleContextType>({
  ...DEFAULT_VAL,
});
/**
 * Context for styling an axis on the left of a chart
 */
export const AxisLeftStyleContext = createContext<AxisStyleContextType>({
  ...DEFAULT_VAL,
});
/**
 * Context for styling an axis on the right of a chart
 */
export const AxisRightStyleContext = createContext<AxisStyleContextType>({
  ...DEFAULT_VAL,
});
