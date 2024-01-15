import {ReactNode} from 'react';

import {ChartAreaStyleContext, GraphComponentStyleContextType} from '@/context';
import {
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
  useGraphAreaStyle,
} from '@/hooks/useGraphItemStyleContext';

type ChartItemStyleProviderProps = {
  children: ReactNode;
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

const calcXAxisHeight = (style: GraphComponentStyleContextType) => {
  return style.height + style.paddingTop + style.paddingBottom;
};

const calcYAxisWidth = (style: GraphComponentStyleContextType) => {
  return style.width + style.paddingLeft + style.paddingRight;
};

export const ChartAreaStyleProvider = ({
  children,
  includeTopAxis = false,
  includeBottomAxis = false,
  includeLeftAxis = false,
  includeRightAxis = false,
}: ChartItemStyleProviderProps) => {
  const graphAreaStyle = useGraphAreaStyle();
  const topAxisStyle = useAxisTopStyle();
  const bottomAxisStyle = useAxisBottomStyle();
  const leftAxisStyle = useAxisLeftStyle();
  const rightAxisStyle = useAxisRightStyle();

  const DEFAULT_SIZE = 0;

  // Axis height and width
  const topAxisHeight = includeTopAxis
    ? calcXAxisHeight(topAxisStyle)
    : DEFAULT_SIZE;
  const bottomAxisHeight = includeBottomAxis
    ? calcXAxisHeight(bottomAxisStyle)
    : DEFAULT_SIZE;
  const leftAxisWidth = includeLeftAxis
    ? calcYAxisWidth(leftAxisStyle)
    : DEFAULT_SIZE;
  const rightAxisWidth = includeRightAxis
    ? calcYAxisWidth(rightAxisStyle)
    : DEFAULT_SIZE;

  // graph padding
  const graphYPadding =
    graphAreaStyle.paddingTop + graphAreaStyle.paddingBottom;
  const graphXPadding =
    graphAreaStyle.paddingLeft + graphAreaStyle.paddingRight;

  const height =
    graphAreaStyle.height - (topAxisHeight + bottomAxisHeight) - graphYPadding;
  const width =
    graphAreaStyle.width - (leftAxisWidth + rightAxisWidth) - graphXPadding;

  return (
    <ChartAreaStyleContext.Provider
      value={{
        height,
        width,
        left: leftAxisWidth,
        top: topAxisHeight,
      }}
    >
      {children}
    </ChartAreaStyleContext.Provider>
  );
};
