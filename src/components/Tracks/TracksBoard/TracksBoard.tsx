import {Group} from '@visx/group';

type Props = {
  children?: React.ReactNode;
};

export const TracksBoard = ({children}: Props) => {
  return <Group>{children}</Group>;
};
