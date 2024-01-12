import {AnimatedAxis} from '@visx/react-spring';
import {scaleLinear} from '@visx/scale';

import {useGraphConfig} from '@/hooks/useSequenceViewer';
import {TrackDataBase, oTrackTypes} from '@/types/dataTypes';

type Props = {
  sequence: string;
  start?: number;
};

export interface SequenceTrackData extends TrackDataBase, Props {
  trackType: typeof oTrackTypes.sequence;
}

export const SequenceTrack = ({sequence, start = 1}: Props) => {
  const {domainMin, domainMax, chartXMin, chartXMax} = useGraphConfig();

  const scale = scaleLinear({
    domain: [domainMin, domainMax],
    range: [chartXMin, chartXMax],
  });

  return <AnimatedAxis scale={scale} />;
};
