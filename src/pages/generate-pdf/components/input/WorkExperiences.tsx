import { DEFAULT_WORK_EXPERIENCES } from "../../const/generatePdfConst";
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
      { ...DEFAULT_WORK_EXPERIENCES, id: latestId + 1 },
    ]);
  };

  const handleDeleteWorkExperiences = (id: number) => {
    setWorkExperience(
      workExperiences.filter((experience) => experience.id !== id),
    );
  };

  const handleSectionUp = (currentIndex: number) => {
    const currentWorks = [...workExperiences];

    const temporary = currentWorks[currentIndex];
    currentWorks[currentIndex] = currentWorks[currentIndex - 1];
    currentWorks[currentIndex - 1] = temporary;

    setWorkExperience(currentWorks);
  };

  const handleSectionDown = (currentIndex: number) => {
    const currentWorks = [...workExperiences];

    const temporary = currentWorks[currentIndex];
    currentWorks[currentIndex] = currentWorks[currentIndex + 1];
    currentWorks[currentIndex + 1] = temporary;

    setWorkExperience(currentWorks);
  };

  return (
    <HiddenSectionWrapper
      containerTitle="Work Experiences"
      containerDescription="Show your relevant experiences."
      addMoreSectionTitle="Add another experiences"
      handleAddMoreSection={handleAddMoreWorkExperiences}
    >
      {workExperiences.map((experience, index) => {
        return (
          <WorkSection
            key={experience.id}
            experience={experience}
            index={index}
            isFirst={index === 0}
            isLast={index === workExperiences.length - 1}
            handleEditWorkExperiences={handleEditWorkExperiences}
            handleDeleteWorkExperiences={handleDeleteWorkExperiences}
            handleSectionUp={handleSectionUp}
            handleSectionDown={handleSectionDown}
          />
        );
      })}
    </HiddenSectionWrapper>
  );
};

export default WorkExperiences;
