interface IListSkills {
  value: number;
  description: string;
  color: string;
}

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
      description: "Novice",
      color: "#1fc8a6",
    },
    {
      value: 2,
      description: "Basic",
      color: "#1fc838",
    },
    {
      value: 3,
      description: "Intermediate",
      color: "#dfeb30",
    },
    {
      value: 4,
      description: "Experiences",
      color: "#eb8130",
    },
    {
      value: 5,
      description: "Expert",
      color: "#eb3030",
    },
  ];

  const getBackgroundColor = (skill: IListSkills) => {
    const isDefault = skill.description === defaultValue;
    return `${isDefault ? `${skill.color}` : "#889290"}`;
  };

  return (
    <div>
      <p>Skills Expertise</p>
      <div className="flex items-center gap-[16px]">
        {listSkills.map((skill) => {
          return (
            <div key={skill.value} className="h-[70px] w-[70px]">
              <div
                style={{ backgroundColor: `${getBackgroundColor(skill)}` }}
                onClick={() => onChange(skill.description)}
                className={`flex justify-center items-center h-full`}
              >
                <p className="text-white">{skill.value}</p>
              </div>
              <p className="text-xs text-center">{skill.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillInput;
