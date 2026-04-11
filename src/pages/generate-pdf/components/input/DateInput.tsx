import InputFieldWrapper from "./InputFieldWrapper";

const DATE_INPUT_KEY = {
  start: "startAt",
  end: "endsAt",
};

const DateInput = ({
  onChange,
  label,
  type,
  placeholder,
  containerClass = "",
  labelClass = "",
  inputClass = "",
}: {
  onChange: (input: string, stateKey: string) => void;
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
          onChange={(e) => onChange(e.target.value, DATE_INPUT_KEY.start)}
          placeholder={placeholder}
        />

        <input
          type={type}
          className={`bg-[#eff2f9] rounded-md ${inputClass}`}
          onChange={(e) => onChange(e.target.value, DATE_INPUT_KEY.end)}
          placeholder={placeholder}
        />
      </div>
    </InputFieldWrapper>
  );
};

export default DateInput;
