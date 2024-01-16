/**
 * Width and height of a chart item.
 */
export type GraphItemSize = {
  /**
   * Width of the chart item in px excluding all margins and padding.
   * Should be greater than 0.
   */
  width: number;
  /**
   * Height of the chart item in px excluding all margins and padding.
   * Should be greater than 0.
   */
  height: number;
};

/**
 * Top and left offset for a [@visx/group](https://airbnb.io/visx/docs/group) component.
 */
export type GroupOffset = {
  /**
   * The offset from the left of the group in px from a parent svg or group.
   */
  left: number;
  /**
   * The offset from the top of the group in px from a parent svg or group.
   */
  top: number;
};

/**
 * Padding for a chart item.
 */
export type GraphItemPadding = {
  /**
   * Padding left of the chart item in px.
   */
  paddingLeft: number;
  /**
   * Padding right of the chart item in px.
   */
  paddingRight: number;
  /**
   * Padding top of the chart item in px.
   */
  paddingTop: number;
  /**
   * Padding bottom of the chart item in px.
   */
  paddingBottom: number;
};

/**
 * Margin for a chart item.
 */
export type GraphItemMargin = {
  /**
   * Margin left of the chart item in px.
   */
  marginLeft: number;
  /**
   * Margin right of the chart item in px.
   */
  marginRight: number;
  /**
   * Margin top of the chart item in px.
   */
  marginTop: number;
  /**
   * Margin bottom of the chart item in px.
   */
  marginBottom: number;
};
