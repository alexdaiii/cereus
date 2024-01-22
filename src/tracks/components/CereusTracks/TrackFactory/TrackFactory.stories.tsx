import {Meta, StoryObj} from '@storybook/react';

import {TrackFactory} from './TrackFactory';

const meta: Meta<typeof TrackFactory> = {
  component: TrackFactory,
  title: 'TrackFactory',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TrackFactory>;

export const Primary: Story = {
  args: {},
};
