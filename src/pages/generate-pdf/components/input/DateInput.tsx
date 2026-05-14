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
  const defaultInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const composedInputClass = `${defaultInputClass} ${inputClass}`;

  return (
    <InputFieldWrapper
      label={label}
      containerClass={containerClass}
      labelClass={labelClass}
    >
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 sm:gap-4">
        <input
          type="date"
          onChange={(e) => startOnChange(e.target.value)}
          defaultValue={startDefaultValue}
          className={composedInputClass}
          placeholder={placeholder}
        />

        <input
          type="date"
          onChange={(e) => endOnChange(e.target.value)}
          defaultValue={endDefaultValue}
          className={composedInputClass}
          placeholder={placeholder}
        />
      </div>
    </InputFieldWrapper>
  );
};

export default DateInput;
