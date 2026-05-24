import { useState } from "react";
import Header from "../../shared/components/Header";
import FileInput from "../../shared/components/FileInput";
import checkCv, { type SectionData } from "./utils/checkCv";
import { useTranslation } from "react-i18next";

interface CvReport {
  rawText: string;
  sections: Record<string, SectionData>;
  score: number;
  recommendations: string[];
}

const ParsePdf = () => {
  const [cvReport, setCvReport] = useState<CvReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("resumeCheckerPage");

  const handleChange = async (fileUrl: string) => {
    try {
      setIsLoading(true);
      const detection = await checkCv(fileUrl);
      setCvReport(detection);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-500";
      case "header-only":
        return "bg-orange-500";
      default:
        return "bg-red-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return "✓";
      case "header-only":
        return "!";
      default:
        return "✗";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />

      {/* Main Content - Mobile First */}
      <div className="w-full px-4 md:px-16 py-6 md:py-8">
        {/* Mobile: Stacked Layout, Desktop: 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column: Upload Section */}
          <div className="flex flex-col justify-start">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 bg-white flex flex-col items-center justify-center min-h-64">
              {/* File Icon */}
              <div className="mb-4">
                <svg width="109" height="139" viewBox="0 0 109 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" d="M106.5 47.1667L61.9286 2.5H2.5V136.5H106.5V47.1667ZM61.9286 2.5V47.1667H106.5M47.0714 17.3889H14.3857M47.0714 32.2778H14.3857M47.0714 47.1667H14.3857M14.3857 62.0556H94.6143M14.3857 76.9444H94.6143M14.3857 91.8333H94.6143M14.3857 106.722H94.6143M14.3857 121.611H94.6143" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>

              {/* Text */}
              <p className="text-center text-gray-700 font-medium text-sm md:text-base mb-4">
                {t("uploadBox.uploadText")}
              </p>
              <p className="text-center text-gray-500 text-xs md:text-sm mb-6">
                {t("uploadBox.pdfOnly")}
              </p>
              {/* File Input */}
              <FileInput
                title={t("uploadBox.uploadButton")}
                acceptedFormat=".pdf"
                handleClick={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Right Column: Results Section */}
          <div className="flex flex-col gap-4">
            {/* Resume Checker Header */}
            <div className="bg-[#2951A3] text-white rounded-lg p-4 md:p-6 flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold">{t("header.title")}</h2>
            </div>

            {/* Description / Recommendations Section */}
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              {cvReport && !isLoading ? (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                    {t("recommendations.title")}
                  </h4>
                  <ul className="space-y-2">
                    {cvReport?.recommendations.map((recommendation, index) => (
                      <li
                        key={index}
                        className="text-gray-700 text-sm md:text-base flex gap-2"
                      >
                        <span className="text-orange-500 font-bold">•</span>
                        <span>
                          {" "}
                          {recommendation.charAt(0).toUpperCase() +
                            recommendation.slice(1).replace(/([A-Z])/g, " $1")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {t("header.description")}
                </p>
              )}
            </div>

            {/* Checking Result Header */}
            <div className="bg-[#2951A3] text-white rounded-lg p-4 md:p-6 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold">{t("results.title")}</h3>
            </div>

            {/* Results Content */}
            {isLoading ? (
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div
                    className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"
                    role="status"
                    aria-label="loading"
                  />
                  <p className="text-gray-600">{t("results.analyzing")}</p>
                </div>
              </div>
            ) : cvReport ? (
              <div className="flex flex-col gap-4">
                {/* Section Items */}
                {Object.entries(cvReport.sections).map(
                  ([sectionKey, section]) => (
                    <div
                      key={sectionKey}
                      className="bg-white rounded-lg p-4 md:p-5 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Section Title */}
                          <div>
                            <p className="font-semibold text-gray-800 text-sm md:text-base">
                              {sectionKey.charAt(0).toUpperCase() +
                                sectionKey.slice(1).replace(/([A-Z])/g, " $1")}
                            </p>
                            {section.status === "missing" && (
                              <p className="text-xs text-gray-500">
                                {t("results.missingText")}
                              </p>
                            )}
                            {section.status === "header-only" && (
                              <p className="text-xs text-gray-500">
                                {t("results.headerOnlyText")}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`${getStatusColor(section.status)} rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0`}
                        >
                          {getStatusIcon(section.status)}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-gray-600">{t("results.uploadPrompt")}</p>
              </div>
            )}

            {/* Resume Score */}
            {cvReport && !isLoading && (
              <div className="bg-[#2951A3] text-white rounded-lg p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold">
                  {t("results.scoreText")}: {Math.round(cvReport.score)}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParsePdf;
