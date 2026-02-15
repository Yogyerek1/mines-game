type profileIMGProps = {
  src: string | undefined;
  alt?: string;
  width?: string;
  height?: string;
  round?: string;
  border?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  className?: string;
};

export function ProfileIMG({
  src,
  alt = "profileIMG",
  width = "w-15",
  height = "h-15",
  round,
  border = "border-1 border-yellow-600",
  onClick,
  className,
}: profileIMGProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${width} ${height} ${round} ${border} ${className}`}
      onClick={onClick}
    />
  );
}
