import {isEqual} from 'lodash';
import {memo} from 'react';

import {GraphItemMargin} from '@/context';
import {
  AxisStyleProvider,
  AxisStyleProviderProps,
  GraphAreaParentSize,
  GraphAreaStyleProvider,
  PlotAreaStyleProvider,
} from '@/providers';
import {DeepPartial} from '@/types';

export type GraphWithAxesProviderProps = {
  children: React.ReactNode;
  /**
   * Margins around the graph area
   */
  margin?: Partial<GraphItemMargin>;
} & Omit<DeepPartial<AxisStyleProviderProps>, 'children'> &
  GraphAreaParentSize;

/**
 * Unmemoized version of GraphWithAxesProvider.
 * However, it uses the memoized version of AxisStyleProvider so it will
 * still only re-render when the object props change values (not references).
 *
 * @see GraphWithAxesProvider
 */
export const GraphWithAxesProviderNoMemo = ({
  children,
  parentHeight,
  parentWidth,
  // These are object props - used here to organize the props
  topAxis,
  rightAxis,
  bottomAxis,
  leftAxis,
  margin,
}: GraphWithAxesProviderProps) => {
  return (
    <GraphAreaStyleProvider
      parentHeight={parentHeight}
      parentWidth={parentWidth}
      marginTop={margin?.marginTop}
      marginRight={margin?.marginRight}
      marginBottom={margin?.marginBottom}
      marginLeft={margin?.marginLeft}
    >
      <AxisStyleProvider
        topAxis={topAxis}
        rightAxis={rightAxis}
        bottomAxis={bottomAxis}
        leftAxis={leftAxis}
      >
        <PlotAreaStyleProvider
          includeTopAxis
          includeRightAxis
          includeBottomAxis
          includeLeftAxis
        >
          {children}
        </PlotAreaStyleProvider>
      </AxisStyleProvider>
    </GraphAreaStyleProvider>
  );
};

/**
 * Memoized version of GraphWithAxesProvider.
 * Memoizes based on deep equality of all props (except children).
 *
 * Creates the following providers:
 * - {@link GraphAreaStyleProvider}
 * - {@link AxisStyleProvider}
 * - {@link PlotAreaStyleProvider}
 */
export const GraphWithAxesProvider = memo(
  GraphWithAxesProviderNoMemo,
  (
    {
      parentHeight: prevParentHeight,
      parentWidth: prevParentWidth,
      margin: prevMargin,
      topAxis: prevTopAxis,
      rightAxis: prevRightAxis,
      bottomAxis: prevBottomAxis,
      leftAxis: prevLeftAxis,
    },
    {
      parentHeight: nextParentHeight,
      parentWidth: nextParentWidth,
      margin: nextMargin,
      topAxis: nextTopAxis,
      rightAxis: nextRightAxis,
      bottomAxis: nextBottomAxis,
      leftAxis: nextLeftAxis,
    },
  ) => {
    return (
      prevParentHeight === nextParentHeight &&
      prevParentWidth === nextParentWidth &&
      // lodash deep equality since these are objects
      isEqual(prevMargin, nextMargin) &&
      isEqual(prevTopAxis, nextTopAxis) &&
      isEqual(prevRightAxis, nextRightAxis) &&
      isEqual(prevBottomAxis, nextBottomAxis) &&
      isEqual(prevLeftAxis, nextLeftAxis)
    );
  },
);
