export interface CareerPosition {
  id: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  summary?: string;
}

export interface CareerFormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume: File | null;
}

export interface ApplicationResponse {
  ok: boolean;
  message?: string;
}
