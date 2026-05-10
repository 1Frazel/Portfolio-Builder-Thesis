const InputFieldWrapper = ({
  children,
  label,
  containerClass = "",
  labelClass = "",
}: {
  children: React.ReactNode;
  label: string;
  containerClass?: string;
  labelClass?: string;
}) => {
  return (
    <div className={`flex flex-col ${containerClass}`}>
      <label htmlFor="" className={`text-sm ${labelClass}`}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputFieldWrapper;
