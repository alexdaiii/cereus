import {AxisBottom} from "@visx/axis";
import {Group} from "@visx/group";
import {ComponentProps} from "react";

import {AxisTopPositioner, useAxisTopStyle} from "@/core";
import {useCereusScale} from "@/tracks";

type CereusAxisTopProps = {
  /**
   * Props for the `<Group>` element that wraps a `<AxisBottom>` element from
   * `@visx`
   */
  groupProps?: ComponentProps<typeof Group>;
  /**
   * Props for the `<AxisBottom>` element from `@visx`
   */
  axisProps?: Omit<ComponentProps<typeof AxisBottom>, "scale">;
};

/**
 * Renders a `<Group>` element that wraps a `<AxisBottom>` element from `@visx`
 * that uses a scaleBand from `@visx/scale` to render a horizontal axis at the
 * top of the chart.
 *
 * Requires a parent `<CereusScaleProvider>` component to be rendered in order
 * to provide the scale.
 */
export const CereusAxisTop = ({groupProps, axisProps}: CereusAxisTopProps) => {
  const {xScale} = useCereusScale();
  const {paddingTop} = useAxisTopStyle();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AxisTopPositioner {...groupProps}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AxisBottom scale={xScale} top={paddingTop} {...axisProps} />
    </AxisTopPositioner>
  );
};
