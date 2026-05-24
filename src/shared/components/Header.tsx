import { Link, useLocation } from "react-router";
import HomeIcon from "../../icons/HomeIcon";
import Button from "./Button";
import useIsMobile from "../hooks/useIsMobile";
import HomeNav from "../../icons/HomeNav";
import { useEffect, useRef, useState } from "react";
import HomeCancel from "../../icons/HomeCancel";
import Profile from "../../icons/Profile";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import resumeezLogo from "../../assets/ResumeezLogo.png";

interface IListHeader {
  id: string;
  titleKey: string;
  path: string;
}

const STICKY_PATHS = new Set(["/", "/checker"]);
const STICKY_TRIGGER_PX = 300;

const stickySlideDownStyle = `
  @keyframes headerSlideDown {
    from {
      transform: translate3d(0, -18px, 0);
      opacity: 0.96;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation("common");
  const isIndonesian = i18n.resolvedLanguage?.startsWith("id");
  const isEnglish = i18n.resolvedLanguage?.startsWith("en");

  const handleLanguageChange = async (language: "id" | "en") => {
    await i18n.changeLanguage(language);
    globalThis.location.reload();
  };

  return (
    <div className={`shrink-0 rounded-full bg-black/20 p-1 shadow-sm ${className}`}>
      <div className="grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => void handleLanguageChange("id")}
          className={`rounded-full px-3 py-1.5 text-[0.65rem] sm:px-4 sm:py-2 sm:text-xs md:text-sm font-semibold transition ${
            isIndonesian
              ? "bg-white text-[#2951A3] shadow"
              : "bg-transparent text-white hover:bg-white/10"
          }`}
        >
          Indonesia
        </button>
        <button
          type="button"
          onClick={() => void handleLanguageChange("en")}
          className={`rounded-full px-3 py-1.5 text-[0.65rem] sm:px-4 sm:py-2 sm:text-xs md:text-sm font-semibold transition ${
            isEnglish
              ? "bg-white text-[#2951A3] shadow"
              : "bg-transparent text-white hover:bg-white/10"
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
};

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [playStickyAnimation, setPlayStickyAnimation] = useState(false);
  const stickyAnimationTimerRef = useRef<number | null>(null);
  const isStickyPage = STICKY_PATHS.has(location.pathname);

  const listHeader = [
    {
      id: "home",
      titleKey: "nav.home",
      path: "/",
    },
    {
      id: "creation",
      titleKey: "nav.creation",
      path: "/creation",
    },
    {
      id: "checker",
      titleKey: "nav.checker",
      path: "/checker",
    },
  ];

  useEffect(() => {
    if (!isStickyPage) {
      setShowStickyHeader(false);
      setPlayStickyAnimation(false);

      if (stickyAnimationTimerRef.current !== null) {
        globalThis.clearTimeout(stickyAnimationTimerRef.current);
        stickyAnimationTimerRef.current = null;
      }

      return;
    }

    const updateStickyState = () => {
      const currentScrollY = globalThis.scrollY;

      if (!showStickyHeader && currentScrollY > STICKY_TRIGGER_PX) {
        setShowStickyHeader(true);
        setPlayStickyAnimation(true);

        if (stickyAnimationTimerRef.current !== null) {
          globalThis.clearTimeout(stickyAnimationTimerRef.current);
        }

        stickyAnimationTimerRef.current = globalThis.setTimeout(() => {
          setPlayStickyAnimation(false);
          stickyAnimationTimerRef.current = null;
        }, 450);

        return;
      }

      if (showStickyHeader && currentScrollY <= 0) {
        setShowStickyHeader(false);
        setPlayStickyAnimation(false);

        if (stickyAnimationTimerRef.current !== null) {
          globalThis.clearTimeout(stickyAnimationTimerRef.current);
          stickyAnimationTimerRef.current = null;
        }
      }
    };

    updateStickyState();
    globalThis.addEventListener("scroll", updateStickyState, { passive: true });

    return () => {
      globalThis.removeEventListener("scroll", updateStickyState);

      if (stickyAnimationTimerRef.current !== null) {
        globalThis.clearTimeout(stickyAnimationTimerRef.current);
        stickyAnimationTimerRef.current = null;
      }
    };
  }, [isStickyPage, showStickyHeader]);

  return (
    <>
      {isStickyPage ? <style>{stickySlideDownStyle}</style> : null}
      {isMobile ? (
        <MobileHeader
          listHeader={listHeader}
          isStickyPage={isStickyPage}
          showStickyHeader={showStickyHeader}
          playStickyAnimation={playStickyAnimation}
        />
      ) : (
        <DesktopHeader
          listHeader={listHeader}
          isStickyPage={isStickyPage}
          showStickyHeader={showStickyHeader}
          playStickyAnimation={playStickyAnimation}
        />
      )}
    </>
  );
};

const DesktopHeader = ({
  listHeader,
  isStickyPage,
  showStickyHeader,
  playStickyAnimation,
}: {
  listHeader: IListHeader[];
  isStickyPage: boolean;
  showStickyHeader: boolean;
  playStickyAnimation: boolean;
}) => {
  const { user, handleLogin, handleLogout, loading } = useAuth();
  const { t } = useTranslation("common");
  const stickyHeaderClass = isStickyPage && showStickyHeader
    ? "fixed left-0 right-0 top-0 z-50"
    : "relative z-40";

  return (
    <div
      className={`${stickyHeaderClass} bg-[#2951A3] p-2 md:px-16 md:py-8 ${showStickyHeader ? "shadow-lg" : ""}`}
      style={showStickyHeader && playStickyAnimation ? { animation: "headerSlideDown 450ms cubic-bezier(0.16, 1, 0.3, 1)" } : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HomeIcon />
          {listHeader.map((header) => {
            const isCreation = header.id === "creation";
            const headerTitle = t(header.titleKey);

            if (isCreation && !user) {
              return (
                <button
                  key={header.id}
                  title={t("auth.signInToCreateResumes")}
                  onClick={() => !loading && handleLogin()}
                  aria-disabled={loading}
                  className="text-white text-xs md:text-base opacity-60 cursor-pointer"
                >
                  {headerTitle}
                </button>
              );
            }

            return (
              <Link
                key={header.id}
                to={header.path}
                className={`text-white text-xs md:text-base ${isCreation && loading ? "opacity-50 pointer-events-none" : ""}`}
              >
                {headerTitle}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center md:gap-4">
          <LanguageSwitcher className="ml-0 md:ml-3" />
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
                text={t("auth.signOut")}
                buttonClass="text-white bg-[#FF9900]"
                handleClick={() => handleLogout()}
              />
            </div>
          ) : (
            <Button
              text={loading ? t("loading") : t("auth.signIn")}
              buttonClass="text-white bg-[#FF9900]"
              handleClick={() => handleLogin()}
              disabled={loading}
              isLoading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

  const MobileLogo = () => {
    return (
      <img 
        src={resumeezLogo}
        alt="Resumeez Logo"
        width={120} 
        height={80}
      />
    );
  };

const MobileHeader = ({
  listHeader,
  isStickyPage,
  showStickyHeader,
  playStickyAnimation,
}: {
  listHeader: IListHeader[];
  isStickyPage: boolean;
  showStickyHeader: boolean;
  playStickyAnimation: boolean;
}) => {
  const [isShowNav, setIsShowNav] = useState(false);
  const { user, handleLogin, handleLogout, loading } = useAuth();
  const { t } = useTranslation("common");
  const stickyHeaderClass = isStickyPage && showStickyHeader
    ? "fixed left-0 right-0 top-0 z-50"
    : "relative z-40";

  const handleNavClose = () => {
    setIsShowNav(false);
  };

  return (
    <>
      <div
        className={`${stickyHeaderClass} bg-[#2951A3] px-4 py-4 flex items-center justify-between ${showStickyHeader ? "shadow-lg" : ""}`}
        style={showStickyHeader && playStickyAnimation ? { animation: "headerSlideDown 450ms cubic-bezier(0.16, 1, 0.3, 1)" } : undefined}
      >
        <a href="/">
          <MobileLogo />
        </a>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsShowNav(!isShowNav)}
            className="cursor-pointer"
          >
            {isShowNav ? <HomeCancel /> : <HomeNav />}
          </button>
        </div>
      </div>

      {isShowNav && (
        <div className="fixed inset-0 bg-[#D9D9D9] z-30 flex flex-col gap-4 p-4 pt-20">
          <div className="p-4 bg-[#FFFFFF] rounded-md flex items-center gap-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <Profile />
            )}
            {user ? (
              <div className="flex flex-col">
                <p className="text-xl text-[#2951A3] text-bold">
                  {user.displayName ?? user.email}
                </p>
                <button
                  onClick={() => handleLogout()}
                  className="text-sm text-[#2951A3] text-left"
                >
                  {t("auth.signOut")}
                </button>
              </div>
            ) : (
              <button
                onClick={() => !loading && handleLogin()}
                disabled={loading}
                aria-disabled={loading}
                className={`text-xl text-[#2951A3] text-bold ${loading ? "opacity-60 pointer-events-none" : ""}`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-[#2951A3]"
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
                    {t("auth.signIn")}
                  </span>
                ) : (
                  t("auth.signIn")
                )}
              </button>
            )}
          </div>
          <nav className="flex flex-col gap-4 p-4 bg-[#FFFFFF] rounded-md">
            <div className="border-b border-gray-200 py-2">
              <p className="text-xl text-black text-bold">{t("navigation.explore")}</p>
            </div>
            {listHeader.map((header) => {
              const isCreation = header.id === "creation";
              const headerTitle = t(header.titleKey);

              if (isCreation && !user) {
                return (
                  <button
                    key={header.id}
                    onClick={() => {
                      if (!loading) {
                        handleNavClose();
                        handleLogin();
                      }
                    }}
                    disabled={loading}
                    aria-disabled={loading}
                    className={`flex items-center gap-2 text-sm text-[#2951A3] text-bold ${loading ? "opacity-60 pointer-events-none" : "opacity-60"}`}
                  >
                    {loading && (
                      <svg
                        className="animate-spin h-4 w-4 text-[#2951A3]"
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
                      {headerTitle}
                  </button>
                );
              }

              return (
                <Link
                  key={header.id}
                  to={header.path}
                  className="text-sm text-[#2951A3] font-normal"
                  onClick={handleNavClose}
                >
                  {headerTitle}
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
