import React from "react";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps {
  className?: string;
  eyebrow?: string;
  children: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  className,
  eyebrow,
  children,
}) => {
  return (
    <header className={`
      py-16 md:py-20
      ${className}
    `}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}

      <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-6">
        {children}
      </h2>
    </header>
  );
};

export default SectionHeading;