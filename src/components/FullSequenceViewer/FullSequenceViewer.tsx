import {Axis, AxisBottom} from '@visx/axis';
import {Group} from '@visx/group';
import {ParentSize} from '@visx/responsive';
import {scaleBand, scaleLinear, scaleOrdinal} from '@visx/scale';
import {BarGroupHorizontal} from '@visx/shape';

import {useSequenceViewer} from '@/hooks/useSequenceViewer';

type Props = {};

const sequence =
  'MTEYKLVVVGAGGVGKSALTIQLIQNHFVDEYDPTIEDSYRKQVVIDGETCLLDILDTAGQ' +
  'EEYSAMRDQYMRTGEGFLCVFAINNTKSFEDIHQYREQIKRVKDSDDVPMVLVGNKCDLAA' +
  'RTVESRQAQDLARSYGIPYIETSAKTRQGVEDAFYTLVREIRQHKLRKLNPPDESGPGCMSCKCVLS';
const letters = sequence.split('').map((val, idx) => ({val, idx}));

const defaultPadding = 10;

type DataType = {
  rowTitle: string;
  trackData: any[];
};

const data: DataType[] = [
  {
    rowTitle: 'Sequence',
    trackData: [sequence],
  },
];

const getRowTitle = (row: DataType) => row.rowTitle;

const keys = data.map(getRowTitle);

const rowScale = scaleBand({
  domain: keys,
  padding: 0.2,
});

export const FullSequenceViewer = ({}: Props) => {
  return (
    <div
      style={{
        height: '50vh',
      }}
    >
      <ParentSize>{SequenceViewer}</ParentSize>
    </div>
  );
};

const SequenceViewer = ({width, height}: {width: number; height: number}) => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <svg width={width} height={height}>
        <Group>
          <AxisBottom
            scale={scaleLinear<number>({
              domain: [0, sequence.length],
              range: [defaultPadding, width - defaultPadding],
              nice: true,
            })}
          />
        </Group>
      </svg>
    </div>
  );
};

const Sequence = ({width}: {width: number}) => {
  return (
    <Axis
      scale={scaleBand({
        domain: letters,
        range: [defaultPadding, width - defaultPadding],
      })}
      tickFormat={val => val.val}
      strokeWidth={0}
      numTicks={width}
    />
  );
};
