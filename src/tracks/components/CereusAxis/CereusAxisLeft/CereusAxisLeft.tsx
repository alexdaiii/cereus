import {AxisLeft, AxisRight} from "@visx/axis";

import {AxisLeftPositioner, useAxisLeftStyle} from "@/core";
import {useCereusScale} from "@/tracks";
import {CereusAxisProps} from "@/tracks/components/CereusAxis/types";

type CereusAxisLeftProps = {
  /**
   * Render a left or right @visx/axis.
   * @default false
   */
  left?: boolean;
} & CereusAxisProps;

export const CereusAxisLeft = ({
  left = false,
  groupProps,
  axisProps,
}: CereusAxisLeftProps) => {
  const {yScaleMiddle} = useCereusScale();
  const {paddingLeft} = useAxisLeftStyle();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AxisLeftPositioner {...groupProps}>
      {left ? (
        <AxisLeft
          left={paddingLeft}
          scale={yScaleMiddle}
          hideAxisLine
          // tickTransform={val => {
          //   const bandwidth = yBandwidth.get(val) ?? 0;
          //
          //   return `translate(0, ${yScale(val)} - ${bandwidth / 2})`;
          // }}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...axisProps}
        />
      ) : (
        <AxisRight
          left={paddingLeft}
          scale={yScaleMiddle}
          hideAxisLine
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...axisProps}
        />
      )}
    </AxisLeftPositioner>
  );
};
