import {useContext} from 'react';

import {
  AxisBottomStyleContext,
  AxisLeftStyleContext,
  AxisRightStyleContext,
  AxisTopStyleContext,
  ChartAreaStyleContext,
  GraphAreaStyleContext,
} from '@/context';

export const useGraphAreaStyle = () => useContext(GraphAreaStyleContext);
export const useAxisTopStyle = () => useContext(AxisTopStyleContext);

export const useAxisBottomStyle = () => useContext(AxisBottomStyleContext);
export const useAxisLeftStyle = () => useContext(AxisLeftStyleContext);
export const useAxisRightStyle = () => useContext(AxisRightStyleContext);
export const useChartItemStyle = () => useContext(ChartAreaStyleContext);
