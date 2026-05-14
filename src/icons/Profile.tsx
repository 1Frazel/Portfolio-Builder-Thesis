import useIsMobile from "../shared/hooks/useIsMobile";

const Profile = () => {
  const isMobile = useIsMobile();
  const size = isMobile ? "45" : "65";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 103 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="51.5" cy="51.5" r="50" stroke="#2951A3" stroke-width="3" />
      <circle cx="50.6268" cy="32.1538" r="18.2349" fill="#2951A3" />
      <path
        d="M50.3458 55.4382C33.3029 55.4382 19.4868 69.2543 19.4868 86.2972H81.2048C81.2048 69.2543 67.3888 55.4382 50.3458 55.4382Z"
        fill="#2951A3"
      />
    </svg>
  );
};

export default Profile;
