import {ComponentProps, Context, ReactNode} from "react";

import {
  AnyRowData,
  HorizontalPlotGroupsInner,
  HorizontalTrackGroupContextType,
} from "@/core";

export type HorizontalPlotGroupsProps<T extends AnyRowData> = Pick<
  ComponentProps<typeof HorizontalPlotGroupsInner<T>>,
  "rows"
> & {
  children: ReactNode;
};

/**
 * Returns a react component that wraps the HorizontalPlotGroupsInner component
 * inside the provided HorizontalPlotGroupContext context provider.
 */
export const createHorizontalPlotGroup = <T extends AnyRowData>(
  HorizontalPlotGroupContext: Context<HorizontalTrackGroupContextType<T>>,
) => {
  return function HorizontalPlotGroup({
    rows,
    children,
  }: HorizontalPlotGroupsProps<T>) {
    return (
      <HorizontalPlotGroupsInner rows={rows}>
        {(track, rowIndex, rowId, title) => (
          <HorizontalPlotGroupContext.Provider
            value={{
              title,
              rowIndex,
              rowId,
              track,
            }}
          >
            {children}
          </HorizontalPlotGroupContext.Provider>
        )}
      </HorizontalPlotGroupsInner>
    );
  };
};
