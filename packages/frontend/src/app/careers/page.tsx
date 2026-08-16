"use client";

import React, { useRef, useState } from "react";
import { Container } from "../../components/layout/Container";
import { Eyebrow } from "../../components/layout/Eyebrow";
import { Reveal } from "../../components/ui/Reveal";
import { FormField } from "../../components/forms/FormField";
import { FileInput } from "../../components/forms/FileInput";
import { FormStatus } from "../../components/forms/FormStatus";
import { useFormStatus } from "../../components/forms/useFormStatus";
import { company } from "../../data/company";
import { careerPerks, openPositions, positionOptions } from "../../data/careers";
import { RESUME_ACCEPT, RESUME_MAX_SIZE_MB } from "../../data/contact";
import { submitApplication } from "../../lib/forms";
import type { CareerFormData } from "../../types/careers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CareersPage() {
  const { name } = company;
  const { status, begin, succeed, fail, reset } = useFormStatus();

  const [form, setForm] = useState<CareerFormData>({
    fullName: "",
    email: "",
    phone: "",
    position: "General Application",
    message: "",
    resume: null,
  });
  const websiteRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof CareerFormData, string>>>({});

  const setField = (field: keyof CareerFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof CareerFormData, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_REGEX.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (form.phone && !/^[+0-9\s()-]{7,20}$/.test(form.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!form.resume) next.resume = "Please attach your resume.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    begin();
    const response = await submitApplication(
      form,
      websiteRef.current?.value ?? ""
    );
    if (response.ok) succeed();
    else fail();
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      position: "General Application",
      message: "",
      resume: null,
    });
    reset();
  };

  const positionOptionsList = positionOptions.map((position) => ({
    value: position,
    label: position,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative z-10 bg-[#08090d] text-white pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow className="mb-6">Careers</Eyebrow>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-8">
                BUILD THE FUTURE OF {name.toUpperCase()}.
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                Join a team that puts service, quality and affordability at the
                heart of everything we do — and grows with every relationship.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why JOJO */}
      <section className="bg-[#08090d] text-white pb-20 md:pb-28">
        <Container>
          <Reveal>
            <Eyebrow>Why {name}</Eyebrow>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] max-w-3xl mb-16">
              SERVICE, QUALITY AND AFFORDABILITY. EVERY TIME.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careerPerks.map((perk, index) => (
              <Reveal
                key={perk.title}
                delay={index * 100}
                className="p-8 rounded-2xl bg-[#12141c] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300"
              >
                <span className="block text-xs font-mono text-[#c5a059] mb-6">
                  0{index + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-light tracking-wide mb-3">
                  {perk.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                  {perk.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Open positions */}
      <section className="bg-[#12141c] text-white py-20 md:py-28 border-t border-white/10">
        <Container>
          <Reveal>
            <Eyebrow>Open Positions</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.08] max-w-3xl mb-12">
              CURRENT OPPORTUNITIES.
            </h2>
          </Reveal>

          {openPositions.length > 0 ? (
            <div className="space-y-4">
              {openPositions.map((position) => (
                <Reveal
                  key={position.id}
                  className="rounded-2xl border border-white/10 bg-[#08090d] p-8"
                >
                  <h3 className="text-2xl font-light text-white">{position.title}</h3>
                  {position.summary && (
                    <p className="text-zinc-400 font-light mt-2">{position.summary}</p>
                  )}
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="rounded-2xl border border-white/10 bg-[#08090d] p-8 max-w-3xl">
              <p className="text-xl font-light text-white">
                No current openings.
              </p>
              <p className="text-zinc-400 font-light mt-3 leading-relaxed">
                We're always interested in talented people. Send a speculative
                application below — tell us where you'd fit and we'll keep your
                resume on file for when the right role opens.
              </p>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Application form */}
      <section className="bg-[#08090d] text-white py-20 md:py-28 border-t border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <Eyebrow>Application</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-[1.08] mb-6">
                APPLY TODAY.
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed">
                Fill in your details, attach your resume and tell us why you'd
                be a great addition to {name}.
              </p>
              <p className="text-sm text-zinc-500 font-light mt-6 leading-relaxed">
                Your resume is handled securely and only used for recruitment
                purposes. See our privacy policy for details.
              </p>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-3">
              {status === "idle" || status === "submitting" ? (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  aria-label="Application form"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      id="careers-full-name"
                      label="Full Name"
                      name="fullName"
                      value={form.fullName}
                      onChange={setField("fullName")}
                      error={errors.fullName}
                      required
                      autoComplete="name"
                    />
                    <FormField
                      id="careers-email"
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
                      id="careers-phone"
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={setField("phone")}
                      error={errors.phone}
                      autoComplete="tel"
                    />
                    <FormField
                      id="careers-position"
                      label="Position"
                      name="position"
                      as="select"
                      value={form.position}
                      onChange={setField("position")}
                      options={positionOptionsList}
                      required
                    />
                  </div>

                  <FormField
                    id="careers-message"
                    label="Message"
                    name="message"
                    as="textarea"
                    value={form.message}
                    onChange={setField("message")}
                    error={errors.message}
                    rows={5}
                    placeholder="Tell us about your experience and where you'd fit."
                  />

                  <FileInput
                    id="careers-resume"
                    label="Resume"
                    accept={RESUME_ACCEPT}
                    maxSizeMb={RESUME_MAX_SIZE_MB}
                    file={form.resume}
                    onChange={(file) => {
                      setForm((prev) => ({ ...prev, resume: file }));
                      setErrors((prev) => ({ ...prev, resume: undefined }));
                    }}
                    onError={(message) =>
                      setErrors((prev) => ({ ...prev, resume: message }))
                    }
                    error={errors.resume}
                    required
                  />

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center rounded-full bg-[#c5a059] text-[#08090d] text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 hover:bg-[#d4af37] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c5a059] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Application
                  </button>
                </form>
              ) : (
                <FormStatus
                  status={status}
                  successTitle="Application Received"
                  successMessage="Thank you for applying. Your resume has been received and will be reviewed by our team."
                  onReset={handleReset}
                  resetLabel="Submit Another Application"
                />
              )}
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
