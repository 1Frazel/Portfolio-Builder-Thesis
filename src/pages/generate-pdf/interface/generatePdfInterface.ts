import type { JSX } from "react";

export interface IProfessionalTraining {
  id: number;
  courseName: string;
  institution: string;
  startAt: string;
  endsAt: string;
}

export interface IWorkExperience {
  id: number;
  jobTitle: string;
  employer: string;
  startAt: string;
  endsAt: string;
  address: string;
  description: string;
}

export interface IPersonalDetail {
  jobTarget: string;
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  postalCode: string;
  cityState: string;
  country: string;
  address: string;
}

export interface IEducation {
  id: number;
  school: string;
  degree: string;
  startAt: string;
  endsAt: string;
  city: string;
  description: string;
}

export interface ISkill {
  id: number;
  name: string;
  expertise: string;
}

export interface IAdditionalSections {
  id: string;
  title: string;
  isSet: boolean;
}

export interface ILanguages {
  id: number;
  language: string;
  level: string;
}

export interface ILicensesCertifications {
  id: number;
  name: string;
  issuer: string;
  startAt: string;
  endsAt: string;
}

export interface IListSections {
  id: string;
  title: string;
  component: JSX.Element;
}
