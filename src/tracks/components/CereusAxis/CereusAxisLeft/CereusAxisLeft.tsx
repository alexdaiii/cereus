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
  const {y0ScaleMiddle} = useCereusScale();
  const {paddingLeft, width} = useAxisLeftStyle();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AxisLeftPositioner {...groupProps}>
      {left ? (
        <AxisLeft
          left={paddingLeft + width}
          scale={y0ScaleMiddle}
          hideAxisLine
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...axisProps}
        />
      ) : (
        <AxisRight
          left={paddingLeft + width}
          scale={y0ScaleMiddle}
          hideAxisLine
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...axisProps}
        />
      )}
    </AxisLeftPositioner>
  );
};
