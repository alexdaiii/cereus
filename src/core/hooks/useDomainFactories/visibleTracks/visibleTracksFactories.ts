import {Context, useContext} from "react";

import {DomainContextType, RowData} from "@/core";

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
export const createGetVisibleTrackIdsHook = <T extends RowData>(
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

/**
 * Factory that returns the number of visible tracks per row.
 */
export const createGetVisibleTrackCountPerRowHook = <T extends RowData>(
  DomainContext: Context<DomainContextType<T>>,
) => {
  return () => {
    const {data} = useContext(DomainContext);

    const numVisibleTracksPerRow = [];
    for (let i = 0; i < data.length; i++) {
      numVisibleTracksPerRow.push(+data[i].visible * data[i].tracks.length);
    }

    return numVisibleTracksPerRow;
  };
};
