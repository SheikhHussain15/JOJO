const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+0-9\s()-]{7,20}$/;
const MAX_STRING_LENGTH = 5000;

export type FieldErrors = Record<string, string>;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateEmail(value: string): string | undefined {
  if (!value) return "Email is required.";
  if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address.";
  return undefined;
}

function validatePhone(value: string): string | undefined {
  if (!value) return undefined;
  if (!PHONE_REGEX.test(value)) return "Please enter a valid phone number.";
  return undefined;
}

function validateLength(value: string, label: string): string | undefined {
  if (value.length > MAX_STRING_LENGTH) {
    return `${label} is too long (max ${MAX_STRING_LENGTH} characters).`;
  }
  return undefined;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

export function validateContactFields(body: Record<string, unknown>): {
  ok: boolean;
  data: ContactFormData;
  errors: FieldErrors;
} {
  const data: ContactFormData = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    company: clean(body.company),
    subject: clean(body.subject),
    message: clean(body.message),
    interest: clean(body.interest),
  };

  const errors: FieldErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  if (data.name.length > 200) errors.name = "Name is too long.";

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  if (!data.message) errors.message = "Please enter your message.";
  const messageLengthError = validateLength(data.message, "Message");
  if (messageLengthError) errors.message = messageLengthError;

  const subjectLengthError = validateLength(data.subject, "Subject");
  if (subjectLengthError) errors.subject = subjectLengthError;

  if (data.interest && !["Automotive", "Machinery", "Partnership", "General"].includes(data.interest)) {
    errors.interest = "Please select a valid interest.";
  }

  return { ok: Object.keys(errors).length === 0, data, errors };
}

export interface CareerFormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
}

export function validateCareerFields(body: Record<string, unknown>): {
  ok: boolean;
  data: CareerFormData;
  errors: FieldErrors;
} {
  const data: CareerFormData = {
    fullName: clean(body.fullName),
    email: clean(body.email),
    phone: clean(body.phone),
    position: clean(body.position),
    message: clean(body.message),
  };

  const errors: FieldErrors = {};

  if (!data.fullName) errors.fullName = "Please enter your full name.";
  if (data.fullName.length > 200) errors.fullName = "Full name is too long.";

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  if (!data.position) errors.position = "Please select a position.";
  if (data.position.length > 200) errors.position = "Position is too long.";

  const messageLengthError = validateLength(data.message, "Message");
  if (messageLengthError) errors.message = messageLengthError;

  return { ok: Object.keys(errors).length === 0, data, errors };
}
