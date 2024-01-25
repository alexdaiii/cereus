import {AxisLeft, AxisRight} from "@visx/axis";
import {useCallback} from "react";

import {AxisLeftPositioner, useAxisLeftStyle} from "@/core";
import {useCereusDomain, useCereusScale} from "@/tracks";
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
  const {rowIdToTitle} = useCereusDomain();
  const {y0ScaleMiddle} = useCereusScale();
  const {paddingLeft, width} = useAxisLeftStyle();

  const tickFormatter = useCallback(
    (rowId: string) => {
      return rowIdToTitle.get(rowId) ?? rowId;
    },
    [rowIdToTitle],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AxisLeftPositioner {...groupProps}>
      {left ? (
        <AxisLeft
          left={paddingLeft + width}
          scale={y0ScaleMiddle}
          hideAxisLine
          tickFormat={tickFormatter}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...axisProps}
        />
      ) : (
        <AxisRight
          left={paddingLeft + width}
          scale={y0ScaleMiddle}
          hideAxisLine
          tickFormat={tickFormatter}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...axisProps}
        />
      )}
    </AxisLeftPositioner>
  );
};
