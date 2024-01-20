import {Meta, StoryObj} from '@storybook/react';

import {CereusAxisTop} from './CereusAxisTop';

const meta: Meta<typeof CereusAxisTop> = {
  component: CereusAxisTop,
  title: 'CereusAxisTop',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CereusAxisTop>;

export const Primary: Story = {
  args: {},
};
