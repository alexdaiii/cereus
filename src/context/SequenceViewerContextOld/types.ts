/**
 * Configuration for the board
 */
export type GraphConfig = {
  /**
   * Whether or not to animate the board
   */
  animate: boolean;
  /**
   * Whether or not to include the axis at the top of the graph
   */
  includeTopAxis: boolean;
  /**
   * Left axis width, which shows the track titles (in px)
   */
  leftAxisWidth: number;
  /**
   * Top axis height, which shows the domain (in px)
   */
  topAxisHeight: number;
  /**
   * Minimum of the domain
   */
  domainMin: number;
  /**
   * Maximum of the domain
   */
  domainMax: number;
  /**
   * Padding top (in px)
   */
  paddingTop: number;
  /**
   * Padding right (in px)
   */
  paddingRight: number;
  /**
   * Padding bottom (in px)
   */
  paddingBottom: number;
  /**
   * Padding left (in px)
   */
  paddingLeft: number;
};

/**
 * Computed Graph Config properties.
 * Position (0, 0) is the top left corner of the graph.
 * Think of these coordinates as pretty much being in Quadrant 4 of a x-y graph and
 * all the y values are really multiplied by -1.
 */
export type ComputedGraphConfig = {
  /**
   * Left bound for the graph (including axis)
   */
  xMin: number;
  /**
   * Right bound for the graph (including axis)
   */
  xMax: number;
  /**
   * Top bound for the graph (including axis)
   */
  yMin: number;
  /**
   * Bottom bound for the graph (including axis)
   */
  yMax: number;
  /**
   * Left bound for the charting area (excludes the left Y axis)
   */
  chartXMin: number;
  /**
   * Right bound for the charting area. Usually the same as xMax.
   */
  chartXMax: number;
  /**
   * Top bound for the charting area (excludes the top X axis)
   */
  chartYMin: number;
  /**
   * Bottom bound for the charting area. Usually the same as yMin.
   */
  chartYMax: number;
};

export type SequenceViewerContextType = {
  width: number;
  height: number;
  graphConfig: GraphConfig;
  computedGraphConfig: ComputedGraphConfig;
};
