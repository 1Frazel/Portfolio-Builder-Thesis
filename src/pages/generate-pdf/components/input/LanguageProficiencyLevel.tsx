import { useTranslation } from "react-i18next";
import InputFieldWrapper from "./InputFieldWrapper";
import ResponsiveDropdown from "../../../../shared/components/ResponsiveDropdown";

const LanguageProficiencyLevel = ({
  selectedSkill,
  handleClick,
}: {
  selectedSkill: string;
  handleClick: (input: string) => void;
}) => {
  const { t } = useTranslation("creationPage");

  const proficiencyList = [
    { label: t("additionalSectionLanguages.levels.basic", "Basic"), value: "Basic" },
    { label: t("additionalSectionLanguages.levels.conversational", "Conversational"), value: "Conversational" },
    { label: t("additionalSectionLanguages.levels.professional", "Professional"), value: "Professional" },
    { label: t("additionalSectionLanguages.levels.fluent", "Fluent"), value: "Fluent" },
    { label: t("additionalSectionLanguages.levels.native", "Native"), value: "Native" },
  ];

  return (
    <InputFieldWrapper label={t("additionalSectionLanguages.labels.level", "Level")}>
      <ResponsiveDropdown
        options={proficiencyList}
        value={selectedSkill}
        placeholder={t("additionalSectionLanguages.placeholder", "Select Level")}
        onChange={handleClick}
      />
    </InputFieldWrapper>
  );
};

export default LanguageProficiencyLevel;
