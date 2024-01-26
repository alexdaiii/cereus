import {renderHook} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {useCereusDomain} from "../../hooks";
import {CereusRowData} from "../../types";
import {DomainProvider} from "./CereusDomainProvider";

describe("CereusDomainProvider", () => {
  it("provides the expected context similar to a DomainProvider", () => {
    const data: CereusRowData[] = [
      {
        rowId: "row1",
        title: "Row 1",
        visible: true,
        tracks: [
          {
            trackId: "track1",
            trackType: "sequence",
            data: {
              sequence: "ATCG",
              begin: 1,
            },
          },
        ],
      },
    ];

    const {result} = renderHook(
      () => useCereusDomain(),

      {
        wrapper: ({children}) => (
          <DomainProvider domainMin={20} domainMax={40} data={data}>
            {children}
          </DomainProvider>
        ),
      },
    );

    expect(result.current.domainMin).toEqual(20);
    expect(result.current.domainMax).toEqual(40);
    expect(result.current.data).toEqual(data);
  });
});
