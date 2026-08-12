export interface ContactDetail {
  label: string;
  value: string;
}

export interface CompanyData {
  name: string;
  tagline: string;
  brandIntro: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  automotive: {
    eyebrow: string;
    headline: string;
    description: string;
    cta: string;
  };
  whyJojo: {
    eyebrow: string;
    heading: string;
    points: { title: string; description: string }[];
  };
  story: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  vision: {
    eyebrow: string;
    heading: string;
    statement: string;
  };
  mission: {
    eyebrow: string;
    heading: string;
    statement: string;
  };
  ceo?: {
    name: string;
    title: string;
  };
  cta: {
    eyebrow: string;
    heading: string;
    description: string;
    button: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    office: string;
    email: string;
    phone: string;
  };
}

export const company: CompanyData = {
  name: "JOJO International",
  tagline: "MOVING INDUSTRY FORWARD.",
  brandIntro: {
    eyebrow: "Who We Are",
    heading: "Automotive expertise. Industrial capability. Long-term relationships.",
    description:
      "JOJO International is an automotive and industrial machinery company. Since 2016 we have combined automotive insight with agricultural and industrial machinery, built on reliability, standards and continual improvement.",
  },
  automotive: {
    eyebrow: "Automotive",
    headline: "MOVEMENT, SOURCED WITH PRECISION.",
    description:
      "JOJO's automotive sales and marketing capability connects quality vehicles with the right customers. Automotive experience since 2016, applied with a long-term, relationship-first approach.",
    cta: "Explore Automotive",
  },
  whyJojo: {
    eyebrow: "Why JOJO",
    heading: "SERVICE, QUALITY AND AFFORDABILITY. EVERY TIME.",
    points: [
      {
        title: "Customer Satisfaction",
        description:
          "Every relationship is built on service that puts the customer first and follows through long after the deal is done.",
      },
      {
        title: "Quality Standards",
        description:
          "Vehicles and machinery maintained to consistent standards, because reliability is non-negotiable.",
      },
      {
        title: "Affordable Excellence",
        description:
          "Serious capability without unnecessary premiums — value that respects the customer.",
      },
    ],
  },
  story: {
    eyebrow: "Our Story",
    heading: "BUILT ON AUTOMOTIVE ROOTS, DRIVEN TOWARD INDUSTRY.",
    paragraphs: [
      "JOJO International began with automotive sales and marketing experience, established in the automotive industry since 2016.",
      "Today we bring that same discipline to agricultural and industrial machinery — connecting businesses with equipment engineered to work hard, and standing behind every machine we supply.",
    ],
  },
  vision: {
    eyebrow: "Our Vision",
    heading: "TO LEAD IN SALES AND CUSTOMER SERVICE.",
    statement:
      "To be remembered for customer satisfaction — providing quality products at affordable prices, and leading the market in sales and customer service.",
  },
  mission: {
    eyebrow: "Our Mission",
    heading: "RELIABILITY, STANDARDS, CONTINUAL IMPROVEMENT.",
    statement:
      "To deliver vehicles and machinery of reliable quality, maintained to clear standards, through a process of continual improvement in everything we do.",
  },
  ceo: {
    name: "Shahzaib Saleem",
    title: "CEO / Founder",
  },
  cta: {
    eyebrow: "Let's Talk",
    heading: "READY TO MOVE FORWARD?",
    description:
      "Whether you need a vehicle, industrial machinery or a long-term partner, start the conversation with JOJO International.",
    button: "Request Information",
  },
  contact: {
    eyebrow: "Contact",
    heading: "START THE CONVERSATION.",
    office: "JOJO International",
    email: "contact@jojo-international.com",
    phone: "+1 (555) 123-4567",
  },
};