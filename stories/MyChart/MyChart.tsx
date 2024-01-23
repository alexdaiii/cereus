import {Group} from "@visx/group";
import {Bar} from "@visx/shape";
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
  CereusDomainProviderNoState,
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

  domainMin?: number;
  domainMax?: number;
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
        trackType: "block",
        trackId: "row-2-track-1",
        data: [
          {
            begin: 1,
            end: 10,
          },
        ],
      },
      {
        trackType: "block",
        trackId: "row-2-track-2",
        data: [
          {
            begin: 1,
            end: 10,
          },
        ],
      },
      {
        trackType: "block",
        trackId: "row-2-track-3",
        data: [
          {
            begin: 1,
            end: 10,
          },
        ],
      },
      {
        trackType: "block",
        trackId: "row-2-track-4",
        data: [
          {
            begin: 1,
            end: 10,
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
}: MyChartProps) => {
  // const [data, _setData] = useState(getData());

  domainMin = domainMin ?? 0;
  domainMax = domainMax ?? sequence.length;

  return (
    <CereusDomainProviderNoState
      domainMin={domainMin}
      domainMax={domainMax}
      data={data}
    >
      <div className={"flex-col space-y-4"}>
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
        {/*<div>*/}
        {/*  <ResetDomainButton domainMax={domainMax} domainMin={domainMin} />*/}
        {/*</div>*/}
      </div>
    </CereusDomainProviderNoState>
  );
};

// const ResetDomainButton = ({
//   domainMin,
//   domainMax,
// }: {
//   domainMin: number;
//   domainMax: number;
// }) => {
//   const {setDomainMin, setDomainMax} = useCereusDomainSetter();
//
//   return (
//     <div className={"flex gap-2"}>
//       <button
//         onClick={() => {
//           setDomainMin(0);
//           setDomainMax(sequence.length);
//         }}
//         className={"border-2 p-2 rounded-2xl"}
//       >
//         Reset domain
//       </button>
//       <button
//         onClick={() => {
//           setDomainMin(domainMin);
//           setDomainMax(domainMax);
//         }}
//         className={"border-2 p-2 rounded-2xl"}
//       >
//         Update domain to Storybook State
//       </button>
//     </div>
//   );
// };

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
      <rect width={width} height={height} fill="#f5f5f5" />
      <CereusPlot paddingInnerTrack={0.1}>
        {rowGroup => {
          return rowGroup.map(row => {
            return (
              <Group key={`row-group-${row.index}-${row.y0}`} top={row.y0}>
                {row.tracks.map(track => {
                  return (
                    <Bar
                      key={`track-group-${row.index}-${track.index}-${track.data.trackId}`}
                      width={track.width}
                      height={track.height}
                      y={track.y}
                      fill={getColor(track.data)}
                      onClick={() => {
                        const clickData = {
                          trackData: track.data,
                          rowId: row.rowId,
                          rowTitle: row.rowTitle,
                        };

                        alert(JSON.stringify(clickData));
                      }}
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
  switch (track.trackType) {
    case "sequence":
      return "#7f1d1d";

    case "block":
      return "#737373";

    case "heatmap":
      return "#0d9488";

    case "point":
      return "#ca8a04";

    default:
      return "#1e293b";
  }
};
