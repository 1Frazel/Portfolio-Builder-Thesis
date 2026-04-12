import InputFieldWrapper from "./InputFieldWrapper";

const DateInput = ({
  startDefaultValue,
  endDefaultValue,
  startOnChange,
  endOnChange,
  label,
  placeholder,
  containerClass = "",
  labelClass = "",
  inputClass = "",
}: {
  startDefaultValue: string;
  endDefaultValue: string;
  startOnChange: (input: string) => void;
  endOnChange: (input: string) => void;
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
      <div className="flex gap-[16px] items-center">
        <input
          type="date"
          onChange={(e) => startOnChange(e.target.value)}
          defaultValue={startDefaultValue}
          className={`bg-[#eff2f9] rounded-md ${inputClass}`}
          placeholder={placeholder}
        />

        <input
          type="date"
          onChange={(e) => endOnChange(e.target.value)}
          defaultValue={endDefaultValue}
          className={`bg-[#eff2f9] rounded-md ${inputClass}`}
          placeholder={placeholder}
        />
      </div>
    </InputFieldWrapper>
  );
};

export default DateInput;
