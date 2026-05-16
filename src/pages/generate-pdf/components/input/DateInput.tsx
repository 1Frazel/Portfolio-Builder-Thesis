import { DatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";

import InputFieldWrapper from "./InputFieldWrapper";

const DATE_FORMAT = "MMMM, YYYY";

const toPickerDefaultValue = (value: string): Dayjs | undefined => {
  if (!value) return undefined;

  const parsed = dayjs(value, DATE_FORMAT, true);
  return parsed.isValid() ? parsed : undefined;
};

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
    "w-full !rounded-md !border !border-slate-200 !bg-slate-100 !px-3 !py-2 !text-sm !text-slate-900 !shadow-none transition focus-within:!border-blue-500 focus-within:!bg-white focus-within:!ring-2 focus-within:!ring-blue-100 [&.ant-picker-focused]:!border-blue-500 [&.ant-picker-focused]:!bg-white [&.ant-picker-focused]:!shadow-none [&_.ant-picker-input>input]:!text-sm [&_.ant-picker-input>input]:!text-slate-900 [&_.ant-picker-input>input::placeholder]:!text-slate-400";

  const composedInputClass = `${defaultInputClass} ${inputClass}`;

  return (
    <InputFieldWrapper
      label={label}
      containerClass={containerClass}
      labelClass={labelClass}
    >
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 sm:gap-4">
        <DatePicker
          onChange={(selectedDate) =>
            startOnChange(selectedDate ? selectedDate.format(DATE_FORMAT) : "")
          }
          defaultValue={toPickerDefaultValue(startDefaultValue)}
          format={DATE_FORMAT}
          picker="month"
          className={composedInputClass}
          placeholder={placeholder}
        />

        <DatePicker
          onChange={(selectedDate) =>
            endOnChange(selectedDate ? selectedDate.format(DATE_FORMAT) : "")
          }
          defaultValue={toPickerDefaultValue(endDefaultValue)}
          format={DATE_FORMAT}
          picker="month"
          className={composedInputClass}
          placeholder={placeholder}
        />
      </div>
    </InputFieldWrapper>
  );
};

export default DateInput;
