import "@testing-library/jest-dom";
import {renderHook} from "@testing-library/react";
import {useContext} from "react";
import {afterEach, describe, expect, it, vi} from "vitest";

import {
  HorizontalTrackGroupContextType,
  SequenceTrack,
  createUseFilteredFactory,
  filterSequenceData,
} from "@/core";

describe("FilterSequence", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    [0, 5, 0, ["Q", "W", "E", "R", "T", "Y"]],
    [
      0,
      12,
      0,
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", null, null, null],
    ],
    [-5, 5, 0, [null, null, null, null, null, "Q", "W", "E", "R", "T", "Y"]],
    [25, 30, 0, [null, null, null, null, null, null]],
    [-70, -65, 0, [null, null, null, null, null, null]],
    [0, 5, 3, [null, null, null, "Q", "W", "E"]],
    [0, 5, -7, ["I", "O", "P", null, null, null]],
    [-7, 0, -7, ["Q", "W", "E", "R", "T", "Y", "U", "I"]],
    [25, 27, -100, [null, null, null]],
    [0, 0, 0, ["Q"]],
  ])(
    "Sequence with min: %s, max %s, shift %s",
    (domainMin, domainMax, begin, expected) => {
      const track = {
        rowId: "rowId",
        title: "title",
        rowIndex: 0,
        initialized: true,
        track: {
          trackType: "any",
          trackId: "trackId",
          width: 100,
          height: 100,
          index: 0,
          y: 0,
          data: {
            begin: begin,
            sequence: "QWERTYUIOP",
          },
        },
      };

      const useFilteredSequence = createUseFilteredFactory(
        () => ({
          domainMin: domainMin,
          domainMax: domainMax,
          data: [],
        }),
        (): ReturnType<
          typeof useContext<
            HorizontalTrackGroupContextType<SequenceTrack<string>>
          >
        > => track,
        filterSequenceData,
      );

      const result = renderHook(() => useFilteredSequence()).result.current;

      const {
        track: {
          data: {sequenceArray, ...otherSequenceData},
          ...otherTrackInfo
        },
        ...rowInfo
      } = result;

      expect({
        ...rowInfo,
        track: {
          ...otherTrackInfo,
          data: {
            ...otherSequenceData,
          },
        },
      }).toEqual(track);
      expect(sequenceArray).toEqual(expected);
    },
  );
});
