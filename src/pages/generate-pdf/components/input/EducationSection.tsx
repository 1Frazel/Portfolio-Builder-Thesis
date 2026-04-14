import { useDebouncedCallback } from "use-debounce";
import type { IEducation } from "./education";
import InputField from "./InputField";
import DateInput from "./DateInput";
import TextArea from "./TextArea";
import { HiddenSection } from "./HiddenSectionWrapper";
import InputWrapper from "./InputWrapper";

const EducationSection = ({
  education,
  handleEditEducations,
  handleDeleteEducations,
}: {
  education: IEducation;
  handleEditEducations: (id: number, key: string, value: string) => void;
  handleDeleteEducations: (id: number) => void;
}) => {
  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditEducations(id, key, value);
    },
    500,
  );

  const listEducations = [
    {
      id: "school",
      component: (
        <InputField
          defaultValue={education.school}
          onChange={(input: string) =>
            handleTextChange(education.id, "school", input)
          }
          label="School"
        />
      ),
    },
    {
      id: "degree",
      component: (
        <InputField
          defaultValue={education.degree}
          onChange={(input: string) =>
            handleTextChange(education.id, "degree", input)
          }
          label="Degree"
        />
      ),
    },
    {
      id: "startAndEndDate",
      component: (
        <DateInput
          startDefaultValue={education.startAt}
          endDefaultValue={education.endsAt}
          startOnChange={(value: string) => {
            handleTextChange(education.id, "startAt", value);
          }}
          endOnChange={(value: string) => {
            handleTextChange(education.id, "endsAt", value);
          }}
          label="Start & End Date"
          placeholder="MM // YYYY"
        />
      ),
    },
    {
      id: "city",
      component: (
        <InputField
          defaultValue={education.city}
          onChange={(input: string) =>
            handleTextChange(education.id, "city", input)
          }
          label="City"
        />
      ),
    },
    {
      id: "description",
      component: (
        <TextArea
          defaultValue={education.description}
          onChange={(input: string) => {
            handleTextChange(education.id, "description", input);
          }}
          label="Description"
        />
      ),
      containerClass: "col-span-2",
    },
  ];

  return (
    <HiddenSection
      headerTitle={education.school ? education.school : "(Not Specified)"}
      headerDescription={
        education.startAt &&
        `${education.startAt} - ${education.endsAt ? education.endsAt : "Now"}`
      }
      handleDelBtn={() => handleDeleteEducations(education.id)}
    >
      <InputWrapper useGrid>
        {listEducations.map((list) => (
          <div key={list.id} className={list.containerClass}>
            {list.component}
          </div>
        ))}
      </InputWrapper>
    </HiddenSection>
  );
};

export default EducationSection;
