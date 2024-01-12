import {useContext} from 'react';
import {SequenceViewerContext} from 'src/context/SequenceViewerContextOld';

export const useGraphConfig = () => {
  const {graphConfig, computedGraphConfig} = useContext(SequenceViewerContext);

  return {...graphConfig, ...computedGraphConfig};
};
