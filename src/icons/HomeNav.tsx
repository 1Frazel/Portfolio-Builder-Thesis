import useIsMobile from "../shared/hooks/useIsMobile";

const HomeNav = () => {
  const isMobile = useIsMobile();
  const size = isMobile ? "25" : "35";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42.5 2.5H2.5"
        stroke="white"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M42.5 15H2.5"
        stroke="white"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path
        d="M42.5 27.5H2.5"
        stroke="white"
        stroke-width="5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default HomeNav;
