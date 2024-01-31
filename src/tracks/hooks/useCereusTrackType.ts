import {useContext} from "react";

import {CereusTrackTypeContext} from "@/tracks";

/**
 * Returns the track type. Returns undefined if not inside a CereusTrackTypeProvider.
 */
export const useCereusTrackType = () => useContext(CereusTrackTypeContext);
