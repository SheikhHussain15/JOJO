import React from "react";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import type { FormStatus as FormStatusState } from "./useFormStatus";

interface FormStatusProps {
  status: FormStatusState;
  successTitle?: string;
  successMessage?: string;
  errorTitle?: string;
  errorMessage?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export const FormStatus: React.FC<FormStatusProps> = ({
  status,
  successTitle = "Message Sent",
  successMessage = "Thank you — your message has been received. Our team will be in touch shortly.",
  errorTitle = "Something Went Wrong",
  errorMessage = "Your message could not be sent. Please try again.",
  onReset,
  resetLabel = "Send Another Message",
}) => {
  if (status === "idle") return null;

  return (
    <div
      className="rounded-2xl border border-white/10 bg-[#12141c] p-8 text-center"
      role="status"
      aria-live="polite"
    >
      {status === "submitting" && (
        <>
          <Loader2 className="w-10 h-10 mx-auto mb-5 text-[#c5a059] animate-spin" />
          <p className="text-xl font-light text-white tracking-wide">
            Sending…
          </p>
          <p className="text-sm text-zinc-500 font-light mt-2">
            Please wait while we process your message.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle2 className="w-12 h-12 mx-auto mb-5 text-[#c5a059]" />
          <p className="text-xl font-light text-white tracking-wide">
            {successTitle}
          </p>
          <p className="text-sm text-zinc-400 font-light mt-2 max-w-md mx-auto">
            {successMessage}
          </p>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono px-6 py-3 rounded-full border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
            >
              {resetLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </>
      )}

      {status === "error" && (
        <>
          <AlertCircle className="w-12 h-12 mx-auto mb-5 text-red-400" />
          <p className="text-xl font-light text-white tracking-wide">
            {errorTitle}
          </p>
          <p className="text-sm text-zinc-400 font-light mt-2 max-w-md mx-auto">
            {errorMessage}
          </p>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono px-6 py-3 rounded-full border border-white/20 text-white hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
            >
              Try Again
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FormStatus;
