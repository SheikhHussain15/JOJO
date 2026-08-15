import React, { useRef, useState } from "react";
import { UploadCloud, X, FileText } from "lucide-react";

interface FileInputProps {
  id: string;
  label: string;
  accept?: string;
  maxSizeMb?: number;
  file: File | null;
  onChange: (file: File | null) => void;
  onError: (message: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  accept = ".pdf,.doc,.docx",
  maxSizeMb = 10,
  file,
  onChange,
  onError,
  error,
  required = false,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validate = (selected: File | undefined) => {
    if (!selected) return;
    const extension = selected.name.split(".").pop()?.toLowerCase();
    const accepted = accept.split(",").map((item) => item.trim().replace(".", ""));
    if (!extension || !accepted.includes(extension)) {
      onError(`Please upload a ${accept.replace(".", "").replace(/\./g, " / ")} file.`);
      return;
    }
    if (selected.size > maxSizeMb * 1024 * 1024) {
      onError(`File is too large. Maximum size is ${maxSizeMb} MB.`);
      return;
    }
    onChange(selected);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    validate(event.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.2em] font-mono text-zinc-400 mb-3"
      >
        {label}
        {required && <span className="text-[#c5a059]"> *</span>}
      </label>

      {file ? (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#c5a059]/40 bg-[#12141c] px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-5 h-5 text-[#c5a059] shrink-0" />
            <div className="min-w-0">
              <p className="text-white text-sm truncate">{file.name}</p>
              <p className="text-zinc-500 text-xs font-mono">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`rounded-xl border border-dashed px-6 py-8 text-center cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#c5a059] ${
            isDragging
              ? "border-[#c5a059] bg-[#c5a059]/10"
              : "border-white/20 bg-[#12141c] hover:border-[#c5a059]/60"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <UploadCloud className="w-8 h-8 mx-auto mb-3 text-zinc-500" />
          <p className="text-sm text-zinc-400 font-light">
            Drag & drop your resume, or{" "}
            <span className="text-[#c5a059]">browse</span>
          </p>
          <p className="text-xs text-zinc-500 font-mono mt-2">
            PDF, DOC, DOCX · max {maxSizeMb} MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept={accept}
        required={required}
        disabled={disabled}
        className="sr-only"
        onChange={(event) => validate(event.target.files?.[0])}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400 font-light">{error}</p>
      )}
    </div>
  );
};

export default FileInput;
