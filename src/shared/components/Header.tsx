import { Link } from "react-router";
import HomeIcon from "../../icons/HomeIcon";
import Button from "./Button";
import useIsMobile from "../hooks/useIsMobile";
import HomeNav from "../../icons/HomeNav";
import { useState } from "react";
import HomeCancel from "../../icons/HomeCancel";
import Profile from "../../icons/Profile";

interface IListHeader {
  id: string;
  title: string;
  path: string;
}

const Header = () => {
  const isMobile = useIsMobile();

  const listHeader = [
    {
      id: "home",
      title: "Home",
      path: "/",
    },
    {
      id: "creation",
      title: "Creation",
      path: "/creation",
    },
    {
      id: "checker",
      title: "Resume Checker",
      path: "/checker",
    },
  ];

  return (
    <>
      {isMobile ? (
        <MobileHeader listHeader={listHeader} />
      ) : (
        <DesktopHeader listHeader={listHeader} />
      )}
    </>
  );
};

const DesktopHeader = ({ listHeader }: { listHeader: IListHeader[] }) => {
  return (
    <div className="bg-[#2951A3] p-2 md:px-[64px] md:py-[32px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[16px]">
          <HomeIcon />
          {listHeader.map((header) => {
            return (
              <Link
                key={header.id}
                to={header.path}
                className="text-white text-xs md:text-base"
              >
                {header.title}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center md:gap-4">
          <Button
            text="Sign Up"
            buttonClass="text-white bg-[#FF9900]"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

const MobileHeader = ({ listHeader }: { listHeader: IListHeader[] }) => {
  const [isShowNav, setIsShowNav] = useState(false);

  const handleNavClose = () => {
    setIsShowNav(false);
  };

  return (
    <>
      <div className="bg-[#2951A3] px-4 py-4 flex items-center justify-between relative z-40">
        <HomeIcon />
        <button
          onClick={() => setIsShowNav(!isShowNav)}
          className="cursor-pointer"
        >
          {isShowNav ? <HomeCancel /> : <HomeNav />}
        </button>
      </div>

      {isShowNav && (
        <div className="fixed inset-0 bg-[#D9D9D9] z-30 flex flex-col gap-4 p-4 pt-20">
          <div className="p-4 flex bg-[#FFFFFF] rounded-md flex items-center gap-4 ">
            <Profile />
            <p className="text-xl text-[#2951A3] text-bold">Sign In</p>
          </div>
          <nav className="flex flex-col gap-4 p-4 bg-[#FFFFFF] rounded-md">
            <div className="border-b border-gray-200 py-2">
              <p className="text-xl text-[#2951A3] text-bold">Explore</p>
            </div>
            {listHeader.map((header) => (
              <Link
                key={header.id}
                to={header.path}
                className="text-xl text-[#2951A3] text-bold"
                onClick={handleNavClose}
              >
                {header.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
