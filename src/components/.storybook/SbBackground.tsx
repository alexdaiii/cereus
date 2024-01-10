export const SbBackground = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <>
      <rect width={width} height={height} fill="#F9F9F9" />
    </>
  );
};
