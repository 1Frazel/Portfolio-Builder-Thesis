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
];

export const DEFAULT_LANGUAGES = {
  id: 0,
  language: "",
  level: "",
};

export const DEFAULT_LICENSES_CERTIFICATION = {
  id: 0,
  name: "",
  issuer: "",
  startAt: "",
  endsAt: "",
};

export const A4_SIZE = {
  height: "h-[841px]",
  width: "w-[595px]",
};

export const mocks = (() => {
  const DEFAULT_PERSONAL_DETAIL = {
    jobTarget: "Front End Developer",
    photo: "",
    firstName: "John",
    lastName: "Doe",
    email: "JohnDoe@mail.net",
    phone: "123456789",
    linkedinUrl: "https://us.linkedin.com/en/johnDoe",
    postalCode: "54334",
    cityState: "City, State Some Random  Street",
    country: "USA",
    address: "Somewhere random street",
  };

  return { DEFAULT_PERSONAL_DETAIL };
})();
