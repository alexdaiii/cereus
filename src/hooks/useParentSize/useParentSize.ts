import {useContext} from "react";

import {ParentSizeContext} from "@/context";

export const useParentSize = () => useContext(ParentSizeContext);
