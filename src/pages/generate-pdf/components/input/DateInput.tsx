import { useState } from "react";
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
  const [startDate, setStartDate] = useState<string>(startDefaultValue);
  const [endDate, setEndDate] = useState<string>(endDefaultValue);
  const validateDates = (start: string, end: string) => {
    if (start && end) {
      const startDayjs = dayjs(start, DATE_FORMAT);
      const endDayjs = dayjs(end, DATE_FORMAT);
      if (startDayjs.isAfter(endDayjs)) {
        return;
      }
    }
  };

  const handleStartChange = (selectedDate: Dayjs | null) => {
    const formattedDate = selectedDate ? selectedDate.format(DATE_FORMAT) : "";
    setStartDate(formattedDate);
    startOnChange(formattedDate);
    validateDates(formattedDate, endDate);
  };

  const handleEndChange = (selectedDate: Dayjs | null) => {
    const formattedDate = selectedDate ? selectedDate.format(DATE_FORMAT) : "";
    setEndDate(formattedDate);
    endOnChange(formattedDate);
    validateDates(startDate, formattedDate);
  };

  const disabledStartDate = (current: Dayjs) => {
    if (!endDate) {
      return false;
    }
    const end = dayjs(endDate, DATE_FORMAT);
    return current && current.isAfter(end, 'month');
  };

  const disabledEndDate = (current: Dayjs) => {
    if (!startDate) {
      return false;
    }
    const start = dayjs(startDate, DATE_FORMAT);
    return current && current.isBefore(start, 'month');
  };

  const defaultInputClass =
    "w-full !rounded-md !border !border-slate-200 !bg-slate-100 !px-3 !py-2 !text-sm !text-slate-900 !shadow-none transition focus-within:!border-blue-500 focus-within:!bg-white focus-within:!ring-2 focus-within:!ring-blue-100 [&.ant-picker-focused]:!border-blue-500 [&.ant-picker-focused]:!bg-white [&.ant-picker-focused]:!shadow-none [&_.ant-picker-input>input]:!text-sm [&_.ant-picker-input>input]:!text-slate-900 [&_.ant-picker-input>input::placeholder]:!text-slate-400";

  const composedInputClass = `${defaultInputClass} ${inputClass}`;

  return (
    <InputFieldWrapper
      label={label}
      containerClass={containerClass}
      labelClass={labelClass}
    >
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 sm:gap-4">
          <DatePicker
            onChange={handleStartChange}
            defaultValue={toPickerDefaultValue(startDefaultValue)}
            format={DATE_FORMAT}
            picker="month"
            className={composedInputClass}
            placeholder={placeholder}
            disabledDate={disabledStartDate}
          />

          <DatePicker
            onChange={handleEndChange}
            defaultValue={toPickerDefaultValue(endDefaultValue)}
            format={DATE_FORMAT}
            picker="month"
            className={composedInputClass}
            placeholder={placeholder}
            disabledDate={disabledEndDate}
          />
        </div>
      </div>
    </InputFieldWrapper>
  );
};

export default DateInput;
