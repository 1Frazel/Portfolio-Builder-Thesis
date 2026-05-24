import { useTranslation } from "react-i18next";
import InputFieldWrapper from "./InputFieldWrapper";
import ResponsiveDropdown from "../../../../shared/components/ResponsiveDropdown";

const SkillInput = ({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (input: string) => void;
}) => {
  const { t } = useTranslation("creationPage");

  const listSkills = [
    {
      label: t("skills.levels.novice", "Novice"),
      value: "Novice",
    },
    {
      label: t("skills.levels.basic", "Basic"),
      value: "Basic",
    },
    {
      label: t("skills.levels.intermediate", "Intermediate"),
      value: "Intermediate",
    },
    {
      label: t("skills.levels.experienced", "Experienced"),
      value: "Experienced",
    },
    {
      label: t("skills.levels.expert", "Expert"),
      value: "Expert",
    },
  ];

  return (
    <InputFieldWrapper label={t("skills.labels.skillExpertise", "Skill Expertise")}>
      <ResponsiveDropdown
        options={listSkills}
        value={defaultValue}
        placeholder={t("skills.placeholderExpertise", "Select expertise level")}
        onChange={onChange}
      />
    </InputFieldWrapper>
  );
};

export default SkillInput;
