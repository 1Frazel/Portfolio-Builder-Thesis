import type { HTMLAttributes } from "react";

import InputFieldWrapper from "./InputFieldWrapper";

const InputField = ({
  defaultValue,
  onChange,
  label,
  placeholder = "",
  containerClass = "",
  labelClass = "",
  inputClass = "",
  sanitizeValue,
  inputMode,
  pattern,
}: {
  defaultValue: string;
  onChange: (input: string) => void;
  label: string;
  placeholder?: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  sanitizeValue?: (input: string) => string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
}) => {
  return (
    <InputFieldWrapper
      label={label}
      containerClass={containerClass}
      labelClass={labelClass}
    >
      <input
        type="text"
        onChange={(e) => {
          const nextValue = sanitizeValue
            ? sanitizeValue(e.target.value)
            : e.target.value;

          if (sanitizeValue) {
            e.currentTarget.value = nextValue;
          }

          onChange(nextValue);
        }}
        defaultValue={defaultValue}
        className={`bg-[#eff2f9] rounded-md ${inputClass}`}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
      />
    </InputFieldWrapper>
  );
};

export default InputField;
