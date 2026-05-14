const Button = ({
  text,
  handleClick,
  buttonClass,
}: {
  text: string;
  handleClick: () => void;
  buttonClass: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className={`rounded-md ${buttonClass} p-2 md:px-[16px] md:py-[8px] cursor-pointer`}
    >
      <p className="font-bold text-xs md:text-base">{text}</p>
    </button>
  );
};

export default Button;
