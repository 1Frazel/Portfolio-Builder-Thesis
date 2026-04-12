import { useState } from "react";
import type { IWorkExperience } from "./workExperience";
import type { IListInput } from "./personalDetail";

import { useDebouncedCallback } from "use-debounce";

import InputWrapper from "./InputWrapper";
import generatePdfHelper from "../../utils/generatePdfHelper";

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

  return (
    <div className="shadow-md p-[16px] flex flex-col gap-[16px]">
      <WorkSectionHeader
        experience={experience}
        isShown={isShown}
        setIsShown={setIsShown}
      />
      {isShown && (
        <InputWrapper useGrid>
          {listInput.map((input) => {
            return (
              <WorkSectionBody
                key={input.id}
                experience={experience}
                input={input}
                handleEditWorkExperience={handleEditWorkExperience}
              />
            );
          })}
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

const WorkSectionBody = ({
  experience,
  input,
  handleEditWorkExperience,
}: {
  experience: IWorkExperience;
  input: IListInput;
  handleEditWorkExperience: (id: number, key: string, value: string) => void;
}) => {
  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditWorkExperience(id, key, value);
    },
    500,
  );

  const handleChange = (value: string) => {
    handleTextChange(experience.id, input.id, value);
  };

  const startOnChange = (value: string) => {
    handleTextChange(experience.id, DATE_INPUT_KEY.start, value);
  };

  const endOnChange = (value: string) => {
    handleTextChange(experience.id, DATE_INPUT_KEY.end, value);
  };

  return generatePdfHelper.getInputField({
    input,
    handleChange,
    startOnChange,
    endOnChange,
  });
};

export default WorkSection;
