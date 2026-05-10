import Preview from "../../preview/Preview";

import GeneratePdfFooter from "../../footer/GeneratePdfFooter";
import PdfDownloadBtn from "../../button/PdfDownloadBtn";
import useAtsTemplate from "../../../../../shared/hooks/useAtsTemplate";
import Header from "../../../../../shared/components/Header";

const AtsTemplate = () => {
  const {
    nextComponent,
    nextSectionTitle,
    activeSectionIndex,
    sectionLength,
    handlePreviousSection,
    handleNextSection,
    activeAdditionalSection,
    handleAdditionalSection,
    docs,
  } = useAtsTemplate({ useMock: true });

  return (
    <div className="h-screen w-screen px-[16px] py-[8px]">
      <Header />
      <div className="h-full w-full flex gap-[24px] px-[24px]">
        <div className="flex flex-col gap-[8px] basis-1/2">
          {nextComponent}
          <GeneratePdfFooter
            nextSectionTitle={nextSectionTitle}
            activeSectionIndex={activeSectionIndex}
            sectionLength={sectionLength}
            handlePreviousSection={handlePreviousSection}
            handleNextSection={handleNextSection}
            activeAdditionalSection={activeAdditionalSection}
            handleAdditionalSection={handleAdditionalSection}
          >
            <PdfDownloadBtn filename="ats-cv" docs={docs} />
          </GeneratePdfFooter>
        </div>

        <Preview docs={docs} />
      </div>
    </div>
  );
};

export default AtsTemplate;
