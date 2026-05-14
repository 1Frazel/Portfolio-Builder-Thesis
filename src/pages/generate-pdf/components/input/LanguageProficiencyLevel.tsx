import InputFieldWrapper from "./InputFieldWrapper";
import ResponsiveDropdown from "../../../../shared/components/ResponsiveDropdown";

const LanguageProficiencyLevel = ({
  selectedSkill,
  handleClick,
}: {
  selectedSkill: string;
  handleClick: (input: string) => void;
}) => {
  const proficiencyList = [
    { label: "Basic", value: "Basic" },
    { label: "Conversational", value: "Conversational" },
    { label: "Professional", value: "Professional" },
    { label: "Fluent", value: "Fluent" },
    { label: "Native", value: "Native" },
  ];

  return (
    <InputFieldWrapper label="Level">
      <ResponsiveDropdown
        options={proficiencyList}
        value={selectedSkill}
        placeholder="Select Level"
        onChange={handleClick}
      />
    </InputFieldWrapper>
  );
};

export default LanguageProficiencyLevel;
