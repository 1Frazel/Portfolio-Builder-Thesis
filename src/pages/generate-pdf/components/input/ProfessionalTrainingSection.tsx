import { useDebouncedCallback } from "use-debounce";
import type { IProfessionalTraining } from "../../interface/generatePdfInterface";
import { ExpandableSectionItem } from "./ExpandableSectionContainer";
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

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
        />
      ),
    },
  ];

  return (
    <ExpandableSectionItem
      title={training.courseName ? training.courseName : "(Not Specified)"}
      description={
        training.startAt &&
        `${training.startAt} - ${training.endsAt ? training.endsAt : "Now"}`
      }
      onDelete={() => handleDeleteProfessionalTraining(training.id)}
      onMoveUp={handleSectionUp}
      onMoveDown={handleSectionDown}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
      defaultExpanded={index === 0}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {listProfessionalTraining.map((list) => {
          return <div key={list.id}>{list.component}</div>;
        })}
      </div>
    </ExpandableSectionItem>
  );
};

export default ProfessionalTrainingSection;
