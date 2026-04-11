import InputFieldWrapper from "./InputFieldWrapper";

const InputField = ({
  onChange,
  label,
  type,
  placeholder,
  containerClass = "",
  labelClass = "",
  inputClass = "",
}: {
  onChange: (input: string) => void;
  label: string;
  type: string;
  placeholder: string;
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
        type={type}
        className={`bg-[#eff2f9] rounded-md ${inputClass}`}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </InputFieldWrapper>
  );
};

export default InputField;
