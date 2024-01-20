import {ReactNode} from "react";

import {GraphAreaStyleContext, GraphItemMargin} from "@/core";
import {useParentSize} from "@/core/hooks";

export type GraphAreaParentSize = {
  /**
   * Width of the parent element. Usually the width of the svg.
   * Not required if using the {@link ParentSizeProvider}.
   * @default 0
   */
  parentWidth?: number;
  /**
   * Height of the parent element. Usually the height of the svg.
   * Not required if using the {@link ParentSizeProvider}.
   * @default 0
   */
  parentHeight?: number;
};

export type GraphAreaStyleProviderProps = {
  children: ReactNode;
} & GraphAreaParentSize &
  Partial<GraphItemMargin>;

/**
 * Provides the calculated width, height, and transform of the graph area
 * based on a parent width and height and the margins.
 *
 * Usually the parent width and height are the width and height of the svg.
 *
 * @param GraphAreaStyleProviderProps props {@link GraphAreaStyleProviderProps}
 */
export const GraphAreaStyleProvider = ({
  children,
  parentHeight,
  parentWidth,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
}: GraphAreaStyleProviderProps) => {
  const {width: pWidth, height: pHeight} = useParentSize();

  parentWidth = parentWidth ?? pWidth;
  parentHeight = parentHeight ?? pHeight;

  const width = parentWidth - marginLeft - marginRight;
  const height = parentHeight - marginTop - marginBottom;

  return (
    <GraphAreaStyleContext.Provider
      value={{
        width,
        height,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        top: marginTop,
        left: marginLeft,
      }}
    >
      {children}
    </GraphAreaStyleContext.Provider>
  );
};
