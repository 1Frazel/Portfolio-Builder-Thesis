import Header from "./Header";

const LoadingPage = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header with all buttons disabled */}
      <div className="pointer-events-none opacity-60">
        <Header />
      </div>

      {/* Loading body */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Spinner */}
          <svg
            className="animate-spin"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="#2951A3"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="#2951A3"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>

          {/* Loading text */}
          <p className="text-lg font-semibold text-[#2951A3]">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
