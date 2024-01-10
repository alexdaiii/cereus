import {GraphConfig} from '@/context/SequenceViewerContext/types';

export const DEFAULT_GRAPH_CONFIG: GraphConfig = {
  animate: true,
  includeTopAxis: true,
  leftAxisWidth: 100,
  topAxisHeight: 50,
  domainMin: 0,
  domainMax: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
} as const;
