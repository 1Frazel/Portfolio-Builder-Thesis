const SkillInput = ({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (input: string) => void;
}) => {
  const listSkills = [
    {
      value: 1,
      description: "novice",
      title: "Novice",
      color: "#1fc8a6",
    },
    {
      value: 2,
      description: "basic",
      title: "Basic",
      color: "#1fc838",
    },
    {
      value: 3,
      description: "intermediate",
      title: "Intermediate",
      color: "#dfeb30",
    },
    {
      value: 4,
      description: "experienced",
      title: "Experiences",
      color: "#eb8130",
    },
    {
      value: 5,
      description: "expert",
      title: "Expert",
      color: "#eb3030",
    },
  ];

  return (
    <div>
      <p>Skills Expertise</p>
      <div className="flex items-center gap-[16px]">
        {listSkills.map((skill) => {
          return (
            <div key={skill.value} className="h-[70px] w-[70px]">
              <div
                onClick={() => onChange(skill.description)}
                className={`${skill.description === defaultValue ? `bg-[${skill.color}]` : "bg-[#889290]"} flex justify-center items-center h-full`}
              >
                <p className="text-white">{skill.value}</p>
              </div>
              <p className="text-xs text-center">{skill.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillInput;
