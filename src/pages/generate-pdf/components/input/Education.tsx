import { DEFAULT_EDUCATION } from "../../const/generatePdfConst";
import type { IEducation } from "../../interface/generatePdfInterface";
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
    setEducations([...educations, { ...DEFAULT_EDUCATION, id: latestId + 1 }]);
  };

  const handleDeleteEducations = (id: number) => {
    setEducations(educations.filter((education) => education.id !== id));
  };

  const handleSectionUp = (currentIndex: number) => {
    const currentEducations = [...educations];

    const temporary = currentEducations[currentIndex];
    currentEducations[currentIndex] = currentEducations[currentIndex - 1];
    currentEducations[currentIndex - 1] = temporary;

    setEducations(currentEducations);
  };

  const handleSectionDown = (currentIndex: number) => {
    const currentEducations = [...educations];

    const temporary = currentEducations[currentIndex];
    currentEducations[currentIndex] = currentEducations[currentIndex + 1];
    currentEducations[currentIndex + 1] = temporary;

    setEducations(currentEducations);
  };

  return (
    <HiddenSectionWrapper
      containerTitle="Education"
      containerDescription="A varied education on your resume sums up the value that your learnings and background will bring to the job."
      addMoreSectionTitle="Add another education"
      handleAddMoreSection={handleAddEducations}
    >
      {educations.map((education, index) => {
        return (
          <EducationSection
            key={education.id}
            education={education}
            index={index}
            isFirst={index === 0}
            isLast={index === educations.length - 1}
            handleEditEducations={handleEditEducations}
            handleDeleteEducations={handleDeleteEducations}
            handleSectionUp={handleSectionUp}
            handleSectionDown={handleSectionDown}
          />
        );
      })}
    </HiddenSectionWrapper>
  );
};

export default Education;
