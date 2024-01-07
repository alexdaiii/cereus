import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {Foo} from './Foo';

describe('Foo component', () => {
  it('should render', () => {
    render(<Foo />);

    const div = document.querySelector('div');
    expect(div).not.toBe(null);
  });
});
