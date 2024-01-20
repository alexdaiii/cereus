import {Context, useContext} from "react";

import {DomainContextType, RowData} from "@/core";

/**
 * Factory that returns a hook that returns the visible rows.
 */
export const createGetVisibleRowsHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    const rows = [];
    for (let i = 0; i < data.length; ++i) {
      if (data[i].visible) {
        rows.push(data[i]);
      }
    }
    return rows;
  };
};

/**
 * Factory that returns the visible row IDs.
 */
export const createGetVisibleRowIdsHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    const rowIDs = [];
    for (let i = 0; i < data.length; ++i) {
      if (data[i].visible) {
        rowIDs.push(data[i].rowId);
      }
    }
    return rowIDs;
  };
};

/**
 * Factory that returns a hook that returns the number of visible rows.
 */
export const createGetVisibleRowCountHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    let numVisibleRows = 0;
    for (let i = 0; i < data.length; i++) {
      numVisibleRows += +data[i].visible;
    }

    return numVisibleRows;
  };
};
