import {Group} from "@visx/group";
import {ComponentProps} from "react";

import {
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
  useGraphAreaStyle,
  usePlotAreaStyle,
} from "@/core";
import {GroupOffset} from "@/core/context";

// type GraphComponentsPositionerProps = {
//   children: ReactNode;
// } & ComponentProps<typeof Group>;

/**
 * Creates a group component that has the top and left offsets applied
 * based on the hook provided.
 * @param hook
 */
export const createGraphComponentsPositioner = <T extends GroupOffset>(
  hook: () => T,
) => {
  return function GraphComponent({
    children,
    ...groupProps
  }: ComponentProps<typeof Group>) {
    const {top, left} = hook();

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Group top={top} left={left} {...groupProps}>
        {children}
      </Group>
    );
  };
};

/**
 * Creates a group component that has the top and left offsets applied
 * for the graph area based on the latest GraphAreaStyleContext values.
 */
export const GraphAreaPositioner =
  createGraphComponentsPositioner(useGraphAreaStyle);

/**
 * Creates a group component that has the top and left offsets applied
 * for the top axis based on the latest AxisTopStyleContext values.
 */
export const AxisTopPositioner =
  createGraphComponentsPositioner(useAxisTopStyle);

/**
 * Creates a group component that has the top and left offsets applied
 * for the right axis based on the latest AxisRightStyleContext values.
 */
export const AxisRightPositioner =
  createGraphComponentsPositioner(useAxisRightStyle);

/**
 * Creates a group component that has the top and left offsets applied
 * for the bottom axis based on the latest AxisBottomStyleContext values.
 */
export const AxisBottomPositioner =
  createGraphComponentsPositioner(useAxisBottomStyle);

/**
 * Creates a group component that has the top and left offsets applied
 * for the left axis based on the latest AxisLeftStyleContext values.
 */
export const AxisLeftPositioner =
  createGraphComponentsPositioner(useAxisLeftStyle);

/**
 * Creates a group component that has the top and left offsets applied
 * for the plot area based on the latest PlotAreaStyleContext values.
 */
export const PlotAreaPositioner =
  createGraphComponentsPositioner(usePlotAreaStyle);
