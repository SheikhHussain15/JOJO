import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  as?: "input" | "textarea" | "select";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  disabled?: boolean;
}

const baseClasses = `
  w-full
  rounded-xl
  border
  bg-[#12141c]
  px-4
  py-3
  text-white
  placeholder:text-zinc-500
  outline-none
  transition-colors
  focus:border-[#c5a059]
`;

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  name,
  type = "text",
  as = "input",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  autoComplete,
  rows = 5,
  options,
  disabled = false,
}) => {
  const classes = `${baseClasses} ${
    error
      ? "border-red-500/60 focus:border-red-500"
      : "border-white/10 focus:border-[#c5a059]"
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.2em] font-mono text-zinc-400 mb-3"
      >
        {label}
        {required && <span className="text-[#c5a059]"> *</span>}
      </label>

      {as === "textarea" && (
        <textarea
          id={id}
          name={name}
          value={value}
          rows={rows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`${classes} resize-y`}
        />
      )}

      {as === "select" && (
        <select
          id={id}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`${classes} appearance-none cursor-pointer`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === "input" && (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={classes}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-400 font-light">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
