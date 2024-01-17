import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';

import {DomainProvider} from './DomainProvider';

describe('DomainProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <DomainProvider>
        <></>
      </DomainProvider>,
    );

    expect(true).toBeTruthy();
  });
});
