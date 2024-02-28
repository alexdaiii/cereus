import {Axis} from "@visx/axis";
import {Group} from "@visx/group";
import {ComponentProps} from "react";

export type CereusAxisProps = {
  /**
   * Props for the `<Group>` element that wraps an `<Axis>` element from
   * `@visx`. (value is spread over the `<Group>` element)
   */
  groupProps?: ComponentProps<typeof Group>;
  /**
   * Props for an `<Axis>` element from `@visx`. This will always
   * override the axisClassName, labelClassName, and tickClassName props.
   * (value is spread over an `<Axis>` element)
   */
  axisProps?: Omit<ComponentProps<typeof Axis>, "scale" | "children">;
};
