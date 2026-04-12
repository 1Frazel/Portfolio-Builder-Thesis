import InputWrapper from "./InputWrapper";
import { defaultWorkExperiences, type IWorkExperience } from "./workExperience";

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

  const handleAddMoreWorkExperiences = () => {
    const latestId = workExperiences[workExperiences.length - 1].id;
    setWorkExperience([
      ...workExperiences,
      { ...defaultWorkExperiences, id: latestId + 1 },
    ]);
  };

  const handleDeleteWorkExperience = (id: number) => {
    setWorkExperience(
      workExperiences.filter((experience) => experience.id !== id),
    );
  };
  return (
    <InputWrapper
      title="Work Experiences"
      description="Show your relevant experiences"
      childrenContainerClass="flex flex-col gap-[16px] relative"
    >
      {workExperiences.map((experience) => {
        return (
          <WorkSection
            key={experience.id}
            experience={experience}
            handleEditWorkExperience={handleEditWorkExperience}
            handleDeleteWorkExperience={handleDeleteWorkExperience}
          />
        );
      })}

      <button onClick={handleAddMoreWorkExperiences}>
        Add another experiences
      </button>
    </InputWrapper>
  );
};

export default WorkExperiences;
