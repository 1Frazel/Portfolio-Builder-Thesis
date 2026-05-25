import { Link, useLocation } from "react-router";
import HomeIcon from "../../icons/HomeIcon";
import useIsMobile from "../hooks/useIsMobile";
import HomeNav from "../../icons/HomeNav";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  };

  return (
    <div
      className={`shrink-0 rounded-full bg-black/20 p-1 shadow-sm ${className}`}
    >
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

const GoogleMark = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`${className} shrink-0`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.8 12.2c0-.7-.1-1.3-.2-2H12v3.8h5.5c-.3 1.5-1.2 2.7-2.5 3.4v2.8h4a9.7 9.7 0 0 0 2.8-8Z"
      fill="#4285F4"
    />
    <path
      d="M12 22c2.7 0 5-.9 6.7-2.5l-4-2.8c-1.1.7-2.4 1.1-3.7 1.1A6.1 6.1 0 0 1 6 14l-4 3a10 10 0 0 0 10 5Z"
      fill="#34A853"
    />
    <path d="m6 14-4 3A10 10 0 0 1 2 7l4 3c-.4 1-.4 2 0 3Z" fill="#FBBC05" />
    <path
      d="M12 5.9c1.5 0 2.8.5 3.9 1.5l2.9-2.9A10 10 0 0 0 2 10l4 3a6.1 6.1 0 0 1 6-7.1Z"
      fill="#EA4335"
    />
  </svg>
);

const LogoutMark = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={`${className} shrink-0`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m11 12 9 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="m16 9 4 3-4 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DesktopAuthButton = ({
  text,
  handleClick,
  icon,
  loading,
  loadingText,
}: {
  text: string;
  handleClick: () => void;
  icon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
}) => {
  return (
    <button
      type="button"
      onClick={loading ? undefined : handleClick}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#214182] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#284ca0] focus:outline-none focus:ring-2 focus:ring-white/30 md:text-base ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} h-[44px] `}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin text-white"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
            />
          </svg>
          <span>{loadingText ?? "Loading..."}</span>
        </>
      ) : (
        <>
          {icon}
          <span>{text}</span>
        </>
      )}
    </button>
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
  const stickyHeaderClass =
    isStickyPage && showStickyHeader
      ? "fixed left-0 right-0 top-0 z-50"
      : "relative z-40";

  return (
    <div
      className={`${stickyHeaderClass} bg-[#2951A3] p-2 md:px-16 md:py-8 ${showStickyHeader ? "shadow-lg" : ""}`}
      style={
        showStickyHeader && playStickyAnimation
          ? { animation: "headerSlideDown 450ms cubic-bezier(0.16, 1, 0.3, 1)" }
          : undefined
      }
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
              <DesktopAuthButton
                text={t("auth.signOut")}
                handleClick={() => handleLogout()}
                icon={<LogoutMark />}
              />
            </div>
          ) : (
            <DesktopAuthButton
              text={t("auth.signIn")}
              handleClick={() => handleLogin()}
              icon={<GoogleMark />}
              loading={loading}
              loadingText={t("loading")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const MobileLogo = () => {
  return <img src={resumeezLogo} alt="Resumeez Logo" width={120} height={80} />;
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
  const stickyHeaderClass =
    isStickyPage && showStickyHeader
      ? "fixed left-0 right-0 top-0 z-50"
      : "relative z-40";

  const handleNavClose = () => {
    setIsShowNav(false);
  };

  return (
    <>
      <div
        className={`${stickyHeaderClass} bg-[#2951A3] px-4 py-4 flex items-center justify-between ${showStickyHeader ? "shadow-lg" : ""}`}
        style={
          showStickyHeader && playStickyAnimation
            ? {
                animation:
                  "headerSlideDown 450ms cubic-bezier(0.16, 1, 0.3, 1)",
              }
            : undefined
        }
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
                <p className="text-base font-semibold text-[#2951A3] sm:text-lg">
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
                className={`flex items-center gap-2 text-base font-semibold text-[#2951A3] sm:text-lg ${loading ? "opacity-60 pointer-events-none" : ""}`}
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
                  <>
                    <GoogleMark className="h-4 w-4" />
                    <span>{t("auth.signIn")}</span>
                  </>
                )}
              </button>
            )}
          </div>
          <nav className="flex flex-col gap-4 p-4 bg-[#FFFFFF] rounded-md">
            <div className="border-b border-gray-200 py-2">
              <p className="text-xl text-black text-bold">
                {t("navigation.explore")}
              </p>
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
