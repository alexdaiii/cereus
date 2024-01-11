import {Meta, StoryObj} from '@storybook/react';

import {SequenceViewerContainer} from './SequenceViewerContainer';

const meta: Meta<typeof SequenceViewerContainer> = {
  component: SequenceViewerContainer,
  title: 'SequenceViewerContainer',
  tags: ['autodocs'], // Add your tags here
  render: args => {
    return (
      <SequenceViewerContainer {...args}>
        {args.children}
      </SequenceViewerContainer>
    );
  },
};
export default meta;

type Story = StoryObj<typeof SequenceViewerContainer>;

export const Primary: Story = {
  args: {
    children: ({width, height}) => {
      return (
        <div>
          width: {width}, height: {height}
        </div>
      );
    },
    width: 'responsive',
    height: 'computed',
    heightGrowthMultiplier: 5,
    numDisplayedTracks: 1,
  },
};
