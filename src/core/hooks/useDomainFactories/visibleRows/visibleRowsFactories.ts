import {Context, useContext, useMemo} from "react";

import {DomainContextType, RowData} from "@/core";

/**
 * Factory that returns a hook that returns the visible rows.
 *
 * WARNING: This will useMemo() on the data array. You should treat
 * data as immutable.
 */
export const createGetVisibleRowsHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  /**
   * Hook that returns the visible rows.
   *
   * WARNING: This will useMemo() on the data array. You should treat
   * data array as immutable.
   */
  return () => {
    const {data} = useContext(DomainContext);

    return useMemo(() => {
      const rows = [];
      for (let i = 0; i < data.length; ++i) {
        if (data[i].visible) {
          rows.push(data[i]);
        }
      }
      return rows;
    }, [data]);
  };
};

/**
 * Factory that returns the visible row IDs.
 *
 * WARNING: This will useMemo() on the data array. You should treat
 * data as immutable.
 */
export const createGetVisibleRowIdsHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  /**
   * Hook that returns the visible row IDs.
   *
   * WARNING: This will useMemo() on the data array. You should treat
   * data array as immutable.
   */
  return () => {
    const {data} = useContext(DomainContext);

    return useMemo(() => {
      const rowIDs = [];
      for (let i = 0; i < data.length; ++i) {
        if (data[i].visible) {
          rowIDs.push(data[i].rowId);
        }
      }
      return rowIDs;
    }, [data]);
  };
};

/**
 * Factory that returns a hook that returns the number of visible rows.
 *
 * WARNING: This will useMemo() on the data array. You should treat the
 * data array as immutable.
 */
export const createGetVisibleRowCountHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  /**
   * Hook that returns the number of visible rows.
   *
   * WARNING: This will useMemo() on the data array. You should treat the
   * data array as immutable.
   */
  return () => {
    const {data} = useContext(DomainContext);

    return useMemo(() => {
      let numVisibleRows = 0;
      for (let i = 0; i < data.length; i++) {
        numVisibleRows += +data[i].visible;
      }
      return numVisibleRows;
    }, [data]);
  };
};
