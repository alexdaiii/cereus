import {Meta, StoryObj} from '@storybook/react';

import {CereusSequenceViewerB1} from '@/components';

import {GraphAxisTop} from './GraphAxisTop';

const meta: Meta<typeof GraphAxisTop> = {
  component: GraphAxisTop,
  title: 'GraphAxisTop',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GraphAxisTop>;

const DOMAIN_MAX = 500;

export const Animated: Story = {
  render: args => {
    return (
      <div
        style={{
          height: '500px',
        }}
      >
        <CereusSequenceViewerB1
          domainMax={DOMAIN_MAX}
          background={({width, height}) => {
            return <rect width={width} height={height} fill="#F9F9F9" />;
          }}
        >
          <GraphAxisTop {...args} />
        </CereusSequenceViewerB1>
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
        <CereusSequenceViewerB1
          domainMax={DOMAIN_MAX}
          animate={false}
          background={({width, height}) => {
            return <rect width={width} height={height} fill="#F9F9F9" />;
          }}
        >
          <GraphAxisTop {...args} />
        </CereusSequenceViewerB1>
      </div>
    );
  },
};
