import {Meta, StoryObj} from '@storybook/react';

import {CereusSequenceViewer} from '../CereusSequenceViewer';
import {ViewerAxis} from './ViewerAxis';

const meta: Meta<typeof ViewerAxis> = {
  component: ViewerAxis,
  title: 'ViewerAxis',
  tags: ['autodocs'], // Add your tags here
  args: {
    max: 500,
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ViewerAxis>;

export const Animated: Story = {
  render: args => {
    return (
      <div
        style={{
          height: '500px',
        }}
      >
        <CereusSequenceViewer>
          <ViewerAxis {...args} />
        </CereusSequenceViewer>
      </div>
    );
  },
};

export const NotAnimated: Story = {
  render: args => {
    return (
      <div
        style={{
          height: '500px',
        }}
      >
        <CereusSequenceViewer
          sequenceViewerContext={{
            animate: false,
          }}
        >
          <ViewerAxis {...args} />
        </CereusSequenceViewer>
      </div>
    );
  },
};
