import {Meta, StoryObj} from '@storybook/react';

import {TrackArea} from './TrackArea';

const meta: Meta<typeof TrackArea> = {
  component: TrackArea,
  title: 'TrackArea',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TrackArea>;

export const Primary: Story = {
  args: {},
};
