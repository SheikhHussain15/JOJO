import React, { useMemo, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Eyebrow } from "../components/layout/Eyebrow";
import { Reveal } from "../components/ui/Reveal";
import { FormField } from "../components/forms/FormField";
import { FormStatus } from "../components/forms/FormStatus";
import { useFormStatus } from "../components/forms/useFormStatus";
import { company } from "../data/company";
import { CONTACT_INTERESTS } from "../data/contact";
import { submitContactInquiry } from "../lib/forms";
import { usePageMeta } from "../lib/seo";
import type { ContactFormData } from "../types/contact";
import { MapPin, Mail, Phone, X } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactPage: React.FC = () => {
  const { contact, name } = company;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { status, begin, succeed, fail, reset } = useFormStatus();

  usePageMeta({
    title: "Contact — JOJO International",
    description: `Contact ${name} for vehicles, industrial machinery or a long-term partnership.`,
    path: "/contact",
  });

  const productSlug = searchParams.get("product");
  const websiteRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ContactFormData>(() => ({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: productSlug ? `Inquiry about: ${productSlug}` : "",
    message: "",
    interest: productSlug ? "Machinery" : "General",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const productNotice = useMemo(() => {
    if (!productSlug) return null;
    return `You're inquiring about "${productSlug}".`;
  }, [productSlug]);

  const setField = (field: keyof ContactFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof ContactFormData, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_REGEX.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (form.phone && !/^[+0-9\s()-]{7,20}$/.test(form.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!form.message.trim()) next.message = "Please enter your message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    begin();
    const response = await submitContactInquiry(
      form,
      websiteRef.current?.value ?? ""
    );
    if (response.ok) succeed();
    else fail();
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      interest: "General",
    });
    reset();
  };

  const clearProductPrefill = () => {
    setForm((prev) => ({
      ...prev,
      subject: "",
      interest: "General",
    }));
    navigate("/contact", { replace: true });
  };

  const interestOptions = CONTACT_INTERESTS.map((interest) => ({
    value: interest,
    label: interest,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative z-10 bg-[#08090d] text-white pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow className="mb-6">{contact.eyebrow}</Eyebrow>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-8">
                {contact.heading}
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                Whether you need a vehicle, industrial machinery or a long-term
                partner — reach out and the JOJO team will get back to you.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Contact details */}
      <section className="bg-[#08090d] text-white pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: MapPin,
                label: "Office",
                value: contact.office,
                sub: contact.locationNote,
              },
              {
                icon: Mail,
                label: "Email",
                value: contact.email,
                href: `mailto:${contact.email}`,
                sub: "We respond within one business day.",
              },
              {
                icon: Phone,
                label: "Phone",
                value: contact.phone,
                href: `tel:${contact.phone.replace(/[^+0-9]/g, "")}`,
                sub: "Mon–Fri, 9am–6pm",
              },
            ].map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 80}
                className="p-8 rounded-2xl bg-[#12141c] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300"
              >
                <item.icon className="w-6 h-6 text-[#c5a059] mb-5" />
                <span className="block text-xs uppercase tracking-[0.25em] font-mono text-zinc-500 mb-3">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-xl md:text-2xl font-light tracking-wide text-white hover:text-[#c5a059] transition-colors break-words"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-xl md:text-2xl font-light tracking-wide text-white">
                    {item.value}
                  </span>
                )}
                <p className="text-sm text-zinc-500 font-light mt-3 leading-relaxed">
                  {item.sub}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact form */}
      <section className="bg-[#12141c] text-white py-20 md:py-28 border-t border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <Eyebrow>Contact Form</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-[1.08] mb-6">
                START A CONVERSATION.
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed">
                Tell us about your requirement and the best way to reach you.
                A member of the {name} team will follow up.
              </p>

              {/* Map / location area — verified embed pending */}
              <div className="mt-10 rounded-2xl border border-white/10 bg-[#08090d] p-8">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#c5a059]" />
                  <span className="text-xs uppercase tracking-[0.25em] font-mono text-zinc-400">
                    Location
                  </span>
                </div>
                <p className="text-white text-lg font-light">{contact.office}</p>
                <p className="text-zinc-500 text-sm font-light mt-2 leading-relaxed">
                  {contact.locationNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-3">
              {status === "idle" || status === "submitting" ? (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  aria-label="Contact form"
                >
                  <input
                    ref={websiteRef}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] opacity-0 pointer-events-none"
                  />
                  {productNotice && (
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#c5a059]/40 bg-[#c5a059]/10 px-4 py-3">
                      <p className="text-sm text-[#c5a059] font-light">
                        {productNotice}
                      </p>
                      <button
                        type="button"
                        onClick={clearProductPrefill}
                        className="p-1 rounded text-[#c5a059] hover:bg-white/5 transition-colors"
                        aria-label="Clear product reference"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      id="contact-name"
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={setField("name")}
                      error={errors.name}
                      required
                      autoComplete="name"
                    />
                    <FormField
                      id="contact-email"
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      error={errors.email}
                      required
                      autoComplete="email"
                    />
                    <FormField
                      id="contact-phone"
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={setField("phone")}
                      error={errors.phone}
                      autoComplete="tel"
                    />
                    <FormField
                      id="contact-company"
                      label="Company"
                      name="company"
                      value={form.company}
                      onChange={setField("company")}
                      error={errors.company}
                      autoComplete="organization"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      id="contact-interest"
                      label="Interest"
                      name="interest"
                      as="select"
                      value={form.interest}
                      onChange={setField("interest")}
                      options={interestOptions}
                      required
                    />
                    <FormField
                      id="contact-subject"
                      label="Subject"
                      name="subject"
                      value={form.subject}
                      onChange={setField("subject")}
                      error={errors.subject}
                    />
                  </div>

                  <FormField
                    id="contact-message"
                    label="Message"
                    name="message"
                    as="textarea"
                    value={form.message}
                    onChange={setField("message")}
                    error={errors.message}
                    required
                    rows={6}
                  />

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center rounded-full bg-[#c5a059] text-[#08090d] text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 hover:bg-[#d4af37] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <FormStatus
                  status={status}
                  onReset={handleReset}
                />
              )}
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
