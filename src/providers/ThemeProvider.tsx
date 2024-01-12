import {useMemo} from 'react';

import {
  ThemeContext,
  ThemeContextType,
} from '@/context/ThemeContext/ThemeContext';
import {useGetRem} from '@/hooks/ssr/useGetRem';
import {BoxDirections} from '@/types/stylesTypes';
import {DeepPartial} from '@/types/utilTypes';
import {breakpoints} from '@/utils/styles';

type Props = {
  /**
   * Width of the parent component
   */
  width: number;
  children?: React.ReactNode;
} & DeepPartial<ThemeContextType>;

const DEFAULT_BOX: BoxDirections = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const ThemeProvider = ({
  width,
  graphPadding,
  chartPadding,
  xAxisPadding,
  yAxisPadding,
  children,
}: Props) => {
  const remPx = useGetRem();

  // If undefined, then calculate the padding based on the width
  const yAxisPaddingCalc = useMemo(() => {
    if (yAxisPadding === undefined) {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: calculateYAxisPaddingLeft(width, remPx),
      };
    }
    return yAxisPadding;
  }, [remPx, width, yAxisPadding]);

  return (
    <ThemeContext.Provider
      value={{
        graphPadding: {
          ...{
            top: 0,
            right: remPx,
            bottom: 0,
            left: remPx,
          },
          ...graphPadding,
        },
        chartPadding: {
          ...DEFAULT_BOX,
          ...chartPadding,
        },
        xAxisPadding: {
          ...DEFAULT_BOX,
          ...xAxisPadding,
        },
        yAxisPadding: {
          ...DEFAULT_BOX,
          ...yAxisPaddingCalc,
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const calculateYAxisPaddingLeft = (width: number, remPx: number) => {
  if (width > breakpoints.lg) {
    return remPx;
  }

  return 0;
};
