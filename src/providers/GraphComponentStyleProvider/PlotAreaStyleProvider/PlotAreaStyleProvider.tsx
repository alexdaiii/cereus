import {ReactNode} from 'react';

import {PlotAreaStyleContext} from '@/context';
import {
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
  useGraphAreaStyle,
} from '@/hooks/useGraphItemStyleContext';
import {
  calcAxisHeight,
  calcAxisWidth,
} from '@/providers/GraphComponentStyleProvider/utils';

type PlotAreaStyleProviderProps = {
  children: ReactNode;
  /**
   * Include an axis on top of the plot area in calculating the height of the chart.
   */
  includeTopAxis?: boolean;
  /**
   * Include an axis on the bottom of the plot area in calculating the height of the chart.
   */
  includeBottomAxis?: boolean;
  /**
   * Include an axis on the left of the plot area in calculating the width of the chart.
   */
  includeLeftAxis?: boolean;
  /**
   * Include an axis on the right of the plot area in calculating the width of the chart.
   */
  includeRightAxis?: boolean;
};

/**
 * Provides the height and width of the plot area.
 * Calculates the height, width, and offset inside the graph area from the
 * surrounding GraphAreaStyleProvider and AxisStyleProviders
 * @param PlotAreaStyleProviderProps props {@link PlotAreaStyleProviderProps}
 */
export const PlotAreaStyleProvider = ({
  children,
  includeTopAxis = false,
  includeBottomAxis = false,
  includeLeftAxis = false,
  includeRightAxis = false,
}: PlotAreaStyleProviderProps) => {
  const graphAreaStyle = useGraphAreaStyle();
  const topAxisStyle = useAxisTopStyle();
  const bottomAxisStyle = useAxisBottomStyle();
  const leftAxisStyle = useAxisLeftStyle();
  const rightAxisStyle = useAxisRightStyle();

  const DEFAULT_SIZE = 0;

  // Axis height and width
  const topAxisHeight = includeTopAxis
    ? calcAxisHeight(topAxisStyle)
    : DEFAULT_SIZE;
  const bottomAxisHeight = includeBottomAxis
    ? calcAxisHeight(bottomAxisStyle)
    : DEFAULT_SIZE;
  const leftAxisWidth = includeLeftAxis
    ? calcAxisWidth(leftAxisStyle)
    : DEFAULT_SIZE;
  const rightAxisWidth = includeRightAxis
    ? calcAxisWidth(rightAxisStyle)
    : DEFAULT_SIZE;

  const height = graphAreaStyle.height - (topAxisHeight + bottomAxisHeight);
  const width = graphAreaStyle.width - (leftAxisWidth + rightAxisWidth);

  return (
    <PlotAreaStyleContext.Provider
      value={{
        height,
        width,
        left: leftAxisWidth,
        top: topAxisHeight,
      }}
    >
      {children}
    </PlotAreaStyleContext.Provider>
  );
};
