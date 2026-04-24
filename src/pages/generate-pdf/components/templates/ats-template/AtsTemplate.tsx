import { type JSX } from "react";

import Preview from "../../preview/Preview";

import GeneratePdfFooter from "../../footer/GeneratePdfFooter";
import PdfDownloadBtn from "../../button/PdfDownloadBtn";
import useAtsTemplate from "../../../../../shared/hooks/useAtsTemplate";

const A4_SIZE = {
  height: "h-[841px]",
  width: "w-[595px]",
};

export interface IListSections {
  id: string;
  title: string;
  component: JSX.Element;
}

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
  } = useAtsTemplate();

  return (
    <div className="h-full w-full flex gap-[24px]">
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

      <Preview
        heightClass={A4_SIZE.height}
        widthClass={A4_SIZE.width}
        docs={docs}
      />
    </div>
  );
};

export default AtsTemplate;
