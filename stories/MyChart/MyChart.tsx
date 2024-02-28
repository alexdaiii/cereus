/* c8 ignore start */
import {Group} from "@visx/group";
import {Bar, Polygon} from "@visx/shape";
import {ComponentProps, ReactNode} from "react";

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
  useCereusBarTrack,
  useCereusPointTrack,
  useCereusTrackType,
  useGraphAreaStyle,
  useParentSize,
  usePlotAreaStyle,
} from "../../src";
import {
  CereusAxisLeft,
  CereusAxisTop,
  CereusDomainProvider,
  CereusPlotHorizontal,
  CereusRowData,
  CereusScalesProvider,
  useCereusDomain,
  useCereusScale,
} from "../../src";

type MyChartProps = {
  margin?: GraphItemMargin;
  aspectRatio?: string;
  maxWidth?: number;

  topAxisHeight?: number;
  bottomAxisHeight?: number;
  leftAxisWidth?: number;
  rightAxisWidth?: number;

  domainMin?: number;
  domainMax?: number;

  y0ScalePaddingInner?: number;
  y0ScalePaddingOuter?: number;
  y1ScalePaddingInner?: number;
};

const sequence =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const data: CereusRowData[] = [
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
        trackType: "bar",
        trackId: "row-2-track-1",
        data: [
          {
            start: 1,
            end: 10,
          },
          {
            start: 11,
            end: 25,
          },
        ],
      },
      {
        trackType: "bar",
        trackId: "row-2-track-2",
        data: [
          {
            start: -10,
            end: 100,
          },
        ],
      },
      {
        trackType: "bar",
        trackId: "row-2-track-3",
        data: [
          {
            start: 50,
            end: 75,
          },
        ],
      },
      {
        trackType: "bar",
        trackId: "row-2-track-4",
        data: [
          {
            start: 23,
            end: 45,
          },
        ],
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
        data: [
          {
            position: 5,
          },
          {
            position: 15,
          },
          {
            position: 25,
          },
          {
            position: 35,
          },
          {
            position: 45,
          },
          {
            position: 55,
          },
          {
            position: 65,
          },
          {
            position: 75,
          },
          {
            position: 85,
          },
          {
            position: 95,
          },
        ],
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
            position: 1,
            quantity: 14,
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
            position: 6,
            quantity: 500,
          },
        ],
      },
    ],
  },
];

export const MyChart = ({
  margin,
  aspectRatio = "4/5",
  maxWidth = 700,
  topAxisHeight,
  bottomAxisHeight,
  leftAxisWidth,
  rightAxisWidth,
  domainMin,
  domainMax,
  y0ScalePaddingInner,
  y0ScalePaddingOuter,
  y1ScalePaddingInner,
}: MyChartProps) => {
  domainMin = domainMin ?? 0;
  domainMax = domainMax ?? sequence.length;

  return (
    <CereusDomainProvider
      domainMin={domainMin}
      domainMax={domainMax}
      data={data}
    >
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
            <CereusScalesProvider
              y0ScalePaddingInner={y0ScalePaddingInner}
              y0ScalePaddingOuter={y0ScalePaddingOuter}
              y1ScalePaddingInner={y1ScalePaddingInner}
            >
              <MyPlot />
            </CereusScalesProvider>
          </GraphWithAxesProvider>
        </ParentSizeProvider>
      </div>
    </CereusDomainProvider>
  );
};

const MyPlot = () => {
  const {width, height} = useParentSize();

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="#fb923c" />
      <MyGraphArea>
        <AllBackgrounds />
        <CereusAxisTop
          axisProps={{
            tickLabelProps: {
              className: "text-base",
            },
          }}
        />
        <PlotArea />
        <CereusAxisLeft
          left
          axisProps={{
            tickLabelProps: {
              className: "text-base",
            },
          }}
        />
      </MyGraphArea>
    </svg>
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

const createAxisBackground = (
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

const TopAxisBackground = createAxisBackground(
  useAxisTopStyle,
  "#8b5cf6",
  AxisTopPositioner,
);
const BottomAxisBackground = createAxisBackground(
  useAxisBottomStyle,
  "#8b5cf6",
  AxisBottomPositioner,
);
const LeftAxisBackground = createAxisBackground(
  useAxisLeftStyle,
  "#8b5cf6",
  AxisLeftPositioner,
);
const RightAxisBackground = createAxisBackground(
  useAxisRightStyle,
  "#8b5cf6",
  AxisRightPositioner,
);

const PlotBackground = () => {
  const {width, height} = usePlotAreaStyle();

  return (
    <PlotAreaPositioner>
      <rect width={width} height={height} fill="#f5f5f5" />
    </PlotAreaPositioner>
  );
};

const AllBackgrounds = () => {
  return (
    <>
      <TopAxisBackground />
      <BottomAxisBackground />
      <LeftAxisBackground />
      <RightAxisBackground />
      <PlotBackground />
    </>
  );
};

const PlotArea = () => {
  return (
    <CereusPlotHorizontal>
      <Track />
    </CereusPlotHorizontal>
  );
};

const Track = () => {
  const trackType = useCereusTrackType();

  switch (trackType) {
    case "bar":
      return <BarTrack />;
    case "point":
      return <PointTrack />;
    default:
      return null;
  }
};

const BarTrack = () => {
  const {track, rowIndex, rowId, title} = useCereusBarTrack();

  const {domainMin, domainMax} = useCereusDomain();
  const {xScale} = useCereusScale();

  return track.data.map((val, index) => {
    const barStart = Math.max(val.start, domainMin);
    const barEnd = Math.min(val.end, domainMax);

    const barWidth = xScale(barEnd) - xScale(barStart);
    const barStartPx = xScale(barStart);

    return (
      <Bar
        key={`block-${track.trackId}-${val.start}-${val.end}-${index}`}
        height={track.height}
        width={barWidth}
        x={barStartPx}
        // y={trackData.y}
        className={"hover:fill-amber-200"}
        onClick={() => {
          const clickData = {
            track,
            barStartPx,
            barWidth,
            rowIndex,
            rowId,
            title,
          };

          alert(JSON.stringify(clickData));
        }}
      />
    );
  });
};

const PointTrack = () => {
  const {track} = useCereusPointTrack();

  const {xScale} = useCereusScale();

  return track.data.map((val, index) => {
    const pointX = xScale(val.position);

    return (
      <Group
        top={track.height / 2}
        left={pointX}
        key={`point-${track.trackId}-${val.position}-${index}`}
      >
        <Polygon
          sides={8}
          className={"hover:fill-emerald-400"}
          size={track.height / 2}
          onClick={() => {
            alert(`point: ${JSON.stringify(val)}`);
          }}
        />
      </Group>
    );
  });
};
