import type React from "react";
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";

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

  const handleSectionUp = (currentIndex: number) => {
    const currentLanguages = [...languages];

    const temporary = currentLanguages[currentIndex];
    currentLanguages[currentIndex] = currentLanguages[currentIndex - 1];
    currentLanguages[currentIndex - 1] = temporary;

    setLanguages(currentLanguages);
  };

  const handleSectionDown = (currentIndex: number) => {
    const currentLanguages = [...languages];

    const temporary = currentLanguages[currentIndex];
    currentLanguages[currentIndex] = currentLanguages[currentIndex + 1];
    currentLanguages[currentIndex + 1] = temporary;

    setLanguages(currentLanguages);
  };

  return (
    <ExpandableSectionContainer
      title="Languages"
      addButtonTitle="Add another language"
      onAdd={handleAddMoreLanguages}
    >
      {languages.map((language, index) => {
        return (
          <LanguagesSection
            key={language.id}
            language={language}
            index={index}
            isFirst={index === 0}
            isLast={index === languages.length - 1}
            handleEditLanguages={handleEditLanguages}
            handleDeleteLanguages={handleDeleteLanguages}
            handleSectionUp={handleSectionUp}
            handleSectionDown={handleSectionDown}
          />
        );
      })}
    </ExpandableSectionContainer>
  );
};

export default Languages;
