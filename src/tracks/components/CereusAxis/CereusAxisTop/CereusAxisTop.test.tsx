import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {CereusAxisTop} from "./CereusAxisTop";

describe("CereusAxisTop", () => {
  it("should render without crashing", () => {
    render(<CereusAxisTop />);
  });
});
