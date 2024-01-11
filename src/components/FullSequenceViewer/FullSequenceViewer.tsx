import {AxisLeft, AxisRight, AxisTop} from '@visx/axis';
import {Group} from '@visx/group';
import {ParentSize} from '@visx/responsive';
import {scaleBand, scaleLinear} from '@visx/scale';
import {scaleOrdinal} from '@visx/scale';
import {AnyScaleBand} from '@visx/shape/lib/types';
import {Text} from '@visx/text';
import {schemeSet1} from 'd3-scale-chromatic';
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
      {
        trackId: 'row5sequence2',
        trackType: 'sequence',
        sequence: sequence,
      },
      {
        trackId: 'row5sequence3',
        trackType: 'sequence',
        sequence: sequence,
      },
      {
        trackId: 'row5sequence4',
        trackType: 'sequence',
        sequence: sequence,
      },
    ],
  },
];

const NUM_TRACKS = rowData.reduce((acc, row) => acc + row.tracks.length, 0);

const trackIdToRowIdx = new Map<string, number>();
rowData.forEach((row, idx) => {
  row.tracks.forEach(track => {
    trackIdToRowIdx.set(track.trackId, idx);
  });
});
const trackIds = Array.from(trackIdToRowIdx.keys());

const DEFAULT_DOMAIN_START = 0;

// 12px font size - about the smallest readable font size
const DEFAULT_FONT_SIZE = '0.75rem';

// rem
const DEFAULT_LEFT_AXIS_TITLE_PADDING_BOTTOM = 1 / 8;

const domain = {
  min: DEFAULT_DOMAIN_START,
  max: sequence.length * 100,
};

const paddingRem = {
  top: 0,
  right: 1,
  bottom: 0,
  left: 1,
};

// Units are in rem
const axisTopHeight = 2.5;

const axisTopPaddingBottom = 0;

const axisLeftWidthPx = 0;

const axisLeftPaddingRight = 0;

const backgrounds = {
  sequenceViewer: 'red',
  graph: 'blue',
  chart: 'orange',
};

export const FullSequenceViewer = ({
  trackPaddingInner = 0,
  trackPaddingOuter = 0,
}: {
  trackPaddingInner?: number;
  trackPaddingOuter?: number;
}) => {
  return (
    <>
      <div
        style={{
          height: `${5.5 * NUM_TRACKS}rem`,
          // overflowY: 'auto',
        }}
      >
        <ParentSize>
          {({width, height}) => {
            return (
              <SequenceViewer
                {...{
                  width,
                  height,
                  trackPaddingInner,
                  trackPaddingOuter,
                }}
              />
            );
          }}
        </ParentSize>
      </div>
      <p>other stuff</p>
    </>
  );
};

const SequenceViewer = ({
  width,
  height,
  trackPaddingInner,
  trackPaddingOuter,
}: {
  width: number;
  height: number;
  trackPaddingInner: number;
  trackPaddingOuter: number;
}) => {
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
  // Axes locations
  const topAxisStartY = axisTopHeight * defaultFontSize;
  const leftAxisStartX = axisLeftWidthPx;

  const graphMaxY = height - topAxisStartY - padding.top - padding.bottom;
  const graphMaxX = width - padding.left - padding.right;

  /**
   * Where the Chart starts in relation to the Graph group
   */
  const graphChartStartX = leftAxisStartX + axisLeftPaddingRight;
  const graphChartStartY = 0;

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
        paddingInner: trackPaddingInner,
        paddingOuter: trackPaddingOuter,
      }),
    // TODO: trackIds should be a dependency
    [chartMaxY, trackPaddingInner, trackPaddingOuter],
  );

  const colorScale = scaleOrdinal({
    domain: trackIds,
    range: schemeSet1,
  });

  // const leftOrdRange = (scale: AnyScaleBand, data: RowData[]) => {
  //   console.log('bandwidth', scale.bandwidth());
  //
  //   const range = Array<number>(data.length);
  //   let start = 0;
  //
  //   for (let i = 0; i < data.length; i++) {
  //     const row = data[i];
  //     const rowHeight = row.tracks.length * scale.bandwidth();
  //
  //     // put it in the middle (round down)
  //     range[i] = Math.floor((start + rowHeight) / 2);
  //
  //     // add the rest of the height
  //     start += rowHeight;
  //   }
  //
  //   return range;
  // };
  //
  // console.log(
  //   'leftOrdRange',
  //   leftOrdRange(
  //     scaleBand({
  //       domain: [0, 1, 2, 3, 4],
  //       range: [0, 100],
  //     }),
  //     [],
  //   ),
  // );

  return (
    <>
      <svg
        height={topAxisStartY}
        width={width}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          bottom: 'auto',
          backdropFilter: 'blur(12px)',
          display: 'block',
        }}
      >
        <rect
          width={width}
          height={topAxisStartY}
          fill={'rgba(255, 255, 255, 0.5)'}
          rx={'0.75rem'}
        />
        <Group left={padding.left}>
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
              fontSize: DEFAULT_FONT_SIZE,
            }}
            tickValues={topTickValues}
          />
        </Group>
      </svg>
      <svg
        width={width}
        height={height - topAxisStartY}
        style={{
          display: 'block',
        }}
      >
        <rect
          width={width}
          height={height - topAxisStartY}
          fill={backgrounds.sequenceViewer}
        />
        {/*
        Graph Group
        */}
        <Group top={padding.top} left={padding.left}>
          <rect width={graphMaxX} height={graphMaxY} fill={backgrounds.graph} />
          {/* Place a Bottom Axis on the TOP of the graph */}

          <Group top={graphChartStartY} left={graphChartStartX}>
            <rect
              width={chartMaxX}
              height={chartMaxY}
              fill={backgrounds.chart}
            />
            {rowData.map(row => {
              return (
                <Group key={row.rowId}>
                  {/* Draw a rectangle of the track with color from the colorscale */}
                  {row.tracks.map(track => {
                    return (
                      <rect
                        key={track.trackId}
                        x={0}
                        y={trackScale(track.trackId)}
                        width={chartMaxX}
                        height={trackScale.bandwidth()}
                        fill={colorScale(track.trackId)?.toString() ?? 'black'}
                      />
                    );
                  })}
                </Group>
              );
            })}
          </Group>

          {/*
          Place a Left Axis on the LEFT of the graph
          Should be last so it's on top
          */}
          <AxisRight
            scale={trackScale}
            top={
              // The top of the graph
              leftAxisStartY
            }
            left={
              // The left of the graph
              leftAxisStartX
            }
            tickLabelProps={{
              fontSize: DEFAULT_FONT_SIZE,
            }}
            hideAxisLine
            strokeWidth={0}
            tickLength={0}
            tickLineProps={{
              textAnchor: 'start',
            }}
            tickComponent={({formattedValue, ...tickProps}) => (
              // translate text up by bandwidth / 2 round up
              // move to the right by axisLeftWidthPx

              <Text
                width={axisLeftWidthPx}
                {...tickProps}
                textAnchor={'start'}
                dy={`-${
                  trackScale.bandwidth() / 2 +
                  DEFAULT_LEFT_AXIS_TITLE_PADDING_BOTTOM * defaultFontSize
                }px`}
              >
                {`${formattedValue} from row 
              ${trackIdToRowIdx.get(formattedValue ?? '') ?? 'unknown'}`}
              </Text>
            )}
          />
        </Group>
      </svg>
    </>
  );
};
