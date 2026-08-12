import React from "react";

interface EyebrowProps {
  className?: string;
  children: React.ReactNode;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  className,
  children,
}) => {
  return (
    <p className={`
      text-xs
      uppercase
      tracking-[0.25em]
      font-mono
      text-zinc-300
      mb-4
      ${className}
    `}>
      {children}
    </p>
  );
};

export default Eyebrow;