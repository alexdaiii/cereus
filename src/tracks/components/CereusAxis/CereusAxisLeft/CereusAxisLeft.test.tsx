import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {describe, it} from "vitest";

import {CereusAxisLeft} from "./CereusAxisLeft";

describe("CereusAxisLeft", () => {
  it("should render without crashing", () => {
    render(<CereusAxisLeft />);
  });
});
