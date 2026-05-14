export interface DetectionResult {
  hasPersonalInfo: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  hasLanguages: boolean;
  hasCertifications: boolean;
  rawText: string;
}

const SECTION_KEYWORDS: Record<
  keyof Omit<DetectionResult, "rawText">,
  string[]
> = {
  hasPersonalInfo: ["contact", "personal", "profile", "about me", "summary"],
  hasExperience: [
    "experience",
    "work history",
    "employment",
    "professional experience",
  ],
  hasEducation: ["education", "academic", "university", "college", "degree"],
  hasSkills: ["skills", "competencies", "technical skills", "expertise"],
  hasLanguages: ["languages", "language"],
  hasCertifications: ["certifications", "certificates", "license", "licence"],
};
