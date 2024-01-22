import {Axis} from "@visx/axis";
import {Group} from "@visx/group";
import {ComponentProps} from "react";

export type CereusAxisProps = {
  /**
   * Props for the `<Group>` element that wraps a `<AxisBottom>` element from
   * `@visx`. (value is spread over the `<Group>` element)
   */
  groupProps?: ComponentProps<typeof Group>;
  /**
   * Props for the `<AxisBottom>` element from `@visx`. This will always
   * override the axisClassName, labelClassName, and tickClassName props.
   * (value is spread over the `<AxisBottom>` element)
   */
  axisProps?: Omit<ComponentProps<typeof Axis>, "scale" | "children">;
  /**
   * The class name applied to the outermost axis group element. @visx/axis
   */
  axisClassName?: string;
  /**
   * The class name applied to the axis label text element. @visx/axis
   */
  labelClassName?: string;
  /**
   * The class name applied to each tick group element. @visx/axis
   */
  tickClassName?: string;
};
