import {createContext} from "react";

export type ParentSizeContextType = {
  readonly width: number;
  readonly height: number;
};

export const ParentSizeContext = createContext<ParentSizeContextType>({
  width: 0,
  height: 0,
});
