import {Meta, StoryObj} from '@storybook/react';

import {GraphBrush} from './GraphBrush';

const meta: Meta<typeof GraphBrush> = {
  component: GraphBrush,
  title: 'GraphBrush',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GraphBrush>;

export const Primary: Story = {
  args: {},
};
