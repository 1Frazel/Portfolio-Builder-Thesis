import { useDebouncedCallback } from "use-debounce";
import { useTranslation } from "react-i18next";
import InputField from "./InputField";

import SkillInput from "./SkillInput";
import { ExpandableSectionItem } from "./ExpandableSectionContainer";
import type { ISkill } from "../../interface/generatePdfInterface";

const SkillSection = ({
  skill,
  index,
  isFirst,
  isLast,
  handleEditSkills,
  handleDeleteSkills,
  handleSectionUp,
  handleSectionDown,
}: {
  skill: ISkill;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  handleEditSkills: (id: number, key: string, value: string) => void;
  handleDeleteSkills: (id: number) => void;
  handleSectionUp: (currentIndex: number) => void;
  handleSectionDown: (currentIndex: number) => void;
}) => {
  const { t } = useTranslation("creationPage");

  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditSkills(id, key, value);
    },
    500,
  );

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const listSkills = [
    {
      id: "name",
      component: (
        <InputField
          defaultValue={skill.name}
          onChange={(input: string) => {
            handleTextChange(skill.id, "name", input);
          }}
          label={t("skills.labels.skillName")}
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "expertise",
      component: (
        <SkillInput
          defaultValue={skill.expertise}
          onChange={(input: string) => {
            handleTextChange(skill.id, "expertise", input);
          }}
        />
      ),
    },
  ];

  return (
    <ExpandableSectionItem
      title={skill.name ? skill.name : t("skills.defaultJobTitle", "(Not Specified)")}
      description={skill.expertise && skill.expertise}
      onDelete={() => handleDeleteSkills(skill.id)}
      onMoveUp={handleSectionUp}
      onMoveDown={handleSectionDown}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
      defaultExpanded={index === 0}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {listSkills.map((list) => {
          return <div key={list.id}>{list.component}</div>;
        })}
      </div>
    </ExpandableSectionItem>
  );
};

export default SkillSection;
