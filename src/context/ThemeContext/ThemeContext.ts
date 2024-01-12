import {createContext} from 'react';

import {BoxDirections} from '@/types/stylesTypes';

/**
 * Information about the size of the graph.
 * Used for calculating the range for scales.
 */
export type ThemeContextType = {
  /**
   * How much padding to put around the graph.
   */
  graphPadding: BoxDirections;
  /**
   * How much padding to put around the chart.
   */
  chartPadding: BoxDirections;
  /**
   * Y axis padding.
   */
  yAxisPadding: BoxDirections;
  /**
   * X axis padding.
   */
  xAxisPadding: BoxDirections;
};

export const ThemeContext = createContext<ThemeContextType>({
  graphPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  chartPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  yAxisPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  xAxisPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
