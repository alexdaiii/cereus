import * as stylex from '@stylexjs/stylex';
import {useState} from 'react';

import {twMD} from '@/stylex/media';

const MD: twMD = '@media (min-width: 768px)';

/**
 * Foo props
 */
type Props = {
  /**
   * If greater than 10, it's immediately cool
   */
  foo?: string;
};

const styles = stylex.create({
  foo: {
    color: 'red',
    fontSize: {
      default: 12,
      [MD]: 96,
    },
  },
  bar: {
    color: 'blue',
  },
});

export const Foo = ({foo = ''}: Props) => {
  const [cool, setCool] = useState(foo.length > 10);

  return (
    <>
      <div {...stylex.props(styles.foo, cool && styles.bar)}>Foo</div>
      <button onClick={() => setCool(!cool)}>
        {cool ? 'Not cool' : 'Cool'}
      </button>
    </>
  );
};
