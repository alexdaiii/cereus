import {createContext} from 'react';

import {RowData} from '@/types';

export type DomainContextType<RowDataT extends RowData> = {
  domainMin: number;
  domainMax: number;
  data: RowDataT[];
};

/**
 * Generic function that create a new context with a
 * generic {@link DomainContextType}.
 * Use this to create a new custom and typed context for your data.
 *
 * The RowDataT type must extend {@link RowData}, which is a generic row
 * data type that takes in a TrackTypeT type. The TrackT type can be anything
 * that extends string.
 *
 * @example
 * ```
 * type MyTrackTypes = 'line' | 'bar' | 'area';
 * type MyRowData = RowData<MyTrackTypes> & {foo: number; bar: string};
 * const MyDomainContext = createDomainContext<MyRowData>();
 * ```
 */
export const createDomainContext = <RowDataT extends RowData>() => {
  return createContext<DomainContextType<RowDataT>>({
    domainMin: 0,
    domainMax: 0,
    data: [],
  });
};
