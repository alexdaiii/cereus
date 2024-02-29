/* c8 ignore start */
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

const disable = {
  margins: {
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
  },
  axisConfig: {
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
  },
  domain: {
    domainMin: {
      table: {
        disable: true,
      },
    },
    domainMax: {
      table: {
        disable: true,
      },
    },
  },
  chartSize: {
    aspectRatioTop: {
      table: {
        disable: true,
      },
    },
    aspectRatioBottom: {
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
  padding: {
    y0ScalePaddingInner: {
      table: {
        disable: true,
      },
    },
    y0ScalePaddingOuter: {
      table: {
        disable: true,
      },
    },
    y1ScalePaddingInner: {
      table: {
        disable: true,
      },
    },
  },
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
    y0ScalePaddingOuter: 0.33,
    y0ScalePaddingInner: 0.5,
    y1ScalePaddingInner: 0.1,
  },
  argTypes: {
    margin: {
      table: {
        disable: true,
      },
    },
    aspectRatio: {
      table: {
        disable: true,
      },
    },
    y0ScalePaddingInner: {
      // a range from 0 to 1
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
      },
    },
    y0ScalePaddingOuter: {
      // a range from 0 to 1
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.05,
      },
    },
    y1ScalePaddingInner: {
      // a range from 0 to 1
      control: {
        type: "range",
        min: 0,
        max: 0.9,
        step: 0.05,
      },
    },
  },
  render: ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    aspectRatioTop = 16,
    aspectRatioBottom = 9,

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

export const CustomizeAxisAndMargins: Story = {
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
    ...disable.chartSize,
    ...disable.padding,
    ...disable.domain,
  },
};

export const CustomizeDomain: Story = {
  args: {
    domainMin: 0,
    domainMax: 100,
  },
  argTypes: {
    ...disable.chartSize,
    ...disable.padding,
    ...disable.axisConfig,
    ...disable.margins,
    domainMax: {
      control: {
        type: "range",
        min: -100,
        max: 100,
        step: 1,
      },
    },
    domainMin: {
      control: {
        type: "range",
        min: -100,
        max: 100,
        step: 1,
      },
    },
  },
};

export const CustomizePadding: Story = {
  args: {
    y0ScalePaddingInner: 0.5,
    y0ScalePaddingOuter: 0.33,
    y1ScalePaddingInner: 0.1,
  },
  argTypes: {
    ...disable.chartSize,
    ...disable.domain,
    ...disable.axisConfig,
    ...disable.margins,
  },
};
