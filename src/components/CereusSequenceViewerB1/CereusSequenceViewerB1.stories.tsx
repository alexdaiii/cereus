import {Meta, StoryObj} from '@storybook/react';

import {CereusSequenceViewerB1} from './CereusSequenceViewerB1';

const meta: Meta<typeof CereusSequenceViewerB1> = {
  component: CereusSequenceViewerB1,
  title: 'CereusSequenceViewerB1',
  tags: ['autodocs'], // Add your tags here
  args: {
    domainMax: 100,
  },
  argTypes: {
    // disable setting props on background arg
  },
  render: args => {
    return (
      <div
        style={{
          height: '500px',
        }}
      >
        <CereusSequenceViewerB1 {...args} />
      </div>
    );
  },
};
export default meta;

type Story = StoryObj<typeof CereusSequenceViewerB1>;

export const Primary: Story = {
  args: {},
};

export const WithBackground: Story = {
  args: {
    background: ({width, height}) => {
      return <rect width={width} height={height} fill="#F9F9F9" />;
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
<div
  style={{
    height: '500px',
  }}
>
  <CereusSequenceViewer
  background={
    ({width, height}) => {
      return <rect width={width} height={height} fill="#F9F9F9" />;
    }
  }
/>
</div>
`,
      },
    },
  },
};
