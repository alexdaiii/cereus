import {Meta, StoryObj} from '@storybook/react';

import {SequenceViewer} from './SequenceViewer';

const meta: Meta<typeof SequenceViewer> = {
  component: SequenceViewer,
  title: 'SequenceViewer',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SequenceViewer>;

export const Primary: Story = {
  args: {},
};
