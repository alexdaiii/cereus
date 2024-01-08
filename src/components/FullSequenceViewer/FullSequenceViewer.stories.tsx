import {Meta, StoryObj} from '@storybook/react';

import {FullSequenceViewer} from './FullSequenceViewer';

const meta: Meta<typeof FullSequenceViewer> = {
  component: FullSequenceViewer,
  title: 'FullSequenceViewer',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FullSequenceViewer>;

export const Primary: Story = {
  args: {},
};
