const Button = ({
  text,
  handleClick,
  buttonClass,
  disabled,
  isLoading,
  textClass = "font-bold text-xs md:text-base",
}: {
  text: string;
  handleClick: () => void;
  buttonClass: string;
  disabled?: boolean;
  isLoading?: boolean;
  textClass?: string;
}) => {
  return (
    <button
      onClick={disabled ? undefined : handleClick}
      disabled={disabled}
      className={`rounded-full ${buttonClass} p-2 md:px-[20px] md:py-[8px] ${disabled ? "opacity-60 pointer-events-none" : "cursor-pointer"}`}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        <p className={textClass}>{text}</p>
      </div>
    </button>
  );
};

export default Button;
