import {Meta, StoryObj} from '@storybook/react';

import {CereusRowGroup} from './CereusRowGroup';

const meta: Meta<typeof CereusRowGroup> = {
  component: CereusRowGroup,
  title: 'CereusRowGroup',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CereusRowGroup>;

export const Primary: Story = {
  args: {},
};
