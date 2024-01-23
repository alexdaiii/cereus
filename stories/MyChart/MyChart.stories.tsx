import {Meta, StoryObj} from "@storybook/react";
import React from "react";

import {MyChart} from "./MyChart";

type MyChartPropsAndCustomArgs = React.ComponentProps<typeof MyChart> & {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  aspectRatioTop: number;
  aspectRatioBottom: number;
};

const meta: Meta<MyChartPropsAndCustomArgs> = {
  component: MyChart,
  title: "MyChart",
  tags: ["autodocs"], // Add your tags here
  args: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    topAxisHeight: 50,
    rightAxisWidth: 25,
    bottomAxisHeight: 33,
    leftAxisWidth: 75,
    maxWidth: 700,
    aspectRatioTop: 16,
    aspectRatioBottom: 9,
  },
  argTypes: {
    margin: {
      table: {
        disable: true,
      },
    },
  },
  render: ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    aspectRatioTop,
    aspectRatioBottom,
    ...args
  }) => {
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
        aspectRatio={`${aspectRatioTop}/${aspectRatioBottom}`}
      />
    );
  },
};
export default meta;

type Story = StoryObj<MyChartPropsAndCustomArgs>;

export const AllControls: Story = {};

export const CustomizeMargins: Story = {
  args: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    topAxisHeight: 50,
    rightAxisWidth: 25,
    bottomAxisHeight: 33,
    leftAxisWidth: 75,
  },
  argTypes: {
    domainMax: {
      control: false,
    },
    domainMin: {
      control: false,
    },
    aspectRatio: {
      control: false,
    },
  },
};

export const CustomizeDomain: Story = {
  args: {
    domainMin: 0,
    domainMax: 100,
  },
  argTypes: {
    marginTop: {
      table: {
        disable: true,
      },
    },
    marginRight: {
      table: {
        disable: true,
      },
    },
    marginBottom: {
      table: {
        disable: true,
      },
    },
    marginLeft: {
      table: {
        disable: true,
      },
    },
    topAxisHeight: {
      table: {
        disable: true,
      },
    },
    rightAxisWidth: {
      table: {
        disable: true,
      },
    },
    bottomAxisHeight: {
      table: {
        disable: true,
      },
    },
    leftAxisWidth: {
      table: {
        disable: true,
      },
    },
    aspectRatio: {
      table: {
        disable: true,
      },
    },
    maxWidth: {
      table: {
        disable: true,
      },
    },
  },
};
