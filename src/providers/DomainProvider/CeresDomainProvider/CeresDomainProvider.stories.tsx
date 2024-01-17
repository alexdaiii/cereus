import {Meta, StoryObj} from '@storybook/react';

import {CeresDomainProvider} from './CeresDomainProvider';

const meta: Meta<typeof CeresDomainProvider> = {
  component: CeresDomainProvider,
  title: 'CeresDomainProvider',
  tags: ['autodocs'], // Add your tags here
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CeresDomainProvider>;

export const Primary: Story = {
  args: {},
};
