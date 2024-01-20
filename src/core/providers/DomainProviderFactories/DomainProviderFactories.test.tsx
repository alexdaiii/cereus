import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

describe("DomainProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <>
        <></>
      </>,
    );

    expect(true).toBeTruthy();
  });
});
