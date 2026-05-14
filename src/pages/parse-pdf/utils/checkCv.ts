import * as pdfjsLib from "pdfjs-dist";

// https://github.com/wojtekmaj/react-pdf/blob/main/packages/react-pdf/README.md#configure-pdfjs-worker
// https://stackoverflow.com/a/63486898/7699841
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const SECTION_KEYWORDS: Record<string, string[]> = {
  personalInfo: ["contact", "personal", "profile", "about me", "summary"],
  experience: ["experience", "work history", "employment", "professional"],
  education: ["education", "academic", "university", "college", "degree"],
  skills: ["skills", "competencies", "technical", "expertise"],
  languages: ["languages", "language"],
  certifications: ["certifications", "certificates", "license", "licence"],
};

interface KeywordMatch {
  keyword: string;
  position: number;
}

export interface SectionData {
  exists: boolean;
  keyword: string;
  content: string;
  hasContent: boolean;
  status: "missing" | "header-only" | "complete";
}

// STEP 1: Find all keyword positions in text
const findAllKeywords = (text: string): Record<string, KeywordMatch> => {
  const lower = text.toLowerCase();
  const matches: Record<string, KeywordMatch> = {};

  for (const sectionName in SECTION_KEYWORDS) {
    const keywords = SECTION_KEYWORDS[sectionName];
    let earliestPos = -1;
    let matchedKeyword = "";

    for (const keyword of keywords) {
      const pos = lower.indexOf(keyword);
      if (pos !== -1 && (earliestPos === -1 || pos < earliestPos)) {
        earliestPos = pos;
        matchedKeyword = keyword;
      }
    }

    if (earliestPos !== -1) {
      matches[sectionName] = {
        keyword: matchedKeyword,
        position: earliestPos,
      };
    }
  }

  return matches;
};

// STEP 2: Extract content between each keyword and the next one
const extractSectionContent = (
  text: string,
  matches: Record<string, KeywordMatch>,
): Record<string, string> => {
  const content: Record<string, string> = {};

  // Get all positions sorted to find "next" keyword for each section
  const positions = Object.values(matches)
    .map((m) => m.position)
    .sort((a, b) => a - b);

  for (const sectionName in matches) {
    const currentMatch = matches[sectionName];
    const currentPos = currentMatch.position;
    const currentKeywordEnd = currentPos + currentMatch.keyword.length;

    // Find the next keyword position after current one
    const nextPos = positions.find((p) => p > currentPos);

    // Extract text from end of keyword to start of next keyword (or 300 chars if last)
    if (nextPos !== undefined) {
      content[sectionName] = text.slice(currentKeywordEnd, nextPos);
    } else {
      content[sectionName] = text.slice(
        currentKeywordEnd,
        currentKeywordEnd + 300,
      );
    }
  }

  return content;
};

// STEP 3: Check if content is meaningful
const hasContentText = (text: string): boolean => {
  const words = text.match(/\b[a-zA-Z]{2,}\b/g) || [];
  return words.length >= 5;
};

// STEP 4: Parse and format all sections for display
const parseSections = (
  matches: Record<string, KeywordMatch>,
  content: Record<string, string>,
): Record<string, SectionData> => {
  const parsed: Record<string, SectionData> = {};

  for (const sectionName in SECTION_KEYWORDS) {
    const found = matches[sectionName];
    const sectionContent = content[sectionName] || "";
    const hasContent = !!found && hasContentText(sectionContent);

    parsed[sectionName] = {
      exists: !!found,
      keyword: found?.keyword || "",
      content: sectionContent,
      hasContent,
      status: !found ? "missing" : hasContent ? "complete" : "header-only",
    };
  }

  return parsed;
};

const calculateScore = (sections: Record<string, SectionData>): number => {
  const sectionCount = Object.keys(SECTION_KEYWORDS).length;
  const completeCount = Object.values(sections).filter(
    (section) => section.status === "complete",
  ).length;

  return Math.round((completeCount / sectionCount) * 100);
};

const buildRecommendations = (
  sections: Record<string, SectionData>,
): string[] => {
  const recommendations: string[] = [];

  for (const sectionName in sections) {
    const section = sections[sectionName];

    if (section.status === "missing") {
      recommendations.push(
        `Add a ${sectionName} section with relevant details.`,
      );
    } else if (section.status === "header-only") {
      recommendations.push(
        `Add content under ${sectionName}, not just the header.`,
      );
    }
  }

  return recommendations;
};

const detectSections = (text: string): Record<string, SectionData> => {
  const matchedKeyword = findAllKeywords(text);
  const contentBetweenKeyword = extractSectionContent(text, matchedKeyword);
  return parseSections(matchedKeyword, contentBetweenKeyword);
};

const extractTextFromPdf = async (
  pdfDocument: pdfjsLib.PDFDocumentProxy,
): Promise<string> => {
  let fullText = "";

  for (let pageIndex = 1; pageIndex <= pdfDocument.numPages; pageIndex++) {
    try {
      const page = await pdfDocument.getPage(pageIndex);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");
      fullText += `${pageText}\n`;
    } catch (error) {
      console.warn(`Unable to extract text from page ${pageIndex}:`, error);
    }
  }

  return fullText;
};

const checkCv = async (fileUrl: string) => {
  const pdfDocument = await pdfjsLib.getDocument(fileUrl).promise;
  const rawText = await extractTextFromPdf(pdfDocument);
  const sections = detectSections(rawText);
  const score = calculateScore(sections);
  const recommendations = buildRecommendations(sections);
  console.log({ score, recommendations, rawText, sections });

  return {
    rawText,
    sections,
    score,
    recommendations,
  };
};

export default checkCv;
