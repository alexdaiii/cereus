import {ComponentProps, ReactNode} from "react";

import {CereusXScaleProvider} from "./CereusXScaleProvider";
import {CereusYScaleProvider} from "./CereusYScaleProvider";

type CereusScalesProviderProps = {
  children: ReactNode;
} & Omit<ComponentProps<typeof CereusXScaleProvider>, "children"> &
  Omit<ComponentProps<typeof CereusYScaleProvider>, "children">;

/**
 * Provides the x and y scales for the CeresSequenceViewer.
 */
export const CereusScalesProvider = ({
  children,
  xScaleConfig,
  y0ScalePaddingInner = 0,
  y0ScalePaddingOuter = 0,
  y1ScalePaddingInner = 0,
}: CereusScalesProviderProps) => {
  return (
    <CereusXScaleProvider xScaleConfig={xScaleConfig}>
      <CereusYScaleProvider
        y0ScalePaddingInner={y0ScalePaddingInner}
        y0ScalePaddingOuter={y0ScalePaddingOuter}
        y1ScalePaddingInner={y1ScalePaddingInner}
      >
        {children}
      </CereusYScaleProvider>
    </CereusXScaleProvider>
  );
};
