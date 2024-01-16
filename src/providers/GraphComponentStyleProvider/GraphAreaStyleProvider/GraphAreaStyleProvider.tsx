import React from 'react';

import {GraphAreaStyleContext, GraphItemMargin} from '@/context';

type GraphAreaStyleProviderProps = {
  children: React.ReactNode;
  /**
   * Width of the parent element. Usually the width of the svg.
   */
  parentWidth: number;
  /**
   * Height of the parent element. Usually the height of the svg.
   */
  parentHeight: number;
} & Partial<GraphItemMargin>;

/**
 * Provides the calculated width, height, and transform of the graph area
 * based on the parent width and height and the margins.
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
