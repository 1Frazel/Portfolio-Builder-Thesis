import { DEFAULT_PROFESSIONAL_TRAINING } from "../../const/generatePdfConst";
import type { IProfessionalTraining } from "../../interface/generatePdfInterface";
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";
import ProfessionalTrainingSection from "./ProfessionalTrainingSection";

const ProfessionalTraining = ({
  professionalTraining,
  setProfessionalTraining,
  summaryMode = false,
}: {
  professionalTraining: IProfessionalTraining[];
  setProfessionalTraining: React.Dispatch<
    React.SetStateAction<IProfessionalTraining[]>
  >;
  summaryMode?: boolean;
}) => {
  const handleEditProfessionalTraining = (
    id: number,
    key: string,
    value: string,
  ) => {
    setProfessionalTraining(
      professionalTraining.map((training) => {
        if (training.id === id) {
          return {
            ...training,
            [key]: value,
          };
        }
        return training;
      }),
    );
  };

  const handleAddProfessionalTraining = () => {
    const latestId =
      professionalTraining.length > 0
        ? professionalTraining[professionalTraining.length - 1].id
        : 0;

    setProfessionalTraining([
      ...professionalTraining,
      {
        ...DEFAULT_PROFESSIONAL_TRAINING,
        id: latestId + 1,
      },
    ]);
  };

  const handleDeleteProfessionalTraining = (id: number) => {
    setProfessionalTraining(
      professionalTraining.filter((training) => training.id !== id),
    );
  };

  const handleSectionUp = (currentIndex: number) => {
    const currentProfessionalTraining = [...professionalTraining];

    const temporary = currentProfessionalTraining[currentIndex];
    currentProfessionalTraining[currentIndex] =
      currentProfessionalTraining[currentIndex - 1];
    currentProfessionalTraining[currentIndex - 1] = temporary;

    setProfessionalTraining(currentProfessionalTraining);
  };

  const handleSectionDown = (currentIndex: number) => {
    const currentProfessionalTraining = [...professionalTraining];

    const temporary = currentProfessionalTraining[currentIndex];
    currentProfessionalTraining[currentIndex] =
      currentProfessionalTraining[currentIndex + 1];
    currentProfessionalTraining[currentIndex + 1] = temporary;

    setProfessionalTraining(currentProfessionalTraining);
  };

  return (
    <ExpandableSectionContainer
      title="Professional Training"
      addButtonTitle="Add another professional training"
      description="Detail any non-degree educational programs, corporate training, or specialized workshops you have completed. Focus on training that directly aligns with your career goals and adds tangible value to your skill set."
      onAdd={handleAddProfessionalTraining}
      summaryMode={summaryMode}
    >
      {professionalTraining.map((training, index) => {
        return (
          <ProfessionalTrainingSection
            key={training.id}
            training={training}
            index={index}
            isFirst={index === 0}
            isLast={index === professionalTraining.length - 1}
            handleEditProfessionalTraining={handleEditProfessionalTraining}
            handleDeleteProfessionalTraining={handleDeleteProfessionalTraining}
            handleSectionUp={handleSectionUp}
            handleSectionDown={handleSectionDown}
          />
        );
      })}
    </ExpandableSectionContainer>
  );
};

export default ProfessionalTraining;
