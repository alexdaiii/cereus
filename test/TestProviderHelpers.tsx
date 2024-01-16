import React, {ReactNode} from 'react';

/**
 * Creates a function that returns a component that renders the value of a context.
 */
export const TestConsumerComponentMaker = <T,>(
  Context: React.Context<T>,
  displayName?: string,
) => {
  const TestConsumer = ({children}: {children: (value: T) => ReactNode}) => {
    return <Context.Consumer>{value => children(value)}</Context.Consumer>;
  };
  TestConsumer.displayName = displayName ?? 'TestConsumerComponent';
  return TestConsumer;
};

/**
 * Creates a function that returns a component that renders the value of a hook.
 * Useful if the hook just returns useContext and is pretty much the same
 * as <AnyContext.Consumer/>
 */
export const TestHookComponentMaker = <T,>(
  hook: () => T,
  displayName?: string,
) => {
  const TestHook = ({children}: {children: (value: T) => ReactNode}) => {
    const value = hook();
    return <>{children(value)}</>;
  };
  TestHook.displayName = displayName ?? 'TestHookComponent';
  return TestHook;
};

export type TestChildElement<T> = ({
  children,
}: {
  children: (value: T) => React.ReactNode;
}) => React.ReactNode;
