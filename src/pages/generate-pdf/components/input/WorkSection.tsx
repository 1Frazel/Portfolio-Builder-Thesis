import { useState } from "react";
import type { IWorkExperience } from "./workExperience";
import type { IListInput } from "./personalDetail";
import InputField from "./InputField";
import { useDebouncedCallback } from "use-debounce";
import DateInput from "./DateInput";
import TextArea from "./TextArea";
import InputWrapper from "./InputWrapper";

const DATE_INPUT_KEY = {
  start: "startAt",
  end: "endsAt",
};

const WorkSection = ({
  listInput,
  experience,
  handleEditWorkExperience,
}: {
  listInput: IListInput[];
  experience: IWorkExperience;
  handleEditWorkExperience: (id: number, key: string, value: string) => void;
}) => {
  const [isShown, setIsShown] = useState(false);

  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditWorkExperience(id, key, value);
    },
    500,
  );

  const getInputField = (input: IListInput) => {
    const handleChange = (value: string) => {
      handleTextChange(experience.id, input.id, value);
    };

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
          startOnChange={(value: string) => {
            handleTextChange(experience.id, DATE_INPUT_KEY.start, value);
          }}
          endOnChange={(value: string) => {
            handleTextChange(experience.id, DATE_INPUT_KEY.end, value);
          }}
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

  return (
    <div className="shadow-md p-[16px] flex flex-col gap-[16px]">
      <WorkSectionHeader
        experience={experience}
        isShown={isShown}
        setIsShown={setIsShown}
      />
      {isShown && (
        <InputWrapper useGrid>
          {listInput.map((input) => getInputField(input))}
        </InputWrapper>
      )}
    </div>
  );
};

const WorkSectionHeader = ({
  experience,
  isShown,
  setIsShown,
}: {
  experience: IWorkExperience;
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <InputWrapper
      title={experience.jobTitle ? experience.jobTitle : "(Not Specified)"}
      description={
        experience.startAt &&
        `${experience.startAt} - ${experience.endsAt ? experience.endsAt : "Now"}`
      }
      containerClass="flex items-center justify-between"
    >
      <button onClick={() => setIsShown(!isShown)}>
        {isShown ? "Hide" : "Show"}
      </button>
    </InputWrapper>
  );
};

export default WorkSection;
