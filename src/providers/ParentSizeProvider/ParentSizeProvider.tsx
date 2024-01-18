import {ParentSize} from "@visx/responsive";
import {ComponentProps, ReactNode, useEffect, useState} from "react";

import {ParentSizeContext} from "@/context";

type ParentSizeProviderProps = {
  children: ReactNode;
  /**
   * Fallback width to use if cannot get the parent element's width.
   * In SSR mode, @visx/responsive cannot get the parent element's width
   * because it relies on the browser's ResizeObserver API.
   * @default 0
   */
  fallbackWidth?: number;
  /**
   * Fallback height to use if cannot get the parent element's height.
   * In SSR mode, @visx/responsive cannot get the parent element's height
   * because it relies on the browser's ResizeObserver API.
   * @default 0
   */
  fallbackHeight?: number;
  /**
   * Check if the browser supports the ResizeObserver API before rendering
   * the @visx/responsive ParentSize component.
   * @default true
   */
  checkResizeObserverAvailable?: boolean;
  /**
   * Extra props to pass to the ParentSize component except for children.
   *
   * **WARNING**: This value is spread into the ParentSize component.
   *
   * ```tsx
   *     <ParentSize {...parentSizeProps}>
   * ```
   *
   * @link https://airbnb.io/visx/docs/responsive#ParentSize for documentation
   * on the ParentSize component.
   */
  parentSizeProps?: Omit<ComponentProps<typeof ParentSize>, "children">;
};

/**
 * Gets the size of the parent element using @visx/responsive using
 * the ParentSize component. The ParentSize component uses the browser's
 * ResizeObserver API to detect changes in the parent element's size.
 *
 * If using in SSR mode, the ParentSize component will not be able to
 * get the parent element's size. YOu can set a fallback width and height
 * using the fallbackWidth and fallbackHeight props.
 */
export const ParentSizeProvider = ({
  children,
  fallbackHeight = 0,
  fallbackWidth = 0,
  parentSizeProps,
  checkResizeObserverAvailable = true,
}: ParentSizeProviderProps) => {
  const [resizeObserverAvailable, setResizeObserverAvailable] = useState(false);

  useEffect(() => {
    setResizeObserverAvailable(
      typeof window !== "undefined" &&
        typeof window.ResizeObserver !== "undefined",
    );
  }, []);

  if (!resizeObserverAvailable && checkResizeObserverAvailable) {
    // in SSR mode, return fallback width and height
    return (
      <ParentSizeContext.Provider
        value={{width: fallbackWidth, height: fallbackHeight}}
      >
        {children}
      </ParentSizeContext.Provider>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ParentSize {...parentSizeProps}>
      {({width, height}) => {
        return (
          <ParentSizeContext.Provider
            value={{
              width,
              height,
            }}
          >
            {children}
          </ParentSizeContext.Provider>
        );
      }}
    </ParentSize>
  );
};
