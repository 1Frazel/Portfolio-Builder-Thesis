import { defaultProfessionalTraining } from "../../const/generatePdfConst";
import type { IProfessionalTraining } from "../../interface/generatePdfInterface";
import { HiddenSectionWrapper } from "./HiddenSectionWrapper";
import ProfessionalTrainingSection from "./ProfessionalTrainingSection";

const ProfessionalTraining = ({
  professionalTraining,
  setProfessionalTraining,
}: {
  professionalTraining: IProfessionalTraining[];
  setProfessionalTraining: React.Dispatch<
    React.SetStateAction<IProfessionalTraining[]>
  >;
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
    const latestId = professionalTraining[professionalTraining.length - 1].id;

    setProfessionalTraining([
      ...professionalTraining,
      {
        ...defaultProfessionalTraining,
        id: latestId + 1,
      },
    ]);
  };

  const handleDeleteProfessionalTraining = (id: number) => {
    setProfessionalTraining(
      professionalTraining.filter((training) => training.id !== id),
    );
  };

  return (
    <HiddenSectionWrapper
      containerTitle="Professional Training"
      addMoreSectionTitle="Add another professional training"
      handleAddMoreSection={handleAddProfessionalTraining}
    >
      {professionalTraining.map((training) => {
        return (
          <ProfessionalTrainingSection
            key={training.id}
            training={training}
            handleEditProfessionalTraining={handleEditProfessionalTraining}
            handleDeleteProfessionalTraining={handleDeleteProfessionalTraining}
          />
        );
      })}
    </HiddenSectionWrapper>
  );
};

export default ProfessionalTraining;
