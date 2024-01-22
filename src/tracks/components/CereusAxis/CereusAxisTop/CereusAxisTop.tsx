import {AxisBottom} from "@visx/axis";

import {AxisTopPositioner, useAxisTopStyle} from "@/core";
import {useCereusScale} from "@/tracks";
import {CereusAxisProps} from "@/tracks/components/CereusAxis/types";

/**
 * Renders a `<Group>` element that wraps a `<AxisBottom>` element from `@visx`
 * that uses a scaleBand from `@visx/scale` to render a horizontal axis at the
 * top of the chart.
 *
 * Requires a parent `<CereusScaleProvider>` component to be rendered in order
 * to provide the scale.
 */
export const CereusAxisTop = ({
  groupProps,
  axisProps,
  axisClassName,
  labelClassName,
  tickClassName,
}: CereusAxisProps) => {
  const {xScale} = useCereusScale();
  const {paddingTop} = useAxisTopStyle();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AxisTopPositioner {...groupProps}>
      <AxisBottom
        scale={xScale}
        top={paddingTop}
        axisClassName={axisClassName}
        labelClassName={labelClassName}
        tickClassName={tickClassName}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...axisProps}
      />
    </AxisTopPositioner>
  );
};
