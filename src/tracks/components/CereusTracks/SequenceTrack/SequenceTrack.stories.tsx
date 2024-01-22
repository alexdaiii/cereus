import {Meta, StoryObj} from '@storybook/react';

import {SequenceTrack} from './SequenceTrack';

const meta: Meta<typeof SequenceTrack> = {
  component: SequenceTrack,
  title: 'SequenceTrack',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SequenceTrack>;

export const Primary: Story = {
  args: {},
};
