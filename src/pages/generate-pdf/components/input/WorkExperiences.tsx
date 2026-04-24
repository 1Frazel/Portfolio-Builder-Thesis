import { defaultWorkExperiences } from "../../const/generatePdfConst";
import type { IWorkExperience } from "../../interface/generatePdfInterface";
import { HiddenSectionWrapper } from "./HiddenSectionWrapper";

import WorkSection from "./WorkSection";

const WorkExperiences = ({
  workExperiences,
  setWorkExperience,
}: {
  workExperiences: IWorkExperience[];
  setWorkExperience: React.Dispatch<React.SetStateAction<IWorkExperience[]>>;
}) => {
  const handleEditWorkExperiences = (
    id: number,
    key: string,
    value: string,
  ) => {
    const updatedWorkExperience = workExperiences.map((experience) => {
      if (experience.id === id) {
        return {
          ...experience,
          [key]: value,
        };
      }
      return experience;
    });

    setWorkExperience(updatedWorkExperience);
  };

  const handleAddMoreWorkExperiences = () => {
    const latestId = workExperiences[workExperiences.length - 1].id;
    setWorkExperience([
      ...workExperiences,
      { ...defaultWorkExperiences, id: latestId + 1 },
    ]);
  };

  const handleDeleteWorkExperiences = (id: number) => {
    setWorkExperience(
      workExperiences.filter((experience) => experience.id !== id),
    );
  };
  return (
    <HiddenSectionWrapper
      containerTitle="Work Experiences"
      containerDescription="Show your relevant experiences."
      addMoreSectionTitle="Add another experiences"
      handleAddMoreSection={handleAddMoreWorkExperiences}
    >
      {workExperiences.map((experience) => {
        return (
          <WorkSection
            key={experience.id}
            experience={experience}
            handleEditWorkExperiences={handleEditWorkExperiences}
            handleDeleteWorkExperiences={handleDeleteWorkExperiences}
          />
        );
      })}
    </HiddenSectionWrapper>
  );
};

export default WorkExperiences;
