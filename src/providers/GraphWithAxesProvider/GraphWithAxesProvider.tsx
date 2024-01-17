import {GraphItemMargin} from '@/context';
import {
  AxisStyleProvider,
  AxisStyleProviderProps,
  GraphAreaParentSize,
  GraphAreaStyleProvider,
  PlotAreaStyleProvider,
} from '@/providers';
import {DeepPartial} from '@/types';

type GraphWithAxesProviderProps = {
  children: React.ReactNode;
  /**
   * Margins around the graph area
   */
  margin?: Partial<GraphItemMargin>;
} & Omit<DeepPartial<AxisStyleProviderProps>, 'children'> &
  GraphAreaParentSize;

export const GraphWithAxesProvider = ({
  children,
  parentHeight,
  parentWidth,
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
