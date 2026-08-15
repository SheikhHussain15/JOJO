import React from "react";
import { Container } from "../components/layout/Container";
import { Eyebrow } from "../components/layout/Eyebrow";
import { Reveal } from "../components/ui/Reveal";
import { company } from "../data/company";
import { usePageMeta } from "../lib/seo";

const sections = [
  {
    heading: "Information We Collect",
    body: "When you use our contact form or submit a job application, we collect the information you provide — such as your name, email address, phone number, message content, and, for applications, the resume you upload. We do not collect personal information from your device automatically beyond standard server logs (such as the pages you request).",
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information you provide solely to respond to your inquiry, evaluate a job application, or otherwise handle the reason you contacted us. We do not sell or rent your personal information to third parties.",
  },
  {
    heading: "Resumes and Job Applications",
    body: "Resumes are handled securely and used only for recruitment purposes. Resume files are not published on this website and are never exposed publicly.",
  },
  {
    heading: "Data Retention",
    body: "We retain your information only as long as needed to respond to you, process an application, or as required by applicable law. You may request that we delete the personal information you have provided at any time by contacting us.",
  },
  {
    heading: "Your Rights",
    body: "Depending on where you are located, you may have the right to access, correct, or delete the personal information we hold about you, and to object to or restrict certain processing. To exercise any of these rights, contact us using the details below.",
  },
  {
    heading: "Contact Us",
    body: `If you have any questions about this privacy policy or about the personal information we hold, you can reach us at ${company.contact.email}.`,
  },
];

export const PrivacyPage: React.FC = () => {
  usePageMeta({
    title: "Privacy Policy — JOJO International",
    description: `How ${company.name} collects, uses and protects the personal information you share through our website.`,
    path: "/privacy",
  });

  return (
    <>
      <section className="relative z-10 bg-[#08090d] text-white pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow className="mb-6">Legal</Eyebrow>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-8">
                PRIVACY POLICY.
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                How {company.name} collects, uses and protects your information.
                This is a general policy template and should be reviewed by
                legal counsel before launch.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#12141c] text-white py-20 md:py-28 border-t border-white/10">
        <Container>
          <div className="max-w-3xl space-y-12">
            <Reveal>
              <p className="text-zinc-400 font-light leading-relaxed">
                Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </Reveal>
            {sections.map((section, index) => (
              <Reveal key={section.heading} delay={Math.min(index * 60, 240)}>
                <h2 className="text-2xl font-light tracking-wide text-white mb-4">
                  {section.heading}
                </h2>
                <p className="text-zinc-400 font-light leading-relaxed">
                  {section.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPage;
