import {createContext} from "react";

export type ParentSizeContextType = {
  width: number;
  height: number;
};

export const ParentSizeContext = createContext<ParentSizeContextType>({
  width: 0,
  height: 0,
});
