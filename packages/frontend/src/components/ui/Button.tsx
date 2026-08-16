import React from "react";
import Link from "next/link";

interface ButtonProps {
  className?: string;
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  to?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  onClick,
  href,
  to,
  disabled = false,
  children,
}) => {
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    rounded-full
    text-xs
    uppercase
    tracking-[0.2em]
    font-medium
    transition-all
    duration-200
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-[#c5a059]
  `;

  const variantClasses = {
    default: `
      border border-white/10
      text-white
      bg-transparent
      hover:bg-white/5
      hover:text-white
    `,
    primary: `
      bg-[#c5a059]
      text-[#08090d]
      hover:bg-[#d4af37]
    `,
    secondary: `
      bg-transparent
      border border-white/20
      text-white
      hover:bg-white/5
      hover:text-white
    `,
  };

  const sizeClasses = {
    sm: `px-4 py-2 text-sm`,
    md: `px-6 py-3`,
    lg: `px-8 py-4 text-lg`,
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  if (to) {
    return (
      <Link
        href={to}
        className={classes}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;