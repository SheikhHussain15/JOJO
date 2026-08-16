export type ContactInterest = "Automotive" | "Machinery" | "Partnership" | "General";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: ContactInterest;
}

export interface ContactResponse {
  ok: boolean;
  message?: string;
}
