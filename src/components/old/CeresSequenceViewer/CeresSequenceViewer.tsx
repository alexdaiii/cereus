import {
  CombinableSequenceViewerContainerProps,
  SequenceViewerContainer,
} from '@/components/SequenceViewerContainer';
import {RowDataBase} from '@/types/dataTypes';

type Props = {
  data: RowDataBase[];
} & CombinableSequenceViewerContainerProps;

export const CeresSequenceViewer = ({
  data,
  height,
  heightGrowthMultiplier,
  width,
}: Props) => {
  // TODO: probably should be in CONTEXT because many components need this
  const numDisplayedTracks = getNumDisplayedTracks(data);

  return (
    <SequenceViewerContainer
      numDisplayedTracks={numDisplayedTracks}
      height={height}
      heightGrowthMultiplier={heightGrowthMultiplier}
      width={width}
    >
      {() => {
        return <></>;
      }}
    </SequenceViewerContainer>
  );
};

export const getNumDisplayedTracks = (data: RowDataBase[]) => {
  let numDisplayedTracks = 0;

  for (let i = 0; i < data.length; i++) {
    const row = data[i];

    if (!row.visible) {
      continue;
    }

    // Even if there are no tracks in row.tracks, we will still display the row
    numDisplayedTracks += Math.max(row.tracks.length, 1);
  }

  return Math.max(numDisplayedTracks, 1);
};
