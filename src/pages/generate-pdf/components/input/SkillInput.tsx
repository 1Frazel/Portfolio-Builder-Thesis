const SkillInput = ({
  handleClick,
}: {
  handleClick: (input: string) => void;
}) => {
  const listSkills = [
    {
      value: 1,
      description: "novice",
      title: "Novice",
      color: "#1FC8A6",
    },
    {
      value: 2,
      description: "basic",
      title: "Basic",
      color: "#1FC838",
    },
    {
      value: 3,
      description: "intermediate",
      title: "Intermediate",
      color: "#DFEB30",
    },
    {
      value: 4,
      description: "experienced",
      title: "Experiences",
      color: "#EB8130",
    },
    {
      value: 5,
      description: "experienced",
      title: "Experienced",
      color: "#EB3030",
    },
  ];

  return (
    <div className="flex items-center gap-[16px]">
      {listSkills.map((skill) => {
        return (
          <div key={skill.value}>
            <div
              onClick={() => handleClick(skill.description)}
              className={`bg-[#${skill.color}] h-[86px] w-[48px] flex justify-center items-center`}
            >
              <p className="text-white">{skill.value}</p>
            </div>
            <p>{skill.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SkillInput;
