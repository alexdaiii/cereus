import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {describe, it} from "vitest";

import {CereusScalesProvider} from "./CereusScalesProvider";

// TODO: Add tests for CereusScalesProvider!!!
describe("CereusScaleProvider", () => {
  it("should render without crashing", () => {
    render(<CereusScalesProvider />);
  });
});
