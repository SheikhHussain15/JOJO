import { useState } from "react";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export function useFormStatus() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const begin = () => setStatus("submitting");
  const succeed = () => setStatus("success");
  const fail = () => setStatus("error");
  const reset = () => setStatus("idle");

  return { status, begin, succeed, fail, reset };
}

export default useFormStatus;
