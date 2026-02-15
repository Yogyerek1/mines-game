type profileIMGProps = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  round?: string;
  border?: string;
};

export function ProfileIMG({
  src,
  alt = "profileIMG",
  width = "w-15",
  height = "h-15",
  round,
  border,
}: profileIMGProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${width} ${height} ${round} ${border}`}
    />
  );
}
