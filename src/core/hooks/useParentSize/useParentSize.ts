import {useContext} from "react";

import {ParentSizeContext} from "@/core/context";

export const useParentSize = () => useContext(ParentSizeContext);
