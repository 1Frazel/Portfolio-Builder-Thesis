import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";

import InputField from "./InputField";
import DateInput from "./DateInput";
import TextArea from "./TextArea";
import { ExpandableSectionItem } from "./ExpandableSectionContainer";
import type { IEducation } from "../../interface/generatePdfInterface";

const EducationSection = ({
  education,
  index,
  isFirst,
  isLast,
  handleEditEducations,
  handleDeleteEducations,
  handleSectionUp,
  handleSectionDown,
}: {
  education: IEducation;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  handleEditEducations: (id: number, key: string, value: string) => void;
  handleDeleteEducations: (id: number) => void;
  handleSectionUp: (currentIndex: number) => void;
  handleSectionDown: (currentIndex: number) => void;
}) => {
  const { t } = useTranslation("creationPage");
  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditEducations(id, key, value);
    },
    500,
  );

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const listEducations = [
    {
      id: "school",
      component: (
        <InputField
          defaultValue={education.school}
          onChange={(input: string) =>
            handleTextChange(education.id, "school", input)
          }
          label={t("education.labels.institution")}
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "degree",
      component: (
        <InputField
          defaultValue={education.degree}
          onChange={(input: string) =>
            handleTextChange(education.id, "degree", input)
          }
          label={t("education.labels.degree")}
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "startAndEndDate",
      component: (
        <DateInput
          startDefaultValue={education.startAt}
          endDefaultValue={education.endsAt}
          startOnChange={(value: string) => {
            handleTextChange(education.id, "startAt", value);
          }}
          endOnChange={(value: string) => {
            handleTextChange(education.id, "endsAt", value);
          }}
          label={t("education.labels.startEndDate")}
          placeholder={t("education.labels.placeholder")}
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "city",
      component: (
        <InputField
          defaultValue={education.city}
          onChange={(input: string) =>
            handleTextChange(education.id, "city", input)
          }
          label={t("education.labels.city")}
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "description",
      component: (
        <TextArea
          defaultValue={education.description}
          onChange={(input: string) => {
            handleTextChange(education.id, "description", input);
          }}
          label={t("education.labels.description")}
          inputClass={fieldInputClass}
        />
      ),
      containerClass: "sm:col-span-2",
    },
  ];

  return (
    <ExpandableSectionItem
      title={education.school ? education.school : t("education.defaultDegree", "(Not Specified)")}
      description={
        education.startAt &&
        `${education.startAt} - ${education.endsAt ? education.endsAt : "Now"}`
      }
      onDelete={() => handleDeleteEducations(education.id)}
      onMoveUp={handleSectionUp}
      onMoveDown={handleSectionDown}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
      defaultExpanded={index === 0}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {listEducations.map((list) => (
          <div key={list.id} className={list.containerClass}>
            {list.component}
          </div>
        ))}
      </div>
    </ExpandableSectionItem>
  );
};

export default EducationSection;
