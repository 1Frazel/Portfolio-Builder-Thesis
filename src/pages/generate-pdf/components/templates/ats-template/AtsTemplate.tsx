import { useState } from "react";
import AtsDocument from "./AtsDocument";

import { useDebouncedCallback } from "use-debounce";
import Preview from "../../preview/Preview";
import {
  defaultPersonalDetail,
  personalDetail,
} from "../../input/personalDetail";
import PersonalDetail from "../../input/PersonalDetails";
import GeneratePdfFooter from "../../footer/GeneratePdfFooter";
import PdfDownloadBtn from "../../button/PdfDownloadBtn";

export interface IAtsTemplateUser {
  address: string;
  country: string;
  email: string;
  firstName: string;
  jobTarget: string;
  lastName: string;
  linkedinUrl: string;
  phone: string;
  photo: string;
  postalCode: string;
}
const AtsTemplate = () => {
  const [user, setUser] = useState({ ...defaultPersonalDetail });
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const handleChange = useDebouncedCallback((value: string, key: string) => {
    setUser({ ...user, [key]: value });
  }, 500);

  const AtsTemplateSection = [
    {
      id: "personalDetail",
      title: "Personal Information",
      component: (
        <PersonalDetail listInput={personalDetail} onChange={handleChange} />
      ),
    },
    {
      id: "professionalExperience",
      title: "Professional Experience",
      component: <>hello</>,
    },
    { id: "education", title: "Education", component: <></> },
    { id: "skills", title: "Skills", component: <></> },
    { id: "profileSummary", title: "Profile Summary", component: <></> },
    {
      id: "additionalSections",
      title: "Additional Sections",
      component: <></>,
    },
  ];

  const nextSectionTitle = AtsTemplateSection[activeSectionIndex].title;
  const nextComponent = AtsTemplateSection[activeSectionIndex].component;
  console.log({ user });

  return (
    <div className="h-full w-full flex gap-[24px]">
      <div className="flex flex-col gap-[8px] basis-1/2">
        {nextComponent}
        <GeneratePdfFooter
          nextSectionTitle={nextSectionTitle}
          activeSectionIndex={activeSectionIndex}
          sectionLength={AtsTemplateSection.length - 1}
          handlePreviousSection={() =>
            setActiveSectionIndex((prev) => prev - 1)
          }
          handleNextSection={() => setActiveSectionIndex((prev) => prev + 1)}
        >
          <PdfDownloadBtn
            filename="ats-cv"
            docs={<AtsDocument user={user} />}
          />
        </GeneratePdfFooter>
      </div>

      <Preview
        heightClass="h-[841px]"
        widthClass="w-[595px]"
        docs={<AtsDocument user={user} />}
      />
    </div>
  );
};

export default AtsTemplate;
