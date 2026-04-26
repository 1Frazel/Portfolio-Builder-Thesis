import { useDebouncedCallback } from "use-debounce";
import type { IProfessionalTraining } from "../../interface/generatePdfInterface";
import { HiddenSection } from "./HiddenSectionWrapper";
import InputWrapper from "./InputWrapper";
import InputField from "./InputField";
import DateInput from "./DateInput";

const ProfessionalTrainingSection = ({
  training,
  index,
  isFirst,
  isLast,
  handleEditProfessionalTraining,
  handleDeleteProfessionalTraining,
  handleSectionUp,
  handleSectionDown,
}: {
  training: IProfessionalTraining;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  handleEditProfessionalTraining: (
    id: number,
    key: string,
    value: string,
  ) => void;
  handleDeleteProfessionalTraining: (id: number) => void;
  handleSectionUp: (currentIndex: number) => void;
  handleSectionDown: (currentIndex: number) => void;
}) => {
  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditProfessionalTraining(id, key, value);
    },
    500,
  );

  const listProfessionalTraining = [
    {
      id: "courseName",
      component: (
        <InputField
          defaultValue={training.courseName}
          onChange={(input: string) => {
            handleTextChange(training.id, "courseName", input);
          }}
          label="Course Name"
        />
      ),
    },
    {
      id: "institution",
      component: (
        <InputField
          defaultValue={training.institution}
          onChange={(input: string) => {
            handleTextChange(training.id, "institution", input);
          }}
          label="Institution"
        />
      ),
    },
    {
      id: "startAndEndDate",
      component: (
        <DateInput
          startDefaultValue={training.startAt}
          endDefaultValue={training.endsAt}
          startOnChange={(value: string) => {
            handleTextChange(training.id, "startAt", value);
          }}
          endOnChange={(value: string) => {
            handleTextChange(training.id, "endsAt", value);
          }}
          label="Start & End Date"
          placeholder="MM // YYYY"
        />
      ),
    },
  ];

  return (
    <HiddenSection
      headerTitle={
        training.courseName ? training.courseName : "(Not Specified)"
      }
      headerDescription={
        training.startAt &&
        `${training.startAt} - ${training.endsAt ? training.endsAt : "Now"}`
      }
      handleDelBtn={() => handleDeleteProfessionalTraining(training.id)}
      handleSectionUp={handleSectionUp}
      handleSectionDown={handleSectionDown}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
    >
      <InputWrapper useGrid>
        {listProfessionalTraining.map((list) => {
          return <div key={list.id}>{list.component}</div>;
        })}
      </InputWrapper>
    </HiddenSection>
  );
};

export default ProfessionalTrainingSection;
