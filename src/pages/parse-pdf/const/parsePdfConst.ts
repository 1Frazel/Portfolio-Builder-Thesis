export interface DetectionResult {
  hasPersonalInfo: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  hasLanguages: boolean;
  hasCertifications: boolean;
  rawText: string;
}
