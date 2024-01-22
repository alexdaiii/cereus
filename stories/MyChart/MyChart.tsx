import {Group} from "@visx/group";
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
} from "../../src/tracks";

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
    ],
  },
];

export const MyChart = ({
  margin,
  aspectRatio = "16/9",
  maxWidth = 700,
  topAxisHeight,
  bottomAxisHeight,
  leftAxisWidth,
  rightAxisWidth,
}: MyChartProps) => {
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
    <CereusScalesProvider>
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
          <CereusAxisLeft
            axisProps={{
              tickLabelProps: {
                className: "text-xl",
              },
            }}
          />
          <PlotArea />
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
    </PlotAreaPositioner>
  );
};
