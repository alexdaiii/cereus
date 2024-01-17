import {render} from '@testing-library/react';
import {FC} from 'react';
import {beforeEach, describe, expect, it} from 'vitest';

import {PlotAreaStyleContext} from '../../context';
import {PlotRange, useRange} from './useRange';

describe('useRange', () => {
  let TestComponent: FC;
  let actual: PlotRange;

  beforeEach(() => {
    TestComponent = function TestComponent() {
      actual = useRange();
      return null;
    };
  });

  it('should have default values when outside of a context', () => {
    render(<TestComponent />);

    expect(actual).toEqual({
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
    });
  });

  it("should use the plot's width and height when inside of a context", () => {
    render(
      <PlotAreaStyleContext.Provider
        value={{
          height: 100,
          width: 200,
          top: 0,
          left: 0,
        }}
      >
        <TestComponent />
      </PlotAreaStyleContext.Provider>,
    );

    expect(actual).toEqual({
      minX: 0,
      maxX: 200,
      minY: 0,
      maxY: 100,
    });
  });
});
