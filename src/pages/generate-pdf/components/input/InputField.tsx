import InputFieldWrapper from "./InputFieldWrapper";

const InputField = ({
  defaultValue,
  onChange,
  label,
  placeholder = "",
  containerClass = "",
  labelClass = "",
  inputClass = "",
}: {
  defaultValue: string;
  onChange: (input: string) => void;
  label: string;
  placeholder?: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
}) => {
  return (
    <InputFieldWrapper
      label={label}
      containerClass={containerClass}
      labelClass={labelClass}
    >
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
        className={`bg-[#eff2f9] rounded-md ${inputClass}`}
        placeholder={placeholder}
      />
    </InputFieldWrapper>
  );
};

export default InputField;
