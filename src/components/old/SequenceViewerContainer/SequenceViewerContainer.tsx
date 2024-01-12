import {ParentSize} from '@visx/responsive';
import {ComponentProps, useMemo} from 'react';

export type CombinableSequenceViewerContainerProps = {
  /**
   * Height of the component.
   * If 'computed', the component will grow by heightGrowthMultiplier * number of displayedTracks
   * If 'responsive', the component's height will be the height of the parent container
   * If a number, the component's height will be that number
   * @default 'computed'
   */
  height?: 'computed' | 'responsive' | number;
  /**
   * Multiplier for the height of the component when height = 'grow' in rem units
   * @default 5
   */
  heightGrowthMultiplier?: number;
  /**
   * Width of the component.
   * If 'responsive', the component's width will be the width of the parent container
   * If a number, the component's width will be that number
   * @default 'responsive'
   */
  width?: 'responsive' | number;
};

/**
 * Props of the SequenceViewerContainer component to combine if
 * abstracting the SequenceViewerContainer component
 */
type Props = {
  /**
   * The number of tracks to display. Must be greater than 0.
   * @default 1
   */
  numDisplayedTracks?: number;
  children: ComponentProps<typeof ParentSize>['children'];
} & CombinableSequenceViewerContainerProps;

export const SequenceViewerContainer = ({
  height = 'computed',
  heightGrowthMultiplier = 5,
  width = 'responsive',
  numDisplayedTracks = 1,
  children,
}: Props) => {
  const heightMemo = useMemo(
    () =>
      getHeight({
        height,
        heightGrowthMultiplier,
        numDisplayedTracks,
      }),
    [height, heightGrowthMultiplier, numDisplayedTracks],
  );

  return (
    <div
      style={{
        width: width !== 'responsive' ? width : undefined,
        height: heightMemo,
      }}
    >
      <ParentSize>{children}</ParentSize>
    </div>
  );
};

const getHeight = ({
  height,
  heightGrowthMultiplier = 5,
  numDisplayedTracks = 1,
}: {
  height: Props['height'];
  heightGrowthMultiplier: Props['heightGrowthMultiplier'];
  numDisplayedTracks: Props['numDisplayedTracks'];
}) => {
  if (height === 'computed') {
    return `${heightGrowthMultiplier * numDisplayedTracks}rem`;
  }

  if (typeof height === 'number') {
    return height;
  }

  return undefined;
};
