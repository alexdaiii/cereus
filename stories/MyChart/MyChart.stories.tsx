import {Meta, StoryObj} from "@storybook/react";
import React from "react";

import {MyChart} from "./MyChart";

type MyChartPropsAndCustomArgs = React.ComponentProps<typeof MyChart> & {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
};

const meta: Meta<MyChartPropsAndCustomArgs> = {
  component: MyChart,
  title: "MyChart",
  tags: ["autodocs"], // Add your tags here
  args: {},
  argTypes: {
    margin: {
      control: null,
    },
  },
  render: ({marginTop, marginBottom, marginLeft, marginRight, ...args}) => {
    return (
      <MyChart
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        margin={{
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
        }}
      />
    );
  },
};
export default meta;

type Story = StoryObj<MyChartPropsAndCustomArgs>;

export const CustomizeMargins: Story = {
  args: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    topAxisHeight: 50,
    rightAxisWidth: 25,
    bottomAxisHeight: 33,
    leftAxisWidth: 12,
  },
};
