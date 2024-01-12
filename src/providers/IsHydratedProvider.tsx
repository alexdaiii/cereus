import {ReactNode, useEffect, useState} from 'react';

import {IsHydratedContext} from '@/context';

type Props = {
  children?: ReactNode;
};

export const IsHydratedProvider = ({children}: Props) => {
  const [isHydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <IsHydratedContext.Provider value={isHydrated}>
      {children}
    </IsHydratedContext.Provider>
  );
};
