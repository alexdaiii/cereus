import {useContext} from 'react';

import {SequenceViewerContext} from '@/context/SequenceViewerContext';

export const useGraphConfig = () => {
  const {graphConfig, computedGraphConfig} = useContext(SequenceViewerContext);

  return {...graphConfig, ...computedGraphConfig};
};
