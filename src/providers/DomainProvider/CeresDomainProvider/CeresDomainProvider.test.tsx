import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';

import {CeresDomainProvider} from './CeresDomainProvider';

describe('CeresDomainProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <CeresDomainProvider>
        <></>
      </CeresDomainProvider>,
    );

    expect(true).toBeTruthy();
  });
});
