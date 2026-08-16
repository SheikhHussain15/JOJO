"use client";

import React from "react";
import { useScrollReveal, type RevealDirection } from "../../hooks/useScrollReveal";

interface RevealProps {
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}

export const Reveal: React.FC<RevealProps> = ({
  direction = "up",
  delay = 0,
  className,
  children,
  as = "div",
}) => {
  const { ref, style } = useScrollReveal<HTMLElement>({ direction, delay });

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: `opacity 0.7s ease-out, transform 0.7s ease-out`,
      }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;