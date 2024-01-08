import {createContext} from 'react';

/**
 * Configuration for the board
 */
export type BoardConfig = {
  /**
   * Padding between the board and the sides of the svg
   */
  paddingX: number;
  /**
   * Whether or not to animate the board
   */
  animate: boolean;
  /**
   * Domain of the board
   */
  domain: {
    /**
     * Minimum value of the domain
     */
    min: number;
    /**
     * Maximum value of the domain
     */
    max: number;
  };
};

/**
 * Bounds
 */
export type Bounds = {
  /**
   * Left bound
   */
  xMin: number;
  /**
   * Right bound
   */
  xMax: number;
  /**
   * Top bound
   */
  yMin: number;
  /**
   * Bottom bound
   */
  yMax: number;
};

export type SequenceViewerContextType = {
  width: number;
  height: number;
  boardConfig: BoardConfig;
  bounds: Bounds;
};

export const SequenceViewerContext = createContext<SequenceViewerContextType>({
  width: 0,
  height: 0,
  boardConfig: {
    paddingX: 0,
    animate: true,
    domain: {
      min: 0,
      max: 0,
    },
  },
  bounds: {
    xMin: 0,
    xMax: 0,
    yMin: 0,
    yMax: 0,
  },
});
