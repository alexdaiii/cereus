/**
 * Calculates the full height of an axis including padding
 */
export const calcAxisHeight = (style: {
  height: number;
  paddingTop: number;
  paddingBottom: number;
}) => {
  return style.height + style.paddingTop + style.paddingBottom;
};

/**
 * Calculates the full width of an axis including padding
 */
export const calcAxisWidth = (style: {
  width: number;
  paddingLeft: number;
  paddingRight: number;
}) => {
  return style.width + style.paddingLeft + style.paddingRight;
};
