import type React from "react";
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";

import LanguagesSection from "./LanguagesSection";
import type { ILanguages } from "../../interface/generatePdfInterface";
import { DEFAULT_LANGUAGES } from "../../const/generatePdfConst";

const Languages = ({
  languages,
  setLanguages,
  summaryMode = false,
}: {
  languages: ILanguages[];
  setLanguages: React.Dispatch<React.SetStateAction<ILanguages[]>>;
  summaryMode?: boolean;
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
    const latestId =
      languages.length > 0 ? languages[languages.length - 1].id : 0;

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
      addButtonTitle="Add another languages"
      description="Specify any foreign languages you are proficient in, along with your exact fluency level (e.g., Native, Professional, Basic). This is highly valuable for multinational companies or roles requiring diverse communication."
      onAdd={handleAddMoreLanguages}
      summaryMode={summaryMode}
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
