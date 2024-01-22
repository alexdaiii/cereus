import {AxisLeft, AxisRight} from "@visx/axis";

import {AxisLeftPositioner} from "@/core";
import {useCereusScale} from "@/tracks";
import {CereusAxisProps} from "@/tracks/components/CereusAxis/types";

type CereusAxisLeftProps = {
  /**
   * Render a left or right @visx/axis.
   * @default true
   */
  left?: boolean;
} & CereusAxisProps;

export const CereusAxisLeft = ({
  left = true,
  groupProps,
  axisProps,
  axisClassName,
  labelClassName,
  tickClassName,
}: CereusAxisLeftProps) => {
  const {yScale} = useCereusScale();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AxisLeftPositioner {...groupProps}>
      {left ? (
        <AxisLeft
          scale={yScale}
          axisClassName={axisClassName}
          labelClassName={labelClassName}
          tickClassName={tickClassName}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...axisProps}
        />
      ) : (
        <AxisRight
          scale={yScale}
          axisClassName={axisClassName}
          labelClassName={labelClassName}
          tickClassName={tickClassName}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...axisProps}
        />
      )}
    </AxisLeftPositioner>
  );
};
