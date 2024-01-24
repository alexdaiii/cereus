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
  useCereusDomain,
  useCereusScale,
} from "../../src/tracks";
import {
  CereusPlot,
  CereusRowGroupType,
  CereusTrackGroupType,
} from "../../src/tracks/components/CereusPlot";

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
        trackType: "block",
        trackId: "row-2-track-1",
        data: [
          {
            begin: 1,
            end: 10,
          },
          {
            begin: 11,
            end: 25,
          },
        ],
      },
      {
        trackType: "block",
        trackId: "row-2-track-2",
        data: [
          {
            begin: -10,
            end: 100,
          },
        ],
      },
      {
        trackType: "block",
        trackId: "row-2-track-3",
        data: [
          {
            begin: 50,
            end: 75,
          },
        ],
      },
      {
        trackType: "block",
        trackId: "row-2-track-4",
        data: [
          {
            begin: 23,
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
  y0ScalePaddingInner,
  y0ScalePaddingOuter,
  y1ScalePaddingInner,
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
      </div>
    </CereusDomainProviderNoState>
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

  // return (
  //   <PlotAreaPositioner>
  //     <rect width={width} height={height} fill="#f5f5f5" />
  //     <CereusPlot>
  //       {rowGroup => {
  //         return rowGroup.map(row => {
  //           return (
  //             <Group key={`row-group-${row.index}-${row.y0}`} top={row.y0}>
  //               {row.tracks.map(track => {
  //                 return (
  //                   <Group
  //                     key={`track-group-${row.index}-${track.index}-${track.data.trackId}`}
  //                     top={track.y}
  //                   >
  //                     <Bar
  //                       width={track.width}
  //                       height={track.height}
  //                       fill={getColor(track.data)}
  //                       onClick={() => {
  //                         const clickData = {
  //                           trackData: track.data,
  //                           rowId: row.rowId,
  //                           rowTitle: row.rowTitle,
  //                         };
  //
  //                         alert(JSON.stringify(clickData));
  //                       }}
  //                     />
  //                     <BarTrack trackData={track} />
  //                     <PointTrack trackData={track} />
  //                   </Group>
  //                 );
  //               })}
  //             </Group>
  //           );
  //         });
  //       }}
  //     </CereusPlot>
  //   </PlotAreaPositioner>
  // );

  return (
    <PlotAreaPositioner>
      <rect width={width} height={height} fill="#f5f5f5" />
      <CereusPlot>
        {rowGroup => (
          <RGroup rowGroup={rowGroup}>
            {tracks => (
              <TGroup tracks={tracks}>
                {track => (
                  <>
                    <Bar
                      width={track.width}
                      height={track.height}
                      fill={getColor(track.data)}
                      onClick={() => {
                        const clickData = {
                          trackData: track.data,
                        };

                        alert(JSON.stringify(clickData));
                      }}
                    />
                    <BarTrack trackData={track} />
                    <PointTrack trackData={track} />
                  </>
                )}
              </TGroup>
            )}
          </RGroup>
        )}
      </CereusPlot>
    </PlotAreaPositioner>
  );
};

const RGroup = ({
  children,
  rowGroup,
}: {
  children: (tracks: CereusTrackGroupType[]) => ReactNode;
  rowGroup: CereusRowGroupType[];
}) => {
  return rowGroup.map(row => {
    return (
      <Group key={`row-group-${row.index}-${row.y0}`} top={row.y0}>
        {children(row.tracks)}
      </Group>
    );
  });
};

const TGroup = ({
  children,
  tracks,
}: {
  children: (track: CereusTrackGroupType) => ReactNode;
  tracks: CereusTrackGroupType[];
}) => {
  return tracks.map(track => {
    return (
      <Group key={`track-group-${track.index}-${track.y}`} top={track.y}>
        {children(track)}
      </Group>
    );
  });
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

const BarTrack = ({trackData}: {trackData: CereusTrackGroupType}) => {
  const {domainMin, domainMax} = useCereusDomain();
  const {xScale} = useCereusScale();

  if (trackData.data.trackType !== "block") {
    return null;
  }

  return trackData.data.data.map((val, index) => {
    const barStart = Math.max(val.begin, domainMin) - domainMin;
    const barEnd = Math.min(val.end, domainMax) - domainMin;

    const barWidth = xScale(barEnd) - xScale(barStart);
    const barStartPx = xScale(barStart);

    return (
      <Bar
        key={`block-${trackData.data.trackId}-${val.begin}-${val.end}-${index}`}
        height={trackData.height}
        width={barWidth}
        x={barStartPx}
        // y={trackData.y}
        className={"hover:fill-amber-200"}
        onClick={() => {
          const clickData = {
            trackData,
            barStartPx,
            barWidth,
          };

          alert(JSON.stringify(clickData));
        }}
      />
    );
  });
};

const PointTrack = ({trackData}: {trackData: CereusTrackGroupType}) => {
  const {xScale} = useCereusScale();

  if (trackData.data.trackType !== "point") {
    return null;
  }

  return trackData.data.data.positions.map((val, index) => {
    const pointX = xScale(val);

    return (
      <Group
        top={trackData.height / 2}
        left={pointX}
        key={`point-${trackData.data.trackId}-${val}-${index}`}
      >
        <Polygon
          sides={8}
          className={"hover:fill-emerald-400"}
          size={trackData.height / 2}
          onClick={() => {
            alert(`point: ${val}`);
          }}
        />
      </Group>
    );
  });
};
