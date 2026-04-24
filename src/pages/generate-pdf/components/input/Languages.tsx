import type React from "react";
import { HiddenSectionWrapper } from "./HiddenSectionWrapper";

import LanguagesSection from "./LanguagesSection";
import type { ILanguages } from "../../interface/generatePdfInterface";
import { DEFAULT_LANGUAGES } from "../../const/generatePdfConst";

const Languages = ({
  languages,
  setLanguages,
}: {
  languages: ILanguages[];
  setLanguages: React.Dispatch<React.SetStateAction<ILanguages[]>>;
}) => {
  const handleEditLanguages = (id: number, key: string, value: string) => {
    setLanguages(
      languages.map((language) => {
        if (language.id === id) {
          return {
            ...language,
            [key]: value,
          };
        }
        return language;
      }),
    );
  };

  const handleAddMoreLanguages = () => {
    const latestId = languages[languages.length - 1].id;

    setLanguages([
      ...languages,
      {
        ...DEFAULT_LANGUAGES,
        id: latestId + 1,
      },
    ]);
  };

  const handleDeleteLanguages = (id: number) => {
    setLanguages(languages.filter((language) => language.id !== id));
  };

  return (
    <HiddenSectionWrapper
      containerTitle="Languages"
      addMoreSectionTitle="Add another languages"
      handleAddMoreSection={handleAddMoreLanguages}
    >
      {languages.map((language) => {
        return (
          <LanguagesSection
            key={language.id}
            language={language}
            handleEditLanguages={handleEditLanguages}
            handleDeleteLanguages={handleDeleteLanguages}
          />
        );
      })}
    </HiddenSectionWrapper>
  );
};

export default Languages;
