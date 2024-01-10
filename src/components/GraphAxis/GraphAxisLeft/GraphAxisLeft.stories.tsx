import {Meta, StoryObj} from '@storybook/react';

import {GraphAxisLeft} from './GraphAxisLeft';

const meta: Meta<typeof GraphAxisLeft> = {
  component: GraphAxisLeft,
  title: 'GraphAxisLeft',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GraphAxisLeft>;

export const Primary: Story = {
  args: {},
};
