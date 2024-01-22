import {Meta, StoryObj} from '@storybook/react';

import {CereusPlot} from './CereusPlot';

const meta: Meta<typeof CereusPlot> = {
  component: CereusPlot,
  title: 'CereusPlot',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CereusPlot>;

export const Primary: Story = {
  args: {},
};
