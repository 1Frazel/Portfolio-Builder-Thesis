import InputFieldWrapper from "./InputFieldWrapper";

const InputField = ({
  onChange,
  stateKey,
  label,
  type,
  placeholder,
  containerClass = "",
  labelClass = "",
  inputClass = "",
}: {
  onChange: (input: string, stateKey: string) => void;
  stateKey: string;
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
        onChange={(e) => onChange(e.target.value, stateKey)}
        placeholder={placeholder}
      />
    </InputFieldWrapper>
  );
};

export default InputField;
