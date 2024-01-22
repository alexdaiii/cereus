import {Meta, StoryObj} from '@storybook/react';

import {PointTrack} from './PointTrack';

const meta: Meta<typeof PointTrack> = {
  component: PointTrack,
  title: 'PointTrack',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof PointTrack>;

export const Primary: Story = {
  args: {},
};
