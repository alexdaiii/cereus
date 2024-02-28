/**
 * Width and height of a chart item.
 */
export type GraphItemSize = {
  /**
   * Width of the chart item in px excluding all margins and padding.
   * Should be greater than 0.
   */
  readonly width: number;
  /**
   * Height of the chart item in px excluding all margins and padding.
   * Should be greater than 0.
   */
  readonly height: number;
};

/**
 * Top and left offset for a [@visx/group](https://airbnb.io/visx/docs/group) component.
 */
export type GroupOffset = {
  /**
   * The offset from the left of the group in px from a parent svg or group.
   */
  readonly left: number;
  /**
   * The offset from the top of the group in px from a parent svg or group.
   */
  readonly top: number;
};

/**
 * Padding for a chart item.
 */
export type GraphItemPadding = {
  /**
   * Padding left of the chart item in px.
   */
  readonly paddingLeft: number;
  /**
   * Padding right of the chart item in px.
   */
  readonly paddingRight: number;
  /**
   * Padding top of the chart item in px.
   */
  readonly paddingTop: number;
  /**
   * Padding bottom of the chart item in px.
   */
  readonly paddingBottom: number;
};

/**
 * Margin for a chart item.
 */
export type GraphItemMargin = {
  /**
   * Margin left of the chart item in px.
   */
  readonly marginLeft: number;
  /**
   * Margin right of the chart item in px.
   */
  readonly marginRight: number;
  /**
   * Margin top of the chart item in px.
   */
  readonly marginTop: number;
  /**
   * Margin bottom of the chart item in px.
   */
  readonly marginBottom: number;
};
