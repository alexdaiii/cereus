import {Meta, StoryObj} from '@storybook/react';

import {CereusSequenceViewer} from '../../CereusSequenceViewer';
import {GraphAxisTop} from '../../GraphAxis/GraphAxisTop';
import {ChartArea} from '../../TrackArea';
import {SequenceTrack} from './SequenceTrack';

const shortSequence = 'LOREMIPSUMDOLORSITAMET';
const longSequence =
  'MTEYKLVVVGAGGVGKSALTIQLIQNHFVDEYDPTIEDSYRKQVVIDGETCLLDILDTAGQ' +
  'EEYSAMRDQYMRTGEGFLCVFAINNTKSFEDIHQYREQIKRVKDSDDVPMVLVGNKCDLAA' +
  'RTVESRQAQDLARSYGIPYIETSAKTRQGVEDAFYTLVREIRQHKLRKLNPPDESGPGCMSCKCVLS';

const meta: Meta<typeof SequenceTrack> = {
  component: SequenceTrack,
  title: 'SequenceTrack',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
  render: args => {
    return (
      <div
        style={{
          height: 500,
        }}
      >
        <CereusSequenceViewer
          domainMax={args.sequence.length}
          background={({width, height}) => {
            return <rect width={width} height={height} fill="#F9F9F9" />;
          }}
        >
          <GraphAxisTop />
          <ChartArea>
            <SequenceTrack {...args} />
          </ChartArea>
        </CereusSequenceViewer>
      </div>
    );
  },
};
export default meta;

type Story = StoryObj<typeof SequenceTrack>;

export const ShortSequence: Story = {
  args: {
    sequence: shortSequence,
  },
};

export const LongSequence: Story = {
  args: {
    sequence: longSequence,
  },
};
