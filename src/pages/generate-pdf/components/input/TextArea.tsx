import InputFieldWrapper from "./InputFieldWrapper";

const TextArea = ({
  defaultValue,
  onChange,
  label,
  placeholder,
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
      <textarea
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
        className={`bg-[#eff2f9] rounded-md h-[150px] ${inputClass}`}
        placeholder={placeholder}
      />
    </InputFieldWrapper>
  );
};

export default TextArea;
