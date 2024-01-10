import {Meta, StoryObj} from '@storybook/react';

import {CereusSequenceViewer} from '@/components/CereusSequenceViewer';

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
        <CereusSequenceViewer
          domainMax={DOMAIN_MAX}
          background={({width, height}) => {
            return <rect width={width} height={height} fill="#F9F9F9" />;
          }}
        >
          <GraphAxisTop {...args} />
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
          domainMax={DOMAIN_MAX}
          animate={false}
          background={({width, height}) => {
            return <rect width={width} height={height} fill="#F9F9F9" />;
          }}
        >
          <GraphAxisTop {...args} />
        </CereusSequenceViewer>
      </div>
    );
  },
};
