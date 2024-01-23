import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {TestScaling} from "./TestScaling";

describe("TestScaling", () => {
  it("should render without crashing", () => {
    render(<TestScaling />);
  });
});
