/* c8 ignore start */
import {Meta, StoryObj} from "@storybook/react";

import {TestScaling} from "./TestScaling";

const meta: Meta<typeof TestScaling> = {
  component: TestScaling,
  title: "TestScaling",
  tags: ["autodocs"], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TestScaling>;

export const Primary: Story = {
  args: {},
};
