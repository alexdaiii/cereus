import {AxisBottom} from '@visx/axis';
import {AnimatedAxis} from '@visx/react-spring';
import {scaleLinear} from '@visx/scale';
import {ComponentProps} from 'react';

import {useSequenceViewer} from '@/hooks/useSequenceViewer';

type Props = {
  /**
   * The minimum value of the axis
   */
  min?: number;
  /**
   * The maximum value of the axis
   */
  max: number;
  /**
   * Reexport of the [@visx/axis](https://airbnb.io/visx/docs/axis) AxisBottom or [@visx/react-spring](https://airbnb.io/visx/) props
   */
  axisProps?:
    | ComponentProps<typeof AxisBottom>
    | ComponentProps<typeof AnimatedAxis>;
};

/**
 * A `@visx/axis` Axis or `@visx/react-spring` component that is aware of the width of the sequence viewer
 */
export const ViewerAxis = ({min = 0, max, axisProps}: Props) => {
  const {
    width,
    boardConfig: {animate, paddingX},
  } = useSequenceViewer();

  const scale = scaleLinear<number>({
    domain: [min, max],
    range: [padding, width - padding],
    nice: true,
  });

  return animate ? (
    <AnimatedAxis scale={scale} {...axisProps} />
  ) : (
    <AxisBottom scale={scale} {...axisProps} />
  );
};
