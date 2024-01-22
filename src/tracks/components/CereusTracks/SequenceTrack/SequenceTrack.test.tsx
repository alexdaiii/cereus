import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {SequenceTrack} from "./SequenceTrack";

describe("SequenceTrack", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <SequenceTrack>
        <></>
      </SequenceTrack>,
    );

    expect(true).toBeTruthy();
  });
});
