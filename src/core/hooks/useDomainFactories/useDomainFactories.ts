import {Context, useContext} from "react";

import {DomainContextType} from "@/core/context";
import {RowData} from "@/core/types";

/**
 * Factory that creates a hook that returns the domain context
 */
export const createUseDomainHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => useContext(DomainContext);
};

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
export const createGetVisibleRowIDsHook = <T extends RowData>(
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

/**
 * Factory that returns a hook that returns the visible tracks.
 */
export const createGetVisibleTracksHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    const tracks = [];
    for (let i = 0; i < data.length; ++i) {
      if (data[i].visible) {
        tracks.push(...data[i].tracks);
      }
    }
    return tracks;
  };
};

/**
 * Factory that returns a hook that returns the visible track IDs.
 */
export const createGetVisibleTrackIDsHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    const trackIDs = [];
    for (let i = 0; i < data.length; ++i) {
      if (data[i].visible) {
        for (let j = 0; j < data[i].tracks.length; ++j) {
          trackIDs.push(data[i].tracks[j].trackId);
        }
      }
    }
    return trackIDs;
  };
};

/**
 * Factory that returns a hook that returns the number of visible tracks.
 */
export const createGetVisibleTrackCountHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    let numVisibleTracks = 0;
    for (let i = 0; i < data.length; i++) {
      numVisibleTracks += +data[i].visible * data[i].tracks.length;
    }

    return numVisibleTracks;
  };
};
