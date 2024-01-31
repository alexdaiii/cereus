import {useContext} from "react";

import {CereusDomainContext} from "@/tracks/context";

/**
 * Returns the domain of the cereus tracks and data
 */
export const useCereusDomain = () => useContext(CereusDomainContext);
