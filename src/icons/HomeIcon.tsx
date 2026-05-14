import useIsMobile from "../shared/hooks/useIsMobile";

const HomeIcon = () => {
  const isMobile = useIsMobile();
  const size = isMobile ? "25" : "35";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="36" height="36" rx="4.5" stroke="white" />
      <path
        d="M27.3421 22.1054V31.0867H8.37695V24.5409H15.0975M27.3421 15.7519V11.872L21.4701 6H8.37695V18.02M21.4701 6V11.872H27.3421"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 28.7981C3.05515 28.1328 3.19273 27.477 3.40957 26.8456C3.85879 25.4265 4.67219 24.15 5.76865 23.1433C6.75221 22.2787 7.92545 21.6576 9.1935 21.3304C10.6087 20.959 12.0767 21.0852 13.5212 21.0852H20.0288C21.1137 21.0852 22.2308 21.1821 23.3127 21.0426C24.0805 20.9413 24.7455 20.6184 25.4267 20.2675C26.1201 19.9079 26.7881 19.5013 27.4261 19.0505C28.8503 18.0382 30.145 16.855 31.2811 15.5273"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M33.2099 12.9819C32.7343 14.5145 32.3497 16.5697 32.4407 18.0935L31.0065 15.8357L28.4609 15.021C29.9627 14.7245 31.852 13.8304 33.2099 12.9819Z"
        fill="white"
      />
      <path
        d="M17.5674 24.5791H21.7189"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.8457 24.5791H25.1258"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3926 27.8586H25.1298"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3926 18.0391H21.4701"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3926 15.103H24.5793"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5371 12.167H19.1381"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3926 9.23096H18.9936"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
