import React from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`
        max-w-7xl
        mx-auto
        px-6
        md:px-12
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;