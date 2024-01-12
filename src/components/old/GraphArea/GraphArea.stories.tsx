import {Meta, StoryObj} from '@storybook/react';

import {GraphArea} from './GraphArea';

const meta: Meta<typeof GraphArea> = {
  component: GraphArea,
  title: 'GraphArea',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GraphArea>;

export const Primary: Story = {
  args: {},
};
