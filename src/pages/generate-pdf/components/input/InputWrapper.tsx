const InputWrapper = ({
  children,
  title,
  description,
  useGrid = false,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  useGrid?: boolean;
}) => {
  return (
    <div className="grow p-[16px]">
      <div className="flex justify-between items-center">
        <div>
          {title && <h1 className="font-bold">{title}</h1>}
          {description && <p>{description}</p>}
        </div>
      </div>
      <div
        className={`${useGrid ? "grid grid-cols-2 gap-[16px]" : ""} mt-[16px]`}
      >
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
