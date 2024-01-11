import {Meta, StoryObj} from '@storybook/react';

import {FullSequenceViewer} from './FullSequenceViewer';

const meta: Meta<typeof FullSequenceViewer> = {
  component: FullSequenceViewer,
  title: 'FullSequenceViewer',
  tags: ['autodocs'], // Add your tags here
  args: {
    trackPaddingInner: 0.25,
    trackPaddingOuter: 0.2,
  },
  argTypes: {
    trackPaddingInner: {
      control: {
        type: 'range',
        min: 0,
        max: 0.9,
        step: 0.01,
      },
    },
    trackPaddingOuter: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FullSequenceViewer>;

export const Primary: Story = {};

export const InsideContainerWithHeight: Story = {
  render: args => {
    return (
      <div
        style={{
          height: '500px',
          overflowY: 'auto',
        }}
      >
        <FullSequenceViewer {...args} />
      </div>
    );
  },
};
