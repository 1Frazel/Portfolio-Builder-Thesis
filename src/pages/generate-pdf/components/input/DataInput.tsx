const DataInput = ({
  label,
  onChange,
  stateKey,
  containerClass = "",
  labelClass = "",
  inputClass = "",
}: {
  label: string;
  stateKey: string;
  onChange: (input: string, stateKey: string) => void;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
}) => {
  return (
    <div className={`flex flex-col ${containerClass}`}>
      <label htmlFor="" className={`text-sm ${labelClass}`}>
        {label}
      </label>
      <input
        type="text"
        className={`bg-[#eff2f9] rounded-md ${inputClass}`}
        onChange={(e) => onChange(e.target.value, stateKey)}
      />
    </div>
  );
};

export default DataInput;
