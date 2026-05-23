import { useState } from "react";
import type React from "react";

import {
  DEFAULT_ADDITIONAL_SECTIONS,
  DEFAULT_EDUCATION,
  DEFAULT_LANGUAGES,
  DEFAULT_LICENSES_CERTIFICATION,
  DEFAULT_PERSONAL_DETAIL,
  DEFAULT_PROFESSIONAL_TRAINING,
  DEFAULT_PROFILE_SUMMARY,
  DEFAULT_SKILLS,
  DEFAULT_WORK_EXPERIENCES,
  mocks,
} from "../../pages/generate-pdf/const/generatePdfConst";
import type {
  IAdditionalSections,
  IEducation,
  ILanguages,
  ILicensesCertifications,
  IPersonalDetail,
  IProfessionalTraining,
  ISkill,
  IWorkExperience,
} from "../../pages/generate-pdf/interface/generatePdfInterface";

export interface FormData {
  personalDetail: IPersonalDetail;
  workExperiences: IWorkExperience[];
  educations: IEducation[];
  skills: ISkill[];
  profileSummary: string;
  additionalSections: IAdditionalSections[];
  languages: ILanguages[];
  professionalTraining: IProfessionalTraining[];
  licensesCertifications: ILicensesCertifications[];
}

export interface UseFormDataReturn {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setLanguages: React.Dispatch<React.SetStateAction<ILanguages[]>>;
  setWorkExperiences: React.Dispatch<React.SetStateAction<IWorkExperience[]>>;
  setEducations: React.Dispatch<React.SetStateAction<IEducation[]>>;
  setSkills: React.Dispatch<React.SetStateAction<ISkill[]>>;
  setProfileSummary: React.Dispatch<React.SetStateAction<string>>;
  setPersonalDetail: React.Dispatch<React.SetStateAction<IPersonalDetail>>;
  setAdditionalSections: React.Dispatch<
    React.SetStateAction<IAdditionalSections[]>
  >;
  setProfessionalTraining: React.Dispatch<
    React.SetStateAction<IProfessionalTraining[]>
  >;
  setLicensesCertifications: React.Dispatch<
    React.SetStateAction<ILicensesCertifications[]>
  >;
}

export const useFormData = ({
  useMock,
}: {
  useMock: boolean;
}): UseFormDataReturn => {
  useMock = false;

  const [formData, setFormData] = useState<FormData>({
    personalDetail: useMock
      ? mocks.DEFAULT_PERSONAL_DETAIL
      : DEFAULT_PERSONAL_DETAIL,
    workExperiences: useMock
      ? mocks.DEFAULT_WORK_EXPERIENCES
      : [DEFAULT_WORK_EXPERIENCES],
    educations: useMock ? mocks.DEFAULT_EDUCATION : [DEFAULT_EDUCATION],
    skills: useMock ? mocks.DEFAULT_SKILLS : [DEFAULT_SKILLS],
    profileSummary: useMock
      ? mocks.DEFAULT_PROFILE_SUMMARY
      : DEFAULT_PROFILE_SUMMARY,
    additionalSections: DEFAULT_ADDITIONAL_SECTIONS,
    languages: useMock ? mocks.DEFAULT_LANGUAGES : [DEFAULT_LANGUAGES],
    professionalTraining: useMock
      ? mocks.DEFAULT_PROFESSIONAL_TRAINING
      : [DEFAULT_PROFESSIONAL_TRAINING],
    licensesCertifications: useMock
      ? mocks.DEFAULT_LICENSES_CERTIFICATION
      : [DEFAULT_LICENSES_CERTIFICATION],
  });

  // Dispatch setters - compatible with React.Dispatch pattern
  const setLanguages: React.Dispatch<React.SetStateAction<ILanguages[]>> = (
    value,
  ) => {
    setFormData((prev) => ({
      ...prev,
      languages: typeof value === "function" ? value(prev.languages) : value,
    }));
  };

  const setWorkExperiences: React.Dispatch<
    React.SetStateAction<IWorkExperience[]>
  > = (value) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences:
        typeof value === "function" ? value(prev.workExperiences) : value,
    }));
  };

  const setEducations: React.Dispatch<React.SetStateAction<IEducation[]>> = (
    value,
  ) => {
    setFormData((prev) => ({
      ...prev,
      educations: typeof value === "function" ? value(prev.educations) : value,
    }));
  };

  const setSkills: React.Dispatch<React.SetStateAction<ISkill[]>> = (value) => {
    setFormData((prev) => ({
      ...prev,
      skills: typeof value === "function" ? value(prev.skills) : value,
    }));
  };

  const setProfileSummary: React.Dispatch<React.SetStateAction<string>> = (
    value,
  ) => {
    setFormData((prev) => ({
      ...prev,
      profileSummary:
        typeof value === "function" ? value(prev.profileSummary) : value,
    }));
  };

  const setPersonalDetail: React.Dispatch<
    React.SetStateAction<IPersonalDetail>
  > = (value) => {
    setFormData((prev) => ({
      ...prev,
      personalDetail:
        typeof value === "function" ? value(prev.personalDetail) : value,
    }));
  };

  const setAdditionalSections: React.Dispatch<
    React.SetStateAction<IAdditionalSections[]>
  > = (value) => {
    setFormData((prev) => ({
      ...prev,
      additionalSections:
        typeof value === "function" ? value(prev.additionalSections) : value,
    }));
  };

  const setProfessionalTraining: React.Dispatch<
    React.SetStateAction<IProfessionalTraining[]>
  > = (value) => {
    setFormData((prev) => ({
      ...prev,
      professionalTraining:
        typeof value === "function" ? value(prev.professionalTraining) : value,
    }));
  };

  const setLicensesCertifications: React.Dispatch<
    React.SetStateAction<ILicensesCertifications[]>
  > = (value) => {
    setFormData((prev) => ({
      ...prev,
      licensesCertifications:
        typeof value === "function"
          ? value(prev.licensesCertifications)
          : value,
    }));
  };

  return {
    formData,
    setFormData,
    setLanguages,
    setWorkExperiences,
    setEducations,
    setSkills,
    setProfileSummary,
    setPersonalDetail,
    setAdditionalSections,
    setProfessionalTraining,
    setLicensesCertifications,
  };
};
