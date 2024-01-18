import {Meta, StoryObj} from "@storybook/react";

import {CereusDomainProvider} from "./CereusDomainProvider";

const meta: Meta<typeof CereusDomainProvider> = {
  component: CereusDomainProvider,
  title: "CeresDomainProvider",
  tags: ["autodocs"], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CereusDomainProvider>;

export const Primary: Story = {
  args: {},
};
