import {Group} from '@visx/group';
import {ParentSize} from '@visx/responsive';
import React from 'react';

import {
  BoardConfig,
  SequenceViewerContext,
} from '@/context/SequenceViewerContext';
import {DeepPartial, DeepRequired} from '@/types/util';

/**
 * Prop values for overriding default props for elements of the CereusSequenceViewer
 */
type OverrideProps = {
  /**
   * Override width of the parent size component
   */
  widthOverride?: number;
  /**
   * Override height of the parent size component
   */
  heightOverride?: number;
};

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
   * Configuration for the Board
   */
  boardConfig: DeepPartial<BoardConfig> & {
    max: number;
  };
  /**
   * Margins configuration for the Board
   */
  margin?: {top: number; right: number; bottom: number; left: number};
} & OverrideProps;

const defaultBoardConfig = {
  animate: true,
  paddingX: 10,
  domain: {
    min: 0,
  },
};

export const CereusSequenceViewer = ({
  children,
  background,
  widthOverride,
  heightOverride,
  boardConfig,
}: Props) => {
  return (
    <ParentSize>
      {({width, height}) => {
        width = widthOverride ?? width;
        height = heightOverride ?? height;

        return width < 10 ? null : (
          <SequenceViewerContext.Provider
            value={{
              width,
              height,
              boardConfig: {
                ...defaultBoardConfig,
                ...boardConfig,
                domain: {
                  min: defaultBoardConfig.domain.min ?? boardConfig.domain?.min,
                  max: boardConfig.max,
                },
              },
            }}
          >
            <div
              style={{
                position: 'relative',
              }}
            >
              <svg width={width} height={height}>
                {background && background({width, height})}
                <Group>{children}</Group>
              </svg>
            </div>
          </SequenceViewerContext.Provider>
        );
      }}
    </ParentSize>
  );
};
