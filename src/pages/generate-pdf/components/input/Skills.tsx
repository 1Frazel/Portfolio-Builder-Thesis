import type React from "react";

import SkillSection from "./SkillSection";
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";
import type { ISkill } from "../../interface/generatePdfInterface";
import { DEFAULT_SKILLS } from "../../const/generatePdfConst";

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
    setSkills([...skills, { ...DEFAULT_SKILLS, id: latestId + 1 }]);
  };

  const handleSectionUp = (currentIndex: number) => {
    const currentSkills = [...skills];

    const temporary = currentSkills[currentIndex];
    currentSkills[currentIndex] = currentSkills[currentIndex - 1];
    currentSkills[currentIndex - 1] = temporary;

    setSkills(currentSkills);
  };

  const handleSectionDown = (currentIndex: number) => {
    const currentSkills = [...skills];

    const temporary = currentSkills[currentIndex];
    currentSkills[currentIndex] = currentSkills[currentIndex + 1];
    currentSkills[currentIndex + 1] = temporary;

    setSkills(currentSkills);
  };

  return (
    <ExpandableSectionContainer
      title="Areas of Expertise"
      description="Choose important skills that show you fit the position"
      addButtonTitle="Add another skills"
      onAdd={handleAddSkills}
    >
      {skills.map((skill, index) => {
        return (
          <SkillSection
            key={skill.id}
            skill={skill}
            index={index}
            isFirst={index === 0}
            isLast={index === skills.length - 1}
            handleEditSkills={handleEditSkills}
            handleDeleteSkills={handleDeleteSkills}
            handleSectionUp={handleSectionUp}
            handleSectionDown={handleSectionDown}
          />
        );
      })}
    </ExpandableSectionContainer>
  );
};

export default Skills;
