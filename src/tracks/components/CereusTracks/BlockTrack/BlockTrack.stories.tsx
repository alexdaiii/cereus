import {Meta, StoryObj} from "@storybook/react";

import {BlockTrack} from "./BlockTrack";

const meta: Meta<typeof BlockTrack> = {
  component: BlockTrack,
  title: "BlockTrack",
  tags: ["autodocs"], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BlockTrack>;

export const Primary: Story = {
  args: {},
};
