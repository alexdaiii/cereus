import {AxisLeft, AxisRight} from "@visx/axis";
import {scaleOrdinal} from "@visx/scale";
import {useCallback, useMemo} from "react";

import {AxisLeftPositioner, useAxisLeftStyle} from "@/core";
import {useCereusDomain, useCereusScale} from "@/tracks";
import {CereusAxisProps} from "@/tracks/components/CereusAxis/types";

type CereusAxisLeftProps = {
  /**
   * Render a left or right @visx/axis.
   * @default false
   */
  left?: boolean;
  /**
   * How much padding to add below a right axis tick label. Used in a
   * translate transform.
   * @default 0
   */
  rTickPaddingBottom?: number;
} & CereusAxisProps;

/**
 * Display a left or right axis on the left of the plot area.
 * By default renders a right axis placed over the tracks (may need to be
 * positioned manually).
 */
export const CereusAxisLeft = ({
  left = false,
  groupProps,
  axisProps,
  rTickPaddingBottom = 0,
}: CereusAxisLeftProps) => {
  const {rowIdToTitle} = useCereusDomain();

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
        <WithAxisLeft axisProps={axisProps} tickFormatter={tickFormatter} />
      ) : (
        <WithAxisRight
          axisProps={axisProps}
          tickFormatter={tickFormatter}
          rTickPaddingBottom={rTickPaddingBottom}
        />
      )}
    </AxisLeftPositioner>
  );
};

type WithLeftAxisProps = {
  axisProps?: CereusAxisProps["axisProps"];
  tickFormatter: (rowId: string) => string;
};

/**
 * A left axis that is offset by half the bandwidth.
 */
const WithAxisLeft = ({axisProps, tickFormatter}: WithLeftAxisProps) => {
  const {paddingLeft, width} = useAxisLeftStyle();
  const {y0Scale, y0Bandwidth} = useCereusScale();

  // replace the default y0Scale with one that is offset by half the bandwidth
  const y0ScaleMiddle = useMemo(() => {
    return scaleOrdinal({
      domain: y0Scale.domain(),
      range: y0Scale.domain().map(rowId => {
        return y0Scale(rowId) + (y0Bandwidth.get(rowId) ?? 0) / 2;
      }),
    });
  }, [y0Bandwidth, y0Scale]);

  return (
    <AxisLeft
      left={paddingLeft + width}
      scale={y0ScaleMiddle}
      hideAxisLine
      tickFormat={tickFormatter}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...axisProps}
    />
  );
};

type WithRightAxisProps = {
  rTickPaddingBottom: number;
} & WithLeftAxisProps;

/**
 * The default right axis. Used to display the row titles on top of the tracks
 * for mobile or narrow screens.
 */
const WithAxisRight = ({
  axisProps,
  tickFormatter,
  rTickPaddingBottom = 0,
}: WithRightAxisProps) => {
  const {paddingLeft, width} = useAxisLeftStyle();
  const {y0Scale} = useCereusScale();

  return (
    <AxisRight
      left={paddingLeft + width}
      scale={y0Scale}
      hideAxisLine
      tickFormat={tickFormatter}
      hideTicks
      tickLength={0}
      tickTransform={`translate(0, -${rTickPaddingBottom})`}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...axisProps}
    />
  );
};
