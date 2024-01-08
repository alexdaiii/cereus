import {Meta, StoryObj} from '@storybook/react';

import {FeatureViewer} from './FeatureViewer';

const meta: Meta<typeof FeatureViewer> = {
  component: FeatureViewer,
  title: 'FeatureViewer',
  tags: ['autodocs'], // Add your tags here
  args: {
    width: 500,
    height: 500,
  },
  argTypes: {
    // disable setting props on background arg
  },
};
export default meta;

type Story = StoryObj<typeof FeatureViewer>;

export const Primary: Story = {
  args: {},
};

export const WithBackground: Story = {
  args: {
    background: ({width, height}) => {
      return <rect width={width} height={height} fill="lightblue" />;
    },
  },
};
