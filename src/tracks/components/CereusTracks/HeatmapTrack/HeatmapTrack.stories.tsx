import {Meta, StoryObj} from '@storybook/react';

import {HeatmapTrack} from './HeatmapTrack';

const meta: Meta<typeof HeatmapTrack> = {
  component: HeatmapTrack,
  title: 'HeatmapTrack',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof HeatmapTrack>;

export const Primary: Story = {
  args: {},
};
