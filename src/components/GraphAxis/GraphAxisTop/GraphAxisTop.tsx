import {AxisBottom, Orientation} from '@visx/axis';
import {AnimatedAxis} from '@visx/react-spring';
import {scaleLinear} from '@visx/scale';
import {ComponentProps} from 'react';

import {useGraphConfig} from '@/hooks/useSequenceViewer';

type Props = {
  /**
   * Reexport of the [@visx/axis](https://airbnb.io/visx/docs/axis) AxisBottom or [@visx/react-spring](https://airbnb.io/visx/) props
   */
  axisProps?:
    | ComponentProps<typeof AxisBottom>
    | ComponentProps<typeof AnimatedAxis>;
};

/**
 * A @visx/axis AxisBottom component that is aware of the width of the sequence viewer
 */
export const GraphAxisTop = ({axisProps}: Props) => {
  const {domainMin, domainMax, chartXMin, chartXMax, animate} =
    useGraphConfig();

  const scale = scaleLinear<number>({
    domain: [domainMin, domainMax],
    range: [chartXMin, chartXMax],
    nice: true,
  });

  return animate ? (
    <AnimatedAxis
      scale={scale}
      {...axisProps}
      orientation={Orientation.bottom}
    />
  ) : (
    <AxisBottom scale={scale} {...axisProps} />
  );
};
