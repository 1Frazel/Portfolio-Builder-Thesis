import InputFieldWrapper from "./InputFieldWrapper";

const DateInput = ({
  startOnChange,
  endOnChange,
  label,
  type,
  placeholder,
  containerClass = "",
  labelClass = "",
  inputClass = "",
}: {
  startOnChange: (input: string) => void;
  endOnChange: (input: string) => void;
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
      <div className="flex gap-[16px] items-center">
        <input
          type={type}
          className={`bg-[#eff2f9] rounded-md ${inputClass}`}
          onChange={(e) => startOnChange(e.target.value)}
          placeholder={placeholder}
        />

        <input
          type={type}
          className={`bg-[#eff2f9] rounded-md ${inputClass}`}
          onChange={(e) => endOnChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </InputFieldWrapper>
  );
};

export default DateInput;
