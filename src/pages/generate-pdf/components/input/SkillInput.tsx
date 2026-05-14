import InputFieldWrapper from "./InputFieldWrapper";
import ResponsiveDropdown from "../../../../shared/components/ResponsiveDropdown";

const SkillInput = ({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (input: string) => void;
}) => {
  const listSkills = [
    {
      label: "Novice",
      value: "Novice",
    },
    {
      label: "Basic",
      value: "Basic",
    },
    {
      label: "Intermediate",
      value: "Intermediate",
    },
    {
      label: "Experienced",
      value: "Experienced",
    },
    {
      label: "Expert",
      value: "Expert",
    },
  ];

  return (
    <InputFieldWrapper label="Skills Expertise">
      <ResponsiveDropdown
        options={listSkills}
        value={defaultValue}
        placeholder="Select expertise"
        onChange={onChange}
      />
    </InputFieldWrapper>
  );
};

export default SkillInput;
