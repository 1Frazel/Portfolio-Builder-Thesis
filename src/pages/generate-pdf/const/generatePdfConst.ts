export const DEFAULT_PROFESSIONAL_TRAINING = {
  id: 0,
  courseName: "",
  institution: "",
  startAt: "",
  endsAt: "",
};

export const DEFAULT_WORK_EXPERIENCES = {
  id: 0,
  jobTitle: "",
  employer: "",
  startAt: "",
  endsAt: "",
  address: "",
  description: "",
};

export const DEFAULT_PERSONAL_DETAIL = {
  jobTarget: "",
  photo: "",
  accentColor: "#333185",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  postalCode: "",
  cityState: "",
  country: "",
  address: "",
};

export const DEFAULT_EDUCATION = {
  id: 0,
  school: "",
  degree: "",
  startAt: "",
  endsAt: "",
  city: "",
  description: "",
};

export const DEFAULT_SKILLS = {
  id: 0,
  name: "",
  expertise: "",
};

export const DEFAULT_PROFILE_SUMMARY = "";

export const DEFAULT_ADDITIONAL_SECTIONS = [
  { id: "language", title: "Language", isSet: false },
  {
    id: "licensesOrCertifications",
    title: "Licenses / Certifications",
    isSet: false,
  },
  {
    id: "professionalTraining",
    title: "Professional Training",
    isSet: false,
  },
  {
    id: "custom",
    title: "Custom Section",
    isSet: false,
    customTitle: "",
  },
];

export const DEFAULT_LANGUAGES = {
  id: 0,
  name: "",
  expertise: "",
};

export const DEFAULT_LICENSES_CERTIFICATION = {
  id: 0,
  name: "",
  issuer: "",
  startAt: "",
  endsAt: "",
};

export const DEFAULT_CUSTOM_SECTION_ITEM = {
  id: 0,
  name: "",
  startAt: "",
  endsAt: "",
  city: "",
  description: "",
};

export const DEFAULT_CUSTOM_SECTION = {
  id: 0,
  sectionTitle: "",
  items: [{ ...DEFAULT_CUSTOM_SECTION_ITEM }],
};

export const mocks = (() => {
  const DEFAULT_PERSONAL_DETAIL = {
    jobTarget: "Senior Frontend Engineer",
    photo: "",
    accentColor: "#4f7f7a",
    firstName: "Jane",
    lastName: "Anderson",
    email: "jane.anderson@example.com",
    phone: "+1 (415) 555-0132",
    linkedinUrl: "https://www.linkedin.com/in/jane-anderson",
    postalCode: "94105",
    cityState: "San Francisco, CA",
    country: "USA",
    address: "123 Market St, Apt 45",
  };

  const DEFAULT_PROFILE_SUMMARY =
    "Product-focused frontend engineer with 5+ years building accessible, performant React applications. Experienced with component libraries, TypeScript, and cross-functional collaboration to deliver customer-facing features.";

  const DEFAULT_WORK_EXPERIENCES = [
    {
      id: 0,
      jobTitle: "Senior Frontend Engineer",
      employer: "BrightApps Inc.",
      startAt: "June, 2021",
      endsAt: "",
      address: "San Francisco, CA",
      description:
        "Led development of the company design system, improved performance by 30%, and mentored junior engineers. Collaborated with product and design to ship features used by 200k+ monthly users.",
    },
    {
      id: 1,
      jobTitle: "Frontend Engineer",
      employer: "Spark Digital",
      startAt: "September, 2018",
      endsAt: "May, 2021",
      address: "Oakland, CA",
      description:
        "Built responsive React applications, implemented client-side routing, and integrated RESTful APIs. Wrote unit and integration tests to improve reliability.",
    },
  ];

  const DEFAULT_EDUCATION = [
    {
      id: 0,
      school: "State University",
      degree: "B.S. in Computer Science",
      startAt: "September, 2014",
      endsAt: "June, 2018",
      city: "San Francisco, CA",
      description:
        "Graduated Cum Laude. Relevant coursework: Data Structures, Web Development, Human-Computer Interaction.",
    },
  ];

  const DEFAULT_SKILLS = [
    { id: 0, name: "JavaScript", expertise: "Expert" },
    { id: 1, name: "TypeScript", expertise: "Expert" },
    { id: 2, name: "React", expertise: "Expert" },
    { id: 3, name: "CSS / Tailwind", expertise: "Experienced" },
    { id: 4, name: "Testing (Jest, RTL)", expertise: "Intermediate" },
  ];

  const DEFAULT_LANGUAGES = [
    { id: 0, name: "English", expertise: "Native" },
    { id: 1, name: "Spanish", expertise: "Professional" },
  ];

  const DEFAULT_PROFESSIONAL_TRAINING = [
    {
      id: 0,
      courseName: "Advanced React Patterns",
      institution: "Frontend Masters",
      startAt: "March, 2020",
      endsAt: "April, 2020",
    },
    {
      id: 1,
      courseName: "Performance Optimization for Web",
      institution: "Udacity",
      startAt: "August, 2019",
      endsAt: "October, 2019",
    },
  ];

  const DEFAULT_LICENSES_CERTIFICATION = [
    {
      id: 0,
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      startAt: "June, 2022",
      endsAt: "June, 2025",
    },
    {
      id: 1,
      name: "React - The Complete Guide (Certification)",
      issuer: "Coursera",
      startAt: "November, 2020",
      endsAt: "January, 2021",
    },
  ];

  return {
    DEFAULT_PERSONAL_DETAIL,
    DEFAULT_PROFILE_SUMMARY,
    DEFAULT_WORK_EXPERIENCES,
    DEFAULT_EDUCATION,
    DEFAULT_SKILLS,
    DEFAULT_LANGUAGES,
    DEFAULT_PROFESSIONAL_TRAINING,
    DEFAULT_LICENSES_CERTIFICATION,
  };
})();
