import { defaultEducation, type IEducation } from "./education";
import EducationSection from "./EducationSection";
import { HiddenSectionWrapper } from "./HiddenSectionWrapper";

const Education = ({
  educations,
  setEducations,
}: {
  educations: IEducation[];
  setEducations: React.Dispatch<React.SetStateAction<IEducation[]>>;
}) => {
  const handleEditEducations = (id: number, key: string, value: string) => {
    const updatedWorkExperiences = educations.map((education) => {
      if (education.id === id) {
        return {
          ...education,
          [key]: value,
        };
      }
      return education;
    });

    setEducations(updatedWorkExperiences);
  };

  const handleAddEducations = () => {
    const latestId = educations[educations.length - 1].id;
    setEducations([...educations, { ...defaultEducation, id: latestId + 1 }]);
  };

  const handleDeleteEducations = (id: number) => {
    setEducations(educations.filter((education) => education.id !== id));
  };

  return (
    <HiddenSectionWrapper
      containerTitle="Education"
      containerDescription="A varied education on your resume sums up the value that your learnings and background will bring to the job."
      addMoreSectionTitle="Add another education"
      handleAddMoreSection={handleAddEducations}
    >
      {educations.map((education) => {
        return (
          <EducationSection
            key={education.id}
            education={education}
            handleEditEducations={handleEditEducations}
            handleDeleteEducations={handleDeleteEducations}
          />
        );
      })}
    </HiddenSectionWrapper>
  );
};

export default Education;
