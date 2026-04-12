import InputWrapper from "./InputWrapper";
import type { IWorkExperience } from "./workExperience";

import WorkSection from "./WorkSection";

const WorkExperiences = ({
  workExperiences,
  setWorkExperience,
}: {
  workExperiences: IWorkExperience[];
  setWorkExperience: React.Dispatch<React.SetStateAction<IWorkExperience[]>>;
}) => {
  const handleEditWorkExperience = (id: number, key: string, value: string) => {
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

  return (
    <InputWrapper
      title="Work Experiences"
      description="Show your relevant experiences"
      childrenContainerClass="flex flex-col gap-[8px]"
    >
      {workExperiences.map((experience) => {
        return (
          <WorkSection
            key={experience.id}
            experience={experience}
            handleEditWorkExperience={handleEditWorkExperience}
          />
        );
      })}
    </InputWrapper>
  );
};

export default WorkExperiences;
