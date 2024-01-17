import {Context, useContext} from 'react';

import {DomainContextType} from '@/context/DomainContext/factories';
import {RowData} from '@/types';

export const createUseDomainHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => useContext(DomainContext);
};

/**
 * Creates a hook that returns an array of all visible rows
 */
export const createGetVisibleRowsHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    return data.filter(row => row.visible);
  };
};

/**
 * Creates a hook that returns the number of visible rows
 */
export const createGetVisibleRowCountHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    let numVisibleRows = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].visible) {
        numVisibleRows++;
      }
    }

    return numVisibleRows;
  };
};

/**
 * Creates a hook that returns the number of visible tracks.
 * For rows that have composite tracks, then only the first track is counted.
 */
export const createGetVisibleTrackCountHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    let numVisibleTracks = 0;
    for (let i = 0; i < data.length; i++) {
      numVisibleTracks +=
        +data[i].visible * data[i].tracks.length -
        data[i].tracks.length * +data[i].composite +
        +data[i].composite;
    }
  };
};
