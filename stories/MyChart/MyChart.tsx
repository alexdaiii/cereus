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

type MyChartProps = {
  margin?: GraphItemMargin;
  aspectRatio?: string;

  topAxisHeight?: number;
  bottomAxisHeight?: number;
  leftAxisWidth?: number;
  rightAxisWidth?: number;
};

export const MyChart = ({
  margin,
  aspectRatio = "16/9",
  topAxisHeight,
  bottomAxisHeight,
  leftAxisWidth,
  rightAxisWidth,
}: MyChartProps) => {
  return (
    <div
      style={{
        aspectRatio,
        maxWidth: "700px",
      }}
    >
      <ParentSizeProvider fallbackHeight={500} fallbackWidth={500}>
        <GraphWithAxesProvider
          margin={margin}
          topAxis={{
            height: topAxisHeight,
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
  );
};

const MyPlot = () => {
  const {width, height} = useParentSize();

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="#fb923c" />
      <MyGraphArea>
        <TopAxisArea />
        <BottomAxisArea />
        <LeftAxisArea />
        <RightAxisArea />
        <PlotArea />
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
    const {width, height} = hook();

    return (
      <Positioner>
        <rect width={width} height={height} fill={color} />
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
