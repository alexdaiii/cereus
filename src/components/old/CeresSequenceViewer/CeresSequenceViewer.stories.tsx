import {Meta, StoryObj} from '@storybook/react';

import {CeresSequenceViewer} from './CeresSequenceViewer';

const meta: Meta<typeof CeresSequenceViewer> = {
  component: CeresSequenceViewer,
  title: 'CeresSequenceViewer',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CeresSequenceViewer>;

export const Primary: Story = {
  args: {
    data: [],
  },
};
