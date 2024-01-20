import {Group} from "@visx/group";

import {
  useAxisBottomStyle,
  useAxisLeftStyle,
  useAxisRightStyle,
  useAxisTopStyle,
  useGraphAreaStyle,
  usePlotAreaStyle,
} from "../../../src/hooks";
import {
  AxisBottomStyleProvider,
  AxisLeftStyleProvider,
  AxisRightStyleProvider,
  AxisTopStyleProvider,
  GraphAreaStyleProvider,
  PlotAreaStyleProvider,
} from "../../../src/providers";

type MyChartProps = {
  width: number;
  height: number;
  graphMarginTop?: number;
  graphMarginRight?: number;
  graphMarginBottom?: number;
  graphMarginLeft?: number;
  includeTopAxis?: boolean;
  includeLeftAxis?: boolean;
  includeBottomAxis?: boolean;
  includeRightAxis?: boolean;
} & ShowAxisProps;

type ShowAxisProps = {
  showTopAxis: boolean;
  showLeftAxis: boolean;
  showBottomAxis: boolean;
  showRightAxis: boolean;
};

export const MyChart = ({
  width,
  height,
  graphMarginTop = 5,
  graphMarginRight = 20,
  graphMarginBottom = 10,
  graphMarginLeft = 15,
  includeTopAxis = true,
  includeLeftAxis = true,
  includeBottomAxis = true,
  includeRightAxis = true,
  showTopAxis = true,
  showLeftAxis = true,
  showBottomAxis = true,
  showRightAxis = true,
}: MyChartProps) => {
  const graphMaxHeight = height - graphMarginTop - graphMarginBottom;
  const graphMaxWidth = width - graphMarginLeft - graphMarginRight;
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="cyan" />
      <GraphAreaStyleProvider
        parentWidth={width}
        parentHeight={height}
        marginTop={graphMarginTop}
        marginLeft={graphMarginLeft}
        marginBottom={graphMarginBottom}
        marginRight={graphMarginRight}
      >
        <AxisTopStyleProvider height={50} width={graphMaxWidth}>
          <AxisBottomStyleProvider height={60} width={graphMaxWidth}>
            <AxisLeftStyleProvider width={50} height={graphMaxHeight}>
              <AxisRightStyleProvider width={25} height={graphMaxHeight}>
                <PlotAreaStyleProvider
                  includeTopAxis={includeTopAxis}
                  includeLeftAxis={includeLeftAxis}
                  includeBottomAxis={includeBottomAxis}
                  includeRightAxis={includeRightAxis}
                >
                  <InnerComponent
                    showBottomAxis={showBottomAxis}
                    showLeftAxis={showLeftAxis}
                    showRightAxis={showRightAxis}
                    showTopAxis={showTopAxis}
                  />
                </PlotAreaStyleProvider>
              </AxisRightStyleProvider>
            </AxisLeftStyleProvider>
          </AxisBottomStyleProvider>
        </AxisTopStyleProvider>
      </GraphAreaStyleProvider>
    </svg>
  );
};

const InnerComponent = ({
  showBottomAxis,
  showLeftAxis,
  showRightAxis,
  showTopAxis,
}: ShowAxisProps) => {
  const graphStyle = useGraphAreaStyle();
  const topAxisStyle = useAxisTopStyle();
  const leftAxisStyle = useAxisLeftStyle();
  const chartStyle = usePlotAreaStyle();
  const bottomAxisStyle = useAxisBottomStyle();
  const rightAxisStyle = useAxisRightStyle();

  return (
    <Group top={graphStyle.top} left={graphStyle.left}>
      <rect
        height={graphStyle.height}
        width={graphStyle.width}
        fill="rgba(255,140,0,.9)"
        stroke={"orange"}
        strokeWidth={2}
      />

      {/*Chart*/}
      <Group top={chartStyle.top} left={chartStyle.left}>
        <rect
          height={chartStyle.height}
          width={chartStyle.width}
          fill="rgba(148,0,211,.75)"
          stroke={"pink"}
          strokeWidth={2}
        />
      </Group>

      {showTopAxis && (
        <Group top={topAxisStyle.top} left={topAxisStyle.left}>
          <rect
            height={topAxisStyle.height}
            width={topAxisStyle.width}
            fill="rgba(0,255,0,.75)"
            stroke={"yellow"}
            strokeWidth={2}
          />
        </Group>
      )}
      {showLeftAxis && (
        <Group top={leftAxisStyle.top} left={leftAxisStyle.left}>
          <rect
            height={leftAxisStyle.height}
            width={leftAxisStyle.width}
            fill="rgba(112,128,144,.75)"
            stroke={"black"}
            strokeWidth={2}
          />
        </Group>
      )}
      {showBottomAxis && (
        <Group top={bottomAxisStyle.top} left={bottomAxisStyle.left}>
          <rect
            height={bottomAxisStyle.height}
            width={bottomAxisStyle.width}
            fill="rgba(255,0,0,.75)"
            stroke={"purple"}
            strokeWidth={2}
          />
        </Group>
      )}
      {showRightAxis && (
        <Group top={rightAxisStyle.top} left={rightAxisStyle.left}>
          <rect
            height={rightAxisStyle.height}
            width={rightAxisStyle.width}
            fill="rgba(255,255,240,.75)"
            stroke={"brown"}
            strokeWidth={2}
          />
        </Group>
      )}
    </Group>
  );
};
