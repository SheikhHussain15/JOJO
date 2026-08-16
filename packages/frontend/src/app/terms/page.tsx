import { Container } from "../../components/layout/Container";
import { Eyebrow } from "../../components/layout/Eyebrow";
import { Reveal } from "../../components/ui/Reveal";
import { company } from "../../data/company";
import { buildPageMetadata } from "../../lib/seo";

const sections = [
  {
    heading: "Acceptance of Terms",
    body: "By accessing or using this website, you agree to be bound by these terms of use. If you do not agree with any part of these terms, please do not use the website.",
  },
  {
    heading: "Use of the Website",
    body: "This website is provided for informational purposes about the products and services of JOJO International. You agree to use it lawfully and not to interfere with or disrupt the website, its servers, or the networks connected to it.",
  },
  {
    heading: "Intellectual Property",
    body: "The content on this website — including text, graphics, logos and other materials — is owned by or licensed to JOJO International and is protected by applicable intellectual property laws. You may not reproduce, distribute or create derivative works from it without permission.",
  },
  {
    heading: "Product Information",
    body: "Product details, specifications and availability shown on this website may change at any time and are provided for general information only. Please contact us for current details before relying on any information for a purchase decision.",
  },
  {
    heading: "No Warranty",
    body: "This website and its content are provided on an \"as is\" and \"as available\" basis without warranties of any kind, whether express or implied. To the fullest extent permitted by law, JOJO International disclaims all warranties relating to the website and its content.",
  },
  {
    heading: "Limitation of Liability",
    body: "To the fullest extent permitted by law, JOJO International shall not be liable for any indirect, incidental or consequential damages arising out of or in connection with your use of this website.",
  },
  {
    heading: "Governing Law",
    body: "These terms are governed by the laws of the jurisdiction in which JOJO International is headquartered, without regard to conflict-of-law principles.",
  },
  {
    heading: "Contact Us",
    body: `If you have any questions about these terms, you can reach us at ${company.contact.email}.`,
  },
];

export const metadata = buildPageMetadata({
  title: "Terms of Use — JOJO International",
  description: `Terms and conditions for using the ${company.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <section className="relative z-10 bg-[#08090d] text-white pt-40 md:pt-48 pb-20 md:pb-28 overflow-hidden">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow className="mb-6">Legal</Eyebrow>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-8">
                TERMS OF USE.
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
                The terms that govern your use of the {company.name} website.
                This is a general template and should be reviewed by legal
                counsel before launch.
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
}
