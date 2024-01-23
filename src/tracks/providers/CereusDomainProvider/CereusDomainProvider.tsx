import {ComponentProps, useMemo, useState} from "react";

import {createDomainProvider} from "@/core/providers";
import {CereusRowData} from "@/tracks";
import {CereusDomainContext, CereusDomainSetterContext} from "@/tracks/context";

/**
 * Inner component that provides the domain and data for the CeresSequenceViewer.
 * Does not manage any state.
 */
export const CereusDomainProviderInner = createDomainProvider(
  CereusDomainContext,
  "CereusDomainProvider",
);

export type CereusDomainProviderProps = ComponentProps<
  typeof CereusDomainProviderInner
>;

/**
 * Wraps the CereusDomainProviderInner component and manages filters
 * the data so only the tracks in the domain are shown.
 *
 * Does not manage any state. Does not provide any domain setters.
 */
export const CereusDomainProviderNoState = ({
  children,
  domainMax,
  domainMin = 0,
  data: dataOriginal,
}: CereusDomainProviderProps) => {
  const data = useMemo(() => {
    // filters the data so only the tracks in the domain are shown
    return dataOriginal.map((row): CereusRowData => {
      return {
        rowId: row.rowId,
        title: row.title,
        visible: row.visible,
        tracks: row.tracks.map(track => {
          switch (track.trackType) {
            case "sequence":
              return {
                ...track,
                data: {
                  begin: track.data.begin,
                  sequence: track.data.sequence.slice(
                    Math.max(0, domainMin),
                    domainMax,
                  ),
                },
              };

            case "block":
              return {
                ...track,
                data: track.data.filter(val => {
                  // return !(val.begin > domainMax || val.end < domainMin);
                  return val.begin <= domainMax && val.end >= domainMin;
                }),
              };

            case "point":
              return {
                ...track,
                data: {
                  positions: track.data.positions.filter(
                    val => val >= domainMin && val <= domainMax,
                  ),
                },
              };

            case "heatmap":
              return {
                ...track,
                data: track.data.filter(val => {
                  return val.bin >= domainMin && val.bin <= domainMax;
                }),
              };
          }
        }),
      };
    });
  }, [dataOriginal, domainMax, domainMin]);

  return (
    <CereusDomainProviderInner
      data={data}
      domainMax={domainMax}
      domainMin={domainMin}
    >
      {children}
    </CereusDomainProviderInner>
  );
};

/**
 * Wraps the CereusDomainProviderNoState component and manages the domain
 * min and max state. If you want to manage state yourself, use the
 * CereusDomainProviderNoState component instead.
 */
export const CereusDomainProvider = ({
  children,
  domainMax: domainMaxOriginal,
  domainMin: domainMinOriginal = 0,
  data,
}: CereusDomainProviderProps) => {
  // manages the domain min and max state
  const [domainMax, setDomainMax] = useState(domainMaxOriginal);
  const [domainMin, setDomainMin] = useState(domainMinOriginal);

  return (
    <CereusDomainSetterContext.Provider value={{setDomainMax, setDomainMin}}>
      <CereusDomainProviderNoState
        data={data}
        domainMax={domainMax}
        domainMin={domainMin}
      >
        {children}
      </CereusDomainProviderNoState>
    </CereusDomainSetterContext.Provider>
  );
};
