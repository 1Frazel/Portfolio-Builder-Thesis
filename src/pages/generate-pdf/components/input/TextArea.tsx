import InputFieldWrapper from "./InputFieldWrapper";

const TextArea = ({
  onChange,
  label,
  placeholder,
  containerClass = "",
  labelClass = "",
  inputClass = "",
}: {
  onChange: (input: string) => void;
  label: string;
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
      <textarea
        onChange={(e) => onChange(e.target.value)}
        className={`bg-[#eff2f9] rounded-md ${inputClass}`}
        placeholder={placeholder}
      />
    </InputFieldWrapper>
  );
};

export default TextArea;
