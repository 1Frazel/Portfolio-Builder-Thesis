import { useDebouncedCallback } from "use-debounce";
import { HiddenSection } from "./HiddenSectionWrapper";
import InputField from "./InputField";
import InputWrapper from "./InputWrapper";
import type { ILanguages } from "./languages";
import LanguageProficiencyLevel from "./LanguageProficiencyLevel";

const LanguagesSection = ({
  language,
  handleEditLanguages,
  handleDeleteLanguages,
}: {
  language: ILanguages;
  handleEditLanguages: (id: number, key: string, value: string) => void;
  handleDeleteLanguages: (id: number) => void;
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
