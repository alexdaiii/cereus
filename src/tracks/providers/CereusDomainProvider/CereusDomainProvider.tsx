import {createDomainProvider} from "@/core/providers";
import {CereusDomainContext} from "@/tracks/context";

/**
 * Provides the domain and data for the CeresSequenceViewer.
 * Does not manage any state.
 */
export const CereusDomainProvider = createDomainProvider(
  CereusDomainContext,
  "CereusDomainProvider",
);

// export const CereusDomainProvider = ({
//   children,
//   domainMax,
//   domainMin = 0,
//   data,
// }: CereusDomainProviderProps) => {
//   // FILTER in children because it makes testing easier
//   // const data = useMemo(() => {
//   // filters the data so only the tracks in the domain are shown
//   //   return dataOriginal.map((row): CereusRowData => {
//   //     return {
//   //       rowId: row.rowId,
//   //       title: row.title,
//   //       visible: row.visible,
//   //       tracks: row.tracks.map(track => {
//   //         switch (track.trackType) {
//   //           case "sequence":
//   //             return {
//   //               ...track,
//   //               data: {
//   //                 begin: track.data.begin,
//   //                 sequence: track.data.sequence.slice(
//   //                   Math.max(0, domainMin),
//   //                   domainMax,
//   //                 ),
//   //               },
//   //             };
//   //
//   //           case "block":
//   //             return {
//   //               ...track,
//   //               data: track.data.filter(val => {
//   //                 // return !(val.begin > domainMax || val.end < domainMin);
//   //                 return val.begin <= domainMax && val.end >= domainMin;
//   //               }),
//   //             };
//   //
//   //           case "point":
//   //             return {
//   //               ...track,
//   //               data: {
//   //                 positions: track.data.positions.filter(
//   //                   val => val >= domainMin && val <= domainMax,
//   //                 ),
//   //               },
//   //             };
//   //
//   //           case "heatmap":
//   //             return {
//   //               ...track,
//   //               data: track.data.filter(val => {
//   //                 return val.bin >= domainMin && val.bin <= domainMax;
//   //               }),
//   //             };
//   //         }
//   //       }),
//   //     };
//   //   });
//   // }, [dataOriginal, domainMax, domainMin]);
//
//   return (
//     <CereusDomainProviderInner
//       data={data}
//       domainMax={domainMax}
//       domainMin={domainMin}
//     >
//       {children}
//     </CereusDomainProviderInner>
//   );
// };
