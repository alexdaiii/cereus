import {GraphItemMargin} from "@/core/context";
import {
  AxisStyleProvider,
  AxisStyleProviderProps,
  GraphAreaParentSize,
  GraphAreaStyleProvider,
  PlotAreaStyleProvider,
} from "@/core/providers";

export type GraphWithAxesProviderProps = {
  children: React.ReactNode;
  /**
   * Margins around the graph area
   */
  margin?: Partial<GraphItemMargin>;
} & Omit<AxisStyleProviderProps, "children"> &
  GraphAreaParentSize;

/**
 * Creates the following providers:
 * - {@link GraphAreaStyleProvider}
 * - {@link AxisStyleProvider}
 * - {@link PlotAreaStyleProvider}
 *
 */
export const GraphWithAxesProvider = ({
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
