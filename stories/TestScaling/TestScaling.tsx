import {scaleBand} from "@visx/scale";

type TestScalingProps = {};

export const TestScaling = ({}: TestScalingProps) => {
  const numTracksPerRow = [1, 1, 2, 1, 3, 5, 700];

  let totalTracks = 0;
  for (let i = 0; i < numTracksPerRow.length; i++) {
    totalTracks += numTracksPerRow[i];
  }

  const heightScale = 100;
  const paddingProportion = 0.1;
  const numPadding = Math.max(0, totalTracks - 1);

  const height =
    heightScale * totalTracks + paddingProportion * heightScale * numPadding;

  const proportion = numTracksPerRow.map(numTrack => {
    return numTrack / (totalTracks + paddingProportion * numPadding);
  });

  const size = proportion.map(val => {
    return parseFloat((height * val).toFixed(5));
  });

  const remainingHeight = height - size.reduce((a, b) => a + b, 0);

  const paddingSize = remainingHeight / numPadding;

  const yScale = scaleBand({
    domain: numTracksPerRow.map((_, i) => `${i}`),
    range: [0, height],
  });

  const vals = numTracksPerRow.map((_, i) => {
    const y = yScale(`${i}`);

    return y;
  });

  return (
    <>
      <div>Num Tracks Per Row: {JSON.stringify(numTracksPerRow)}</div>
      <div>Total Tracks: {totalTracks}</div>
      <div>Height: {height}</div>
      <div>Proportion: {JSON.stringify(proportion)}</div>
      <div>Size: {JSON.stringify(size)}</div>
      <div>Remaining Height: {remainingHeight}</div>
      <div>Padding Size: {paddingSize}</div>
      <div>Y Scale: {JSON.stringify(yScale.domain())}</div>
      <div>Y pos: {JSON.stringify(vals)}</div>
    </>
  );
};
