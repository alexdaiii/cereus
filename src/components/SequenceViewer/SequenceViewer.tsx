import {withParentSize} from '@visx/responsive';

import {RowData} from '@/types/dataTypes';

type Props = {
  children?: React.ReactNode;
  /**
   * Min value of the domain
   * @default 0
   */
  domainMin?: number;
  /**
   * Max value of the domain
   */
  domainMax: number;
  /**
   * Data to be displayed
   */
  data: RowData[];
};

export const SequenceViewer = ({
  domainMin = 0,
  domainMax,
  data = [],
  children,
}: Props) => {
  // calculate X range

  return <div>{children}</div>;
};
