import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="flex flex-col md:flex-col lg:flex-row flex-1 justify-center items-center md:items-stretch gap-8 p-10 w-full max-w-7xl mx-auto">
      {children}
    </div>
  );
}
