import {useContext} from "react";

import {ParentSizeContext} from "@/core/context";

/**
 * Returns the size of the parent element
 */
export const useParentSize = () => useContext(ParentSizeContext);
