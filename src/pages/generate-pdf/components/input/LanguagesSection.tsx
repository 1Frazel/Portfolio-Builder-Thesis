import { useDebouncedCallback } from "use-debounce";
import { HiddenSection } from "./HiddenSectionWrapper";
import InputField from "./InputField";
import InputWrapper from "./InputWrapper";

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

  const listLanguages = [
    {
      id: "languages",
      component: (
        <InputField
          defaultValue={language.language}
          onChange={(input: string) => {
            handleTextChanges(language.id, "language", input);
          }}
          label="Languages"
        />
      ),
    },
    {
      id: "level",
      component: (
        <LanguageProficiencyLevel
          selectedSkill={language.level}
          handleClick={(input) =>
            handleTextChanges(language.id, "level", input)
          }
        />
      ),
    },
  ];

  return (
    <HiddenSection
      headerTitle={language.language ? language.language : "(Not Specified)"}
      headerDescription={language.level && language.level}
      handleDelBtn={() => handleDeleteLanguages(language.id)}
      handleSectionUp={handleSectionUp}
      handleSectionDown={handleSectionDown}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
    >
      <InputWrapper useGrid>
        {listLanguages.map((list) => {
          return <div key={list.id}>{list.component}</div>;
        })}
      </InputWrapper>
    </HiddenSection>
  );
};

export default LanguagesSection;
