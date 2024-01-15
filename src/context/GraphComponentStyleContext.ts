import {createContext} from 'react';

export type ChartItemPadding = {
  /**
   * Padding left of the chart item in px. Must be greater than or equal to 0.
   * Padding left + padding right must be less than or equal to width.
   */
  paddingLeft: number;
  /**
   * Padding right of the chart item in px. Must be greater than or equal to 0.
   * Padding left + padding right must be less than or equal to width.
   */
  paddingRight: number;
  /**
   * Padding top of the chart item in px. Must be greater than or equal to 0.
   * Padding top + padding bottom must be less than or equal to height.
   */
  paddingTop: number;
  /**
   * Padding bottom of the chart item in px. Must be greater than or equal to 0.
   * Padding top + padding bottom must be less than or equal to height.
   */
  paddingBottom: number;
};
export type ChartItemSize = {
  /**
   * Width of the chart item in px. Must be greater than 0.
   */
  width: number;
  /**
   * Height of the chart item in px. Must be greater than 0.
   */
  height: number;
};
export type GraphComponentStyleContextType = ChartItemSize & ChartItemPadding;
export const DEFAULT_STYLES = {
  width: 0,
  height: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
} as const;

/**
 * Context for styling the Graph Area. The graph area is the outermost area
 * of the graph that contains the graph area, chart area, x axis, and y axis.
 */
export const GraphAreaStyleContext =
  createContext<GraphComponentStyleContextType>({
    ...DEFAULT_STYLES,
  });

/**
 * Context for styling a top X axis
 */
export const AxisTopStyleContext =
  createContext<GraphComponentStyleContextType>({
    ...DEFAULT_STYLES,
  });

/**
 * Context for styling a bottom X axis
 */
export const AxisBottomStyleContext =
  createContext<GraphComponentStyleContextType>({
    ...DEFAULT_STYLES,
  });

/**
 * Context for styling a left Y axis
 */
export const AxisLeftStyleContext =
  createContext<GraphComponentStyleContextType>({
    ...DEFAULT_STYLES,
  });

/**
 * Context for styling a right Y axis
 */
export const AxisRightStyleContext =
  createContext<GraphComponentStyleContextType>({
    ...DEFAULT_STYLES,
  });

/**
 * Top and left offset for a [@visx/group](https://airbnb.io/visx/docs/group) component.
 */
export type GroupOffset = {
  /**
   * The offset from the left of the group in px from a parent svg or group.
   */
  left: number;
  /**
   * The offset from the top of the group in px from a parent svg or group.
   */
  top: number;
};

export type ChartItemStyleContextType = ChartItemSize & GroupOffset;

const DEFAULT_OFFSET = {
  top: 0,
  left: 0,
} as const;

/**
 * Context for the Chart Area
 */
export const ChartAreaStyleContext = createContext<ChartItemStyleContextType>({
  ...DEFAULT_STYLES,
  ...DEFAULT_OFFSET,
});
