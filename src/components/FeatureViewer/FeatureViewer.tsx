import {Group} from '@visx/group';
import React, {ComponentProps} from 'react';

/**
 * Width and height of the component
 */
type WidthHeight = {
  /**
   * Width of the component
   */
  width: number;
  /**
   * Height of the component
   */
  height: number;
};

/**
 * Props of the FeatureViewer component
 */
type Props = {
  children?: React.ReactNode;
  /**
   * The props for the [@visx/group](https://airbnb.io/visx/docs/group) component
   */
  groupProps?: ComponentProps<typeof Group>;
  /**
   * A function that returns a React node to render as the background of the FeatureViewer
   */
  background?: (props: WidthHeight) => React.ReactNode;
  /**
   * A class name to apply to the <svg> element
   */
  className?: string;
} & WidthHeight;

export const FeatureViewer = ({
  width,
  height,
  children,
  groupProps,
  background,
  className,
}: Props) => {
  return width < 10 ? null : (
    <svg width={width} height={height} className={className}>
      {background && background({width, height})}
      <Group {...groupProps}>{children}</Group>
    </svg>
  );
};
