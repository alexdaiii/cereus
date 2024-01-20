/* v8 ignore start */
import {Meta, StoryObj} from "@storybook/react";

import {GraphWithAxesProvider} from "./GraphWithAxesProvider";

const meta: Meta<typeof GraphWithAxesProvider> = {
  component: GraphWithAxesProvider,
  title: "GraphWithAxesProvider",
  tags: ["autodocs"], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GraphWithAxesProvider>;

export const Primary: Story = {
  args: {},
};
