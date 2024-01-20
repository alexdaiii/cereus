import {Meta, StoryObj} from '@storybook/react';

import {CereusAxisLeft} from './CereusAxisLeft';

const meta: Meta<typeof CereusAxisLeft> = {
  component: CereusAxisLeft,
  title: 'CereusAxisLeft',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CereusAxisLeft>;

export const Primary: Story = {
  args: {},
};
