const InputWrapper = ({
  children,
  title,
  description,
  useGrid = false,
  isGrow = true,
  containerClass = "",
  childrenContainerClass = "",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  useGrid?: boolean;
  isGrow?: boolean;
  containerClass?: string;
  childrenContainerClass?: string;
}) => {
  return (
    <div
      className={`${containerClass ? containerClass : ""} ${isGrow ? "grow" : ""}`}
    >
      <div>
        {title && <h1 className="font-bold">{title}</h1>}
        {description && <p>{description}</p>}
      </div>

      <div
        className={`${useGrid ? "grid grid-cols-2 gap-[16px]" : ""} ${childrenContainerClass ? childrenContainerClass : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
