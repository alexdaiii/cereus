import {Meta, StoryObj} from '@storybook/react';

import {GraphHeader} from './GraphHeader';

const meta: Meta<typeof GraphHeader> = {
  component: GraphHeader,
  title: 'GraphHeader',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GraphHeader>;

export const Primary: Story = {
  args: {},
};
