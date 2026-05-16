import { useDebouncedCallback } from "use-debounce";

import InputField from "./InputField";
import DateInput from "./DateInput";
import TextArea from "./TextArea";
import { ExpandableSectionItem } from "./ExpandableSectionContainer";
import type { IWorkExperience } from "../../interface/generatePdfInterface";

const WorkSection = ({
  experience,
  index,
  isFirst,
  isLast,
  handleEditWorkExperiences,
  handleDeleteWorkExperiences,
  handleSectionUp,
  handleSectionDown,
}: {
  experience: IWorkExperience;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  handleEditWorkExperiences: (id: number, key: string, value: string) => void;
  handleDeleteWorkExperiences: (id: number) => void;
  handleSectionUp: (currentIndex: number) => void;
  handleSectionDown: (currentIndex: number) => void;
}) => {
  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditWorkExperiences(id, key, value);
    },
    500,
  );

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const listWorkExperiences = [
    {
      id: "jobTitle",
      component: (
        <InputField
          defaultValue={experience.jobTitle}
          onChange={(input: string) => {
            handleTextChange(experience.id, "jobTitle", input);
          }}
          label="Job Title"
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "employer",
      component: (
        <InputField
          defaultValue={experience.employer}
          onChange={(input: string) => {
            handleTextChange(experience.id, "employer", input);
          }}
          label="Employer"
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "startAndEndDate",
      component: (
        <DateInput
          startDefaultValue={experience.startAt}
          endDefaultValue={experience.endsAt}
          startOnChange={(value: string) => {
            handleTextChange(experience.id, "startAt", value);
          }}
          endOnChange={(value: string) => {
            handleTextChange(experience.id, "endsAt", value);
          }}
          label="Start & End Date"
          placeholder="MM // YYYY"
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "address",
      component: (
        <InputField
          defaultValue={experience.address}
          onChange={(input: string) => {
            handleTextChange(experience.id, "address", input);
          }}
          label="Address"
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "description",
      component: (
        <TextArea
          defaultValue={experience.description}
          onChange={(input: string) => {
            handleTextChange(experience.id, "description", input);
          }}
          label="Description"
          inputClass={fieldInputClass}
        />
      ),
      containerClass: "sm:col-span-2",
    },
  ];

  return (
    <ExpandableSectionItem
      title={experience.jobTitle ? experience.jobTitle : "(Not Specified)"}
      description={
        experience.startAt &&
        `${experience.startAt} - ${experience.endsAt ? experience.endsAt : "Now"}`
      }
      onDelete={() => handleDeleteWorkExperiences(experience.id)}
      onMoveUp={handleSectionUp}
      onMoveDown={handleSectionDown}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
      defaultExpanded={index === 0}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {listWorkExperiences.map((list) => (
          <div key={list.id} className={list.containerClass}>
            {list.component}
          </div>
        ))}
      </div>
    </ExpandableSectionItem>
  );
};

export default WorkSection;
