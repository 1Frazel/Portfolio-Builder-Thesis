import { useDebouncedCallback } from "use-debounce";
import InputField from "./InputField";
import { ExpandableSectionItem } from "./ExpandableSectionContainer";

import LanguageProficiencyLevel from "./LanguageProficiencyLevel";
import type { ILanguages } from "../../interface/generatePdfInterface";

const LanguagesSection = ({
  language,
  index,
  isFirst,
  isLast,
  handleEditLanguages,
  handleDeleteLanguages,
  handleSectionUp,
  handleSectionDown,
}: {
  language: ILanguages;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  handleEditLanguages: (id: number, key: string, value: string) => void;
  handleDeleteLanguages: (id: number) => void;
  handleSectionUp: (currentIndex: number) => void;
  handleSectionDown: (currentIndex: number) => void;
}) => {
  const handleTextChanges = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditLanguages(id, key, value);
    },
    500,
  );

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const listLanguages = [
    {
      id: "languages",
      component: (
        <InputField
          defaultValue={language.name}
          onChange={(input: string) => {
            handleTextChanges(language.id, "name", input);
          }}
          label="Languages"
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "level",
      component: (
        <LanguageProficiencyLevel
          selectedSkill={language.expertise}
          handleClick={(input) =>
            handleTextChanges(language.id, "expertise", input)
          }
        />
      ),
    },
  ];

  return (
    <ExpandableSectionItem
      title={language.name ? language.name : "(Not Specified)"}
      description={language.expertise && language.expertise}
      onDelete={() => handleDeleteLanguages(language.id)}
      onMoveUp={handleSectionUp}
      onMoveDown={handleSectionDown}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
      defaultExpanded={index === 0}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {listLanguages.map((list) => {
          return <div key={list.id}>{list.component}</div>;
        })}
      </div>
    </ExpandableSectionItem>
  );
};

export default LanguagesSection;
