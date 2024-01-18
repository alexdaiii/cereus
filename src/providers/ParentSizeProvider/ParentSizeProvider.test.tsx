import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import {FC} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

import {TestProviderValsMaker} from "../../../test/TestProviderHelpers";
import {ParentSizeContextType} from "../../context";
import {useParentSize} from "../../hooks";
import {ParentSizeProvider} from "./ParentSizeProvider";

describe("ParentSizeProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  let actual: ParentSizeContextType;
  let TestComponent: FC;

  beforeEach(() => {
    TestComponent = TestProviderValsMaker(useParentSize, val => (actual = val));
  });

  it("should render without crashing", () => {
    render(
      <ParentSizeProvider>
        <div>Test</div>
      </ParentSizeProvider>,
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should set a default fallback width and height if resize observer is not available", () => {
    render(
      <ParentSizeProvider>
        <TestComponent />
      </ParentSizeProvider>,
    );

    expect(actual.width).toBe(0);
    expect(actual.height).toBe(0);
  });

  it("should use the fallback width and height if resize observer is not available", () => {
    render(
      <ParentSizeProvider fallbackHeight={250} fallbackWidth={500}>
        <TestComponent />
      </ParentSizeProvider>,
    );

    expect(actual.width).toBe(500);
    expect(actual.height).toBe(250);
  });

  it("should crash if checkResizeObserverAvailable is false and no resize observer polyfill is provided", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(
        <ParentSizeProvider checkResizeObserverAvailable={false}>
          <TestComponent />
        </ParentSizeProvider>,
      );
    }).toThrow();

    expect(console.error).toHaveBeenCalled();
  });

  const observeMock = vi.fn((element, callback) => {
    // Create a mock entry with the desired width and height
    const entries = [
      {
        target: element,
        contentRect: {
          width: 500, // Set your desired width here
          height: 500, // Set your desired height here
        },
      },
    ];

    if (callback) {
      callback(entries);
    }
  });

  const ResizeObserverMock = vi.fn(() => {
    return {
      observe: observeMock,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
  });

  it("Should use resize observer if available", () => {
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);

    const fallbackSize = 1000;

    render(
      <div>
        <ParentSizeProvider
          fallbackHeight={fallbackSize}
          fallbackWidth={fallbackSize}
        >
          <TestComponent />
        </ParentSizeProvider>
      </div>,
    );

    expect(ResizeObserverMock).toHaveBeenCalled();
    expect(observeMock).toHaveBeenCalled();

    // it just shouldn't be the fallback size
    expect(actual.width).toBe(0);
    expect(actual.height).toBe(0);
  });
});
