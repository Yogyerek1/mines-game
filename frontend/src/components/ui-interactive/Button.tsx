type ButtonProps = {
  children: React.ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
  border?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  children,
  width,
  height,
  backgroundColor,
  border,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${width} ${height} ${backgroundColor} ${border} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
