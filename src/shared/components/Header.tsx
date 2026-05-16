import { Link } from "react-router";
import HomeIcon from "../../icons/HomeIcon";
import Button from "./Button";
import useIsMobile from "../hooks/useIsMobile";
import HomeNav from "../../icons/HomeNav";
import { useState } from "react";
import HomeCancel from "../../icons/HomeCancel";
import Profile from "../../icons/Profile";
import { useAuth } from "../hooks/useAuth";

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
  const { user, handleLogin, handleLogout, loading } = useAuth();

  console.log(user);
  return (
    <div className="bg-[#2951A3] p-2 md:px-[64px] md:py-[32px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[16px]">
          <HomeIcon />
          {listHeader.map((header) => {
            const isCreation = header.id === "creation";
            if (isCreation && !user) {
              return (
                <button
                  key={header.id}
                  title="Sign in to create resumes"
                  onClick={() => handleLogin()}
                  className="text-white text-xs md:text-base opacity-60 cursor-pointer"
                >
                  {header.title}
                </button>
              );
            }

            return (
              <Link
                key={header.id}
                to={header.path}
                className={`text-white text-xs md:text-base ${isCreation && loading ? "opacity-50 pointer-events-none" : ""}`}
              >
                {header.title}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center md:gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : null}
              <p className="text-white text-sm">
                {user.displayName ?? user.email}
              </p>
              <Button
                text="Sign Out"
                buttonClass="text-white bg-[#FF9900]"
                handleClick={() => handleLogout()}
              />
            </div>
          ) : (
            <Button
              text={loading ? "Loading..." : "Sign In"}
              buttonClass="text-white bg-[#FF9900]"
              handleClick={() => handleLogin()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const MobileHeader = ({ listHeader }: { listHeader: IListHeader[] }) => {
  const [isShowNav, setIsShowNav] = useState(false);
  const { user, handleLogin, handleLogout } = useAuth();

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
            {user ? (
              <div className="flex flex-col">
                <p className="text-xl text-[#2951A3] text-bold">
                  {user.displayName ?? user.email}
                </p>
                <button
                  onClick={() => handleLogout()}
                  className="text-sm text-[#2951A3]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleLogin()}
                className="text-xl text-[#2951A3] text-bold"
              >
                Sign In
              </button>
            )}
          </div>
          <nav className="flex flex-col gap-4 p-4 bg-[#FFFFFF] rounded-md">
            <div className="border-b border-gray-200 py-2">
              <p className="text-xl text-[#2951A3] text-bold">Explore</p>
            </div>
            {listHeader.map((header) => {
              const isCreation = header.id === "creation";
              if (isCreation && !user) {
                return (
                  <button
                    key={header.id}
                    onClick={() => {
                      handleNavClose();
                      handleLogin();
                    }}
                    className="text-xl text-[#2951A3] text-bold opacity-60"
                  >
                    {header.title}
                  </button>
                );
              }

              return (
                <Link
                  key={header.id}
                  to={header.path}
                  className="text-xl text-[#2951A3] text-bold"
                  onClick={handleNavClose}
                >
                  {header.title}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
