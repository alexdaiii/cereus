import {createContext} from 'react';

import {DEFAULT_GRAPH_CONFIG} from '@/context/SequenceViewerContextOld/defaults';
import {SequenceViewerContextType} from '@/context/SequenceViewerContextOld/types';

export const SequenceViewerContext = createContext<SequenceViewerContextType>({
  width: 0,
  height: 0,
  graphConfig: DEFAULT_GRAPH_CONFIG,
  computedGraphConfig: {
    yMax: 0,
    yMin: 0,
    xMax: 0,
    xMin: 0,
    chartYMin: 0,
    chartXMin: 0,
  },
});
