import {AxisLeft, AxisTop} from '@visx/axis';
import {Group} from '@visx/group';
import {ParentSize} from '@visx/responsive';
import {scaleBand, scaleLinear} from '@visx/scale';
import {AnyScaleBand} from '@visx/shape/lib/types';
import {Text} from '@visx/text';
import {useMemo} from 'react';

import {RowData} from '@/types/dataTypes';
import {breakpoints} from '@/utils/styles';

const sequence = 'ATGCGATCGATCGATCGATCGCTAGACGTATCG';

const rowData: RowData[] = [
  {
    rowId: 'row1',
    title: 'Sequence',
    tracks: [
      {
        trackId: 'sequence1',
        trackType: 'sequence',
        sequence: sequence,
      },
    ],
  },
  {
    rowId: 'row2',
    title: 'Blocks',
    tracks: [
      {
        trackId: 'row2block1',
        trackType: 'block',
      },
      {
        trackId: 'row2block2',
        trackType: 'block',
      },
      {
        trackId: 'row2block3',
        trackType: 'block',
      },
    ],
  },
  {
    rowId: 'row3',
    title: 'Composite',
    composite: true,
    tracks: [
      {
        trackId: 'row3block1',
        trackType: 'block',
      },
      {
        trackId: 'row3block2',
        trackType: 'sequence',
        sequence: sequence,
      },
    ],
  },
  {
    rowId: 'row4',
    title: 'A very very long row name with spaces',
    tracks: [
      {
        trackId: 'row4track1',
        trackType: 'sequence',
        sequence: sequence,
      },
    ],
  },
  {
    rowId: 'row5',
    title: 'A_very_long_single_word_row_name',
    tracks: [
      {
        trackId: 'row5sequence1',
        trackType: 'sequence',
        sequence: sequence,
      },
    ],
  },
];

const trackIdToRowIdx = new Map<string, number>();
rowData.forEach((row, idx) => {
  row.tracks.forEach(track => {
    trackIdToRowIdx.set(track.trackId, idx);
  });
});
const trackIds = Array.from(trackIdToRowIdx.keys());

const DEFAULT_DOMAIN_START = 0;

const domain = {
  min: DEFAULT_DOMAIN_START,
  max: sequence.length * 100,
};

const paddingRem = {
  top: 0,
  right: 1.5,
  bottom: 0,
  left: 0,
};

// Units are in rem
const axisTopHeight = 2.5;

const axisTopPaddingBottom = 0;

const axisLeftWidth = 100;

const axisLeftPaddingRight = 0;

const backgrounds = {
  sequenceViewer: 'red',
  graph: 'blue',
  chart: 'rgba(255, 165, 0, 0.5)',
};

export const FullSequenceViewer = () => {
  return (
    <div
      style={{
        height: '50rem',
        // overflowY: 'auto',
      }}
    >
      <ParentSize>{SequenceViewer}</ParentSize>
    </div>
  );
};

const SequenceViewer = ({width, height}: {width: number; height: number}) => {
  const isBrowser = typeof window !== 'undefined';

  // TODO: make sure document is defined (SSR) if not, should be 16
  const defaultFontSize = isBrowser
    ? parseFloat(getComputedStyle(document?.documentElement).fontSize)
    : 16;

  const padding = {
    top: paddingRem.top * defaultFontSize,
    right: paddingRem.right * defaultFontSize,
    bottom: paddingRem.bottom * defaultFontSize,
    left: paddingRem.left * defaultFontSize,
  };

  const graphMaxY = height - padding.top - padding.bottom;
  const graphMaxX = width - padding.left - padding.right;

  // Axes locations
  const topAxisStartY = axisTopHeight * defaultFontSize;
  const leftAxisStartX = axisLeftWidth;

  /**
   * Where the Chart starts in relation to the Graph group
   */
  const graphChartStartX = leftAxisStartX + axisLeftPaddingRight;
  const graphChartStartY = topAxisStartY + axisTopPaddingBottom;

  const topAxisStartX = graphChartStartX;
  const leftAxisStartY = graphChartStartY;

  const chartMaxX = graphMaxX - graphChartStartX;
  const chartMaxY = graphMaxY - graphChartStartY;

  const getNumTopTicks = (width: number) => {
    // large
    if (width > breakpoints.lg) {
      return 10;
    }
    // medium
    if (width > breakpoints.md) {
      return 5;
    }
    return 3;
  };

  // TODO: useMemo for this
  // const numTopTicks = getNumTopTicks(width);
  const getTopTickValues = (
    numTicks: number,
    domain: {min: number; max: number},
  ) => {
    const step = (domain.max - domain.min) / (numTicks - 1);
    return Array.from({length: numTicks}, (_, i) =>
      Math.round(domain.min + i * step),
    );
  };

  const topTickValues = useMemo(
    () => getTopTickValues(getNumTopTicks(width), domain),
    // TODO: domain should be a dependency
    [width],
  );

  const trackScale = useMemo(
    () =>
      scaleBand({
        // Should be the number of data
        domain: trackIds,
        range: [0, chartMaxY],
      }),
    // TODO: trackIds should be a dependency
    [chartMaxY],
  );

  const leftOrdRange = (scale: AnyScaleBand, data: RowData[]) => {
    console.log('bandwidth', scale.bandwidth());

    const range = Array<number>(data.length);
    let start = 0;

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowHeight = row.tracks.length * scale.bandwidth();

      // put it in the middle (round down)
      range[i] = Math.floor((start + rowHeight) / 2);

      // add the rest of the height
      start += rowHeight;
    }

    return range;
  };

  console.log(
    'leftOrdRange',
    leftOrdRange(
      scaleBand({
        domain: [0, 1, 2, 3, 4],
        range: [0, 100],
      }),
      [],
    ),
  );

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={backgrounds.sequenceViewer} />
      {/*
        Graph Group
        */}
      <Group top={padding.top} left={padding.left}>
        <rect width={graphMaxX} height={graphMaxY} fill={backgrounds.graph} />
        {/* Place a Bottom Axis on the TOP of the graph */}
        <AxisTop
          scale={scaleLinear({
            domain: [domain.min, domain.max],
            range: [0, chartMaxX],
          })}
          left={
            // The left of the graph
            topAxisStartX
          }
          top={
            // The top of the graph
            topAxisStartY
          }
          tickLabelProps={{
            fontSize: '1rem',
          }}
          // numTicks={numTopTicks}
          tickValues={topTickValues}
        />
        {/* Place a Left Axis on the LEFT of the graph */}
        <AxisLeft
          scale={scaleBand({
            // Should be the number of data
            domain: trackIds,
            range: [0, chartMaxY],
          })}
          top={
            // The top of the graph
            leftAxisStartY
          }
          left={
            // The left of the graph
            leftAxisStartX
          }
          tickLabelProps={{
            fontSize: '1rem',
          }}
          tickLength={5}
          hideAxisLine
          tickComponent={({formattedValue, ...tickProps}) => (
            <Text width={axisLeftWidth} {...tickProps}>
              {`${formattedValue} from row 
              ${trackIdToRowIdx.get(formattedValue ?? '') ?? 'unknown'}`}
            </Text>
          )}
        />
        <Group top={graphChartStartY} left={graphChartStartX}>
          <rect width={chartMaxX} height={chartMaxY} fill={backgrounds.chart} />
          {rowData.map(row => {
            return <Group key={row.rowId}></Group>;
          })}
        </Group>
      </Group>
    </svg>
  );
};
