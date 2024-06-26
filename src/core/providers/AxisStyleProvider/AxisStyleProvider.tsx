import {ReactNode} from "react";

import {GraphItemPadding} from "@/core/context";
import {useGraphAreaStyle} from "@/core/hooks";
import {
  AxisBottomStyleProvider,
  AxisLeftStyleProvider,
  AxisRightStyleProvider,
  AxisTopStyleProvider,
} from "@/core/providers";
import {
  calcAxisHeight,
  calcAxisWidth,
} from "@/core/providers/GraphComponentStyleProvider/utils";

export type HorizontalAxisProps = {
  /**
   * Axis height
   */
  height?: number;
  /**
   * Padding top
   * @default 0
   */
  paddingTop?: number;
  /**
   * Padding bottom
   * @default 0
   */
  paddingBottom?: number;
};

export type VerticalAxisProps = {
  /**
   * Axis width
   */
  width?: number;
  /**
   * Padding left
   * @default 0
   */
  paddingLeft?: number;
  /**
   * Padding right
   * @default 0
   */
  paddingRight?: number;
};

/**
 * Props for provider that **creates** all four AxisStyleProviders (Top, Bottom, Left, Right).
 * Not the same as AxisStyleProvidersProps {@link AxisStyleProvidersProps}
 */
export type AxisStyleProviderProps = {
  children: ReactNode;
  /**
   * Top axis config
   */
  topAxis?: HorizontalAxisProps;
  /**
   * Right axis config
   */
  rightAxis?: VerticalAxisProps;
  /**
   * Bottom axis config
   */
  bottomAxis?: HorizontalAxisProps;
  /**
   * Left axis config
   */
  leftAxis?: VerticalAxisProps;
};

const DEFAULT_PADDING: GraphItemPadding = {
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
} as const;

const DEFAULT_HORIZONTAL_AXIS = {
  height: 0,
} as const;

const DEFAULT_VERTICAL_AXIS = {
  width: 0,
} as const;

/**
 * A high level component that crates all four AxisStyleProviders (Top, Bottom, Left, Right).
 * Should be used inside a `<GraphAreaStyleProvider/>`. {@link GraphAreaStyleProvider}
 *
 * Automatically calculates the *width* of {@link AxisTopStyleProvider} and {@link AxisBottomStyleProvider}
 * and the *height* of {@link AxisLeftStyleProvider} and {@link AxisRightStyleProvider}.
 */
export const AxisStyleProvider = ({
  children,
  topAxis,
  rightAxis,
  bottomAxis,
  leftAxis,
}: AxisStyleProviderProps) => {
  const {width, height} = useGraphAreaStyle();

  const topAxisStyle = {
    ...DEFAULT_PADDING,
    ...DEFAULT_HORIZONTAL_AXIS,
    ...topAxis,
  };
  const rightAxisStyle = {
    ...DEFAULT_PADDING,
    ...DEFAULT_VERTICAL_AXIS,
    ...rightAxis,
  };
  const bottomAxisStyle = {
    ...DEFAULT_PADDING,
    ...DEFAULT_HORIZONTAL_AXIS,
    ...bottomAxis,
  };
  const leftAxisStyle = {
    ...DEFAULT_PADDING,
    ...DEFAULT_VERTICAL_AXIS,
    ...leftAxis,
  };

  const topAxisHeight = calcAxisHeight(topAxisStyle);
  const bottomAxisHeight = calcAxisHeight(bottomAxisStyle);
  const leftAxisWidth = calcAxisWidth(leftAxisStyle);
  const rightAxisWidth = calcAxisWidth(rightAxisStyle);

  const plotHeight = height - (topAxisHeight + bottomAxisHeight);
  const plotWidth = width - (leftAxisWidth + rightAxisWidth);

  return (
    <AxisTopStyleProvider
      width={plotWidth}
      height={topAxis?.height ?? 0}
      left={leftAxisWidth}
      paddingTop={topAxis?.paddingTop}
      paddingBottom={topAxis?.paddingBottom}
    >
      <AxisRightStyleProvider
        width={rightAxis?.width ?? 0}
        height={plotHeight}
        top={topAxisHeight}
        left={leftAxisWidth + plotWidth}
        paddingRight={rightAxis?.paddingRight}
        paddingLeft={rightAxis?.paddingLeft}
      >
        <AxisBottomStyleProvider
          width={plotWidth}
          height={bottomAxis?.height ?? 0}
          top={topAxisHeight + plotHeight}
          left={leftAxisWidth}
          paddingTop={bottomAxis?.paddingTop}
          paddingBottom={bottomAxis?.paddingBottom}
        >
          <AxisLeftStyleProvider
            width={leftAxis?.width ?? 0}
            height={plotHeight}
            top={topAxisHeight}
            paddingLeft={leftAxis?.paddingLeft}
            paddingRight={leftAxis?.paddingRight}
          >
            {children}
          </AxisLeftStyleProvider>
        </AxisBottomStyleProvider>
      </AxisRightStyleProvider>
    </AxisTopStyleProvider>
  );
};
