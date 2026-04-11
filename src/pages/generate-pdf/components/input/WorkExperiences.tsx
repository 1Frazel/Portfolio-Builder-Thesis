import InputWrapper from "./InputWrapper";
import type { IListInput } from "./personalDetail";

import type { IWorkExperience } from "./workExperience";
import WorkSection from "./WorkSection";

const WorkExperiences = ({
  listInput,
  workExperiences,
  setWorkExperience,
}: {
  listInput: IListInput[];
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
    >
      {workExperiences.map((experience) => {
        return (
          <WorkSection
            key={experience.id}
            listInput={listInput}
            experience={experience}
            handleEditWorkExperience={handleEditWorkExperience}
          />
        );
      })}
    </InputWrapper>
  );
};

export default WorkExperiences;
