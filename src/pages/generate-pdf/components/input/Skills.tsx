import type React from "react";

import { HiddenSectionWrapper } from "./HiddenSectionWrapper";
import SkillSection from "./SkillSection";
import type { ISkill } from "../../interface/generatePdfInterface";
import { defaultSkills } from "../../const/generatePdfConst";

const Skills = ({
  skills,
  setSkills,
}: {
  skills: ISkill[];
  setSkills: React.Dispatch<React.SetStateAction<ISkill[]>>;
}) => {
  const handleEditSkills = (id: number, key: string, value: string) => {
    const newSkills = skills.map((skill) => {
      if (skill.id === id) {
        return {
          ...skill,
          [key]: value,
        };
      }
      return skill;
    });

    setSkills(newSkills);
  };

  const handleDeleteSkills = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleAddSkills = () => {
    const latestId = skills[skills.length - 1].id;
    setSkills([...skills, { ...defaultSkills, id: latestId + 1 }]);
  };

  return (
    <HiddenSectionWrapper
      containerTitle="Areas of Expertise"
      containerDescription="Choose important skills that show you fit the position"
      addMoreSectionTitle="Add another skills"
      handleAddMoreSection={handleAddSkills}
    >
      {skills.map((skill) => {
        return (
          <SkillSection
            key={skill.id}
            skill={skill}
            handleEditSkills={handleEditSkills}
            handleDeleteSkills={handleDeleteSkills}
          />
        );
      })}
    </HiddenSectionWrapper>
  );
};

export default Skills;
