import type { IWorkExperience } from "./workExperience";

import { useDebouncedCallback } from "use-debounce";

import InputWrapper from "./InputWrapper";

import InputField from "./InputField";
import DateInput from "./DateInput";
import TextArea from "./TextArea";
import { HiddenSection } from "./HiddenSectionWrapper";

const WorkSection = ({
  experience,
  handleEditWorkExperiences,
  handleDeleteWorkExperiences,
}: {
  experience: IWorkExperience;
  handleEditWorkExperiences: (id: number, key: string, value: string) => void;
  handleDeleteWorkExperiences: (id: number) => void;
}) => {
  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditWorkExperiences(id, key, value);
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
            handleTextChange(experience.id, "startAt", value);
          }}
          endOnChange={(value: string) => {
            handleTextChange(experience.id, "endsAt", value);
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
    <HiddenSection
      headerTitle={
        experience.jobTitle ? experience.jobTitle : "(Not Specified)"
      }
      headerDescription={
        experience.startAt &&
        `${experience.startAt} - ${experience.endsAt ? experience.endsAt : "Now"}`
      }
      handleDelBtn={() => handleDeleteWorkExperiences(experience.id)}
    >
      <InputWrapper useGrid>
        {listWorkExperiences.map((list) => (
          <div key={list.id} className={list.containerClass}>
            {list.component}
          </div>
        ))}
      </InputWrapper>
    </HiddenSection>
  );
};

export default WorkSection;
