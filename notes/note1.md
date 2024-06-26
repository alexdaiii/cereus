# Notes 1

- Data shape:

  - Row:
    - rowId: string
    - title: string | undefined
    - visible: boolean
    - composite: boolean
    - tracks: Track[]
  - Track:
    - trackId: string
    - trackType: string

- X Axis:

  - can be on the top or bottom
  - ScaleInfo:
    - type: scaleBand
    - domain:
      - discrete - this is so we can get a bandwidth
        - all integers from [min, max]
    - range:
      - continuous
      - min: number = chartXMin
      - max: number = chartXMax
    - ticks:
      - depends on the chartWidth
      - otherwise, default = 10
    - ...other scaleBand props

- Y Axis:

  - Based off BarGroupHorizontal from @visx/shape

- DataProvider
  - Consumer:
    - ScaleProvider
    - Chart
- ChartSizeProvider
  - Consumer:
    - ScaleProvider
    - Chart
  - Options:
    - can include axisX and axisY size when determining the chart size
  - Alternatives:
    - ResponsiveChartSizeProvider
      - Automatically sets the width and height to the parent container
    - GrowingChartHeightProvider
      - Automatically sets the width to the parent container
      - Sets the height based on the number of visible rows
      - Depends on:
        - DataProvider
- ScaleProvider
  - Depends on:
    - ChartSizeProvider
    - DataProvider
  - Consumer:
    - X Axis
    - Y Axis
    - Chart
- Chart
  - Depends on:
    - ScaleProvider
    - ChartSizeProvider
    - DataProvider
