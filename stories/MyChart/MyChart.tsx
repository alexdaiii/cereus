import {Group} from "@visx/group";
import {Bar} from "@visx/shape";
import {ComponentProps, ReactNode, useState} from "react";

import {
  AxisBottomPositioner,
  AxisLeftPositioner,
  AxisRightPositioner,
  AxisStyleContextType,
  AxisTopPositioner,
  GraphAreaPositioner,
  GraphItemMargin,
  GraphWithAxesProvider,
  ParentSizeProvider,
  PlotAreaPositioner,
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
  useGraphAreaStyle,
  useParentSize,
  usePlotAreaStyle,
} from "../../src";
import {
  CereusAxisLeft,
  CereusAxisTop,
  CereusDomainProvider,
  CereusRowData,
  CereusScalesProvider,
  CereusTracks,
} from "../../src/tracks";
import {CereusPlot} from "../../src/tracks/components/CereusPlot";

type MyChartProps = {
  margin?: GraphItemMargin;
  aspectRatio?: string;
  maxWidth?: number;

  topAxisHeight?: number;
  bottomAxisHeight?: number;
  leftAxisWidth?: number;
  rightAxisWidth?: number;
};

const sequence =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const getData = (): CereusRowData[] => {
  return [
    {
      rowId: "row-1",
      title: "Sequence",
      visible: true,
      tracks: [
        {
          trackType: "sequence",
          trackId: "row-1-track-1",
          data: {
            begin: 1,
            sequence,
          },
        },
        {
          trackType: "sequence",
          trackId: "row-1-track-2",
          data: {
            begin: 1,
            sequence: "foo bar",
          },
        },
      ],
    },
    {
      rowId: "row-2",
      title: "block",
      visible: true,
      tracks: [
        {
          trackType: "block",
          trackId: "row-2-track-1",
          data: {
            begin: 1,
            end: 10,
          },
        },
        {
          trackType: "block",
          trackId: "row-2-track-2",
          data: {
            begin: 1,
            end: 10,
          },
        },
        {
          trackType: "block",
          trackId: "row-2-track-3",
          data: {
            begin: 1,
            end: 10,
          },
        },
        {
          trackType: "block",
          trackId: "row-2-track-4",
          data: {
            begin: 1,
            end: 10,
          },
        },
      ],
    },
    {
      rowId: "row-3",
      title: "point",
      visible: true,
      tracks: [
        {
          trackType: "point",
          trackId: "row-2-track-1",
          data: {
            positions: [5, 10, 15, 20],
          },
        },
      ],
    },
    {
      rowId: "row-4",
      title: "heatmap",
      visible: true,
      tracks: [
        {
          trackType: "heatmap",
          trackId: "row-2-track-1",
          data: [
            {
              bin: 1,
              count: 14,
            },
          ],
        },
      ],
    },
    {
      rowId: "row-5",
      title: "heatmap",
      visible: false,
      tracks: [
        {
          trackType: "heatmap",
          trackId: "row-2-track-1",
          data: [
            {
              bin: 6,
              count: 15,
            },
          ],
        },
      ],
    },
  ];
};

export const MyChart = ({
  margin,
  aspectRatio = "4/5",
  maxWidth = 700,
  topAxisHeight,
  bottomAxisHeight,
  leftAxisWidth,
  rightAxisWidth,
}: MyChartProps) => {
  // FORCE recreating the data every time or the useMemo stuff will not work
  // (only for demo purposes - do not do this in production)
  const [data, _setData] = useState(getData());

  return (
    <CereusDomainProvider domainMax={sequence.length} data={data}>
      <div>Hi</div>
      <div
        style={{
          aspectRatio,
          maxWidth,
        }}
      >
        <ParentSizeProvider fallbackHeight={500} fallbackWidth={500}>
          <GraphWithAxesProvider
            margin={margin}
            topAxis={{
              height: topAxisHeight,
              paddingTop: 10,
            }}
            rightAxis={{
              width: rightAxisWidth,
            }}
            bottomAxis={{
              height: bottomAxisHeight,
            }}
            leftAxis={{
              width: leftAxisWidth,
            }}
          >
            <MyPlot />
          </GraphWithAxesProvider>
        </ParentSizeProvider>
      </div>
    </CereusDomainProvider>
  );
};

const MyPlot = () => {
  const {width, height} = useParentSize();

  return (
    <CereusScalesProvider yScalePaddingInner={0.5} yScalePaddingOuter={0.25}>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="#fb923c" />
        <MyGraphArea>
          <TopAxisArea />
          <BottomAxisArea />
          <LeftAxisArea />
          <RightAxisArea />
          <CereusAxisTop
            axisProps={{
              tickLabelProps: {
                className: "text-xl",
              },
            }}
          />
          <PlotArea />
          <CereusAxisLeft
            left
            axisProps={{
              tickLabelProps: {
                className: "text-xl",
              },
            }}
          />
        </MyGraphArea>
      </svg>
    </CereusScalesProvider>
  );
};

const MyGraphArea = ({children}: {children?: ReactNode}) => {
  const {width, height} = useGraphAreaStyle();

  return (
    <GraphAreaPositioner>
      <rect width={width} height={height} fill="#38bdf8" />
      {children}
    </GraphAreaPositioner>
  );
};

const createAxisArea = (
  hook: () => AxisStyleContextType,
  color: string,
  Positioner: ({
    children,
    groupProps,
  }: {
    children: ReactNode;
    groupProps?: ComponentProps<typeof Group>;
  }) => JSX.Element,
) => {
  return function AxisArea() {
    const {
      width,
      height,
      paddingTop,
      paddingBottom,
      paddingRight,
      paddingLeft,
    } = hook();

    const totalWidth = width + paddingLeft + paddingRight;
    const totalHeight = height + paddingTop + paddingBottom;

    return (
      <Positioner>
        <rect width={totalWidth} height={totalHeight} fill={color} />
      </Positioner>
    );
  };
};

const TopAxisArea = createAxisArea(
  useAxisTopStyle,
  "#8b5cf6",
  AxisTopPositioner,
);
const BottomAxisArea = createAxisArea(
  useAxisBottomStyle,
  "#8b5cf6",
  AxisBottomPositioner,
);
const LeftAxisArea = createAxisArea(
  useAxisLeftStyle,
  "#8b5cf6",
  AxisLeftPositioner,
);
const RightAxisArea = createAxisArea(
  useAxisRightStyle,
  "#8b5cf6",
  AxisRightPositioner,
);

const PlotArea = () => {
  const {width, height} = usePlotAreaStyle();

  return (
    <PlotAreaPositioner>
      <rect width={width} height={height} fill="#16a34a" />
      <CereusPlot paddingInnerTrack={0.1}>
        {rowGroup => {
          return rowGroup.map(row => {
            return (
              <Group key={`row-group-${row.index}-${row.y0}`} top={row.y0}>
                {row.tracks.map(track => {
                  return (
                    <Bar
                      key={`track-group-${row.index}-${track.index}-${track.data.trackId}`}
                      width={width}
                      height={track.height}
                      y={track.y}
                      fill={getColor(track.data)}
                    />
                  );
                })}
              </Group>
            );
          });
        }}
      </CereusPlot>
    </PlotAreaPositioner>
  );
};

const getColor = (track: CereusTracks) => {
  console.log(track.trackType);

  switch (track.trackType) {
    case "sequence":
      return "#7f1d1d";

    case "block":
      return "#737373";

    case "heatmap":
      return "#a7f3d0";

    case "point":
      return "#ca8a04";

    default:
      return "#1e293b";
  }
};
