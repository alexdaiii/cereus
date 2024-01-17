import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {describe, it} from 'vitest';

import {GraphWithAxesProvider} from './GraphWithAxesProvider';

// TODO: write tests

describe('GraphWithAxesProvider', () => {
  it('should render without crashing', () => {
    render(<GraphWithAxesProvider />);
  });
});
