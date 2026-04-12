import DateInput from "../components/input/DateInput";
import InputField from "../components/input/InputField";
import type { IListInput } from "../components/input/personalDetail";
import TextArea from "../components/input/TextArea";

const generatePdfHelper = (() => {
  const getInputField = ({
    input,
    handleChange,
    startOnChange,
    endOnChange,
  }: {
    input: IListInput;
    handleChange: (value: string) => void;
    startOnChange: (value: string) => void;
    endOnChange: (value: string) => void;
  }) => {
    if (input.inputType === "text") {
      return (
        <InputField
          key={input.id}
          onChange={handleChange}
          label={input.label}
          type={input.inputType}
          placeholder={input.placeholder}
          containerClass={input.containerClass}
          labelClass={input.labelClass}
          inputClass={input.inputClass}
        />
      );
    }
    if (input.inputType === "date") {
      return (
        <DateInput
          key={input.id}
          startOnChange={startOnChange}
          endOnChange={endOnChange}
          label={input.label}
          type={input.inputType}
          placeholder={input.placeholder}
          containerClass={input.containerClass}
          labelClass={input.labelClass}
          inputClass={input.inputClass}
        />
      );
    }
    if (input.inputType === "textarea") {
      return (
        <TextArea
          key={input.id}
          onChange={handleChange}
          label={input.label}
          placeholder={input.placeholder}
          containerClass={input.containerClass}
          labelClass={input.labelClass}
          inputClass={input.inputClass}
        />
      );
    }
  };

  return { getInputField };
})();

export default generatePdfHelper;
