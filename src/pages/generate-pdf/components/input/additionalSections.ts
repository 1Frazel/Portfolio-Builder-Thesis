export interface IAdditionalSections {
  id: string;
  title: string;
  isSet: boolean;
}

export const defaultAdditionalSections = [
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
