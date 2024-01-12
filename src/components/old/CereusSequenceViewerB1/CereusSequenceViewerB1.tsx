import {Group} from '@visx/group';
import {ParentSize} from '@visx/responsive';
import React from 'react';
import {
  DEFAULT_GRAPH_CONFIG,
  GraphConfig,
  SequenceViewerContext,
} from 'src/context/SequenceViewerContextOld';

type GraphConfigProps = Partial<GraphConfig> & {domainMax: number};

/**
 * Props of the FeatureViewer component
 */
type Props = {
  children?: React.ReactNode;
  /**
   * A function that returns a React node to render as the background of the FeatureViewer
   */
  background?: (props: {width: number; height: number}) => React.ReactNode;
  /**
   * Override width of the parent size component
   */
  widthOverride?: number;
  /**
   * Override height of the parent size component
   */
  heightOverride?: number;
} & GraphConfigProps;

export const CereusSequenceViewerB1 = ({
  children,
  background,
  widthOverride,
  heightOverride,
  animate = DEFAULT_GRAPH_CONFIG.animate,
  domainMin = DEFAULT_GRAPH_CONFIG.domainMin,
  domainMax,
  paddingTop = DEFAULT_GRAPH_CONFIG.paddingTop,
  paddingBottom = DEFAULT_GRAPH_CONFIG.paddingBottom,
  paddingLeft = DEFAULT_GRAPH_CONFIG.paddingLeft,
  paddingRight = DEFAULT_GRAPH_CONFIG.paddingRight,
  leftAxisWidth = DEFAULT_GRAPH_CONFIG.leftAxisWidth,
  includeTopAxis = DEFAULT_GRAPH_CONFIG.includeTopAxis,
  topAxisHeight = DEFAULT_GRAPH_CONFIG.topAxisHeight,
}: Props) => {
  return (
    <ParentSize>
      {({width, height}) => {
        width = widthOverride ?? width;
        height = heightOverride ?? height;

        // bounds
        const xMax = width - paddingLeft - paddingRight;
        const chartXMin = paddingLeft + leftAxisWidth;
        const yMax = height - paddingTop - paddingBottom;
        const chartYMin = includeTopAxis
          ? topAxisHeight + paddingTop
          : paddingTop;

        return width < 10 ? null : (
          <SequenceViewerContext.Provider
            value={{
              width,
              height,
              graphConfig: {
                animate,
                domainMin,
                domainMax,
                paddingTop,
                paddingBottom,
                paddingLeft,
                paddingRight,
                leftAxisWidth,
                includeTopAxis,
                topAxisHeight,
              },
              computedGraphConfig: {
                xMin: paddingLeft,
                xMax,
                yMin: paddingTop,
                yMax,
                chartXMin,
                chartXMax: xMax,
                chartYMin,
                chartYMax: yMax,
              },
            }}
          >
            <svg width={width} height={height}>
              {background && background({width, height})}
              <Group top={paddingTop} left={paddingLeft}>
                {children}
              </Group>
            </svg>
          </SequenceViewerContext.Provider>
        );
      }}
    </ParentSize>
  );
};
