import {Meta, StoryObj} from '@storybook/react';

import {Foo} from './Foo';

const meta: Meta<typeof Foo> = {
  component: Foo,
  title: 'Foo',
  tags: ['autodocs'], // Add your tags here
};
export default meta;

type Story = StoryObj<typeof Foo>;

export const Primary: Story = {
  args: {
    foo: 'Hello world',
  },
};
