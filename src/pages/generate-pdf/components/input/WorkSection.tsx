import { useState } from "react";
import type { IWorkExperience } from "./workExperience";

import { useDebouncedCallback } from "use-debounce";

import InputWrapper from "./InputWrapper";

import InputField from "./InputField";
import DateInput from "./DateInput";
import TextArea from "./TextArea";

const DATE_INPUT_KEY = {
  start: "startAt",
  end: "endsAt",
};

const WorkSection = ({
  experience,
  handleEditWorkExperience,
}: {
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

  const listWorkExperiences = [
    {
      id: "jobTitle",
      component: (
        <InputField
          defaultValue={experience.jobTitle}
          onChange={(input: string) => {
            handleTextChange(experience.id, "jobTitle", input);
          }}
          label="Job Title"
        />
      ),
    },
    {
      id: "employer",
      component: (
        <InputField
          defaultValue={experience.employer}
          onChange={(input: string) => {
            handleTextChange(experience.id, "employer", input);
          }}
          label="Employer"
        />
      ),
    },
    {
      id: "startAndEndDate",
      component: (
        <DateInput
          startDefaultValue={experience.startAt}
          endDefaultValue={experience.endsAt}
          startOnChange={(value: string) => {
            handleTextChange(experience.id, DATE_INPUT_KEY.start, value);
          }}
          endOnChange={(value: string) => {
            handleTextChange(experience.id, DATE_INPUT_KEY.end, value);
          }}
          label="Start & End Date"
          placeholder="MM // YYYY"
        />
      ),
    },
    {
      id: "address",
      component: (
        <InputField
          defaultValue={experience.address}
          onChange={(input: string) => {
            handleTextChange(experience.id, "address", input);
          }}
          label="Address"
        />
      ),
    },
    {
      id: "description",
      component: (
        <TextArea
          defaultValue={experience.description}
          onChange={(input: string) => {
            handleTextChange(experience.id, "description", input);
          }}
          label="Description"
        />
      ),
      containerClass: "col-span-2",
    },
  ];

  return (
    <div className="shadow-md p-[16px] flex flex-col gap-[16px]">
      <WorkSectionHeader
        experience={experience}
        isShown={isShown}
        setIsShown={setIsShown}
      />
      {isShown && (
        <InputWrapper useGrid>
          {listWorkExperiences.map((list) => (
            <div key={list.id} className={list.containerClass}>
              {list.component}
            </div>
          ))}
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
