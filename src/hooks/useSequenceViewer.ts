import {useContext} from 'react';

import {SequenceViewerContext} from '@/context/SequenceViewerContext';

export const useSequenceViewer = () => {
  return useContext(SequenceViewerContext);
};
