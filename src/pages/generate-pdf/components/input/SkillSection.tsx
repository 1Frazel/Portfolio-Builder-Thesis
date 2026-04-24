import { useDebouncedCallback } from "use-debounce";
import InputField from "./InputField";

import SkillInput from "./SkillInput";
import { HiddenSection } from "./HiddenSectionWrapper";
import InputWrapper from "./InputWrapper";
import type { ISkill } from "../../interface/generatePdfInterface";

const SkillSection = ({
  skill,
  handleEditSkills,
  handleDeleteSkills,
}: {
  skill: ISkill;
  handleEditSkills: (id: number, key: string, value: string) => void;
  handleDeleteSkills: (id: number) => void;
}) => {
  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditSkills(id, key, value);
    },
    500,
  );

  const listSkills = [
    {
      id: "name",
      component: (
        <InputField
          defaultValue={skill.name}
          onChange={(input: string) => {
            handleTextChange(skill.id, "name", input);
          }}
          label="Name"
        />
      ),
    },
    {
      id: "expertise",
      component: (
        <SkillInput
          defaultValue={skill.expertise}
          onChange={(input: string) => {
            handleTextChange(skill.id, "expertise", input);
          }}
        />
      ),
      containerClass: "col-span-2",
    },
  ];

  return (
    <HiddenSection
      headerTitle={skill.name ? skill.name : "(Not Specified)"}
      headerDescription={skill.expertise && skill.expertise}
      handleDelBtn={() => handleDeleteSkills(skill.id)}
    >
      <InputWrapper useGrid>
        {listSkills.map((list) => {
          return (
            <div key={list.id} className={list.containerClass}>
              {list.component}
            </div>
          );
        })}
      </InputWrapper>
    </HiddenSection>
  );
};

export default SkillSection;
