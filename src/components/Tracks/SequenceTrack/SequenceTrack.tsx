import {Axis} from '@visx/axis';
import {scaleBand} from '@visx/scale';

import {useSequenceViewer} from '@/hooks/useSequenceViewer';
import {breakpoints} from '@/types/styles';

type Props = {
  sequence: string;
};

export const SequenceTrack = ({sequence}: Props) => {
  const letters = sequence.split('').map((val, idx) => ({val, idx}));

  const {
    width,
    horizontalAxis: {padding},
  } = useSequenceViewer();

  return (
    <Axis
      scale={scaleBand({
        domain: letters,
        range: [padding, width - padding],
      })}
      tickFormat={val => val.val}
      strokeWidth={0}
      numTicks={getNumTicks(width)}
    />
  );
};

const getNumTicks = (width: number) => {
  if (width > breakpoints.lg) {
    return 0;
  }
  if (width > breakpoints.md) {
    return 35;
  }
  if (width > breakpoints.sm) {
    return 30;
  }

  return 25;
};
